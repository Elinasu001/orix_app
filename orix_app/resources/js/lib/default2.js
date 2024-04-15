
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
  $('.form-control:not(.form-control.select, input.form-control:read-only), textarea, #loanRegNum').focus(function(){// #loanRegNum개발대응으로 추가
    if (!$(this).hasClass('select')) {
      $('.fixed-btn-wrap').hide();
    }
  });

  $('.form-control:not(.form-control.select, input.form-control:read-only), textarea,  #loanRegNum').blur(function(){// #loanRegNum개발대응으로 추가
    if (!$(this).hasClass('select')) {
      $('.fixed-btn-wrap').show();
    }
  });

   /** 리스트 선택이 필요한 경우 **/
  $(document).on('click', '.txt-list-wrap.click .txt-detail-area', function(){
    $('.txt-list-wrap.click .txt-detail-area').not(this).removeClass('on');
    $(this).toggleClass('on');
    $('.txt-list-wrap.click .txt-detail-area').not(this).find('input').removeClasss('on');//개발 추가
    $(this).find('input').toggleClass('on');
  })

  /** table 의 checkbox **/
  // // checkbox
  // $('.table-type tbody input').on('change', function() {
  //     var isChecked = $(this).is(':checked');
  //     $(this).closest('tr').toggleClass('checked', isChecked);
  // });

  // // tr row
  // $('.table-type tbody tr').on('click', function() {
  //     var checkbox = $(this).find('input');
      
  //     checkbox.prop('checked', !checkbox.prop('checked')).change();
  // });


  
  /** table 선택**/
//   $(".table-type.check tbody tr").click(function () {
//     // Remove the 'checked' class from all rows
//     $(".table-type.check tbody tr").removeClass("checked");
//     // Add the 'checked' class to the clicked row
//     $(this).addClass("checked");

//     // Hide all .table-type.result
//     $(".table-type.result").hide();

//     // Show the corresponding .table-type.result
//     var index = $(this).index();
//     $(".table-type.result").show();
// });

/** 테이블  상세현황**/
$(".table-type.check tbody tr").click(function () {

  $(".table-type.check tbody tr").not(this).removeClass("checked");

  $(this).toggleClass("checked");

  $(".table-type.result").css("display", $(this).hasClass("checked") ? "block" : "none");
});

  // $(".table-type.result tbody tr").hide();


// if ($(this).hasClass("checked")) {
//     // var index = $(this).index();
//     // $(".table-type.result tbody tr:eq(" + index + ")").show();
//     $(".table-type.result").css("display", "block");
// } else {
    
//     $(".table-type.result").css("display", "none");
// }

// });

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

    $(".layerpopup .btn.btn-primary").on("click", function() {
      var popup = $(this).closest('.layerpopup');
      var popupID = popup.attr("id");
    
      
      var termsPopID = popupID.replace("-popup", "");
    
      
      $("[terms-pop='" + termsPopID + "']").prop("checked", true);

      popup.hide();
    });

    $(".btn-layer-close").on("click", function() {
      var popup = $(this).closest('.layerpopup');
      var popupID = popup.attr("id");
      
      var termsPopID = popupID.replace("-popup", "");
    
      
      $("[terms-pop='" + termsPopID + "']").prop("checked", false);

      popup.hide();
    });
    
  });

  /** accorion **/
  $('.accordion .btn-accordion').click(function() {
    var accordionCont = $(this).next('.accordion-cont');
    $(this).toggleClass('on');
    accordionCont.toggleClass('on');
  });

  /** 이미지 불러오기 **/
  $('.thumb-wrap ul').on('change', '.plus', function(e) {
    const file = e.target.files[0]; // 불러온 파일 가져오기
    const $parentListItem = $(this).closest('li');

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageUrl = e.target.result;

            const newListItem = $('<li><img src="' + imageUrl + '" alt="Uploaded Image"><span>추가</span></li>');

            $parentListItem.replaceWith(newListItem);

            newListItem.addClass('delete');

            const newPlusListItem = $('<li class="plus"><input type="file" id="file" class="ip-file"><span>추가</span></li>');
            
            $('.thumb-wrap ul').append(newPlusListItem);
        };

        reader.readAsDataURL(file);
    }
  });
  /** 이미지 불러오기 삭제 **/
  $('.thumb-wrap ul').on('click', '.delete', function(e) {
    e.stopPropagation();//중단

    $(this).remove();
  });
    
    /** textarea css **/
    $('#myTextarea').on('focus', function() {
      $(this).css({
          'border-color': '#003763',
          'color': '#000000',
      });
    }).on('blur', function() {
        $(this).css({
            'border-color': '#DDDDDD',
            'color': '#999999',
        });
    });

    /** tab **/
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

    //   $(".tab-item.scroll > li").click(function() {
    //     $(".tab-item.type2").scrollLeft(0);
    // });

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
  _target.find('.btn-layer-close, .btn-close, .confirm').on('click', function () {
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
  _target.find('.btn-layer-close, .btn-close, .confirm').on('click', function () {
    closePopupUp(id);
    $('body').removeAttr('style');
    $(window).scrollTop(currentTop);
    _target.removeClass('on');
  });

  if (_target.has('.ly-select-list').length > 0) {
  _target.find('.ly-select-list > li > button').on('click', function () {

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


