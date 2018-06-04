import {getOperatingSystem} from '@/app/utils/get-system-info'

export default {
  methods: {
    navigateTo(id) {
    const slide = `${id}.html`;

    switch (getOperatingSystem()) {
      case 'Android' :
        Android.openSlide(slide);
        break;
      case 'iOS':
        window.location.href = slide;
        break;

      default:
        try {
          Android.openSlide(slide);
        } catch (err) {
          window.location.href = slide;
        }
      }
    }
  }
}
