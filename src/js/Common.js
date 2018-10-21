import objectFitImages from 'object-fit-images';
import { $body, detectIE, $scrolledElements } from './_helpers';

// import './components/Header';
import './components/Popups';
import './components/Form';
import './sections/Contacts';
import './components/Sliders';
import './components/CTabs';

export class Common {
  constructor() {
    this.init();
  }

  init() {
    objectFitImages();
    this.addClassIE();
    this.scrollBtn();
  }

  addClassIE() {
    if (detectIE()) $body.addClass('is-ie');
  }

  scrollBtn() {
    const $btn = $('.js-scroll-to');
    const $destination = $('.js-scroll-dest');

    $btn.on('click', (e) => {
      e.preventDefault();
      $scrolledElements.animate({
        scrollTop: $destination.offset().top
      }, 1500);
    });
  }
}

export default new Common();
