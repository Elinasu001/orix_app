
$(document).ready(function() {

  /**  3자리 수마다 콤마 적용 **/
  $(document).on('keyup', 'input[inputmode=numeric]', function (event) {
    this.value = this.value.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    this.value = this.value.replace(/,/g, ''); // ,값 공백처리
    this.value = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가
  });
  
  /** table 의 checkbox **/
  // checkbox
  $('.table-type tbody input').on('change', function() {
      var isChecked = $(this).is(':checked');
      $(this).closest('tr').toggleClass('checked', isChecked);
  });

  // tr row
  $('.table-type tbody tr').on('click', function() {
      var checkbox = $(this).find('input');
      
      checkbox.prop('checked', !checkbox.prop('checked')).change();
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
   
    var terms_id = $(this).attr("terms-pop"); // Get the ID of the clicked element
    // $("#" + terms_id).show(); // Show the associated popup with the same ID when the element is clicked
    
    if ($(this).prop("checked")) {
        $("#" + terms_id).show(); // Show the associated popup with the same ID when the element is clicked
    } else {
        $("#" + terms_id).hide(); // Hide the associated popup when the checkbox is unchecked
    }

    $(".layerpopup .btn.btn-primary").on("click", function() {
      var popup = $(this).closest('.layerpopup');
      var popupID = popup.attr("id"); // Get the ID of the popup
    
      // Extract the terms-pop function ID from the popup ID
      var termsPopID = popupID.replace("-popup", "");
    
      // Check the associated checkbox for the terms-pop function
      $("[terms-pop='" + termsPopID + "']").prop("checked", true);

      popup.hide();
    });

    $(".btn-layer-close").on("click", function() {
      var popup = $(this).closest('.layerpopup');
      var popupID = popup.attr("id"); // Get the ID of the popup
    
      // Extract the terms-pop function ID from the popup ID
      var termsPopID = popupID.replace("-popup", "");
    
      // Check the associated checkbox for the terms-pop function
      $("[terms-pop='" + termsPopID + "']").prop("checked", false);

      popup.hide();
    });
    /*e : 2023-12-12 추가*/
    
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

  /** accorion **/
  $('.accordion .button').click(function() {
    var accordionCont = $(this).next('.accordion-cont');
    $(this).toggleClass('on');
    accordionCont.toggleClass('on');
  });

  /** 이미지 불러오기 **/
  $('.thumb-wrap ul').on('change', '.plus', function(e) {
    const file = e.target.files[0]; // 불러온 파일 가져오기
    const $parentListItem = $(this).closest('li');

    if (file) {
        const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성

        reader.onload = function(e) {
            const imageUrl = e.target.result; // 이미지 URL을 얻기

            // 이미지를 표시할 새로운 list item을 생성
            const newListItem = $('<li><img src="' + imageUrl + '" alt="Uploaded Image"><span>추가</span></li>');

            // 현재의 li에 이미지를 추가하고 클래스를 변경
            $parentListItem.replaceWith(newListItem);

            // 현재 li에 delete 클래스 추가
            newListItem.addClass('delete');

            // 새로운 "추가" 버튼을 생성
            const newPlusListItem = $('<li class="plus"><input type="file" id="file" class="ip-file"><span>추가</span></li>');

            // 리스트의 맨 뒤에 새로운 "추가" 버튼을 추가
            $('.thumb-wrap ul').append(newPlusListItem);
        };

        reader.readAsDataURL(file); // 파일을 읽어 data URL 형태로 변환
    }
  });
  /** 이미지 불러오기 삭제 **/
  $('.thumb-wrap ul').on('click', '.delete', function(e) {
    e.stopPropagation();//중단

    $(this).remove();
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
  $('html, .wrap').css({ 'height': '', 'overflow': '' });
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
    _target.fadeIn(600);
    _target.focus();
    _target.addClass("on");
  } else if (_target.hasClass('type-alert')){
  // _target.css('top','0');
	_target.fadeIn(600);
  _target.focus();
	_target.addClass("on");
  }
}

//open popup slideup
function openPopup(id) {
  var _target = $('#' + id);
  currentTop = $(window).scrollTop();
  $('body').css({ 'position': 'fixed', 'top': -currentTop });
  //_target.fadeIn(300);
  layerFunc(_target);
  _target.removeClass('close');
  _target.addClass('on').show();
  _target.focus();
  _target.find('.btn-layer-close').on('click', function () {
    closePopupUp(id);
    $('body').removeAttr('style');
    $(window).scrollTop(currentTop);
    _target.removeClass('on');
  });

  if (_target.has('.ly-select-list').length > 0) {
    _target.find('.ly-select-list > li > button').on('click', function () {
      var selectedValue = $(this).text(); // 선택한 값의 텍스트를 가져옴
      var inputId = 'input::placeholder'; // 여기에 해당 입력란의 ID를 넣어주세요

      // 선택한 값을 해당 ID의 입력란에 넣기
      $('#' + inputId).val(selectedValue);
      
      closePopupUp(id);
      $('body').removeAttr('style');
      $(window).scrollTop(currentTop);
      _target.removeClass('on');
    });

  }

  // 테이블에서 항목 클릭 시
  $('.table-type.check tbody tr').on('click', function() {
    var $clickedItem = $(this);
    var $checkedItems = $('.table-type.check tbody tr.checked');

    if (!$clickedItem.hasClass('checked')) {
      // 모든 선택 제거
      $checkedItems.removeClass('checked');

      // 클릭된 항목에만 클래스 추가
      $clickedItem.addClass('checked');

      // 선택된 항목의 이름을 검색 입력란의 placeholder로 설정
      // var nameText = $clickedItem.find('.name').text();
      // $('input.select').attr('placeholder', nameText);
      
    }

    // 팝업 닫기
    closePopupUp(id);
    $('body').removeAttr('style');
    $(window).scrollTop(currentTop);
    _target.removeClass('on');
  });
  if (_target.has('.ly-acc-select').length > 0) {
    _target.find('.ly-acc-select > .acc-list-area > a').on('click', function (e) {
      closePopupUp(id);
      $('body').removeAttr('style');
      $(window).scrollTop(currentTop);
      _target.removeClass('on');
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

//accordion
// $('#accordion > button.select').click(function(){
//   $('accordion .accordion-cont').addClass('.on');
//   $('accordion .accordion-cont').siblings.removeClass('.on');
// })


