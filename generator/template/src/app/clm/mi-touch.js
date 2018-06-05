import {getFullId} from '@/app/utils/sl-id-parser'
import desktopNavigationBeyondRootDir from '@/app/utils/desktop-navigation-beyond-root-dir'


  export default {
    created() {
    // Disable system vertical fucking swipe
    // document.addEventListener('touchmove', function (e) {
    //   e.preventDefault();
    // }, true);
  },
  methods: {
    navigateTo(id) {
      id = getFullId(id);
      console.log(id);

      // try {
      //   // !!!!!!!!! TEMP SOLUTION !!!!!!!!!!!!!!!!
      //   com.veeva.clm.gotoSlide(id + '.zip', '');
      // } catch(err) {
      //   desktopNavigationBeyondRootDir(id);
      // }
    }
  }
}


