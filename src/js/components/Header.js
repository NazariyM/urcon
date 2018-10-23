import 'gsap/ScrollToPlugin';
import {
  throttle,
  css,
  Resp
} from '../_helpers';

class Header {
  constructor() {
    this.body = document.querySelector('body');
    this.header = document.querySelector('.header');
    this.logos = document.querySelectorAll('.logo');
    this.nav = this.header.querySelector('.nav_header');
    this.navs = document.querySelectorAll('.nav');
    this.navBtn = this.header.querySelector('.nav-btn');

    this.init();
  }

  init() {
    this.initFix();
    this.initScroll();
    this.bindEvents();
  }

  bindEvents() {
    this.navBtn.addEventListener('click', () => {
      this.toggleMenu();
    });
		 this.onResize();
  }

  onResize() {
    window.onresize = () => {
      this.navBtn.classList.remove(css.active);
      this.nav.classList.remove(css.active);
    };
  }

  toggleMenu() {
    this.navBtn.classList.toggle(css.active);
    this.nav.classList.toggle(css.active);
  }

  initFix() {
    const _this = this;

    if (window.pageYOffset > 0) {
      _this.header.classList.add(css.fixed);
    }

    const toggleHeaderScroll = throttle((e) => {
      toggleHeader(e);
    }, 0, this);

    function toggleHeader(e) {
      if (window.pageYOffset > 0) {
        _this.header.classList.add(css.fixed);
      } else {
        _this.header.classList.remove(css.fixed);
      }
    }

    window.addEventListener('scroll', toggleHeaderScroll);
  }

  initScroll() {
    const _this = this;
    const offsetTop = Resp.isDesk ? 70 : 60;

    for (const logo of this.logos) {
      logo.addEventListener('click', (e) => {
        e.preventDefault();

        TweenMax.to(window, 1.5, {
          scrollTo: { y: 0, autoKill: false }
        });
      });
    }

    for (const nav of this.navs) {
      const navLinks = nav.querySelector('.nav__list');

      [...navLinks.querySelectorAll('a')].forEach(item => {
        item.addEventListener('click', (e) => {
          if (item.href.indexOf('#') !== -1) {
            e.preventDefault();
            const href = item.href;
            const hashName = href.slice(href.indexOf('#') + 1, href.length);

            nav.classList.remove(css.active);
            _this.navBtn.classList.remove(css.active);

            TweenMax.to(window, 1.5, {
              scrollTo: {
                y: document.getElementById(hashName).getBoundingClientRect().top + window.pageYOffset - offsetTop,
                autoKill: false
              }
            });
          }
        });
      });
    }
  }
}

export const HeaderAPI = new Header();
