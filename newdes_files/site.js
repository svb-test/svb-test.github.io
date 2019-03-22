$(document).ready(function(){
	var wid; var wid2;
	wid = parseInt($('.wrapper').css("height"));
	wid2 = parseInt($('.footer_bg').css("height")); 
	$(".popup").css('height',wid);
	$(".faq .faq_title").click(function(){
		$(this).toggleClass("active");
		$(this).parent().find(".faq_answer").toggle('fast');
	});
	$(".faq_title_list").click(function(){
		$(this).toggleClass("active");
		$(this).next(".faq_answer_list").toggle('fast');
	});
});

$(function() {
	$('ul.breadcrumb>li').each(function(i) {
		if (i>0) {
			var $sub = $(this).find('ul');
			$sub.css({
				left: (($(this).outerWidth()-$sub.outerWidth()-16)/2)+'px'
			})
		}
	}).hover(
		function() {
			$(this).find('ul').show();
		},
		function() {
			$(this).find('ul').hide();
		}
	);
	$('ul.breadcrumb>li.last>ul').siblings('a').addClass('sub');

	$(".banners_small_ind div").hover(function(){
		$(this).find('img:first').hide();
	},
	function(){
		$(this).find('img:first').show();	
	});
	$('.ibank').click(function() {
		var $el = $(this).find('.ibank-menu');
		if ($el.is(':visible')) {
            $el.slideUp();
		} else {
            $el.slideDown();
		}
	});
});