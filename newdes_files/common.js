var DATAESIA;
$.ajax({
	type: "POST",
	url: "/",
	async: false,
	data: {action:'dataesia', module:'forms'},
		success:function(answer) {
			if(answer.length > 10)
				DATAESIA = $.parseJSON(answer);
	},
	statusCode: {
		500: function(answer) {
			if(answer.responseText.length > 10)
				DATAESIA = $.parseJSON(answer.responseText);						
		}
	}
});
var gApp = {
    _data: {

    },
    data: function (param1, param2)
    {
        var ret = this;
        if (undefined !== param1) {
            if ('object' == typeof param1 && param1) {
                for (var i in param1) {
                    this._data[i] = param1[i];
                }
            } else {
                if (undefined !== param2) {
                    this._data[param1] = param2;
                } else {
                    ret = this._data.hasOwnProperty(param1) ? this._data[param1] : null;
                }
            }
        } else {
            ret = this._data;
        }
        return ret;
    },
    httpQuery: function () {
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                query_string[pair[0]] = arr;
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }()
};

gApp.data('suggestions_dadtoken', '55e1ed997f8258f7fe989b55b450979aa93bd673');

function intHandler() {
    jQuery(this).keydown(function(event) {
        event =  event || window.event || false;
        if (event && jQuery(this).hasClass('increment')) {            
            if (38 == event.keyCode) {
                jQuery(this).val(parseInt(jQuery(this).val() || 0)+1)
            } else if (40 == event.keyCode) {
                var v = parseInt(jQuery(this).val() || 0);
                jQuery(this).val(jQuery(this).hasClass('plus') && v > 1 ? v-1 : 1);
            }
            return true;
        }
    });
    jQuery(this).keypress(function(event) {
        event =  event || window.event || false;
        var code = event.charCode == undefined ? event.keyCode : event.charCode;
        if (event && code) {
            if ( (code >= 48 && code <= 57) /* 0-9 */
                || (code >= 37 && code <= 40) /* up, down, lft, rht */
                //|| (event.keyCode >= 96 && event.keyCode <= 105)
                || code == 34 || code == 35 /* end, home */
                || code == 13 /* enter */
                || code == 9 /* tab */
                || code == 8 /* backspace */
                //|| code == 46 /* . */
                //|| code == 110
                //|| code == 190
            ) {
                return true;
            } else {
                event.preventDefault ? event.preventDefault() : (event.returnValue=false);
                return false;
            }
        }
    });
}

function moneyHandler() {
    jQuery(this).keyup(function(event) {
        var $this = $(this), val0 = $this.val(),
        	val = parseInt(val0.replace(/\s/g, ''));
        if (val > 0) {
        	val = num_format(val, true);
        	if (val0 != val) {
            	$this.val(val);
            }
        }
    });
    
    jQuery(this).keypress(function(event) {
        event =  event || window.event || false;
        var code = event.charCode == undefined ? event.keyCode : event.charCode;
        if (event && code) {
            if ( (code >= 48 && code <= 57) /* 0-9 */
                || (code >= 37 && code <= 40) /* up, down, lft, rht */
                //|| (event.keyCode >= 96 && event.keyCode <= 105)
                || code == 34 || code == 35 /* end, home */
                || code == 13 /* enter */
                || code == 9 /* tab */
                || code == 8 /* backspace */
                || code == 46 /* . */
                //|| code == 110
                //|| code == 190
            ) {
                return true;
            } else {
                event.preventDefault ? event.preventDefault() : (event.returnValue=false);
                return false;
            }
        }
    });
}

function onlyCyrHandler() {
    jQuery(this).keyup(function(event) {
    if (event.keyCode == 8 || event.keyCode == 46) {}
    else
	{
	var letters=' 1234567890,.()@zxcvbnmasdfghjklqwertyuiopQWERTYUIOPLKJHGFDSAZXCVBNM';
	return (letters.indexOf(String.fromCharCode(event.which))!=-1);
                }
    });
}


function showCanvas()
{
    var el = $("#blckLoadingCanvas");
    if (!el.length) {
        el = $("<div id=\"blckLoadingCanvas\"><!--[if lte IE 6.5]><iframe></iframe><![endif]--></div>").appendTo("body");
    }
    el.css('width', $(document).width()+'px');
    el.css('height', $(document).height()+'px');
    el.show();
}

function hideCanvas()
{
    $("#blckLoadingCanvas").hide();   
}
/*NA EDITS ADDING SCROLL TO FIRST ERROR*/
function checkForm(form, check_unvisilble, block) {
    var ret = true, f = $(form), s, eID="", j=0;
    $('input, select, textarea, .selectbox, .checkbox_input', f).filter('.err').each(function() {
    	var $this = $(this);
    	if($this.data('ui-tooltip')) {
    		$this.tooltip('disable');
    	}
    	$this.removeClass('err');
    });
    if (check_unvisilble) {
    	s = 'input, select, textarea';
    } else {
    	s = 'input:visible, select:visible, textarea:visible';
    }
    $(s, f).each(function() {
    	var i, l, m, el = $(this);
        var val = el.val() || '';
        var e = '', valid = el.data('valid') || {};
        if ('string' == typeof valid) {
        	l = valid.split(/\s+/);
        	valid = {};
        	for(i in l) {
        		valid[l[i]] = true;
        	}
        }
        if (valid.required && '' == val || 'выбрать' == val.replace(/[\s_\-]*/g, '')) {
            e = "Обязательно для заполнения";
        } else if ( valid.email && val && !$().isEmail(val)) {
            e = "Указан неправильный e-mail";   
        } else if (valid.max && val > valid.max) {
        	e = "Укажите значение не более "+valid.max;
        } else if (valid.min && val < valid.min) {
        	e = "Укажите значение не менее "+valid.min;
        } else if (valid.maxlength && val.length > valid.maxlength) {
        	e = "Максимальное кол-во символов - "+valid.maxlength;
        } else if (valid.minlength && val.length < valid.minlength) {
        	e = "Минимальное кол-во символов - "+valid.maxlength;
        } else if (valid.inn10 && '' != val) {
            if (10 != val.length || /^00.*/.test(val) || ! isValidInn(val)) {
                e = 'Введено некорректное значение ИНН';
            } else if (/\D/.test(val)) {
                e = 'ИНН должен содержать только цифры';
            }
        } else if (valid.inn12 && '' != val ) {
            if (12 != val.length || /^00.*/.test(val) || ! isValidInn(val)) {
                e = 'Введено некорректное значение ИНН';
            } else if (/\D/.test(val)) {
                e = 'ИНН должен содержать только цифры';
            }
        } else if (valid.kpp && '' != val) {
            if (9 != val.length || /^00.*/.test(val) || !/^\d{4}[\dA-Z][\dA-Z]\d{3}$/.test(val)) {
                e = 'Введено некорректное значение КПП';
            }
        } else if (el.data('frm_err')) {
            e = el.data('frm_err');
        } else if(valid.snils && !validSnils(val) && val.length>0){
			e = "Некорректный СНИЛС";
		}
        if ('file' == el.prop('type').toLowerCase()) {
            m = getFileMeta(el.get(0));
            i = parseInt(el.data('maxsize'));
            if (m && m.size>0 && i>0 && m.size/1024 > i) {
                e = "Максимальный размер файла - "+fileSize2Str(i*1024);
            }
        }
        if (e) {
            showErrBlock(el, e);
			eID = (j==0)?$(el).attr('id'):eID;
			j++;
            ret = false;
        }
    });
	if(eID.length>1){$('html,body').animate({scrollTop: $("#"+eID).offset().top},'slow');};
    return ret;
}

function showErrBlock(el, err)
{
    var $el = $(el);
    if($el.is("select") && $el.hasClass('select1')) {
    	$el = $el.siblings('.selectbox');
        $el.find('.select').one('click', function () {
            var $this = $(this).parents('.selectbox');
            if($this.data('ui-tooltip')) {
                $this.tooltip('disable');
            }
        });
    }
    $el.attr('title', err).addClass('err')
    /*
    if (! $el.hasClass('hasDatepicker')) {
    	$el.focus();
    }
    */
    if ($().tooltip) {
    	if(!$el.data('ui-tooltip')) {
    		$el.tooltip();
    	}
    	$el.tooltip( "option", "content", err);
    	$el.tooltip('enable');
    }
}

jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /Edge\/|Trident\/|MSIE /.test(window.navigator.userAgent);

jQuery(function() {
    if (jQuery.datepicker) {
        $.datepicker.setDefaults({
            closeText: 'Закрыть',
            revText: '&#x3c;Пред',
            nextText: 'След&#x3e;',
            currentText: 'Сегодня',
            dateFormat: 'dd-mm-yy',
            firstDay: 1,
            changeMonth: true,
            changeYear: true,
            yearRange: "c-80:c",
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь','Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота']
        });
        $("input.date").datepicker();
    }

    jQuery('.int, .number').each(intHandler);
    jQuery('.money').each(moneyHandler);
    jQuery('.onlycyr').each(onlyCyrHandler);

    jQuery('.up').each(function() {
        var e = jQuery('#'+jQuery(this).attr('for'));        
        if (e.length && e.hasClass('int')) {           
            jQuery(this).click(function(event) {
                event =  event || window.event || false;
                if (event) {
                    var e = jQuery('#'+jQuery(this).attr('for'));
                    e.val(parseInt(e.val() || 0)+1);
                    return true;
                }
            });
        }        
    });
    jQuery('.down').each(function() {
        var e = jQuery('#'+jQuery(this).attr('for'));        
        if (e.length && e.hasClass('int')) {           
            jQuery(this).click(function(event) {
                event =  event || window.event || false;
                if (event) {
                    var e = jQuery('#'+jQuery(this).attr('for'));
                    var v = parseInt(e.val() || 0);
                    e.val(e.hasClass('plus') && v > 1 ? v-1 : 1);
                    return true;
                }
            });
        }        
    });
    
    $('[data-role=note]').each(function() {
        $(this).tooltip();
    });

	if(!$.isEmptyObject(DATAESIA)){	
		var eFIELDS = $.find('[data-esia]');
		for(var i=0; i<eFIELDS.length; i++)$.each(DATAESIA, function(index, value){
			if($(eFIELDS[i]).attr('data-esia') == index){
				$(eFIELDS[i]).val(DATAESIA[index]);
				$(eFIELDS[i]).attr('readonly','readonly');
			}
			if($(eFIELDS[i]).attr('data-esia') == 'series-number'){
				$(eFIELDS[i]).val(DATAESIA['series']+DATAESIA['number']);
				$(eFIELDS[i]).attr('readonly','readonly');				
			}
			if($(eFIELDS[i]).attr('data-esia') == 'number-series'){
				$(eFIELDS[i]).val(DATAESIA['number']+DATAESIA['series']);
				$(eFIELDS[i]).attr('readonly','readonly');		
			}
			if($(eFIELDS[i]).attr('data-esia') == 'itesia'){
				$(eFIELDS[i]).val('YES');
				$(eFIELDS[i]).css('display','none');		
			}
			
		});
		$('.esia-login').remove();
	}
});

jQuery.fn.extend({
    isEmpty: function(str) {
        var oReEmpty = /^\s*$/;
        return oReEmpty.test(str);
    },
    isTime: function(sTime) {
	   var oReTime = /^(2[0-3][:\-][0-5][0-9]$)|^([0-1]{0,1}[0-9][:\-][0-5][0-9])$/;
	   return oReTime.test(sTime);
    },
    isPhone: function(sPhone) {
    	var sPhone = sPhone.replace( /[\s\-\(\)\.\]\[]/g, '' );
    	var oRePhone = /^\+*\d{7,15}(\+\d{2,4})?$/;
    	return oRePhone.test(sPhone);
    },
    isEmail: function(sEmail){
    	var sEmail = sEmail.replace( new RegExp('/\(.*?\)/'), '' );
    	var oRegExp = /^[A-Za-z0-9][-\w]*(\.[A-Za-z0-9][-\w]*)*@[A-Za-z0-9][-\w]*(\.[A-Za-z0-9][-\w]*)*\.[a-zA-Z]{2,4}$/;
    	return oRegExp.test(sEmail);
    }
});

function num_format(num, no_fraction)
{
    var ret, x, y, fraction;
    if (no_fraction) {
    	fraction = '';
    } else {
    	fraction = Math.round((num - Math.floor(num))*100);
    	fraction = '.' + (fraction<10 ? '0'+fraction : fraction);
    }
    num = Math.floor(num);
    y = num % 1000;
    x = Math.floor(num / 1000);
    ret = num;
    if (x > 0) {
        ret = 0 == y ? '000' : (y < 10 ? '00' + y : (y < 100 ? '0' + y : y));
         while (x >= 1000) {
            y = x % 1000;
            x = Math.floor(x / 1000);
            ret = (0 == y ? '000' : (y < 10 ? '00' + y : (y < 100 ? '0' + y : y))) + ' ' + ret;
        }
        ret = x + ' ' + ret;
    }
    return ret + fraction;
}

function str_translt(str) {
	var map = {
		'а': 'a',
		'б': 'b',
		'в': 'v',
		'г': 'g',
		'д': 'd',
		'е': 'e',
		'ё': 'e',
		'ж': 'zh',
		'з': 'z',
		'и': 'i',
		'й': 'i',
		'к': 'k',
		'л': 'l',
		'м': 'm',
		'н': 'n',
		'о': 'o',
		'п': 'p',
		'р': 'r',
		'с': 's',
		'т': 't',
		'у': 'u',
		'ф': 'f',
		'х': 'kh',
		'ц': 'ts',
		'ч': 'ch',
		'ш': 'sh',
		'щ': 'shch',
		'ъ': 'ie',
		'ы': 'y',
		'ь': '',
		'э': 'e',
		'ю': 'iu',
		'я': 'ia',
		'і': 'i',
		'ї': 'i',
        'є': 'e',
        'А': 'A',
		'Б': 'B',
		'В': 'V',
		'Г': 'G',
		'Д': 'D',
		'Е': 'E',
		'Ё': 'E',
		'Ж': 'Zh',
		'З': 'Z',
		'И': 'I',
		'Й': 'I',
		'К': 'K',
		'Л': 'L',
		'М': 'M',
		'Н': 'N',
		'О': 'O',
		'П': 'P',
		'Р': 'R',
		'С': 'S',
		'Т': 'T',
		'У': 'U',
		'Ф': 'F',
		'Х': 'Kh',
		'Ц': 'Ts',
		'Ч': 'Ch',
		'Ш': 'Sh',
		'Щ': 'Shch',
		'Ъ': 'Ie',
		'Ы': 'Y',
		'Ь': '',
		'Э': 'E',
		'Ю': 'Iu',
		'Я': 'Ia',
		'І': 'I',
		'Ї': 'I',
        'Є': 'E'
	}, ret = '', i, key, val, ch;
	
	for (i = 0; i < str.length; i++) {
		ch = str[i];
		for (key in map) {
			if (key == ch) {
				ch = map[key];
				break;
			}
		};
		ret += ch;
	};
	
	return ret;
}

function str_trim(str) {
	return str.replace(/(^\s+)|\s+$/g, "");
};

function getFileMeta(fileInput) {
    var ret = false;
    if (fileInput.files && fileInput.files[0]) {
        ret = {
            name: fileInput.files[0].name || fileInput.files[0].fileName,
            size: parseInt(fileInput.files[0].size || fileInput.files[0].fileSize)
        }
    }
    return ret; //fileObj ? fileObj.size : false;
}

function fileSize2Str(size_bytes) {

    var i = -1;
    var units = [' Кб.', ' Мб.', ' Гб.', ' Тб.'];
    do {
        size_bytes = size_bytes / 1024;
        i++;
    } while (size_bytes > 1024);

    return Math.max(size_bytes, 0.1).toFixed(1) + units[i];
};

function isValidInn(i)
{
    if ( i.match(/\D/) ) return false;

    var inn = i.match(/(\d)/g);
    if (inn) {
        if ( inn.length == 10 ) {
            return inn[9] == String(((
                        2*inn[0] + 4*inn[1] + 10*inn[2] +
                        3*inn[3] + 5*inn[4] +  9*inn[5] +
                        4*inn[6] + 6*inn[7] +  8*inn[8]
                    ) % 11) % 10);
        } else if ( inn.length == 12 ) {
            return inn[10] == String(((
                        7*inn[0] + 2*inn[1] + 4*inn[2] +
                        10*inn[3] + 3*inn[4] + 5*inn[5] +
                        9*inn[6] + 4*inn[7] + 6*inn[8] +
                        8*inn[9]
                    ) % 11) % 10) && inn[11] == String(((
                        3*inn[0] +  7*inn[1] + 2*inn[2] +
                        4*inn[3] + 10*inn[4] + 3*inn[5] +
                        5*inn[6] +  9*inn[7] + 4*inn[8] +
                        6*inn[9] +  8*inn[10]
                    ) % 11) % 10);
        }
    }

    return false;
///    return true;
}

function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}
	
/* added 07.08.2018 get cookie value */
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
	"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function sessionId() {	
	var multy = Math.round(1000 + Math.random()*999000)*parseInt(Date.now());
	var longnumber = multy.toString();
	var key = "";
	for(var i=0; i<longnumber.length; i++)
		if(i%3==0)key+=longnumber[i];
	return key + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
/* end 07.08.2018 */


/*
*	17.09 NA
*	SNILS VALIDATION*
*/

/*
*	06/09/2018
*	Get datetime for Moscow timezone 
*/
function getMoscowDate(){
	var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + parseInt(date.getUTCHours()+parseInt(3) )).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);    
	return date;
};

function validSnils(snils) {
	var result = false;
	var error = {};
	snils = snils.replace(/[^\d\.;]/g, '');
	if (!snils.length) {
		error.code = 1;
		error.message = 'СНИЛС пуст';
	} else if (/[^0-9]/.test(snils)) {
		error.code = 2;
		error.message = 'СНИЛС может состоять только из цифр';
	} else if (snils.length !== 11) {
		error.code = 3;
		error.message = 'СНИЛС может состоять только из 11 цифр';
	} else {
		var sum = 0;
		for (var i = 0; i < 9; i++) {
			sum += parseInt(snils[i]) * (9 - i);
		}
		var checkDigit = 0;
		if (sum < 100) {
			checkDigit = sum;
		} else if (sum > 101) {
			checkDigit = parseInt(sum % 101);
			if (checkDigit === 100) {
				checkDigit = 0;
			}
		}
		if (checkDigit === parseInt(snils.slice(-2))) {
			result = true;
		} else {
			error.code = 4;
			error.message = 'Неправильное контрольное число';
		}
	}
	return result;
}

//по задаче 11754
if('sessionStorage' in window && window['sessionStorage'] !== null){
	var viewedPage = window.location.pathname;
	if(!sessionStorage.getItem('sessionStart')){
		sessionStorage.setItem('sessionStart', Date.now());
	}
	if(!sessionStorage.getItem('viewedUniquePages')){
		sessionStorage.setItem('viewedUniquePages', JSON.stringify([viewedPage]));
	}
	else{
		var viewedUniquePages = JSON.parse(sessionStorage.getItem('viewedUniquePages'));
		if(viewedUniquePages.indexOf(viewedPage) < 0){
			viewedUniquePages.push(viewedPage);
			sessionStorage.setItem('viewedUniquePages', JSON.stringify(viewedUniquePages));
		}
	}
	if(!sessionStorage.getItem('hitsCount')){
		sessionStorage.setItem('hitsCount', 1);
	}
	else{
		sessionStorage.setItem('hitsCount', Number(sessionStorage.getItem('hitsCount')) + 1);
	}
}
