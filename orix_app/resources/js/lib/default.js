
$(document).ready(function() {

  /**  3자리 수마다 콤마 적용 **/
  $(document).on('keyup', 'input[inputmode=numeric]', function (event) {
    this.value = this.value.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    this.value = this.value.replace(/,/g, ''); // ,값 공백처리
    this.value = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가
  });

  /** table 의 checkbox **/
  // 클래스 'custom-check'를 사용하여 모든 "checkbox"를 가져옴.
  var checkboxes = document.querySelectorAll('input[type="checkbox"].custom-check');
  // 각 "checkbox"에 'change' event listener 추가.
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        // checked되면
        if (this.checked) {
          // 'tbody'에서 가장 가까운 'tr'(테이블 행)을 구함.
          var closestTr = this.closest('tr');
          if (closestTr) {
              // 가장 가까운 'tr'에 'checked' 클래스를 추가.
              closestTr.classList.add('checked');
          }
        } else {
          // 이 선택하지 않으면 가장 가까운 'tr'에서 'checked' 클래스를 제거.
          var closestTr = this.closest('tr');
          if (closestTr) {
              closestTr.classList.remove('checked');
          }
        }
    });
  });


  /** 전체동의**/
  $('.check.all').on('click',  function() {
    
    if (!$(this).parents('fieldset').siblings().hasClass('etc')) {
      //약관 전체동의
      if ($('.level1 .all').prop('checked')) {
          $('.level2').find('input').prop('checked', true);
      }else {
        $('.level2').find('input').prop('checked', false);
      };
    }else{ //선택약관(상품서비스) 전체동의
      if ($('.level2 fieldset .all').prop('checked')) {
          $('.level3').find('input').prop('checked', true);
      }else {
        $('.level3').find('input').prop('checked', false);
      };
    }

  });

  /** 개별 약관**/
  $('.check').on('click', function() {
    var totalNum = $(".level2 fieldset > .check").length;
    var checkNum = $(".level2 fieldset > .check:checked").length;

    var dmTotalNum	= $(".level3 .check").length;
    var dmCheckNum = $(".level3 .check:checked").length;
    
    // terms-pop 약관 팝업
    // var terms_id = $(this).attr('terms-pop');
    // $(".layerpopup").removeClass('on');
    // $("#"+terms_id).addClass('on');
    // $('body').css("overflow", "auto");
    $(".check").on("change", function() {
      var popupID = $(this).attr("terms-pop"); // Get the ID of the associated popup
      var isChecked = $(this).is(":checked"); // Check if the checkbox is checked
    
      if (isChecked) {
        $("#" + popupID).show(); // Show the associated popup when the checkbox is checked
      } else {
        $("#" + popupID).hide(); // Hide the associated popup when the checkbox is unchecked
      }
    });
    
    $(".btn-layer-close").on("click", function() {
      $(this).closest('.layerpopup').hide(); // Hide the closest popup when the close button is clicked
    });

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
    // // terms-pop 약관 팝업
    // $('.btn-layer-close').on('click', function() {
    //   $(".layerpopup").removeClass('on');
    //   $('body').css("overflow", "auto");
    // });

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
    //전체풀팝업일경우 dimmed 생기지않음 2020-04-10

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
var winScrollTop;
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
  $('body, html, .wrap').css({ 'height': '', 'overflow': '' });
  $('body').removeAttr('style');
  $(window).scrollTop(winScrollTop);
}

// popup
function openPopup(id) {
  var _target = $('#' + id);
  currentTop = $(window).scrollTop();
  $('body').css({ 'position': 'fixed', 'top': -currentTop });
  _target.find('.btn-layer-close').on('click', function () {
    closePopup(id);
    $('body').removeAttr('style');
    $(window).scrollTop(currentTop);
  });
  if (_target.hasClass('layer-up')) {

  } else if (_target.hasClass('type-alert')){
	_target.fadeIn(600);
    _target.focus();
	_target.addClass("on");
  
  }else{
    _target.fadeIn(600);
	_target.addClass("on");
    _target.focus();
  }
}

//open popup slideup
function openPopupUp(id) {
  var _target = $('#' + id);
  currentTop = $(window).scrollTop();
  $('body').css({ 'position': 'fixed', 'top': -currentTop });
  //_target.fadeIn(300);
  layerFunc(_target);
  _target.removeClass('close');
  _target.addClass('show').show();
  _target.focus();
  _target.find('.btn-layer-close').on('click', function () {
    closePopupUp(id);
    $('body').removeAttr('style');
    $(window).scrollTop(currentTop);
    _target.removeClass('show');
  });

  if (_target.has('.ly-select-list').length > 0) {
    _target.find('.ly-select-list > li > button').not('.ly-select-list.non-click > li > button').on('click', function () {
      // Get the text of the clicked list item
      var selectedText = $(this).text();
      
      // Apply the selected text to a specific location, for example, a div with ID 'selectedText'
      $('.form-control.select span').text(selectedText);
      
      closePopupUp(id);
      $('body').removeAttr('style');
      $(window).scrollTop(currentTop);
      _target.removeClass('show');
    });
    
  }
  if (_target.has('.ly-acc-select').length > 0) {
    _target.find('.ly-acc-select > .acc-list-area > a').on('click', function (e) {
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
  $('#' + id).fadeOut(600);
  _target.removeClass('on');
}
//close popup slideDown 
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





