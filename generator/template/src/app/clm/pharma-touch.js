import {getFullId} from '@/app/utils/sl-id-parser'
import {getOperatingSystem} from '@/app/utils/get-system-info'

export default {
  methods: {
    navigateTo(id) {
      id = `${getFullId(id)}.html`;

      switch (getOperatingSystem()) {
        case 'Android' :
          Android.openSlide(id);
          break;
        case 'iOS':
          window.location.href = id;
          break;

        default:
          try {
            Android.openSlide(id);
          } catch (err) {
            window.location.href = id;
          }
      }
    }
  }
}
