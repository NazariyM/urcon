import Popup from 'vintage-popup';
import Inputmask from 'inputmask';
import { css } from '../_helpers';

class Form {
  constructor(formEl) {
    this.$form = $(formEl);
    this.$telInput = this.$form.find('.js-tel-input');
    this.$numberInputs = this.$form.find('.js-number-input');
    this.$checkBoxField = this.$form.find('.check-box_has-field');
    this.$agree = this.$form.find('.js-agreement-check');
    this.$agreeCheckbox = this.$agree.find('input');

    this.init();
  }

  init() {
    this.maskInput();
    this.checkNumber();
    this.checkBoxFieldListener();
    this.initThanksPop();
  }

  maskInput() {
    const im = new Inputmask({
      mask: '+7 (999) 999-99-99',
      showMaskOnHover: false,
      showMaskOnFocus: true,
      onincomplete() {
        this.value = '';
      }
    });
    im.mask(this.$telInput);
  }

  initThanksPop() {
    const _this = this;

    this.$form.on('submit', function(e) {
      e.preventDefault();
      const $this = $(this);

      if (_this.checkError()) {
        Popup.closeAllPopups();
        const thanskPopInstance = $('.thanks-popup__btn').popup();
        thanskPopInstance.open();

        setTimeout(() => {
          $this[0].reset();
          thanskPopInstance.close();
        }, 2000);
      }
    });
  }

  checkBoxFieldListener() {
    this.$checkBoxField.each((i, field) => {
      const $field = $(field);
      const $label = $field.find('.check-box__label');
      const $radio = $field.find('.check-box__input');
      const $input = $field.find('.check-box__field-input');

      $label.on('click', () => {
        if ($radio.is(':checked')) {
          $input.attr('readonly', false).focus();
          $input.removeClass(css.disabled);

          $input.on('blur', () => {
            $input.prop('readonly', true);
            $input.addClass(css.disabled);
          });
        }
      });
    });
  }

  checkError() {
    const $field = this.$telInput.parent();

    if (this.$telInput.val() === '' && !this.$agreeCheckbox.is(':checked')) {
      $field.addClass(css.error);
      this.$agree.addClass(css.error);
      setTimeout(() => {
        $field.removeClass(css.error);
        this.$agree.removeClass(css.error);
      }, 2000);
      return false;
    }

    if (this.$telInput.val() === '') {
      $field.addClass(css.error);
      setTimeout(() => {
        $field.removeClass(css.error);
      }, 2000);
      return false;
    }

    if (!this.$agreeCheckbox.is(':checked')) {
      this.$agree.addClass(css.error);
      setTimeout(() => {
        this.$agree.removeClass(css.error);
      }, 2000);
      return false;
    }

    else {
      return true;
    }
  }

  checkNumber() {
    this.$numberInputs.each((i, el) => {
      $(el).on('keypress', (e) => {
        isNumberKey(e);
      });
    });

    function isNumberKey(e) {
      if (e.which < 48 || e.which > 57) e.preventDefault();
    }
  }
}

const $form = $('.js-form');
$form.each((i, el) => { new Form(el); });
