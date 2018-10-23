import ScrollMagic from 'scrollmagic';

const scrollController = new ScrollMagic.Controller();

export default class ScrollAnim {
  constructor({ el, hook = 0.9, reverse = false, onEnter }) {
    this.triggerElement = el;
    this.triggerHook = hook;
    this.reverse = reverse;
    this.onEnter = onEnter;

    if (!this.triggerElement) return;
    this.createScene();
  }

  async createScene() {
    const _this = this;

    const scene = new ScrollMagic.Scene({
      triggerElement: _this.triggerElement,
      triggerHook: _this.triggerHook,
      reverse: _this.reverse
    })
      .on('enter', () => {
        if (typeof _this.onEnter !== 'function') return;
        _this.onEnter();
      })
      .addTo(scrollController);
  }
}
