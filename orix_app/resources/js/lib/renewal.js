//모바일 공통 상단버튼(웹접근성 포커싱)
var btnBack = "<a href='javascript:history.back()' class='btn-back'><span class='sr-only'>이전페이지</span></a>"
var btnHome ="<a href='/main.do' class='btn-home'><span class='sr-only'>처음으로</span></a><a href='#' class='btn-mositemap'><span class='sr-only'>전체메뉴</span></a>"
var btnMositemap ="<a href='#' class='btn-mositemap'><span class='sr-only'>전체메뉴</span></a>"
function topbtnDel(){
	$('.btn-back').remove();
	$('.btn-home').remove();
	$('.btn-mositemap').remove();
}

$(window).resize(function(){
	var winWidth02 = $(window).width();
	// 대출신청의 경우
	if( $("#rqsLoan").css("display")=="block" && $("#rqsAddLoan").css("display")=="none" ){
		if( winWidth02 <= 768){
			$('header > .mo-none').attr('aria-hidden' , 'true');
			$('#rqsLoan .sub-maintitle').contents('a, h1').wrapAll('<div class="mo-head"></div>');
			topbtnDel();
			$('#rqsLoan .sub-maintitle .mo-head').prepend(btnBack)
			$('#rqsLoan .sub-maintitle .mo-head h1').after(btnHome)
			moAction()
			$('.main-pop-list').insertAfter('.main-pop-cont')//메인슬이드팝업페이지 리스트, 썸네일 위치변경
		}else{
			$('.btn-mositemap').remove();
			if($('#rqsLoan .sub-maintitle').find('div').hasClass('mo-head')){
				$('#rqsLoan .sub-maintitle .mo-head > h1').unwrap();
			};
		};
	}else if( $("#rqsLoan").css("display")=="none" && $("#rqsAddLoan").css("display")=="block" ){
		if( winWidth02 <= 768){
			$('header > .mo-none').attr('aria-hidden' , 'true');
			$('#rqsAddLoan .sub-maintitle').contents('a, h1').wrapAll('<div class="mo-head"></div>');
			topbtnDel();
			$('#rqsAddLoan .sub-maintitle .mo-head h1').after(btnMositemap)
			moAction()
			$('.main-pop-list').insertAfter('.main-pop-cont')//메인슬이드팝업페이지 리스트, 썸네일 위치변경
		}else{
			$('.btn-mositemap').remove();
			if($('#rqsAddLoan .sub-maintitle').find('div').hasClass('mo-head')){
				$('#rqsAddLoan .sub-maintitle .mo-head > h1').unwrap();
			};
		};
	// 다른 페이지의 경우
	}else{
		if( winWidth02 <= 768){
			$('header > .mo-none').attr('aria-hidden' , 'true');
			$('.sub-maintitle').contents('a, h1').wrapAll('<div class="mo-head"></div>');
			topbtnDel();
			$('.main-pop-list').insertAfter('.main-pop-cont')//메인슬이드팝업페이지 리스트, 썸네일 위치변경
			if($('.sub-maintitle').hasClass('main-header')===false){
				$('.mo-head').prepend(btnBack)
				$('.mo-head h1').after(btnHome)
				moAction()
			}else{
				$('.mo-head h1').after(btnMositemap)
				moAction()
			}
		}else{
			if($('.sub-maintitle').hasClass('main-header')===false){
				topbtnDel();
			} else{
				$('.btn-mositemap').remove();
			}
			if($('.sub-maintitle').find('div').hasClass('mo-head')){
				$('.sub-maintitle .mo-head > h1').unwrap();
			};
		};
	}

});

/* nav 스크롤 */
$(window).scroll(function(){
	var winHidth02 = $(window).scrollTop();
	if( winHidth02 > 80){
		$("header").addClass("on-bg");
	}else{
		var dis = $("nav>div>div").css("display");
		if (dis=="none") {
			$("header").removeClass("on-bg");
		} else {
			$("header").addClass("on-bg");
		}
		return false;
	};

});

$(window).load(function(){
	var winWidth02 = $(window).width();
	// 대출신청의 경우
	if( $("#rqsLoan").css("display")=="block" && $("#rqsAddLoan").css("display")=="none" ){
		if( winWidth02 <= 768){
			$('#rqsLoan .sub-maintitle').contents('a, h1').wrapAll('<div class="mo-head"></div>');
			$('.main-pop-list').insertAfter('.main-pop-cont')//메인슬이드팝업페이지 리스트, 썸네일 위치변경
		}else{
			topbtnDel();
			if($('#rqsLoan .sub-maintitle').find('div').hasClass('mo-head')){
				$('#rqsLoan .sub-maintitle .mo-head > a').unwrap();
			};
		};
	}else if( $("#rqsLoan").css("display")=="none" && $("#rqsAddLoan").css("display")=="block" ){
		if( winWidth02 <= 768){
			$('#rqsAddLoan .sub-maintitle').contents('a, h1').wrapAll('<div class="mo-head"></div>');
			topbtnDel();
			$('.main-pop-list').insertAfter('.main-pop-cont')//메인슬이드팝업페이지 리스트, 썸네일 위치변경
		}else{
			if($('#rqsAddLoan .sub-maintitle').find('div').hasClass('mo-head')){
				$('#rqsAddLoan .sub-maintitle .mo-head > a').unwrap();
			};
		};
	// 다른 페이지의 경우
	}else{
		if( winWidth02 <= 768){
			$('.sub-maintitle').contents('a, h1').wrapAll('<div class="mo-head"></div>');
			$('.main-pop-list').insertAfter('.main-pop-cont')//메인슬이드팝업페이지 리스트, 썸네일 위치변경
		}else{
			topbtnDel();
			if($('.sub-maintitle').find('div').hasClass('mo-head')){
				$('.sub-maintitle .mo-head > h1').unwrap();
			};
		};
	}



	// tab 메뉴2
	$(".tab-item2 > li").click(function(){ //자주묻는질문,가까운지점찾기 선택시
		var tabCont04 = $(this).attr("data-tab");
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		$(this).children("a").attr("title","선택됨");
		$(this).siblings().children("a").attr("title","펼치기");
		$(".tab02 > div").siblings().addClass("dp-none");
		$(".tab02 #" + tabCont04).removeClass("dp-none");
	});

	//전체사이트맵 오픈
	$('.krmenu').click(function(){
		$('.html,body').addClass('overflow');
		$('.sitemapKr').show();
		$('.sitemapKr .close-site').focus();
		$('.allsearch-result').hide();
		$('.sitemap-wrap').show();
		return false;
	});

	//영어사이트맵 오픈
	$('.engmenu').click(function(){
		$('.html,body').addClass('overflow');
		$('.sitemapEng').show().focus();
		return false;
	});

	//전체검색 오픈
	$('.search-open').click(function(){
		$('.html,body').addClass('overflow');
		$('.sitemapKr').show();
		$('#allsearchV').focus();
		return false;
	});
	//전체검색 입력시
	$("#allsearchV").on("propertychange change keyup paste input", function() {
		var currentVal = $(this).val();

		if(currentVal.length == 0) {
			$('.allsearch-result').hide();
			$('.sitemap-wrap').show();
		}
	});
	$("#allsearchV").on("keydown", function(key) {
		if(key.keyCode == 13){
			$('.all-search-btn').trigger('click');
		}
	});
	$('.all-search-btn').click(function(){
		$('.allsearch-result-tit').remove();
		$('.allsearch-result-list').remove();
		$('.allsearch-result').show();
		$('.sitemap-wrap').hide();
		var searchTag = $('.sitemapKr .sitemap-inner').find('a');
		var searchStr = $('#allsearchV').val();
		if(searchStr.trim() != ''){
			$('.allsearch-result').append("<p class='allsearch-result-tit'> '<strong>"+ searchStr +"</strong>'의 검색 결과</p>");
			$('.allsearch-result').append("<ul class='allsearch-result-list' style='display:block'> </ul>");
			$.each(searchTag, function(index, item){
				var menuStr = searchTag[index].text;
				var matchStr = menuStr.match(searchStr);
				if(matchStr != null){
					$('.allsearch-result-list').append("<li class='allsearch-result-list-item'><a title='페이지 이동' href='"+ searchTag[index] +"'>"+ menuStr +"</a></li>")
				}
			})
		}
	})
	//전체사이트맵 닫기
	$('.close-site').click(function(){
		$('.allsearch-result-tit').remove();
		$('.allsearch-result-list').remove();
		$('.allsearch-result').hide();
		$('.sitemap-wrap').show();
		$("#allsearchV").val('');
		$('.html,body').removeClass('overflow');
		$('.allsite').hide();
		if($(this).parent().parent().parent().hasClass('sitemapKr')===true){
			$('.krmenu').focus();
		}else{
			$('.engmenu').focus();
		}
	});
	navAction();
	pcNavAction();
	moAction();

});


//친애앱다운로드 이동
$(document).on("click", ".csbAppDown", function(){
	var url = device.getUrl('csb');
	top.location.href = url;
});
//은행앱다운로드 이동
$(document).on("click", ".bankAppDown", function(){
	var url = device.getUrl('bk');
	top.location.href = url;
});

/*********** 기존common ***************/
$(document).ready(function(){
	//본문초점기본설정 변경
	$('#content, .sub-container, .sub-content, .sub-inner').removeAttr('tabindex').removeAttr('id');
	if($('.sub-maintitle').length){
		if(!$('.renewal-main').length){
			$('.sub-maintitle').attr('id','content');
		}else{
			$('.main-top-inner').attr('id','content');
		};
	};

	// 지점찾기 지도보기 action
	$(".map-btn").click(function(){
		if( $(this).parents("tr").next().hasClass("active")==false ){
			listNotiActNone();
			$(this).parents("tr").next().addClass("active");
			//$(this).parents("tr").find("td").css("padding-bottom","540px");
		}else{
			listNotiActNone();
		};
	});
	function listNotiActNone(){
		$(".list-notice tr").removeClass("active");
	};


	// 2023-04-10 개인정보처리방침 추가
	// 개인정보처리방침
	$('.agree-ver-change').find('a').click(function(event) {
		if($(this).siblings('select').val() != "default"){
		URL = $(this).siblings('select').val();
		window.open(URL,'privacyWindow','width=840,height=780,scrollbars=no')
		}
		return false;
	});
	// 2023-04-10 개인정보처리방침 추가

	navAction();


	//공통 하단 방문판매인 조회
	var btnSelectFn = function(){
		var btnSelect_box = $('.button-select');
		var btnSelect_a = $('.button-list').find('a');
		$('.button-value').attr('title','방문판매인 조회 펼치기');
		$('.button-value').click(function(){
			if($(this).parent(btnSelect_box).hasClass('open')){
				$(this).attr('title','방문판매인 조회 펼치기');
			}else{
				$(this).attr('title','방문판매인 조회 접기');
			}
			$(this).next('.button-list').slideToggle(100,'easeInOutSine').parent(btnSelect_box).toggleClass('open');
		});
		btnSelect_a.click(function(){
			$(this).parents('.button-list').slideUp(100,'easeInOutSine');
		});
	};
	btnSelectFn();

});


/*********** renewal common ***************/
$(document).ready(function(){

	var bodybg = function(){
		var docHeight = $(document).height();
		$("body").append("<div class='overlay'></div>");
		$(".overlay")
			.height(docHeight)
			.css({
				'opacity' : 0.4,
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'background-color': 'black',
				'width': '100%',
				'z-index': 50000
		});
	};

	//오늘본상품 -loan common
	function todayProd02(){
		var pos = 0;
		$('.today-product-list').each(function() {
			var scroll = $(this).find('.scroll');
			var listWrap = $(this).find("ul");
			var list_ = $(this).find('li.show');
			var leftBtn = $(this).find('.left-btn');
			var rightBtn = $(this).find('.right-btn');
			var li_width = 185;
			var totalWidth = li_width * list_.length;

			$('.today-prod-show').click(function(event) {
				$('.today-product').show();
				$('.today-product').attr("tabindex", 0).focus();
				bodybg();
			});
			$('.today-product-close').click(function(event) {
				$(this).parent().hide();
				$('.overlay').remove();
				//_focus.focus();
				pos = 0;
				TweenLite.to(listWrap, 0.3, {left:pos, ease:Quart.easeInOut});
			});
			listWrap.width(totalWidth);
			rightBtn.click(function(e){
				if (pos >= totalWidth-scroll.width()) {
					return false;
				}
				pos += li_width *3;
				TweenLite.to(listWrap, 0.5, {left:pos *-1, ease:Quart.easeInOut});
				return false;
			});
			leftBtn.click(function(e){
				if (pos == 0) {
					return false;
				}
				pos -= li_width* 3;
				TweenLite.to(listWrap, 0.5, {left: pos *-1, ease:Quart.easeInOut});
				return false;
			});
		});

	};
	todayProd02();


	// 3daps action
	$('.call-3').click(function(){

		if( $(this).hasClass("call-over") == false ){
			$('.call-3').removeClass('call-over');
			$('.call-3').find('div').stop().slideUp(300,'easeInOutQuad');
			$(this).addClass("call-over");
			$(".call-3").children("a").attr("title","펼치기");
			$(this).children("a").attr("title","접기");
			$(this).find('div').stop().slideDown(300,'easeInOutQuad');
			//alert("a");

		}else if( $(this).hasClass("call-over") == true ){
			$('.call-3').removeClass('call-over');
			$(this).removeClass("active");
			$(this).children("a").attr("title","펼치기");
			$(this).find('div').stop().slideUp(300,'easeInOutQuad');
			//alert("b");
		};
	});


	$(".tab-item > li").click(function(){

        var tabCont02 = $(this).attr("data-tab");
        var tabWidth02 = 0;
        var tabPosList02 = [0];
        var targetIdx02 = $(this).index();

        $(".tab-item > li").each(function(){

            tabWidth02 += $(this).outerWidth();
            tabPosList02.push(tabWidth02);
        });
        $('.tab-item').animate({scrollLeft:tabPosList02[targetIdx02]}, 100);

        if($(this).is('.setLoan')===true){//상품공시실 대출상품 클릭시 비활성화
        	$(this).removeClass("on");
        }else{
            $(this).siblings().removeClass("on");
            $(this).addClass("on");
            $(this).siblings().children("a").removeAttr("title");
            $(this).children("a").attr("title","선택됨");

            $(".tab-content").addClass("dp-none");
            $("#" + tabCont02).removeClass("dp-none");
        }


    });

	// 메인 tab 메뉴
	$(".contab-item > li").click(function(){
		var tabCont03 = $(this).attr("data-tab");
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		$(this).siblings().children("a").removeAttr("title");
		$(this).children("a").attr("title","선택됨");
		$(this).closest("ul").siblings().addClass("dp-none");
		$("#" + tabCont03).removeClass("dp-none");
	});

	// accordion	대출상품,예금상품, 채용FAQ, 상품개발기획준칙, 상품판매준칙, 윤리강령, 임직원행동지침
	$("[class*='acco-wrap'] > dl > dt.active").next("dd").css("display","inline-block"); // 기본값 상품안내 열림설정
	$("[class*='acco-wrap'] > dl > dt > div").attr("title","펼치기"); //대출상품 유의사항, 예금상품 약관및서류
	$(".acco-wrap02 > dl:nth-child(1) > dt > div").attr("title","접기");  // 상품안내
	$("[class*='acco-wrap'] > dl > dt").click(function(){
		if( $(this).hasClass("active") == false ){
			$(this).addClass("active");
			$(this).children('div, ul').attr("title","접기");
			$(this).next("dd").stop().slideDown().focus();
		}else {
			$(this).removeClass("active");
			$(this).children('div, ul').attr("title","펼치기");
			$(this).next("dd").stop().slideUp();
		};
	}).keydown(function(key){
		if(key.keyCode == 13){ // 키가 13(enter)이면 실행
			$(this).click();
        };
	});

	//상품개발기획준칙, 상품판매준칙, 윤리강령, 임직원행동지침, 채용FAQ
	$(".section-tit a.btn-m").click(function(){
		if( $(this).hasClass("acco-open")==true ){
			$(".acco-wrap > dl > dt").addClass("active");
			$(".acco-wrap > dl > dt").children().attr("title","접기");
			$(".acco-wrap > dl > dd").stop().slideDown();
			$(this).text("모두 닫기");
			$(this).attr("title","모두 접기");
			$(this).addClass("acco-close").removeClass("acco-open");
		}else if( $(this).hasClass("acco-close")==true ){
			$(".acco-wrap > dl > dt").removeClass("active");
			$(".acco-wrap > dl > dt").children().attr("title","펼치기");
			$(".acco-wrap > dl > dd").stop().slideUp();
			$(this).text("모두 보기");
			$(this).attr("title","모두 펼치기");
			$(this).addClass("acco-open").removeClass("acco-close");
		}
	});

	//사이버홍버실/사회공헌
	$('.list-img li a').click(function(){
		$('.list-img li').removeClass('on');
		$('.list-img li a').removeAttr('title');
		$(this).parent().addClass('on');
		$(this).attr('title','선택됨');
	})

	//quick menu
	renewalQuickMenu();
	moAction();
});


//전체 메뉴 
function moAction(){
	$(".btn-mositemap").click(function(){
		$("#mo-gnb").show();
		//$(".mo-main-nav").show();
		//$(".mo-bg").addClass("on");
		$(".mo-main-nav").focus();
		$("body").css("overflow","hidden");
		//return false;
	});

	$(".btn-mositemap").focusin(function(){
		$(".mo-main-nav").attr("tabindex", "-1");
		//return false;
	});


	$(".m-close").click(function(){
		$("#mo-gnb").hide();
		/*$(".mo-main-nav").animate({
			right:"-300px"
		},function(){
			$(this).removeClass("on");
			$(".mo-bg").removeClass("on");
		});*/
		$(".mo-main-nav").attr("tabindex", "0");
		$("body").css("overflow","auto");
		//return false;
	});


	var windowWidth03 = $(window).width();
	var resWeb03={
		isMobileWidth03:function(){
			windowWidth03 = $(window).width();
			if(windowWidth03 > 780){
				return false;
			}
			return true
		},
	}


	 var gnb03 = function() {
        /* GNB */
		var gnbTab03  = $('.gnbNavigation');
		var gnbMenu03 = $('.lnb-aside > li > a');
		var subMenu03 = $('.fr-menu3').find('.sub_menu');//right
		var menuBx03 = $('.nav_scroll > ul').scrollTop();
		var menuBxLi = $('.nav_scroll > ul > li');

		  //2depth메뉴 상세보기 이벤트
		/* 접근성 개선 */
		  $('.nav_main > li > a').off("click").on("click", function(e) {//2depth
			var liObj03 = $(this).parent();
			$('.nav_main > li.active > a').attr('title', '펼치기');
			// 타이틀 초기화

			if (this.getAttribute('href').indexOf('certificate') > 0) {
				certificate_target03 = this;
			}
			if (liObj03.children(".nav_sub").is(':hidden') != true) {
				liObj03.removeClass('active');
				liObj03.children(".nav_sub").slideUp("fast");
				if ($(this).siblings().length > 0) {
					$(this).attr('title', '펼치기');
				}
			} else {
				$('.nav_main > li').removeClass('active');
				$('.nav_sub').slideUp('fast');
				if (liObj03.children(".nav_sub").is(':hidden') == true) {
					liObj03.addClass('active');
					liObj03.children(".nav_sub").slideDown('fast');
					if ($(this).siblings().length > 0) {
						$(this).attr('title', '접기');
					}
				}
			}
			if (resWeb03.isMobileWidth03()) {
				// 2Depth가 있을 때에는 이벤트 기본동작 차단
				if ($(this).siblings().length > 0) {
					e.preventDefault();
				}
			}
		});

		gnbMenu03.off("click").on("click",function (e) {
			gnbMenu03.parent('li').removeClass('on');
			$(this).parent('li').addClass('on');
			var target = $(this).attr("data-tab");
			var targetTop = $(".nav_scroll > ul li#"+target).position().top + $(".nav_scroll > ul").scrollTop()+1;
			$(".nav_scroll > ul").stop().animate({scrollTop : targetTop},100);

		});

		$(".nav_scroll > ul").off("scroll").on("scroll",function (e) {
			var top = $(this).scrollTop();
			var target;
			menuBxLi.each(function(){
				if($(this).position().top <= 0){
					target = $(this).attr("id");
					gnbMenu03.parent('li').removeClass("on");
					$(".lnb-aside li a[data-tab="+target+"]").parent('li').addClass("on");
				//alert();
				};
			});
		});

    };
    gnb03();

};


/* nav 스크롤 */
function navAction() {

	$("nav").mouseover(function(){
		$('header').attr('class', 'on-bg');
		$('nav>div>div').stop().slideDown(200);
	}).focusin(function(){
		$(this).mouseover();
	});

	$("nav").mouseout(function(){
		$('header').removeAttr('class','on-bg');
		$('nav>div>div').stop().slideUp(200);

		var winHidth = $(window).scrollTop();
		if( winHidth > 80){
			$("header").addClass("on-bg");
		}else{
			$("header").removeClass("on-bg");
		};
	}).focusout(function(){
		$(this).mouseout();
	});


};


//기존 퀵메뉴
function renewalQuickMenu(){
	if( $("body").find("div").hasClass("sub-quickmenu") == true ){
		var subInnerTop = $(".container").offset().top + 200;
		var subFooterTop = $(".sub-footer").offset().top;
		var reQuickMenuHeight = $(".sub-quickmenu").outerHeight();

		$(".sub-quickmenu").css({"position":"fixed","top":subInnerTop,"bottom":"unset"});

		$(window).scroll(function(){
			var windowScrTop = $(window).scrollTop();
			var windowScrBottom = $(document).height() - $(window).height() - $(window).scrollTop();

			if( $(".sub-inner").outerHeight() >= 800 ){
				if( subInnerTop <= windowScrTop+120 ){
					$(".sub-quickmenu").css({"position":"fixed","top":"90px","bottom":"unset"});
					if( subFooterTop <= windowScrTop+reQuickMenuHeight ){
						$(".sub-quickmenu").css({"position":"absolute","top":"unset","bottom":"300px"});

					};
				}else if( subInnerTop >= windowScrTop+120 ){
					$(".sub-quickmenu").css({"position":"absolute","top":subInnerTop,"bottom":"unset"});
				};
			}else{
				$(".sub-quickmenu").css({"position":"absolute !important","top":"0 !important","bottom":"unset"});
			};
		});
	};
	$('.quick-top').on("click",function(){
		window.scrollTo(0,0);
	}).keydown(function(key){
		if(key.keyCode == 13){ // 키가 13(enter)이면 실행
			$('.skip_nav a').focus()
        };
	});
};


/* location */
function pcNavAction(){

	/* navgation slide toggle */
	var naLiHeight = $(".location-wrap > li > ul > li").height();
	$('.location-wrap .depth1 > a, .location-wrap .depth2 > a, .location-wrap .depth2 > a').attr("title","선택됨"); // 기본 타이틀값

	$(".location-wrap > li:gt(0)").mouseover(function(){
		var hoverDepLiNum = $(this).find("ul > li").index() +1;
		var hoverDep3LiNum = $(".location-wrap > .depth3").find(".on > li").index() +1;

		var naUlHeight = ( naLiHeight * hoverDepLiNum ) + naLiHeight +12;

		naUlHeight = naUlHeight*6;


		var naDep3UlHeight = ( naLiHeight * hoverDep3LiNum ) + naLiHeight +12;
		naDep3UlHeight = naUlHeight;

		$(this).find("a").addClass("on");

		if( $(this).hasClass("depth3") == true ){
			$(this).find("ul.on").css("display","block");
			$(this).stop().animate({"height":naDep3UlHeight+"px"},100);
		}else{
			$(this).find("ul").css("display","block");
			$(this).stop().animate({"height":naUlHeight+"px"},100);
		};
		if($(this).find('ul').length==0){
			$(this).css('height','46px');// 단일메뉴일 경우 항목높이
		}
	}).focusin(function(){
		$(this).mouseenter();
	});

	$(".location-wrap > li:gt(0)").mouseleave(function(){
		$(this).stop().animate({"height":naLiHeight+"px"},100,function(){
			$(this).find("> a").removeClass("on");
			$(this).find("ul").css("display","none");
		});
	}).focusout(function(){
		$(this).mouseleave();
	});

};

//디바이스 체크 및 스토어 이동함수 //loan common
var device = {
	isMobile:function(){
		var filter='win16|win32|win64|mac|macintel';
		if(navigator.platform){
			if(0>filter.indexOf(navigator.platform.toLowerCase())){
				return true;
			}else{
				return false;
			}
		}
	},
	isIphone : function(){
        var uAgent = navigator.userAgent.toLowerCase();
        var mobilePhones = new Array('iphone', 'ipad', 'ipod');
        var isIphone = false;
        for(i=0;i<mobilePhones.length;i++){
            if (uAgent.indexOf(mobilePhones[i]) != -1) {
            	isIphone=true;
            }

        }
        return isIphone;
	},
	storeUrl:{
		bkIphone:'https://itunes.apple.com/kr/app/id1469002262?mt=8',
		bkAndroid:'http://play.google.com/store/apps/details?id=kr.or.sbbank.plus',
		csbIphone:'https://tuney.kr/AfbRR4',
		csbAndroid:'https://tuney.kr/AfezNA'
	},
	getUrl : function(prefix){
		var urlName;
		var urlProp;
		if(this.isIphone()){
			urlProp=prefix+'Iphone'
			urlName = this.storeUrl[urlProp];
		}else{
			urlProp = prefix+'Android';
			urlName = this.storeUrl[urlProp];
		}
		if(this.storeUrl.hasOwnProperty(urlProp)){
			return urlName;
		}else{
			alert('해당링크가 활성화되지 않았습니다. 다시 시도해주세요.');
		}
	}
}



//상품안내 다운받기
function fnGoFileDown(fName){
	$("#realName").val(fName);
	$("#fileName").val(fName);
	$("#fForm").attr("action", "/project/jtchinae_bank/asset/images/filedown/"+ fName + ".pdf"); //"/fileDownload.do"
	$("#fForm").submit();
};




//체크카드사용안내
function LinkCard1() {
	var url = "/fin/checkCardPop.do?card=01";
	var pHeight = "879px";
	var pWidth = "833px";
	var nu = navigator.userAgent;
	if (/safari/i.test(nu)) {
		pWidth = "833px";
		pHeight = "800px";
	}
	if (/chrome|firefox/i.test(nu)) {
		pWidth = "833px";
		pHeight = "870px";
	}
	if (/opera|opr/i.test(nu)) {
		pWidth = "833px";
		pHeight = "850px";
	}
	window.open(url, 'agreePopIR', 'width=' + pWidth + ', height=' + pHeight
			+ ', top=0, left=0, scrollbars=yes');
};

//체크카드사용안내
function LinkCard2(){
	var url = "/fin/checkCardPop.do?card=02";
	var pHeight = "879px";
	var pWidth = "833px";
	var nu = navigator.userAgent;
	if (/safari/i.test(nu)){pWidth="833px"; pHeight = "800px";}
	if (/chrome|firefox/i.test(nu)){pWidth="833px"; pHeight = "870px";}
	if (/opera|opr/i.test(nu)){pWidth="833px"; pHeight = "850px";}
	window.open(url, 'agreePopIR', 'width='+pWidth+', height='+pHeight+', top=0, left=0, scrollbars=yes');
};

//체크카드사용안내
function LinkCard3(){
	var url = "/fin/checkCardPop.do?card=03";
	var pHeight = "879px";
	var pWidth = "833px";
	var nu = navigator.userAgent;
	if (/safari/i.test(nu)){pWidth="833px"; pHeight = "800px";}
	if (/chrome|firefox/i.test(nu)){pWidth="833px"; pHeight = "870px";}
	if (/opera|opr/i.test(nu)){pWidth="833px"; pHeight = "850px";}
	window.open(url, 'agreePopIR', 'width='+pWidth+', height='+pHeight+', top=0, left=0, scrollbars=yes');
};
//모바일기기 전화함수
function callToTel(url){
	url = url.replace("-","");
	if(device.isMobile()){
		top.location.href="tel:"+url;
	}
}




