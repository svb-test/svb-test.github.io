document.addEventListener('DOMContentLoaded', function () {
    const show = document.querySelector('.m_menu');
    const hide = document.querySelector('#m_menu');
    const menu = document.querySelector('.m_wrap_menu');
    show.addEventListener('click', function () {
        menu.style.display = 'block';
    });
    hide.addEventListener('click', function () {
        menu.style.display = 'none';
    });

    const detailMenu = document.querySelector('.detail_menu');
    if (detailMenu) {
        const wrapCol = document.querySelector('.detail_menu_wrap_columns');
        let clientX = 0;
        let start = 1;
        detailMenu.addEventListener('mousedown', function(e){
            clientX = e.clientX;
        });
        detailMenu.addEventListener('mouseup', function(e){
            clientX = e.clientX - clientX;
            if (clientX > 0 && clientX !== 0 && start !== 1) {
                start = start - 1;
            } else if (clientX < 0 && clientX !== 0 && start !== 5) {
                start = start + 1;
            }
            wrapCol.style.left = '-'+(204 * (start - 1))+'px';
        });
        detailMenu.addEventListener('touchstart', function(e){
            clientX = e.touches[0].clientX;
        });
        detailMenu.addEventListener('touchend', function(e){
            clientX = e.changedTouches[0].clientX - clientX;
            if (clientX > 0 && clientX !== 0 && start !== 1) {
                start = start - 1;
            } else if (clientX < 0 && clientX !== 0 && start !== 5) {
                start = start + 1;
            }
            wrapCol.style.left = '-'+(204 * (start - 1))+'px';
        });
    }


    const js_header_nav_select = document.querySelector('#js_header_nav_select');
    const header_wrapper = document.querySelector('.header_wrapper');
    const deposit_wrap = document.querySelector('.deposit_wrap');
    js_header_nav_select.addEventListener('click', function(e){
        e.preventDefault();
        header_wrapper.classList.toggle('show_menu');
        deposit_wrap.classList.toggle('show_menu');
    });
});
$(function(){
	
	if($('.multiple_slider').length>0){
		var owlSettings = {
			loop:true,
			onChanged: updateSliderCounter,
			items: 1,
			autoplay: true,
			autoplayTimeout: 6000,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			dots: false,
			nav: true,
			navContainer: '.header_slider_control_wrap',
			navElement: 'div',
			navText: ['<div class="header_slider_control_left"><svg width="7" height="12" version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 7 12" style="enable-background:new 0 0 7 12;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path class="st0" d="M7,11.3L2.3,6L7,0.7L6.2,0L1.1,5.6L0.8,6l0.3,0.4L6.2,12L7,11.3z"/></svg></div>','<div class="header_slider_control_right"><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.59824 12L6.66569 6.3695L7 6L6.66569 5.6305L1.59824 0L0.753666 0.739003L5.4868 6L0.753666 11.261L1.59824 12Z" fill="white"></path></svg></div>']
		}
		
		$('.multiple_slider_item[data-tab="1"]').owlCarousel(
			owlSettings,
			function(e){alert(1);}
		);
		
		$('.main_menu a').click(function(){
			var tabId = $(this).data('tab');
			$('.multiple_slider_item').hide();
			$('.owl-carousel').owlCarousel('destroy');
			$('.multiple_slider_item[data-tab="'+tabId+'"]').show();
			$('.multiple_slider_item[data-tab="'+tabId+'"]').owlCarousel(owlSettings);
			$('.main_menu a').removeClass('active');
			$(this).addClass('active');
			$('.tab_content_item').hide();
			$('.tab_content_item[data-tab="'+tabId+'"]').show();
			$('body').attr('data-class-tab', tabId);
			return false;
		});
		
		$('.header_slider_control').mouseover(function(){
			$('.multiple_slider_item:visible').mouseover();
		});
		
	}
});

function updateSliderCounter(e){
	if (e.item) {
		var index = e.item.index - 1;
		var count = e.item.count;
		if(index === -1){
			index = 1;
		}
		else if(index == 0){
			index = count;
		}
		$('.slider_current_counter').text(index);
		$('.slider_total_counter').text(count);
		$('.header_slider_control').css('display', 'flex');
	}
}