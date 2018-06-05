import com from 'veevalibrary'
import {getFullId} from '@/app/utils/sl-id-parser'
import desktopNavigationBeyondRootDir from '@/app/utils/desktop-navigation-beyond-root-dir'

export default {
  created() {
    // Disable system vertical fucking swipe
    document.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, true);
  },
  methods: {
    navigateTo(id) {
      id = getFullId(id);

      try {
        com.veeva.clm.gotoSlide(id + '.zip', '');
      } catch(err) {
        desktopNavigationBeyondRootDir(id);
      }
    }
  }
}

