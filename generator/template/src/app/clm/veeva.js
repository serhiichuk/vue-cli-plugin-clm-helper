import com from 'veevalibrary'
import {idPattern} from '@/clm.config'

const navigation = {
  navigateTo(id) {
    id = `${idPattern}--${id}`;

    try {
      // !!!!!!!!! TEMP SOLUTION !!!!!!!!!!!!!!!!
      com.veeva.clm.gotoSlide(id + '.zip', '');
    } catch(err) {
      desktopNavigationBeyondRootDir(id);
    }
  }
};

/**
 * Navigation when slide opened in desktop browser
 * and slide folders located beyond root directory
 * and the slide folder name is the same as the slide file name
 *
 * @param slide
 */
function desktopNavigationBeyondRootDir(slide) {
  const href = window.location.href.split('/').slice(0, -3);
  href.push(slide);
  href.push(slide + '.html');

  window.location.assign(href.join('/'))
}

export default {
  navigation
}
