$(function() {

    if ($.mask) {
	$(".phone").each(function() {
	    var $this = $(this);
            $this.mask("+7(999) 999-9999");
            if (! $this.attr('placeholder')) {
                $this.attr('placeholder', '+7(код) ___-____')
	    }
	});
	//$(".date").mask("99-99-9999");
	$(".date").attr('placeholder', 'дд-мм-гггг');
	$('[data-mask]').each(function() {
	    var $this = $(this);
	    if (!$this.data('datepicker') || ($this.data('datepicker') && !jQuery.browser.msie)) {
		$(this).mask($(this).data('mask'));
            }
	});
    }
    /*
    if ($.placeholder) {
	$('input[placeholder], textarea[placeholder]').placeholder();
    }
    */
    $('form.dynamic select').change(function() {
	var $el = $(this).parent().find('.sel-other')
	    val = $(this).val();		
	if (val && $el.length) {
	    val = $.trim(val.toLowerCase())
	    if ('иное' == val || 'другое' == val || 'иной' == val || 'другой' == val ) {
		$el.fadeIn();
	    } else {
		$el.fadeOut();
	    }
	}
    })
    
    $('form.dynamic').each(aboFormHndl);
});

function aboFormHndl() {
    var $gForm = $(this);
    $gForm.submit(function() {
	var $form = $(this);		
	$('div.err').remove();
	if ($form.data('code_checked')) {
	    return true;
	}
	var f = $form.data('validate_func') ? $form.data('validate_func') : checkForm;
	
	if (f($form, $gForm.data('show_err') ? true : false)) {
	    if ($form.find('input[name=captcha]').length) {
		$.get($form.attr('action'), {
			action: 'check_captcha',
			captcha: $form.find('input[name=captcha]').val()
		    },
		    function(data) {
			if (data) {
			    $form.data('code_checked', true);
			    $form.submit();
			} else {
			    $form.data('code_checked', false);
			    $form.find('.captcha_lnk').click();
			    if ($form.data('alert_err')) {
				alert('Был указан не верный код.');							
			    } else {
				showErrBlock($form.find('input[name=captcha]'), 'Был указан не верный код.');
			    }
			}
		    },
		    'json'
		);
	    } else {
		return true;
	    }
	}
	
	return false;
    });
    
    $gForm.find('.captcha_lnk').click(function() {
	var path = $gForm.data('captcha_path') ? $gForm.data('captcha_path')+'&tt=' : '/captcha.php?tt=';
	$(this).parent().parent().parent().find('img.captcha').attr('src', path+Math.random());
	$(this).parent().parent().parent().find('input[name=captcha]').val('');
	return false;
    });
    $gForm.find('.captcha_lnk').click();
//добавлено 29-06-2917 конвертация в клирилицу для всех форм

    $('[data-input=curillic]').keypress(function(e) {
        /*             ё                  Ё                  А - Я, а - я          */
        if (e.which == 1005 || e.which == 1025 || (e.which > 1039 && e.which < 1104)) {
            $(this).data('lang_mode', 'ru');
            /*         a - z                             A - Z          */
        } else if ((e.which > 64 && e.which < 91) || (e.which > 96 && e.which < 123)) {
            $(this).data('lang_mode', 'en');
        }
        //console.log('keypress', $(this).data('lang_mode'), e.which, String.fromCharCode(e.which));
    });

    $('[data-input=curillic]').keyup(function(e) {
        //console.log('keyup', e.which, String.fromCharCode(e.which));
        var repl = {
                113: 'й', 119: 'ц', 101: 'у', 114: 'к', 116: 'е', 121: 'н', 117: 'г', 105: 'ш', 111: 'щ', 112: 'з', 91: 'х', 93: 'ъ',
                97: 'ф', 115: 'ы', 100: 'в', 102: 'а', 103: 'п', 104: 'р', 106: 'о', 107: 'л', 108: 'д', 59: 'ж', 39: 'э',
                122: 'я', 120: 'ч', 99: 'с', 118: 'м', 98: 'и', 110: 'т', 109: 'ь', 44: 'б', 46: 'ю',
                96: 'ё', 1105:'ё',
                81: 'Й', 87: 'Ц', 69: 'У', 82: 'К', 84: 'Е', 89: 'Н', 85: 'Г', 73: 'Ш', 79: 'Щ', 80: 'З', /*91: 'Х', 93: 'Ъ',*/
                65: 'Ф', 83: 'Ы', 68: 'В', 70: 'А', 71: 'П', 72: 'Р', 74: 'О', 75: 'Л', 76: 'Д', /*59: 'Ж', 39: 'Э',*/
                90: 'Я', 88: 'Ч', 67: 'С', 86: 'М', 66: 'И', 78: 'Т', 77: 'Ь', /*44: 'Б', 46: 'Ю',*/
                126: 'Ё', 1025:'Ё'
            },
            only_en_mode = [39, 44, 46, 59, 91, 93, 1025, 1105, 96, 126],
            $this = $(this), l = $this.val().split(''),
            v = '', k, i, code, is_eng_mode = 'en' == $this.data('lang_mode');

        if (l) {
            for (i=0; i<l.length;i++) {
                code = l[i].charCodeAt();
                if (repl[code]) {
                    k = only_en_mode.indexOf(code.toString());
                    if (-1 == k || (-1 != k && is_eng_mode)) {
                        v += repl[code];
                    } else {
                        v += l[i];
                    }
                } else {
                    v += l[i];
                }
            }
            if (v != $this.val()) {
		console.log(v +' '+$this.val())
                $this.val(v);
            }
        }
    });

}
