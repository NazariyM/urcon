import 'slick-carousel';
import { svgIcon, css } from '../_helpers';

class Slider {
  constructor({ el= '.js-slider', showCount = 1, scrollCount = 1, ...opts } = {}) {
    this.$slider = $(el);
    this.showCount = showCount;
    this.scrollCount = scrollCount;
    this.responsive = opts.responsive;
    this.arrows = opts.arrows || true;
    this.infinite = opts.infinite || false;
    this.function = opts.function || false;
    this.dots = opts.dots || true;
    this.dotsClass = opts.dotsClass || 'slider-dots';
    this.appendArrows = opts.appendArrows;
    this.appendDots = opts.appendDots;
    this.transform = opts.transform || true;
    this.speed = opts.speed || 1000;
    this.ease = opts.ease;
    this.counter = opts.counter || false;
    this.onInit = opts.onInit || false;

    const iconLeft = svgIcon('angle-left');
    const iconRight = svgIcon('angle-right');

    this.defaultOptions = {
      slidesToShow: this.showCount,
      slidesToScroll: this.scrollCount,
      infinite: this.infinite,
      speed: this.speed,
      useTransform: this.transform,
      adaptiveHeight: true,
      accessibility: false,
      swipe: true,
      arrows: this.arrows,
      prevArrow: `<button type="button" class="slider-btn slider-btn_prev">${iconLeft}</button>`,
      nextArrow: `<button type="button" class="slider-btn slider-btn_next">${iconRight}</button>`,
      dots: this.dots,
      dotsClass: this.dotsClass,
      appendArrows: this.appendArrows,
      appendDots: this.appendDots,
      rows: 0,
      responsive: this.responsive,
      cssEase: this.ease
    };

    if (this.$slider.length) this.init();
  }

  init() {
    if (this.counter) this.initCounter();
    if (this.onInit) this.$slider.on('init afterChange reInit', (event, slick, currentSlide) => this.onInit(event, slick, currentSlide));

    this.initSlider();

    if (this.function) {
      if (typeof this.function !== 'function') return;
      this.function();
    }
  }

  initSlider() {
    this.$slider.slick($.extend({}, this.defaultOptions));
  }

  initCounter() {
    const $sliderControls = this.$slider.parent().find('.slider-controls');
    const $prevSld = $('<div class="slider-controls__count slider-controls__count_l"></div>');
    const $nextSld = $('<div class="slider-controls__count slider-controls__count_r"></div>');

    setTimeout(() => {
      $prevSld.prependTo($sliderControls);
      $nextSld.appendTo($sliderControls);
    }, 0);

    this.$slider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
      if ((currentSlide > nextSlide && (nextSlide !== 0 || currentSlide === 1)) || (currentSlide === 0 && nextSlide === slick.slideCount - 1)) {
        $sliderControls.addClass('is-left');
      } else {
        $sliderControls.addClass('is-right');
      }

    });

    this.$slider.on('init afterChange reInit', (e, slick, currentSlide) => {
      $sliderControls.removeClass('is-left is-right');

      const i = (currentSlide ? currentSlide : 0) + 1;

      $prevSld.text(`0${i - 1}`);
      $nextSld.text(`0${i + 1}`);

      $prevSld.text() === '00' ? $prevSld.text(`0${slick.slideCount}`) : false;
      $nextSld.text() === `0${slick.slideCount + 1}` ? $nextSld.text('01') : false;
    });
  }
}

export default new Slider();

const screenSld = new Slider({
  el: '.js-screen-slider',
  ease: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)',
  transform: false,
  speed: 1100,
  dotsClass: 'screen__slider-dots slider-dots slider-dots_gray',
  appendArrows: '.screen__slider-controls',
  appendDots: '.screen__slider-controls',
  infinite: true,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        speed: 800
      }
    }
  ]
});

const solutionsSld = new Slider({
  el: '.js-solutions-slider',
  ease: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)',
  dotsClass: 'solutions__slider-dots slider-dots slider-dots_black',
  appendArrows: '.solutions__slider-controls',
  appendDots: '.solutions__slider-controls',
  counter: true,
  infinite: true,
  speed: 1200,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        speed: 800
      }
    }
  ]
});
