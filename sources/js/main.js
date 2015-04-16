/*******************************
	FUNCTIONS
********************************/

// LANGUAGE DETECTOR
var userLang = navigator.language || navigator.userLanguage;
userLang = userLang.split('-')[0];


// DATEPICKER LANGUAGE
if(userLang == 'es') {
	$('head').append('<script src="js/vendors/angular-locale_es-ar.js"></script>');
}



/* SELECT HTML TEXT */
jQuery.fn.selectText = function(){
	var doc = document
		, element = this[0]
		, range, selection
	;
	if (doc.body.createTextRange) {
		range = document.body.createTextRange();
		range.moveToElementText(element);
		range.select();
	} else if (window.getSelection) {
		selection = window.getSelection();        
		range = document.createRange();
		range.selectNodeContents(element);
		selection.removeAllRanges();
		selection.addRange(range);
	}
};

//CHECKBOX UPATER
var update_checkboxs = function(){
	$('input[data-toggle]').each(function(){
		var _this = this;
		$(_this).bootstrapToggle('destroy');
		setTimeout(function(){
			$(_this).bootstrapToggle();
		},20);
	});
}


/**********************************
	DOCUMENT READY
***********************************/
$(document).ready(function(){

	/* NAV TABS
	***************************************/
	var hash = window.location.hash;
	hash && $('ul.nav a[href="' + hash + '"]').tab('show');  
	
	
	$('.nav-tabs a').click(function (e) {
		$(this).tab('show');
		var scrollmem = $('body').scrollTop();
		window.location.hash = this.hash;
		$('html,body').scrollTop(scrollmem);	
		update_checkboxs();
	});
	
	// LANGUEAGE SWITCHER
	$('#lang_switcher a').click(function(event){
		event.preventDefualt();
		update_checkboxs();
	});
	
	
	
	
	/* TOGGLE COLLAPSE
	***********************************/
	$('input[data-toggle-target]').change(function() {
		if( $(this).prop('checked') ){
			$("#"+ $(this).data('toggle-target') ).collapse('show');
		}else{
			$("#"+ $(this).data('toggle-target') ).collapse('hide');
		}		
	});
	
	$('body').on('click', '.toggle', function() {
		$(this).find('input[data-toggle="toggle"]').trigger('click');
	});

	
	/*	STICKY .BOX-PREVIEW
	***************************************/
	function sticky_relocate() {
		var window_top = $(window).scrollTop();
		
		$('.col-preview').each(function(){
			var div_top = $(this).offset().top;
			if (window_top > div_top) {
				$(this).find('.box-preview').addClass('stick');
			} else {
				$(this).find('.box-preview').removeClass('stick');
			}
		})	
	}

	$(window).scroll(sticky_relocate);
	$(window).on('resize', function(){
		sticky_relocate();    
	}).resize();
	
	sticky_relocate();
	
	/* PREVIEW CODE SWITCHER
	***************************************/
	var toggle_preview = function(){
		$('.code').hide().empty();
		$('.preview').show();
	}
	
	$('.box-preview .panel-body').click(function(){
				
		$(this).find('.code').empty();
		$(this).find('.code').html( $(this).find('.preview').html() );
		
		var ph = $(this).find('.preview').height();
		
		//Clean all angular attr and classes
        $(this).find('.code .ng-hide').remove();
		$(this).find('.code *').removeAttr('ng-show');
		$(this).find('.code *').removeAttr('ng-hide');
		$(this).find('.code .ng-binding').removeClass('ng-binding');
		
		if( $(this).parents('#tab-away').length ){
			
			//Clean all HTML and preserve newline characters
			var text = $(this).find('.code').html()
				.replace(/\n/g, "")
				.replace(/[\t ]+\</g, "<")
				.replace(/\>[\t ]+\</g, "><")
				.replace(/\>[\t ]+$/g, ">")
				.replace(/(<p\s*[\/]?>)/gi, "<br>$1")
				.replace(/(<li.*?>)/gi, "<br><br>$1")
				.replace(/<br\s*[\/]?>/gi, "\n");
						
			$(this).find('.code').html( '<textarea cols="50" rows="10">'+ $(text).text() +'</textarea>');
		}
		
		$(this).find('.code textarea').height(ph);
		console.log(ph);
		
		$(this).find('.preview').hide();
		$(this).find('.code').show();
		

		if( $(this).parents('#tab-away').length ){
			$(this).find('.code textarea').select();
		}else{
			$(this).find('.code').selectText();
		}
	});
	
	
	
	
	
	$('html').click(function(){
		toggle_preview();
	})
	
	$('html').on('click', '.preview', function(event){
		event.stopPropagation();
	})
	
});//jQuery
