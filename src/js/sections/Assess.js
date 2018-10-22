import { css, getSiblings } from '../_helpers';
import { TweenMax } from 'gsap';

class Assess {
  constructor() {
    this.block = document.querySelector('.assess');
    this.resultItems = this.block.querySelectorAll('.assess__result-item');
    this.input = this.block.querySelector('.js-debt-amount');

    if (!this.block) return;

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.input.addEventListener('keyup', (e) => {
      this.checkVal(e);
    });
  }

  checkVal(e, index) {
    const input = e.target;
    const value = input.value;
    const case1 = (value >= 1000 && value <= 200000);
    const case2 = (value >= 200001 && value <= 400000);
    const case3 = (value >= 400001 && value <= 600000);
    const case4 = (value >= 600001 && value <= 800000);
    const case5 = (value >= 800001 && value <= 1000000);
    const case6 = (value >= 1000001 && value <= 1500000);
    const case7 = (value >= 1500001 && value <= 2000000);
    const case8 = (value >= 2000001 && value <= 3000000);
    const case9 = (value >= 3000001 && value <= 5000000);
    const case10 = (value >= 5000001 && value <= 7500000);
    const case11 = (value >= 7500001 && value <= 10000000);
    const case12 = (value > 10000000);

    switch (true) {
      case case1:
        index = 0;
        break;
      case case2:
        index = 1;
        break;
      case case3:
        index = 2;
        break;
      case case4:
        index = 3;
        break;
      case case5:
        index = 4;
        break;
      case case6:
        index = 5;
        break;
      case case7:
        index = 6;
        break;
      case case8:
        index = 7;
        break;
      case case9:
        index = 8;
        break;
      case case10:
        index = 9;
        break;
      case case11:
        index = 10;
        break;
      case case12:
        index = 11;
        break;

      default:
        index = 0;
    }

    this.resultItems[index].classList.add(css.active);

    const siblings = getSiblings(this.resultItems[index]);
    for (const sibling of siblings) sibling.classList.remove(css.active);
  }

  animateNumbers() {
    const elem = $('[data-anim-count]');

    elem.each(function (index, item) {
      const $this = $(this);
      let number = parseInt($this.text());
      let counter = {var: 0};

      TweenMax.to(counter, 4, {
        var: number,
        onUpdate: function () {
          $this.html(Math.ceil(counter.var));
        },
        ease: Circ.easeOut
      });
    });
  }
}

export default new Assess();
