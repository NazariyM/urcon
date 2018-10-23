import { $body, detectIE, $scrolledElements } from './_helpers';

import './components/Header';
import './components/Popups';
import './components/Anims';
import './components/ScrollAnim';
import './components/Form';
import './sections/Assess';

export class Common {
  constructor() {
    this.init();
  }

  init() {
    this.addClassIE();
    this.scrollBtn();
  }

  addClassIE() {
    if (detectIE()) $body.addClass('is-ie');
  }

  scrollBtn() {
    const $btn = $('.scroll-top-btn');

    $btn.on('click', (e) => {
      e.preventDefault();
      $scrolledElements.animate({
        scrollTop: $body.offset().top
      }, 1500);
    });
  }
}

export default new Common();
