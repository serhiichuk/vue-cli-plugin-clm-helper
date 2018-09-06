/**
 * Determine the local IP from your computer.
 * This async function returns local IP in following format: 'XXX.XXX.XX.XXX'
 *
 * @returns {Promise<string>}
 */
export const getLocalIP = () => {
  return new Promise(resolve => {
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome

    const pc = new RTCPeerConnection({ iceServers: [] });
    const noop = () => {};

    pc.createDataChannel('');//create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
    pc.onicecandidate = (ice) => {
      if (ice && ice.candidate && ice.candidate.candidate) {
        const myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[ 1 ];
        pc.onicecandidate = noop;

        resolve(myIP);
      }
    };
  });
};


/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', 'Desktop' or 'unknown'.
 *
 * @returns {String}
 */
export const getOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/win32|mac/i.test(window.navigator.platform)) {
    return "Desktop";
  }

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
};
