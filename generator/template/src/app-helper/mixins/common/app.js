import { mapState } from 'vuex';
import { clm, structure } from '@/clm.config'


export default {
  data() {
    return {
      clmName: process.env.VUE_APP_CLM,
    }
  },
  computed: {
    ...mapState(['currentSlide']),

    /**
     * Return adjacent slides
     * calculate from structure index position
     *
     * @returns {{next: String <slide ID>, prev: String <slide ID>}}
     */
    adjacentSlides() {
      const result = {
        next: undefined,
        prev: undefined,
      };

      structure.forEach((sl, key) => {
        if (sl.id === this.currentSlide.id) {
          result.next = (structure[key + 1] && structure[key + 1].id);
          result.prev = (structure[key - 1] && structure[key - 1].id);
        }
      });

      return result
    },


    /**
     * Check and return 'swipe' options from slide object
     *
     * @returns {{next: String, prev: String}}
     */
    configSwipe() {
      const { swipe } = this.currentSlide;

      return {
        next: (swipe && swipe.next) ? swipe.next : undefined,
        prev: (swipe && swipe.prev) ? swipe.prev : undefined,
      }
    },

    /**
     * Get a logical value, which means preventing the 'next' and 'prev' swipe for current slide
     * if value of key 'disableSwipeBetweenFlows' from 'clm.js' is 'true'
     * then swipes to slides from another flow will be prevented by 'swipePreventMethod' in each clm-mixin
     *
     * The option 'prevent' in 'swipe.next' or 'swipe.prev' will be a priority than option 'disableSwipeBetweenFlows'
     *
     * @returns {{next: boolean, prev: boolean}}
     */
    isPreventSwipe() {
      const { configSwipe } = this;
      const result = {
        next: false,
        prev: false,
      };

      Object.keys(result).forEach(key => {
        // Check clm.config -> clm -> disableSwipeBetweenFlows value and
        // check is next or prev slides from another flow
        if (this.adjacentSlides[key]) {
          const isSlideFromAnotherFlow = !this.compareFlowNameById(this.currentSlide.id, this.adjacentSlides[key]);
          if (clm.disableSwipeBetweenFlows && isSlideFromAnotherFlow) result[key] = true;
        }

        // Check clm.config -> structure -> slide-object -> swipe value
        if (configSwipe[key] === 'prevent') result[key] = true;
      });

      return result;
    },
  },

  watch: {
    /** Running, preventing swiping after counting adjacentSlides **/
    adjacentSlides() {
      Object.keys(this.isPreventSwipe).forEach(swipe => {
        if (this.isPreventSwipe[swipe]) this.swipePreventMethod(swipe);
      });
    },
  },

  methods: {
    /**
     * Method for 'v-touch:swipe' in App.vue
     * Catch the left or right swipe and start the '$navigateTo' callback
     * if the slide object has the swipe.next 'or' swipe.prev '
     *
     * @param direction
     * @param event
     */
    swipeHandler(direction, event) {
      const { configSwipe, $navigateTo } = this;
      let _direction = false;
      if (direction === 'left') _direction = 'next';
      if (direction === 'right') _direction = 'prev';

      if (_direction &&
        configSwipe[_direction] &&
        configSwipe[_direction] !== 'prevent') {

        event.preventDefault();
        $navigateTo(configSwipe[_direction])
      }
    },

    /**
     * Check by Flow Name if 'id1' and 'id2' corresponding to the same flow
     * Id parser: 'slide-faq_1'
     * 'slide-' - ID Prefix
     * 'faq' - Flow Name
     * '1' - Slide Num
     *
     * @param id1 String
     * @param id2 String
     * @returns {boolean}
     */
    compareFlowNameById(id1, id2) {
      const regex = /^slide-([^\.]+)/;

      try {
        return regex.exec(id1)[1].split('_')[0] === regex.exec(id2)[1].split('_')[0]
      } catch (e) {
        throw new Error(`Wrong slide ID\n${e}`)
      }
    },
  },

  created() {
    document.addEventListener("selectstart", function (e) {
      e.preventDefault();
    }, false);
  },
}
