
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

  // $(document).on('keydown', function(e) {
  //   e.preventDefault()
  //   if (e.key === "Backspace" || e.key === "Escape") {
  //       $('.form-control, textarea').blur();
  //   }
  // });

  // 안드로이드 키패드의 뒤로가기를 눌렀을 때 .fixed-btn-wrap을 보이게 함
//   $(document).on('keydown', function(e) {
//     if ((e.key === "Backspace" || e.key === "Escape") && $('.form-control, textarea').is(':focus')) {
//         $('.fixed-btn-wrap').show();
//     }
// });

var originHeight = $(window).height(); // 현재 창의 높이를 저장합니다.

$(window).resize(function(){ // 창 크기가 조절될 때의 이벤트 핸들러를 정의합니다.
    var newHeight = $(window).height(); // 조절된 창의 새로운 높이를 가져옵니다.
    if(newHeight < originHeight){ // 만약 새로운 높이가 원래 높이보다 작다면 (키보드가 나타난 경우)
        keyboardBack(NativeUtil.isDevice() ? false : true); // 키보드가 나타난 경우 (장치가 존재하는 경우) 키보드를 닫습니다.
    } else { // 그렇지 않으면 (키보드가 사라진 경우)
        keyboardBack(Native.isDevice() ? true : false); // 키보드가 사라진 경우 (장치가 존재하는 경우) 키보드를 엽니다.
    }
    orginHeight = newHeight; // 원래 높이를 새로운 높이로 업데이트합니다.
});


let originHeight = window.innerHeight; // 현재 창의 높이를 저장합니다.

window.addEventListener('resize', function() { // 창 크기가 조절될 때의 이벤트 핸들러를 정의합니다.
    let newHeight = window.innerHeight; // 조절된 창의 새로운 높이를 가져옵니다.
    if (newHeight < originHeight) { // 만약 새로운 높이가 원래 높이보다 작다면 (키보드가 나타난 경우)
        // 현재 창 높이보다 작아졌는지 확인
        let isDevice = window.innerWidth !== window.screen.width || window.innerHeight !== window.screen.height;
        keyboardBack(isDevice ? false : true); // 키보드가 나타난 경우 (장치가 존재하는 경우) 키보드를 닫습니다.
    } else { // 그렇지 않으면 (키보드가 사라진 경우)
        // Native.isDevice() 대신에 장치가 있는지 여부를 체크하는 다른 방법을 사용해야 합니다.
        // 이 예제에서는 위와 마찬가지로 'window.innerWidth'와 'window.innerHeight'를 비교하여 창이 작아졌는지 여부를 확인합니다.
        let isDevice = window.innerWidth !== window.screen.width || window.innerHeight !== window.screen.height;
        keyboardBack(isDevice ? true : false); // 키보드가 사라진 경우 (장치가 존재하는 경우) 키보드를 엽니다.
    }
    originHeight = newHeight; // 원래 높이를 새로운 높이로 업데이트합니다.
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
//   else{ //선택약관(상품서비스) 전체동의
//     if ($('.level2 fieldset .all').prop('checked')) {
//         $('.level3').find('input').prop('checked', true);
//     }else {
//       $('.level3').find('input').prop('checked', false);
//     };
//   }


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

//   if (dmCheckNum >= 1) {
//       $('.level2 fieldset .all').prop('checked', true);
//   } else if (dmCheckNum == 0) {
//       $('.level2 fieldset .all').prop('checked', false);
//   }

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
  //선택약관(상품서비스) 개별동의
  // if (dmCheckNum >= 1) {
  //   $('.level2 fieldset .all').prop('checked', true);
  // }else if(dmCheckNum == 0){
  //   $('.level2 fieldset .all').prop('checked', false);
  // };
  agreeChek();
};

// $(".layerpopup .btn.btn-primary").on("click", function() {
//   var popup = $(this).closest('.layerpopup');
//   var popupID = popup.attr("id");

  
//   var termsPopID = popupID.replace("-popup", "");

  
//   $("[terms-pop='" + termsPopID + "']").prop("checked", true);

//   popup.hide();
// });

// $(".btn-layer-close").on("click", function() {
//   var popup = $(this).closest('.layerpopup');
//   var popupID = popup.attr("id");
  
//   var termsPopID = popupID.replace("-popup", "");

  
//   $("[terms-pop='" + termsPopID + "']").prop("checked", false);

//   popup.hide();
// });

});

  /** accorion **/
  // $('.accordion .btn-accordion').click(function() {
  //   var accordionCont = $(this).next('.accordion-cont');
     
  //     $(this).toggleClass('on').attr('title', function(_, attr){
  //       return attr === '열림' ? '닫힘' : '열림';
  //     });
  //     accordionCont.toggleClass('on');
  // });
  
  // 클릭 이벤트를 .accordion .btn-accordion 요소에 바인딩합니다.
$('.accordion .btn-accordion').click(function() {
  // 다음에 오는 .accordion-cont 요소를 찾습니다.
  var accordionCont = $(this).next('.accordion-cont');
    // $(this).toggleClass('on')
        // accordionCont.toggleClass('on');
  
  // 현재 클릭된 요소에 'on' 클래스를 토글하고, 'title' 속성을 변경합니다. _ 무시할 값 인덱스 또는 인자를 무시하고자 할 때 사용 _를 사용하여 명시적으로 해당 매개변수가 사용되지 않음을 나타냅니다.
  $(this).toggleClass('on').attr('title', function(_, attr) {
      // 'title' 속성이 '열림'인 경우 '닫힘'으로 변경하고, 그 반대의 경우 '열림'으로 변경합니다.
      return attr === '열림' ? '닫힘' : '열림';
  });
  
  // 찾은 .accordion-cont 요소에도 'on' 클래스를 토글합니다.
  accordionCont.toggleClass('on');
});




  /** 이미지 불러오기 **/
  // $('.thumb-wrap ul').on('change', '.plus', function(e) {
  //   const file = e.target.files[0]; // 불러온 파일 가져오기
  //   const $parentListItem = $(this).closest('li');

  //   if (file) {
  //       const reader = new FileReader();

  //       reader.onload = function(e) {
  //           const imageUrl = e.target.result;

  //           const newListItem = $('<li><img src="' + imageUrl + '" alt="Uploaded Image"><span>추가</span></li>');

  //           $parentListItem.replaceWith(newListItem);

  //           newListItem.addClass('delete');

  //           const newPlusListItem = $('<li class="plus"><input type="file" id="file" class="ip-file"><span>추가</span></li>');
            
  //           $('.thumb-wrap ul').append(newPlusListItem);
  //       };

  //       reader.readAsDataURL(file);
  //   }
  // });
  /** 이미지 불러오기 삭제 **/
  // $('.thumb-wrap ul').on('click', '.delete', function(e) {
  //   e.stopPropagation();//중단

  //   $(this).remove();
  // });
    
  //   /** textarea css **/
  //   $('#myTextarea').on('focus', function() {
  //     $(this).css({
  //         'border-color': '#003763',
  //         'color': '#000000',
  //     });
  //   }).on('blur', function() {
  //       $(this).css({
  //           'border-color': '#DDDDDD',
  //           'color': '#999999',
  //       });
  //   });

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

// var winH2 = $(window).height() || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
// $(document).on('click', '.btn-top', function (e) {
//   e.preventDefault();
//   $('body, html').animate({
//     scrollTop: 0
//   }, 450);
// });


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


// //font Control
// function fontPlus() {
//   $('*').each(function () {
//     var _fontSize = parseInt($(this).css('font-size')) * 1.1;
//     //console.log(_fontSize);
//     $(this).css({ 'font-size': _fontSize + "px" });
//   });
// }
// function fontMinus() {
//   $('*').each(function () {
//     var _fontSize = parseInt($(this).css('font-size')) / 1.1;
//     //console.log(_fontSize);
//     $(this).css({ 'font-size': _fontSize + "px" });
//   });
// }

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


