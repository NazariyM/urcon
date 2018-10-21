import { css } from '../_helpers';

class VideoBlock {
  constructor() {
    this.$blocks = $('.video-block');

    this.init();
  }

  init() {
    this.play();
  }

  play() {
    this.$blocks.each((i, $block) => {
      const $this = $($block);
      const $btn = $this.find('.video-block__play-btn');
      const $video = $this.find('.video-block__video');
      const $containerBlocks = $this.closest('.js-videos-container').find('.video-block');

      $btn.on('click', () => {
        $containerBlocks.each(function (i, $el) {
          const $block = $($el);
          if ($block.hasClass(css.active)) {
            $block.find('video')[0].pause();
            $block.removeClass(css.active);
          }
        });

        $video[0].play();
        $this.addClass(css.active);
        $video.on('click', () => {
          $video[0].pause();
          $this.removeClass(css.active);
        });
      });
    });
  }
}

export const VideoBlockAPI = new VideoBlock();
