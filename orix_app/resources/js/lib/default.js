
$(document).ready(function() {

  /**  3자리 수마다 콤마 적용 **/
  $(document).on('keyup', 'input[inputmode=numeric]', function (event) {
    this.value = this.value.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    this.value = this.value.replace(/,/g, ''); // ,값 공백처리
    this.value = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가
  });

  //계산 완료
  $('.btn.btn-primary.result').on('click', function (e) {
    e.preventDefault();

    $('.contents-wrap').animate({
        scrollTop: $('.txt-list-wrap').offset().top
    });
  });
  
 

  //input focus
  $('.form-control, textarea').focus(function(){
    if (!$(this).hasClass('select') && !$(this).prop("readonly")) {//문자열로 넘겨줘야 함 
      $('.fixed-btn-wrap').hide();
    }
  });

  $('.form-control, textarea').blur(function(){
    if (!$(this).hasClass('select') && !$(this).prop("readonly")) {
      $('.fixed-btn-wrap').show();
    }
  });

  //keyboard focus
  $(document).keydown(function(event){
    if (event.key === "Escape") {
      var inputField = $("input.form-control");
      inputField.blur();
    }
  })

  // popup focus
  $('.layerpopup.layer-up .form-control').focus(function(){
    $('.ly-cont-wrap.ly-scroll-con').removeClass('plus-height2').addClass('plus-height3');
  });

  $('.layerpopup.layer-up .form-control').blur(function(){
      $('.ly-cont-wrap.ly-scroll-con').addClass('plus-height2').removeClass('plus-height3');
  });


   /** 리스트 선택이 필요한 경우 **/
  $(document).on('click', '.txt-list-wrap.click .txt-detail-area', function(){
    $('.txt-list-wrap.click .txt-detail-area').not(this).removeClass('on');
    $(this).toggleClass('on');
    $('.txt-list-wrap.click .txt-detail-area').not(this).find('input').removeClasss('on');//개발 추가
    $(this).find('input').toggleClass('on');
  })

/** 테이블  상세현황**/
$(".table-type.check tbody tr").click(function () {

  $(".table-type.check tbody tr").not(this).removeClass("checked");

  $(this).toggleClass("checked");

  $(".table-type.result").css("display", $(this).hasClass("checked") ? "block" : "none");
});



/** 전체동의**/
$('.check.all').on('click',  function() {
var termsPopID = $(this).attr("terms-all");

if ($(this).prop("checked")) {
  $("#" + termsPopID).closest('.layerpopup').show();
  
} else {
  $("#" + termsPopID).closest('.layerpopup').hide();
}

if (!$(this).parents('fieldset').siblings().hasClass('etc')) {
  //약관 전체동의
  if ($('.level1 .all').prop('checked')) {
      $('.level2').find('input').prop('checked', true);
  }else {
    $('.level2').find('input').prop('checked', false);
  };
}

});


/** 개별 약관**/
$('.check').on('click', function() {
var totalNum = $(".level2 fieldset > .check").length;
var checkNum = $(".level2 fieldset > .check:checked").length;

var dmTotalNum	= $(".level3 .check").length;
var dmCheckNum = $(".level3 .check:checked").length;

var terms_id = $(this).attr("terms-pop");

if (totalNum == checkNum) {
    $('.level1 .all').prop('checked', true);
} else {
    $('.level1 .all').prop('checked', false);
}


if ($(this).prop("checked")) {
    $("#" + terms_id).closest('.layerpopup').show();
} else {
    $("#" + terms_id).closest('.layerpopup').hide();
}

if (!$(this).parent().parent('div.level3').hasClass('etc')) {
  //약관 개별동의
  if (totalNum == checkNum) {
    $('.level1 .all').prop('checked', true);
  }else{
    $('.level1 .all').prop('checked', false);
  };
  }else{

  agreeChek();
};



});

    // 클릭 이벤트를 .accordion .btn-accordion 요소에 바인딩합니다.
  $('.accordion .btn-accordion').click(function() {
    var accordionCont = $(this).next('.accordion-cont');
    $(this).toggleClass('on').attr('title', function(_, attr) {
        return attr === '열림' ? '닫힘' : '열림';
    });
    accordionCont.toggleClass('on');
  });


    /** tab & tab scroll**/
    $(".tab-item.type2 > li").click(function(){//개발대응으로 type2추가
    
      var tabCont = $(this).attr("data-tab");
      
      $(this).siblings().removeClass("on");
      if (!$(this).hasClass('swiper'))  $(this).addClass("on");
  
      $(".tab-content").addClass("dp-none");
      $("#" + tabCont).removeClass("dp-none");
      
      $(".tab-item.scroll > li").click(function() {
        var tabContPosition = $(".tab-item.scroll > li:first-child").offset().left;
        var listItemPosition = $(this).offset().left;
        var distance = listItemPosition - tabContPosition;
        
        $(".tab-item.scroll").animate({
            scrollLeft: distance
        }, 100);
      });

    });

    $(".tab-item > li").click(function(){//개발대응으로 추가
    
      var tabCont = $(this).attr("data-tab");
      
      $(this).siblings().removeClass("on");
      if (!$(this).hasClass('swiper'))  $(this).addClass("on");
  
      // $(".tab-content").addClass("dp-none");
      // $("#" + tabCont).removeClass("dp-none");
  
    });

});


// //레이어팝업 높이 판단하여 block와 position 컨트롤
function layerFunc(_target) {

  if (_target.hasClass('laypop-all')) {
    //전체풀팝업일경우 dimmed 생기지않음

  } else {
    if (_target.outerHeight() > $(window).height()) {
      _target.css({ 'position': 'absolute', 'top': '50px', 'left': getCenterAlignPos($(window).width(), _target.outerWidth()) });
      addBlock('full');
    } else {
        _target.css({ 'position': 'fixed', 'top': getCenterAlignPos($(window).height(), _target.outerHeight()), 'left': getCenterAlignPos($(window).width(), _target.outerWidth()) });
        if (_target.attr('id') == "loadingLayer") {
          addBlock('removeEvent');
        } else if (_target.attr('id') == "customAlertLayer") {
          addBlock("fixed");
        } else {
          addBlock();
        }
      }
    }
}

//block
var currentTop = 0;

function addBlock(_full) {
  $('.close').on('click', function () {
    $('.block').trigger('click');
  });
}
function deleteBlock(_full) {
  if (_full == 'fixed') {
    $('.block').fadeOut(300);
    $('.block').remove();
  }
  $('html, .wrap').css({ 'height': '', 'overflow': '' });
  $('body').removeAttr('style');
  // $(window).scrollTop(winScrollTop);
}


// messagePopup
function messagePopup(id) {
  var _target = $('#' + id);
  currentTop = $(window).scrollTop();
  $('body').css({ 'position': 'fixed', 'top': -currentTop });
_target.find('.btn-layer-close, .btn-close, .confirm').on('click', function (e) {
    e.preventDefault();
    closePopup(id);
    $('body').removeAttr('style');
    $(window).scrollTop(currentTop);
  });
  if (_target.hasClass('layer-up')) {

  }else if (_target.hasClass('type-alert')){
    _target.fadeIn(600);
    _target.focus();
    _target.addClass("on");

  }else{
    _target.fadeIn(600);
    _target.addClass("on");
    _target.focus();
  }

}

// popup
function openPopup(id) {
  var _target = $('#' + id);
  currentTop = $(window).scrollTop();
  $('body').css({ 'position': 'fixed', 'top': -currentTop });


  //_target.fadeIn(300);
  layerFunc(_target);
  _target.removeClass('close');
  _target.addClass('on').show();
  _target.focus();
  _target.find('.btn-layer-close, .btn-close, .confirm').on('click', function (e) {
    e.preventDefault();
    closePopupUp(id);
    $('body').removeAttr('style');
    $(window).scrollTop(currentTop);
    _target.removeClass('on');
  });

  if (_target.has('.ly-select-list').length > 0) {
  _target.find('.ly-select-list > li > button').on('click', function () {
    // var selectedText = $(this).text();
    
    // $('[onclick="openPopup(\'' + id + '\')"]').val(selectedText);
    
      closePopupUp(id);
      $('body').removeAttr('style');
      $(window).scrollTop(currentTop);
      _target.removeClass('show');
    });

  }

  /** 테이블 팝업 **/
  if (_target.has('.ly-select > .table-type.check').length > 0) {
    _target.find('.ly-select .table-type.check tbody tr').on('click', function () {

        closePopupUp(id);
        $('body').removeAttr('style');
        $(window).scrollTop(currentTop);
        _target.removeClass('show');
        e.preventDefault();

    });
  }

}

function closePopup(id) {
  var _target = $('#' + id);
  deleteBlock();
  _target.fadeOut(600);
  _target.removeClass('on');
  $(window).scrollTop(currentTop);
}

function closePopupUp(id) {
  deleteBlock();
  //ADD eunji 2020-10-05
  $('#' + id).scrollTop(0);
  $('#' + id).fadeOut(600);
}

/**
* 중앙정렬 위치
* @param containerSize : 컨테이너의 크기
* @param targetSize : 컨테이너에 들어 있는 오브젝트의 크기
* @return
*/
function getCenterAlignPos(containerSize, targetSize) {
  var pos = (containerSize - targetSize) / 2;
  return pos;
}


// var dl = $('dl.faqList');
// 	dl.find('dt > a').removeClass('open').attr('title', '열림');
// 	dl.find('dd').hide();
// 	dl.find('dt > a').on('click', function(e){
// 		e.preventDefault();	
// 		var isOpen = 	$(this).parent().next().is(':visible') 
// 		isOpen ? $(this).removeClass('open').attr('title', '열림') :$(this).addClass('open').attr('title', '닫힘');
// 		$(this).parent().next().toggle();
// });
