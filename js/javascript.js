/*jslint browser: true*/
/*global $, jQuery, console*/

// Robin's Portfolio Js
function activateSlider() {
    "use strict";
    
	var $body = $('body');
	$body.on('click', 'a[href="#show-menu"]', function (e) {
		e.preventDefault();
		$(this).next('ul').slideToggle();
	});
}

function processImages() {
    "use strict";
    
	var img, imgSrc, noRetina;
	$('img[data-src]').each(function () {
		img = $(this);
		imgSrc = img.attr('data-src');
        noRetina = $(this).hasClass('noRetina');
		
		if ($('body').width() >= 700) {
			if (window.devicePixelRatio > 1.5 && noRetina === false) {
				imgSrc = imgSrc.replace('-m', '-m@2x');
			}
		} else if (window.devicePixelRatio > 1.5 && noRetina === false) {
			imgSrc = imgSrc.replace('-m', '-s@2x');
		} else {
			imgSrc = imgSrc.replace('-m', '-s');
		}
		
		img.attr('src', imgSrc);
	});
}

function imageShowOff(imgSrc, dataShowOff, noRetina) {
    "use strict";
    
    var $showoffContainerDiv, $showoffImg, showoffImgSrc, showoffImgMaxWidth, showoffImgMaxHeight, $showoffImgWrapper, $showoffImgCenterSpan;
    
    // If there is no showoff image present, create one and show it
    if ($('.showoff-container').length === 0) {
        $showoffContainerDiv = $('<div>').addClass('showoff-container hide');
    
        
        if (window.devicePixelRatio > 1.5 && noRetina === false) {
            showoffImgSrc = imgSrc.replace('-m', '-m@2x');
        } else {
            showoffImgSrc = imgSrc;
        }

        showoffImgMaxWidth = parseInt(dataShowOff.split('-')[0], 10);
        showoffImgMaxHeight = parseInt(dataShowOff.split('-')[1], 10);

        $showoffImgWrapper = $('<div>').addClass('showoff-img-wrapper').css({width: showoffImgMaxWidth, height: showoffImgMaxHeight});
        $showoffImg = $('<img>').attr({'src': showoffImgSrc});
        $showoffImgCenterSpan = $('<span>').addClass('showoff-img-center-span');
        $showoffImgWrapper.append($showoffImg, $showoffImgCenterSpan);
        $showoffContainerDiv.append($showoffImgWrapper);

        $('body').append($showoffContainerDiv.fadeIn());
    }
}


function init() {
    "use strict";
    
    var $body = $('body');
    
	$('#logo').addClass('loaded');
	processImages();
	activateSlider();
    
    
    if ($body.width() >= 800) {
        $body.on('click', '[data-showoff]', function (e) {
            var noRetina = $(this).hasClass('noRetina');
            e.preventDefault();
            imageShowOff($(this).attr('data-src'), $(this).attr('data-showoff'), noRetina);
        });

        $body.on('click', '.showoff-container', function (e) {
            e.preventDefault();
            $(this).fadeOut(function (e) {
                $(this).remove();
            });
        });
    }
}

$('document').ready(function () {
    "use strict";
	init();
});