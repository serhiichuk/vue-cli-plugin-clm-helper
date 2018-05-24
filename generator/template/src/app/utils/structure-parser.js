import {structure} from '@/clm.config'

export default class {
  constructor(currentSlideId = '') {
    currentSlideId = process.env.NODE_ENV === 'development'
      ? currentSlideId
      : process.env.SLIDE_NAME.split('--').slice(-1).toString();


    this.currentSlide = {};
    this.currentFlow = [];
    this.slides = [];

    this.run(currentSlideId);
  }

  run(currentSlideId) {
    structure.forEach(slide => {
      // Create All Slides Array
      this.slides.push(this.getSlideEl(slide));

      // Create Current Slide Object
      if (slide.id === currentSlideId) {
        this.currentSlide = this.getSlideEl(slide);
      }

      // Create Current Flow Array
      if (this.getIdWithoutSlNum(slide.id) === this.getIdWithoutSlNum(currentSlideId)) {
        this.currentFlow.push(this.getSlideEl(slide));
      }
    })
  }

  getSlideEl(sl) {
    const result = {};

    for (let key in sl) {
      if (sl[key]) result[key] = sl[key]
    }

    return result
  }

  // SOME_PREP_C1_18--slide_1_2 - will return: slide_1_2
  // _________________↑↑↑↑↑↑↑↑__
  // SOME_PREP_C1_18--slide_main - will return: slide_main
  // _________________↑↑↑↑↑↑↑↑↑↑↑↑
  getIdWithoutSlNum(id) {
    return id.split('--').pop().split('_')[0]
  }
}
