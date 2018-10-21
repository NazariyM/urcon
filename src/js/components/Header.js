import {
  throttle,
	detectIE,
  css,
  Resp, $header, $scrolledElements
} from '../_helpers';

class Header {
	constructor() {
		this.body = document.querySelector('body');
		this.header = document.querySelector('.header');
		this.nav = this.header.querySelector('.nav');
		this.navBtn = this.header.querySelector('.nav-btn');
		this.scrollTop = 0;

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
		const toggleHeaderScroll = throttle((e) => {
      toggleHeader(e);
		}, 0, this);

		function toggleHeader(e) {
			if (!detectIE()) {
        const scrolledTop = e.currentTarget.oldScroll > e.currentTarget.scrollY;

        scrolledTop ? _this.header.classList.add(css.visible) : _this.header.classList.remove(css.visible);

        e.currentTarget.oldScroll = e.currentTarget.scrollY;
			}

      if (window.pageYOffset > 80) {
				_this.header.classList.add(css.fixed);
			} else {
				_this.header.classList.remove(css.fixed);
			}
    }

		window.addEventListener('scroll', toggleHeaderScroll);
	}

  initScroll() {
		const _this = this;
    const offsetTop = Resp.isDesk ? 50 : 65;
    const $link = $header.find('.nav').find('a');

    $link.on('click', function (e) {
      e.preventDefault();
      const el = $(this).attr('href');
      $scrolledElements.animate({scrollTop: $(el).offset().top - offsetTop}, 1500);
      _this.nav.classList.remove(css.active);
      _this.navBtn.classList.remove(css.active);
      return false;
    });
  }
}

export const HeaderAPI = new Header();
