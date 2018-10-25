import { TweenMax } from 'gsap';
import '../lib/ModifiersPlugin.min';

import ScrollMagic from 'scrollmagic';
import 'isomorphic-fetch';

class Assess {
  constructor() {
    this.block = document.querySelector('.assess');

    if (!this.block) return;
    this.input = this.block.querySelector('.js-debt-amount');
    this.totalPrice = this.block.querySelector('.js-total-price');
    this.firstPrice = this.block.querySelector('.js-first-price');
    this.lastPrice = this.block.querySelector('.js-last-price');
    this.resultBlock = this.block.querySelector('.assess__result');
    this.priceListUrl = this.resultBlock.dataset.pricelistUrl;
    this.activeCase = 1;

    this.init();
  }

  init() {
    this.getPricesList().then(() => this.initAnim());

    this.bindEvents();
    if (window.matchMedia('(max-width: 1023px)').matches) this.appendResultBlock();
  }

  bindEvents() {
    this.input.addEventListener('keyup', () => {
      this.checkPrevValue();
      this.resultBlock.dataset.activeCase = this.checkCase();
      if (parseInt(this.activeCase) === this.checkCase()) return;

      this.writePrice(this.checkCase());
    });
  }

  getPricesList() {
    return fetch(this.priceListUrl)
      .then(response => response.json())
      .then(data => {
        this.pricesList = data;
      }).catch(err => {
        throw new Error('price list not found.');
      });
  }

  checkCase() {
    const value = this.input.value;
    const case_1 = (value >= 1000 && value <= 200000);
    const case_2 = (value >= 200001 && value <= 400000);
    const case_3 = (value >= 400001 && value <= 600000);
    const case_4 = (value >= 600001 && value <= 800000);
    const case_5 = (value >= 800001 && value <= 1000000);
    const case_6 = (value >= 1000001 && value <= 1500000);
    const case_7 = (value >= 1500001 && value <= 2000000);
    const case_8 = (value >= 2000001 && value <= 3000000);
    const case_9 = (value >= 3000001 && value <= 5000000);
    const case_10 = (value >= 5000001 && value <= 7500000);
    const case_11 = (value >= 7500001 && value <= 10000000);
    const case_12 = (value > 10000000);
    let index;

    switch (true) {
      case case_1:
        index = 1;
        break;
      case case_2:
        index = 2;
        break;
      case case_3:
        index = 3;
        break;
      case case_4:
        index = 4;
        break;
      case case_5:
        index = 5;
        break;
      case case_6:
        index = 6;
        break;
      case case_7:
        index = 7;
        break;
      case case_8:
        index = 8;
        break;
      case case_9:
        index = 9;
        break;
      case case_10:
        index = 10;
        break;
      case case_11:
        index = 11;
        break;
      case case_12:
        index = 12;
        break;

      default:
        index = 1;
    }
    return index;
  }

  writePrice(currentIdx) {
    let total = parseInt(this.pricesList[`case_${currentIdx}`].total.replace(/\s/g,''));
    let first = parseInt(this.pricesList[`case_${currentIdx}`].first.replace(/\s/g,''));
    let last = parseInt(this.pricesList[`case_${currentIdx}`].last.replace(/\s/g,''));

    let counter = { var1: 0, var2: 0, var3: 0 };

    TweenMax
      .to(counter, 1, {
        var1: total,
        var2: first,
        var3: last,
        ease: Circ.easeOut,
        modifiers: {
          var1: (var1) => {
            let val1;

            if (valLength(var1) === 5) {
              val1 = Math.ceil(var1).toString().replace(/(.{2})/,'$1 ');
            } else {
              val1 = Math.ceil(var1).toString().replace(/(.{3})/,'$1 ');
            }

            this.totalPrice.textContent = val1;
          },
          var2: (var2) => {
            let val2;

            if (valLength(var2) === 5) {
              val2 = Math.ceil(var2).toString().replace(/(.{2})/,'$1 ');
            } else {
              val2 = Math.ceil(var2).toString().replace(/(.{3})/,'$1 ');
            }

            this.firstPrice.textContent = val2;
          },
          var3: (var3) => {
            let val3;

            if (valLength(var3) === 5) {
              val3 = Math.ceil(var3).toString().replace(/(.{2})/,'$1 ');
            } else {
              val3 = Math.ceil(var3).toString().replace(/(.{3})/,'$1 ');
            }

            this.lastPrice.textContent = val3;
          }
        }
      });

    const valLength = (numb) => {
      return Math.ceil(numb).toString().length;
    };
  }

  checkPrevValue() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        this.activeCase = mutation.oldValue;
      });
    });

    const config = { attributeOldValue: true };

    observer.observe(this.resultBlock, config);
  }

  appendResultBlock() {
    const formActs = this.block.querySelector('.assess__form-actions');

    formActs.prepend(this.resultBlock);
  }

  initAnim() {
    const _this = this;

    const ctrl = new ScrollMagic.Controller();
    const scene = new ScrollMagic.Scene({
      triggerElement: _this.block,
      reverse: false
    })
      .on('enter', () => {
        anim();
      })
      .addTo(ctrl);

    function anim() {
      TweenMax.to(_this.resultBlock, 1, { autoAlpha: 1, y: 0 });
      _this.writePrice(_this.checkCase());
    }
  }
}

export default new Assess();
