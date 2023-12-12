//신규
$(document).ready(function(){
	

	/* 라벨 액션 2023-10-06 삭제 */
	// var $formDynamicInput = $('.formlabel.onbasic').siblings('.input').find('.inp');

	// $formDynamicInput.on('focus change', function () {
	// 	var $this = $(this);
	// 	var $item = $this.closest('.form-wrap');
	// 	var $label = $item.find('.formlabel');

	// 	$label.addClass('action');
	// });

	// $formDynamicInput.on('focusout', function () {
	// 	var $this = $(this);
	// 	var $item = $this.closest('.form-wrap');
	// 	var $label = $item.find('.formlabel');
	// 	var $inputs = $item.find('.inp');
	// 	var hasValue = false;

	// 	$inputs.each(function () {
	// 	  if ($(this).val().length !== 0) {
	// 		hasValue = true;
	// 		return false;
	// 	  }
	// 	});
	// 	if (hasValue === false) {
	// 	  $label.removeClass('action');
	// 	}
	// });

	// /**
	// * 페이지 로드 시 값이 존재하는 인풋의 라벨에 action 클래스 추가
	// */
	// $formDynamicInput.each(function () {
	// 	var $this = $(this);
	// 	var $item = $this.closest('.form-wrap');
	// 	var $label = $item.find('.formlabel');

	// 	if ($this.val().length) $label.addClass('action');
	// });

	/*
	* 셀렉트박스 li 클릭시 active css 추가
	*/
	$(".ly-select-list > li > button").on('click focusin', function(){
		//e.preventDefault();
		var $this = $(this).parent('li');		var $item = $(".ly-select-list > li");
		
		$item.removeClass('active');
		if($this.hasClass('active')){
			$item.removeClass('active');
		}else{
			$this.addClass('active');
		};
	});

	/*
	* 탭메뉴
	*/
	$(".tab-item > li").click(function(){
	
		var tabCont = $(this).attr("data-tab");
		
		$(this).siblings().removeClass("on");
		if (!$(this).hasClass('swiper'))  $(this).addClass("on"); // 2023-08-03 추가

		$(this).closest("ul").siblings("div").children("div").addClass("dp-none"); // 2023-06-26 .scroll-area 에서 div로 변경
		$("#" + tabCont).removeClass("dp-none");

	});

	/*
	* 전체동의
	*/
	$('.check.all').on('click',  function() {
		
		if (!$(this).parents('fieldset').siblings().hasClass('etc')) {
			//약관 전체동의
			if ($('.level1 .all').prop('checked')) {
				$('.level2').find('input').prop('checked', true);
			}else {
				$('.level2').find('input').prop('checked', false);
			};
        }else{
			//선택약관(상품서비스) 전체동의
			if ($('.level2 fieldset .all').prop('checked')) {
				$('.level3').find('input').prop('checked', true);
			}else {
				$('.level3').find('input').prop('checked', false);
			};		
		}
    });

	/*
	* 개별 약관
	*/

	$('.check').on('click', function() {
		var totalNum = $(".level2 fieldset > .check").length;	
		var checkNum = $(".level2 fieldset > .check:checked").length;

		var dmTotalNum	= $(".level3 .check").length;
		var dmCheckNum = $(".level3 .check:checked").length;

		if (!$(this).parent().parent('div.level3').hasClass('etc')) {
			//약관 개별동의
			if (totalNum == checkNum) {
				$('.level1 .all').prop('checked', true);
			}else{
				$('.level1 .all').prop('checked', false);
			};
        }else{
			//선택약관(상품서비스) 개별동의
			if (dmCheckNum >= 1) {
				$('.level2 fieldset .all').prop('checked', true);
			}else if(dmCheckNum == 0){
				$('.level2 fieldset .all').prop('checked', false);
			};		
			agreeChek();
		};
    });
    
	/*$(".level2 fieldset label > span, .chk-all .all").on('click', function() {
		openPopup('termsPop');
    });*/
    
	/*
	* 툴팁
	*/
	$(".tooltip-btn").on('click', function(){
		var $this = $(this).parents(".tooltip-wrap");		
		
		$this.removeClass('on');
		if($this.hasClass('on')){
			$this.removeClass('on');
		}else{
			$this.addClass('on');
		};
	});

	//툴팁 닫기
	$(".tooltip-close").on('click', function(){
		var $this = $(this).parents(".tooltip-wrap");		
		$this.removeClass('on');
	});	
	
	// 계좌 리스트 즐겨찾기
	$(".bank_list.star a").click(function(){
		if( $(this).parent("li").hasClass("active") ){
			$(this).parent("li").removeClass("active");
		}else{
			$(this).parent("li").addClass("active");
		};
	});

	// input text 삭제
	$(".btn-delete").on("click",function(){
		var $this = $(this).siblings(".input").find("input");
		$this.val("");
	});

	// 은행 선택 검색창 focus 
	$(".banklistWrap .search-area input").focus(function(){
		$(".banklistWrap .search-area .bank_list").addClass("active");
		$(".banklistWrap .tabs-wrap").addClass("vs-hidden");
	}).focusout(function(){
		$(".banklistWrap .search-area .bank_list").removeClass("active");
		$(".banklistWrap .tabs-wrap").removeClass("vs-hidden");
	});


	/*
	* 금액 뒤에 단위 
	*/
	var $numInput = $('.form-wrap.type2 input');
	var $numUnit = $('.value-wrap .unit');

	function printInput() {
		var numInputValue = $numInput.val();
		$('.value').text(calcFunc.addComma(numInputValue));
	}
	printInput();

	$numInput.on('keyup', function () {
		printInput();
	})

	$('.value-wrap').on('click', function () {
		$numInput.focus().val('');
		printInput();
	})

	/* totobank 금액 뒤에 단위 */
	$(document).on('keyup','input[inputmode=numeric]',function(event){
        this.value = this.value.replace(/[^0-9]/g,'');   // 입력값이 숫자가 아니면 공백
        this.value = this.value.replace(/,/g,'');          // ,값 공백처리
        this.value = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가
    });

	/* 찜한 상품 팝업 padding-bottom 조절*/
	function popProdList(){
		var $prodList = $(".pop-con-wrap").find(".gray-wrap > ul");
		if( $prodList.hasClass("prod-box-list") == true ){
			$(".pop-con-wrap").css("padding-bottom","0");
		};
	}
	popProdList();

	// 즐겨찾기 on/off 스크립트 (0703 추가)
	$(".btn-set.star").click(function(){
		if( $(this).hasClass("on") ){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
	});	
	
	// 찜하기 on/off 스크립트 (0710 추가)
	/*$(".tooltip-wrap .like").click(function(){
		if( $(this).hasClass("active") ){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
	});*/
	
	// 계좌번호 복사
	$(".btn-copy").on("click", function() {
		var accNum = $(this).prev().text().replace(/\-/g,"");
		copyToClipboard($.trim(accNum));
		toastPopup('복사되었습니다.', 1500);
	});
	
	// 배너 닫기버튼
	$(".banner-colse").on("click", function() {
		$(this).closest("div .banner-wrap").remove();
	});
});

//클립보드 복사
var copyToClipboard = function (text) {
    var aux = document.createElement("textarea");
    aux.value = text;
    document.body.appendChild(aux);
    aux.select();
    aux.setSelectionRange(0, 9999);
    document.execCommand("copy");
    document.body.removeChild(aux);
};

//팝업창 표시
var toastPopup = function (msg, timer) {
    var $elem = $("<p>" + msg + "</p>");
    $ ("div.toast").html($elem).show();
    $elem.slideToggle(100, function () {
        setTimeout(function () {
            $elem.fadeOut(function () {
                $(this).remove();
                $('div.toast').css('bottom', '');
            });
        }, timer);
        return false;
    });

    $('div.toast').stop().animate({ 'bottom': '5%' });
};

	


//기존
$(document).ready(function() {
	
	//tooltip();
    //accessibilityFocus();

	// 2020-10-13 add : s
	if(navigator.userAgent.match(/iPhone/)){
		if($(window).height() > 736){
			$('html').addClass('iosx');
		}else{
			$('html').addClass('ios');
		}
	}
	// 2020-10-13 add : e

    (function(window){

        // Really basic check for the ios platform
        // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        // Get the device pixel ratio
        var ratio = window.devicePixelRatio || 1;

        // Define the users device screen dimensions
        var screen = {
          width : window.screen.width * ratio,
          height : window.screen.height * ratio
        };

        // iPhone X Detection
        if (iOS && screen.width == 1125 && screen.height === 2436) {

          // Set a global variable now we've determined the iPhoneX is true
          window.iphoneX = true;

          // Adds a listener for ios devices that checks for orientation changes.
          window.addEventListener('orientationchange', update);
          update();
        }

        // Each time the device orientation changes, run this update function
        function update() {
          notch();
          iphoneXChecker();
        }

        // Notch position checker
        function notch() {

          var _notch = '';

          if( 'orientation' in window ) {
            // Mobile
            if (window.orientation == 90) {
              _notch = 'left';
            } else if (window.orientation == -90) {
              _notch = 'right';
            }
          } else if ( 'orientation' in window.screen ) {
            // Webkit
            if( screen.orientation.type === 'landscape-primary') {
              _notch = 'left';
            } else if( screen.orientation.type === 'landscape-secondary') {
              _notch = 'right';
            }
          } else if( 'mozOrientation' in window.screen ) {
            // Firefox
            if( screen.mozOrientation === 'landscape-primary') {
              _notch = 'left';
            } else if( screen.mozOrientation === 'landscape-secondary') {
              _notch = 'right';
            }
          }

          window.notch = _notch;
        }

      })(window);

    //fixed button
    $(window).load(function(e) {
        var shotCon = false;
        var contentWrapH = $('.contentsWrap').outerHeight() - 25;
        var contentH = $('.contents').outerHeight();
        var windowH = $(window).height();
        if ($('#fixedBtnWrap').length > 0) {
            // if (contentWrapH <= windowH) {
            //     shotCon = true;
            //     $('#fixedBtnWrap').addClass('active');
            // }
            if (contentH < windowH) {
                shotCon = true;
                $('#fixedBtnWrap').addClass('active');
            }
            $(window).scroll(function() {
                if (!shotCon) {
                    if ($(this).scrollTop() > 5) {
                        $('#fixedBtnWrap').addClass('active');
                    } else {
                        $('#fixedBtnWrap').removeClass('active');
                    }
                }
            });
        }

        if ( window.iphoneX === true ) {
          $('.contentsWrap').css('padding-bottom', 'calc( env(safe-area-inset-bottom) + 100px )');
          if( windowH > contentH  ){
            $('.fixedBtnWrap').addClass('active');
          }
        }

    	/* fixed버튼 유/무에 따른 contentsWrap의 padding-bottom값 제어 - 네이버앱 대응 */
		if ($('.fixed-btn-wrap').length !== 0) {
			function defaultWrapHeight() {
				const btnWrapHeight = $(".fixed-btn-wrap").height();
				if ($(".fixed-btn-wrap").hasClass("no-fixed")) {
				  $(".fixed-btn-wrap").closest('.contentsWrap').css('padding-bottom', 0);
				} else {
				  $(".fixed-btn-wrap").closest('.contentsWrap').css('padding-bottom', btnWrapHeight);
				}
			  }
			  
			  defaultWrapHeight();
			  
			  function updateWrapHeight() {
				$(".layerpopup:visible").each(function () {
				  const $layerpopup = $(this);
				  const $fixedBtnWrap = $layerpopup.find('.fixed-btn-wrap');
				  const $popConWrap = $layerpopup.find('.pop-con-wrap, .layer-up.has-button');
				  const btnWrapHeight = $fixedBtnWrap.height();
				  $popConWrap.css('padding-bottom', btnWrapHeight);
				});
			  }
			  
			  // MutationObserver 생성
			  const observer = new MutationObserver(function (mutationsList, observer) {
				for (let mutation of mutationsList) {
				  if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
					const style = window.getComputedStyle(mutation.target);
					if (style.display === 'block') {
					  updateWrapHeight();
					}
				  }
				}
			  });
			  
			  $('.layerpopup').each(function () {
				observer.observe(this, { attributes: true });
			  });

		  	//$('.contentsWrap, .pop-con-wrap').css('padding-bottom', '100px'); // fixed 버튼 case
			//   if($('.fixed-btn-wrap:has(> a)').length !== 0){
			//     $('.contentsWrap').css('padding-bottom', '146px'); // fixed버튼이 2row인 case - 바닥화면용
			//     $('.pop-con-wrap').css('padding-bottom', '186px'); // fixed버튼이 2row인 case - 풀팝업용
			//   }
			//   if($('.fixed-btn-wrap.no-fixed').length !== 0){
			//     $('.contentsWrap, .pop-con-wrap').css('padding-bottom', '0'); // fixed가 아닌 case
			//   }
			//   if($('.layerpopup.type-alert .pop-con-wrap').length !== 0){
			//     $('.layerpopup.type-alert .pop-con-wrap').css('padding-bottom', '10px'); // type-alert 일 경우
			//   }
		} else {
		  //$('.contentsWrap').css('padding-bottom', '0'); // fixed-btn-wrap 없는 case
		  $('.contentsWrap:has(~ .bottom-menu-area)').css('padding-bottom', '68px'); // bottom-menu-area 있는 case
		}

    });

    //키패드 입력시 header,footer 문제
    fnBtmBtn();


    //아이폰X 판단
    if (navigator.userAgent.match(/(iPhone)/)) {
        if ((screen.availHeight == 812) && (screen.availWidth == 375)) {

            if ((window.innerHeight == "375") && (window.innerWidth == "812")) {
                // iPhone X Landscape
            } else {
                // iPhone X Portrait
                //$('.fixed-footer').addClass('iphoneX');

            }
        }
    }else{
        // $('.fixed-footer').removeClass('iphoneX');
    }

});



//기존
function openWinPopup(url) {
    window.open(url, "", 'scrollbars=yes,toolbar=no,location=no,resizable=no,status=no,menubar=no,resizable=no,width=948,height=700,left=474,top=0,fullscreen');
}

function goFamilySite() {
    var url = $('#family-site option:selected').attr('value');
    window.open(url);
}

function iphoneXChecker() {
  if (window.notch == 'left') {
    $('body').removeClass('notch-right').addClass('notch-left');
  } else if (window.notch == 'right') {
    $('body').removeClass('notch-left').addClass('notch-right');
  } else {
    $('body').removeClass('notch-right notch-left');
  }
}

/**  2023-11-06 **/
// function fnBtmBtn(){
//   $("input:text").each(function(){
//     $(this).bind("focus", function(){
//       $("#headerWrap").css("position","absolute");
//       $("#fixedBtnWrap").attr('style','position:absolute !important'); 
//       $(".laypop-all .fixed-btn-wrap").attr('style','position:fixed !important');
//       if ( window.iphoneX === true ) {
//         $("#fixedBtnWrap .btn").addClass('vkey');
//       }
//     });
//     $(this).bind("blur", function(){
//       $("#headerWrap").css("position","fixed");
//       $("#fixedBtnWrap").css("position","fixed");
//       $('.laypop-all .fixed-btn-wrap').removeAttr('style');
//       $("#fixedBtnWrap .btn").removeClass('vkey');
//     });
//   });

//   $("input[type=number]").each(function(){
//     $(this).bind("focus", function(){
//       $("#headerWrap").css("position","absolute");
//       $("#fixedBtnWrap").attr('style','position:absolute !important'); 
//       $(".laypop-all .fixed-btn-wrap").attr('style','position:fixed !important');
//       if ( window.iphoneX === true ) {
//         $("#fixedBtnWrap .btn").addClass('vkey');
//       }
//     });
//     $(this).bind("blur", function(){
//       $("#headerWrap").css("position","fixed");
//       $("#fixedBtnWrap").css("position","fixed");
//       $("#fixedBtnWrap .btn").removeClass('vkey');
//     });
//   });

//   $("input[type=tel]").each(function(){
//     $(this).bind("focus", function(){
//       $("#headerWrap").css("position","absolute");
//       $("#fixedBtnWrap").attr('style','position:absolute !important');
//       $(".laypop-all .fixed-btn-wrap").attr('style','position:static !important');

//       if ( window.iphoneX === true ) {
//         $("#fixedBtnWrap .btn").addClass('vkey');
//       }
//     });
//     $(this).bind("blur", function(){
//       $("#headerWrap").css("position","fixed");
//       $("#fixedBtnWrap").css("position","fixed");
//       $('.laypop-all .fixed-btn-wrap').removeAttr('style');
//       $("#fixedBtnWrap .btn").removeClass('vkey');
//     });
//   });

//   $("input[type=email]").each(function(){
//     $(this).bind("focus", function(){
//       $("#headerWrap").css("position","absolute");
//       $("#fixedBtnWrap").attr('style','position:absolute !important');
//       $(".laypop-all .fixed-btn-wrap").attr('style','position:static !important');

//       if ( window.iphoneX === true ) {
//         $("#fixedBtnWrap .btn").addClass('vkey');
//       }
//     });
//     $(this).bind("blur", function(){
//       $("#headerWrap").css("position","fixed");
//       $("#fixedBtnWrap").css("position","fixed");
//       $('.laypop-all .fixed-btn-wrap').removeAttr('style');
//       $("#fixedBtnWrap .btn").removeClass('vkey');
//     });
//   });

//   $("input[type=password]").each(function(){
//     $(this).bind("focus", function(){
//       $("#headerWrap").css("position","absolute");
//       $("#fixedBtnWrap").attr('style','position:absolute !important');
//       $(".laypop-all .fixed-btn-wrap").attr('style','position:fixed !important');

//       if ( window.iphoneX === true ) {
//         $("#fixedBtnWrap .btn").addClass('vkey');
//       }
//     });
//     $(this).bind("blur", function(){
//       $("#headerWrap").css("position","fixed");
//       $("#fixedBtnWrap").css("position","fixed");
//       $('.laypop-all .fixed-btn-wrap').removeAttr('style');
//       $("#fixedBtnWrap .btn").removeClass('vkey');
//     });
//   });

//   $("select").each(function(){
//     $(this).bind("focus", function(){
//       $("#headerWrap").css("position","absolute");
//       $("#fixedBtnWrap").attr('style','position:absolute !important');
//       $(".laypop-all .fixed-btn-wrap").attr('style','position:static !important');

//       if ( window.iphoneX === true ) {
//         $("#fixedBtnWrap .btn").addClass('vkey');
//       }
//     });
//     $(this).bind("blur", function(){
//       $("#headerWrap").css("position","fixed");
//       $("#fixedBtnWrap").css("position","fixed");
//       $('.laypop-all .fixed-btn-wrap').removeAttr('style');
//       $("#fixedBtnWrap .btn").removeClass('vkey');
//     });
//   });

//   $("textarea").each(function(){
//     $(this).bind("focus", function(){
//       $("#headerWrap").css("position","absolute");
//       $("#fixedBtnWrap").attr('style','position:absolute !important');
//       $(".laypop-all .fixed-btn-wrap").attr('style','position:static !important'); 
//       if ( window.iphoneX === true ) {
//         $("#fixedBtnWrap .btn").addClass('vkey');
//       }
//     });
//     $(this).bind("blur", function(){
//       $("#headerWrap").css("position","fixed");
//       $("#fixedBtnWrap").css("position","fixed");
//       $('.laypop-all .fixed-btn-wrap').removeAttr('style'); 
//       $("#fixedBtnWrap .btn").removeClass('vkey');
//     });
//   });
// }
/**  2023-11-06 **/

function fnInp(){
  $('.form-wrap input, .form-wrap .select-box').focus(function() { //2020-04-21 .select-box 추가
    inputFocusT = $(this).offset().top - 150;
      if ( window.iphoneX !== true ) {
        //$('html,body,.laypop-all').stop().animate({scrollTop:inputFocusT},'fast');
      }
      $(this).closest('.flex-con').css('z-index', 2);
      $(this).addClass('focusin');
  }).blur(function() {
      $(this).closest('.flex-con').css('z-index', 1);
      $(this).removeClass('focusin');
  });
  $('.select-wrap select').focus(function() {
      inputFocusT = $(this).offset().top - 150;
      if ( window.iphoneX !== true ) {
        //$('html,body,.laypop-all').stop().animate({scrollTop:inputFocusT},'fast');
      }
      $(this).closest('.flex-con').css('z-index', 2);
      $(this).addClass('focusin');
  }).blur(function() {
      $(this).closest('.flex-con').css('z-index', 1);
      $(this).removeClass('focusin');
  });
  fnBtmBtn();
};




//신규

function agreeChek() {
	var totalNum = $(".level2 fieldset > .check").length;	
	var checkNum = $(".level2 fieldset > .check:checked").length;

	var dmTotalNum	= $(".level3 .check").length;
	var dmCheckNum = $(".level3 .check:checked").length;
	//alert(totalNum);
	if (!$(this).parent().parent('div.level3').hasClass('etc')) {
		//약관 개별동의
		if (totalNum == checkNum) {
			$('.level1 .all').prop('checked', true);
		}else{
			$('.level1 .all').prop('checked', false);
		};
	};

};


function dynamicInput() {
	var $formDynamicInput = $('.formlabel.onbasic').siblings('.input').find('.inp');

	$formDynamicInput.on('focus change', function () {
		var $this = $(this);
		var $item = $this.closest('.form-wrap');
		var $label = $item.find('.formlabel');

		$label.addClass('action');
	});


	$formDynamicInput.on('focusout', function () {
		var $this = $(this);
		var $item = $this.closest('.form-wrap');
		var $label = $item.find('.formlabel');
		var $inputs = $item.find('.inp');
		var hasValue = false;

		$inputs.each(function () {
		  if ($(this).val().length !== 0) {
			hasValue = true;
			return false;
		  }
		});
		if (hasValue === false) {
		  $label.removeClass('action');
		}
	});

	/**
	* 페이지 로드 시 값이 존재하는 인풋의 라벨에 action 클래스 추가
	*/
	$formDynamicInput.each(function () {
		var $this = $(this);
		var $item = $this.closest('.form-wrap');
		var $label = $item.find('.formlabel');

		if ($this.val().length) $label.addClass('action');
	});
};

window.onload = function() {

	new Rolldate({
		el: '#rolldate', // div.select-box 의 id
		format: 'YYYY.MM.DD',
		beginYear: 1980,
		endYear: 2023,
		lang: {
			title: '연월일을 선택해주세요', // 팝업 타이틀
		},
		moveEnd: function(scroll) {
		},
		confirm: function(date) {
			var $el = $(this.config.el);
			removeErr($el);
			$el.closest('.select-wrap').addClass('on');
			$el.find("input").val(date.replaceAll(".",""));
			validChk();
		}
	})

	new Rolldate({
		el: '#rolldate2', // div.select-box 의 id
		format: 'DD',
		lang: {
			title: '일자를 선택해주세요', // 팝업 타이틀
		},
		moveEnd: function(scroll) {
		},
		confirm: function(date) {
			var $el = $(this.config.el);
			removeErr($el);
			$el.closest('.select-wrap').addClass('on');
			
			if (typeof $el[0].onclick == "function") {
				typeof $el[0].onclick();
			}
			validChk();
		}
	})

//	new Rolldate({
//		el: '#rolldate3', 
//		format: 'YYYY.MM.DD',
//		beginYear: 1980,
//		endYear: 2023,
//		lang: {
//			title: '입사연월일 선택', // 팝업 타이틀
//		},
//		moveEnd: function(scroll) {
//		},
//		confirm: function(date) {
//			removeErr($(this.config.el));
//			$(this.config.el).closest('.select-wrap').addClass('on');
//			$(this.config.el).siblings("input").val(date.replace(".",""));
//			validChk();
//		}
//	})
//	
	new Rolldate({
		el: '#rolldate4', // div.select-box 의 id
		format: 'YYYY',
		beginYear: 2013,
		lang: {
			title: '년도를 선택해주세요', // 팝업 타이틀
		},
		moveEnd: function(scroll) {
		},
		confirm: function(date) {
			removeErr($(this.config.el));
			$(this.config.el).closest('.select-wrap').addClass('on');
			validChk();
		}
	});

}




