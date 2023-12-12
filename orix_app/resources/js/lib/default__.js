var winH2 = $(window).height() || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
$(document).on('click', '.btn-top', function (e) {
  e.preventDefault();
  $('body, html').animate({
    scrollTop: 0
  }, 450);
});
//문자열자르기
function cutByLen(str, maxByte) {
  for (b = i = 0; c = str.charCodeAt(i);) {
    b += c >> 7 ? 2 : 1;
    if (b > maxByte)
      break;
    i++;
  }
  return str.substring(0, i);
}
// 접근성 관련 포커스 강제 이동
function accessibilityFocus() {
  $(document).on('keydown', '[data-focus-prev], [data-focus-next]', function (e) {
    var next = $(e.target).attr('data-focus-next'),
      prev = $(e.target).attr('data-focus-prev'),
      target = next || prev || false;
    if (!target || e.keyCode != 9) {
      return;
    }
    //console.log('next : '+next+'\nprev : '+prev);
    if ((!e.shiftKey && !!next) || (e.shiftKey && !!prev)) {
      setTimeout(function () {
        //console.log('target : '+target);
        $('[data-focus="' + target + '"]').focus();
      }, 1);
    }
  });
}
function tooltip() {
  var openBtn = '[data-tooltip]',
    closeBtn = '.tooltip-close';

  function getTarget(t) {
    return $(t).attr('data-tooltip');
  }

  function open(t) {
    var showTarget = $('[data-tooltip-con="' + t + '"]');
    showTarget.show();
    layerFunc(showTarget);
    showTarget.focus();
    showTarget.find('.tooltip-close').data('activeTarget', t);

  }


  function close(t) {
    var activeTarget = $('[data-tooltip-con="' + t + '"]');
    activeTarget.hide();
    $('[data-tooltip="' + t + '"]').focus();
    deleteBlock();
  }
  $(document).on('click', openBtn, function (e) {
    e.preventDefault();
    open(getTarget(e.target));
  }).on('click', closeBtn, function (e) {
    e.preventDefault();
    close($(this).data('activeTarget'));
  });
}
//레이어팝업 높이 판단하여 block와 position 컨트롤
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



  //예적금담보대출 약관동의 예외처리로 작업
  //공통으로 약관 팝업띄울때만 height 처리하게 바꿈
  if (_target.hasClass('agree-layer')) {
    //20180711 약관레이어팝업
    var winH = localStorage.getItem("winH");
    var layerH = winH * 0.95;
    var layertitH = _target.find('.pop-tit').height();
    var layerScrollH = layerH - (layertitH + 195);
    $('.agree-scroll').height(layerScrollH);
  }
}
//block
var winScrollTop;//180607추가
function addBlock(_full) {
  if (_full == 'full') {
   // $('body').append('<div class="block"></div>').css({ 'height': $('document').outerHeight, 'position': 'absolute' });
  } else if (_full == 'fixed') {
    //$('body').append('<div class="block2"></div>'); //180529
  } else {
   // $('body').append('<div class="block"></div>'); //180529
  }
  /* if(_full != 'removeEvent'){
       $('.block').on('click', function() {
           if ($('.block').length > 0) {
               $('.block').fadeOut(300).empty().remove();
               $('.layer-up').addClass('close').removeClass('show');
           }
       });
   }*/
  $('.close').on('click', function () {
    $('.block').trigger('click');
  });
}
function deleteBlock(_full) {
  if (_full == 'fixed') {
    $('.block2').fadeOut(300);
    $('.block2').remove();
  } else {
    $('.block').fadeOut(300);
    $('.block').detach();
  }
  $('body, html, .wrap').css({ 'height': '', 'overflow': '' });
  //$('body').css({'position':'relative','overflow-x':'hidden'}); 2020-07-09 
  $('body').removeAttr('style'); //2020-07-09
  $(window).scrollTop(winScrollTop);//180607추가
}
//popup
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
//open popup slideup 2020-03-31
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
//close popup slideDown 2020-03-31
function closePopupUp(id) {
  deleteBlock();
  //ADD eunji 2020-10-05
  $('#' + id).scrollTop(0);
  $('#' + id).fadeOut(600);
}

jQuery(function ($) {
  /* Checkbox  */
  var checkBox = $('.ctm-check');
  var addClassCheckBox = function ($input) {
    if ($input.prop('checked')) {
      $input.parent().addClass('checked');
    } else {
      $input.parent().removeClass('checked');
    }
  };
  checkBox.on('change', 'input', function () {
    addClassCheckBox($(this));
  });
});
//radio, checkbox custom style
function setupLabel() {
  if ($('.check > input').length) {
    $('.check').each(function () {
      $(this).removeClass('c-on');
    });
    $('.check > input').each(function () {
      //$(this).prop('disabled',true);
      if ($(this).is(':checked')) {
        $(this).parent('label').addClass('c-on');
      } else {
        $(this).parent('label').removeClass('c-on');
      }
    });
  }
  if ($('.radio input').length) {
    $('.radio').each(function () {
      $(this).removeClass('r-on');
    });
    $('.radio input:checked').each(function () {
      $(this).closest('label').addClass('r-on');
    });
  }
}

/* selectbox */
jQuery.fn.extend({
  selectbox: function (options) {
    return this.each(function () {
      new jQuery.SelectBox(this, options);
    });
  }
});

/* pawel maziarz: work around for ie logging */
if (!window.console) {
  var console = {
    log: function (msg) { }
  };
}

$(document).ready(function () {
  //$('select').selectbox();
  $("body").on("click", ".check", function (e) {
    if ($(this).find('input').is(':checked')) {
      //$(this).find('input').prop("checked", false);
    } else {
      //$(this).find('input').prop("checked", true);
    }
    setupLabel();
  });
  $("body").on("click", ".radio", function (e) {
    setupLabel();
  });
  setupLabel();
});
jQuery.SelectBox = function (selectobj, options) {

  var opt = options || {};
  opt.inputType = opt.inputType || "input";
  opt.inputClass = opt.inputClass || "selectbox";
  opt.containerClass = opt.containerClass || "selectbox-wrapper";
  opt.hoverClass = opt.hoverClass || "current";
  opt.currentClass = opt.currentClass || "selected";
  opt.groupClass = opt.groupClass || "groupname"; //css class for group
  //opt.maxHeight = opt.maxHeight || 200; // max height of dropdown list
  opt.loopnoStep = opt.loopnoStep || false; // to remove the step in list moves loop
  opt.onChangeCallback = opt.onChangeCallback || false;
  opt.onChangeParams = opt.onChangeParams || false;
  opt.debug = opt.debug || false;
  opt.selectColor = opt.selectColor || "#000"; //css class for group

  var elm_id = selectobj.id;
  var active = 0;
  var inFocus = false;
  var hasfocus = 0;
  var hasfocusContainer = -1;
  //jquery object for select element
  var $select = jQuery(selectobj);
  // jquery container object
  var $container = setupContainer(opt);
  //jquery input object
  var $input = setupInput(opt);
  // hide select and append newly created elements
  $select.hide().before($input).before($container);
  var defaultColor = $input.css('color');
  init();

  $input
    .click(function () {
      if (!inFocus) {
        $container.toggle();
      }
    })
    .focus(function () {
      if (hasfocus > 0 && hasfocusContainer > 0) {
        hasfocusContainer = -1;
        setTimeout(function () { $input.blur(); }, 300);
      }
      else if ($container.not(':visible')) {
        inFocus = true;
        $container.show();
      }
    })
    .keydown(function (event) {
      switch (event.keyCode) {
        case 38: // up
          event.preventDefault();
          moveSelect(-1);
          break;
        case 40: // down
          event.preventDefault();
          moveSelect(1);
          break;
        case 9:  // tab
          hideMe();
          break;
        case 13: // return
          event.preventDefault(); // seems not working in mac !
          $('li.' + opt.hoverClass).trigger('click');
          break;
        case 27: //escape
          hideMe();
          break;
      }
    })
    .blur(function (e) {
      if ($container.is(':visible') && hasfocusContainer > 0) {
        $input.focus();
      } else {
        hasfocusContainer = -1;
        hideMe();
      }
    });

  $container.on({
    mouseenter: function () {
      hasfocusContainer = 1;
    },
    mouseleave: function () {
      hasfocusContainer = -1;
    }
  });

  function hideMe() {
    hasfocus = 0;
    $container.hide();
  }

  function init() {
    $container.append(getSelectOptions($input.attr('id'))).hide();
    //var width = $input.css('width');
    //var width = $input.outerWidth()-2;
    var width = $input.outerWidth() - 2;
    if ($container.height() > opt.maxHeight) {
      //$container.width(parseInt(width)+parseInt($input.css('paddingRight'))+parseInt($input.css('paddingLeft')));
      $container.width(width);
      $container.height(opt.maxHeight);
    } else $container.width(width);
  }

  function setupContainer(options) {
    var container = document.createElement("div");
    $container = jQuery(container);
    $container.attr('id', elm_id + '_container');
    $container.addClass(options.containerClass);
    $container.css('display', 'none');
    return $container;
  }

  function setupInput(options) {
    if (opt.inputType == "span") {
      var input = document.createElement("span");
      var $input = jQuery(input);
      $input.attr("id", elm_id + "_input");
      $input.addClass(options.inputClass);
      $input.attr("tabIndex", $select.attr("tabindex"));
    } else {
      var input = document.createElement("input");
      var $input = jQuery(input);
      $input.attr("id", elm_id + "_input");
      $input.attr("type", "text");
      $input.addClass(options.inputClass);
      $input.attr("autocomplete", "off");
      $input.attr("readonly", "readonly");
      $input.attr("tabIndex", $select.attr("tabindex")); // "I" capital is important for ie
      $input.css("width", $select.parent().outerWidth() - 2);
      //$input.css("width", $select.outerWidth()-2);
    }
    return $input;
  }

  function moveSelect(step) {
    var lis = jQuery("li", $container);
    if (!lis || lis.length == 0) return false;
    // find the first non-group (first option)
    firstchoice = 0;
    while ($(lis[firstchoice]).hasClass(opt.groupClass)) firstchoice++;
    active += step;
    // if we are on a group step one more time
    if ($(lis[active]).hasClass(opt.groupClass)) active += step;
    //loop through list from the first possible option
    if (active < firstchoice) {
      (opt.loopnoStep ? active = lis.size() - 1 : active = lis.size());
    } else if (opt.loopnoStep && active > lis.size() - 1) {
      active = firstchoice;
    } else if (active > lis.size()) {
      active = firstchoice;
    }
    scroll(lis, active);
    lis.removeClass(opt.hoverClass);

    jQuery(lis[active]).addClass(opt.hoverClass);
  }

  function scroll(list, active) {
    var el = jQuery(list[active]).get(0);
    var list = $container.get(0);

    if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;
    } else if (el.offsetTop < list.scrollTop) {
      list.scrollTop = el.offsetTop;
    }
  }

  function setCurrent() {
    var li = jQuery("li." + opt.currentClass, $container).get(0);
    var ar = ('' + li.id).split('_');
    var el = ar[ar.length - 1];
    if (opt.onChangeCallback) {
      $select.get(0).selectedIndex = $('li', $container).index(li);
      opt.onChangeParams = { selectedVal: $select.val() };
      opt.onChangeCallback(opt.onChangeParams);
    } else {
      $select.val(el);
      $select.change();
    }
    //console.log($select.get(0).selectedIndex);
    if ($select.get(0).selectedIndex != 0) $input.css('color', opt.selectColor);
    else $input.css('color', defaultColor)
    if (opt.inputType == 'span') $input.html($(li).text());
    else $input.val($(li).text());
    return true;
  }

  // select value
  function getCurrentSelected() {
    return $select.val();
  }

  // input value
  function getCurrentValue() {
    return $input.val();
  }

  function getSelectOptions(parentid) {
    var select_options = new Array();
    var ul = document.createElement('ul');
    select_options = $select.children('option');
    if (select_options.length == 0) {
      var select_optgroups = new Array();
      select_optgroups = $select.children('optgroup');
      for (x = 0; x < select_optgroups.length; x++) {
        select_options = $("#" + select_optgroups[x].id).children('option');
        var li = document.createElement('li');
        li.setAttribute('id', parentid + '_' + $(this).val());
        li.innerHTML = $("#" + select_optgroups[x].id).attr('label');
        li.className = opt.groupClass;
        ul.appendChild(li);
        select_options.each(function () {
          var li = document.createElement('li');
          li.setAttribute('id', parentid + '_' + $(this).val());
          li.innerHTML = $(this).html();
          if ($(this).is(':selected')) {
            $input.html($(this).html());
            $(li).addClass(opt.currentClass);
          }
          ul.appendChild(li);
          $(li)
            .mouseover(function (event) {
              hasfocus = 1;
              if (opt.debug) console.log('over on : ' + this.id);
              jQuery(event.target, $container).addClass(opt.hoverClass);
            })
            .mouseout(function (event) {
              hasfocus = -1;
              if (opt.debug) console.log('out on : ' + this.id);
              jQuery(event.target, $container).removeClass(opt.hoverClass);
            })
            .click(function (event) {
              var fl = $('li.' + opt.hoverClass, $container).get(0);
              if (opt.debug) console.log('click on :' + this.id);
              $('li.' + opt.currentClass, $container).removeClass(opt.currentClass);
              $(this).addClass(opt.currentClass);
              setCurrent();
              $select.get(0).blur();
              hideMe();
            });
        });
      }
    } else select_options.each(function () {
      var li = document.createElement('li');
      li.setAttribute('id', parentid + '_' + $(this).val());
      li.innerHTML = $(this).html();
      if ($(this).is(':selected')) {
        $input.val($(this).text());
        $(li).addClass(opt.currentClass);
      }
      ul.appendChild(li);
      $(li)
        .mouseover(function (event) {
          hasfocus = 1;
          if (opt.debug) console.log('over on : ' + this.id);
          jQuery(event.target, $container).addClass(opt.hoverClass);
        })
        .mouseout(function (event) {
          hasfocus = -1;
          if (opt.debug) console.log('out on : ' + this.id);
          jQuery(event.target, $container).removeClass(opt.hoverClass);
        })
        .click(function (event) {
          var fl = $('li.' + opt.hoverClass, $container).get(0);
          if (opt.debug) console.log('click on :' + this.id);
          $('li.' + opt.currentClass, $container).removeClass(opt.currentClass);
          $(this).addClass(opt.currentClass);
          setCurrent();
          $select.get(0).blur();
          hideMe();
        });
    });
    return ul;
  }
};

// select 삭제  function
function selClear(selId) {
  $(selId + "_input").remove();
  $(selId + '_container').remove();
}

//font Control
function fontPlus() {
  $('*').each(function () {
    var _fontSize = parseInt($(this).css('font-size')) * 1.1;
    //console.log(_fontSize);
    $(this).css({ 'font-size': _fontSize + "px" });
  });
}
function fontMinus() {
  $('*').each(function () {
    var _fontSize = parseInt($(this).css('font-size')) / 1.1;
    //console.log(_fontSize);
    $(this).css({ 'font-size': _fontSize + "px" });
  });
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

/**
 * 해당 포인트를 기준으로 중간에 걸칠경우
 * @param centerPos : 기준선
 * @param targetSize : 오브젝트의 크기
 * @return
 *
 */
function getCenterPos(centerPos, targetSize) {
  var pos = centerPos - (targetSize / 2);
  return pos;
}

/**
 * 랜덤값 간단하게 뽑아오기
 * @param min : 가장 적은값
 * @param max  : 가장 높은값
 * @return
 *
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


/**
 * 브라우저 종류 알기
 * if(getBrowser.name == "msie") { ... }
 *
 */
var getBrowser = (function () {
  var s = navigator.userAgent.toLowerCase();

  var match = /(webkit)[ \/](\w.]+)/.exec(s) ||
    /(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) ||
    /(trident)(?:.*rv:([\w.]+))?/.exec(s) ||
    /(msie) ([\w.]+)/.exec(s) ||
    /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
    [];
  return { name: match[1] || "", version: match[2] || "0" };
}());

/**
 * PC 인지 모바일인지 판단하기
 * return true : pc
 * return false : mobile
 *
 */
var isPc = (function () {
  var filter = "win16|win32|win64|mac";
  var isPc = true;

  if (navigator.platform) {
    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
      //("모바일 기기에서 접속");
      return false;
    } else {
      //("PC에서 접속");
      return true;
    }
  }
});



/**
 * Input
 *
 */
$(document).ready(function () {
  var placeholderTarget = $('.input-box input[type="text"], .input-box input[type="password"]');

  //포커스시
  placeholderTarget.on('focus', function () {
    $(this).siblings('label').fadeOut('fast');
    $(this).siblings('span.fade').fadeOut('fast');
  });

  //포커스아웃시
  placeholderTarget.on('focusout', function () {
    if ($(this).val() == '') {
      $(this).siblings('label').fadeIn('fast');
      $(this).siblings('span.fade').fadeIn('fast');
    }
  });
});

/**
 * customAlert
 * @param _option.title : 제목
 * @param _option.message : 내용
 * @param _option.type : confirm or anything
 * @param _option.btn_txt1 : 버튼명
 * @param _option.btn_txt2 : 버튼명
 * @param _callback1 : 확인버튼
 * @param _callback1 : 취소버튼
 * @return
 *
 */
function customAlert(_option, _callback1, _callback2) {
  var _html = "";
  _html += "<div id=\"customAlertLayer\" class=\"custom-alert-layer\">";
  _html += "<p class=\"title\">" + _option.title + "</p>";
  _html += "<p class=\"message\">" + _option.message + "</p>";
  _html += "<div class=\"btn-wrap flex-con\">";
  if (_option.type == "confirm") {
    if (typeof _option.btn_txt1 != "undefined") {
      _html += "<button type=\"button\" name=\"button\" class=\"col1 btn md darkgray c-cancle\">" + _option.btn_txt1 + "</button>";
    } else {
      _html += "<button type=\"button\" name=\"button\" class=\"col1 btn md darkgray c-cancle\">취소</button>";
    }
    if (typeof _option.btn_txt2 != "undefined") {
      _html += "<button type=\"button\" name=\"button\" class=\"col2 btn md gray active c-confirm\">" + _option.btn_txt2 + "</button>";
    } else {
      _html += "<button type=\"button\" name=\"button\" class=\"col2 btn md gray active c-confirm\">확인</button>";
    }
  } else {
    if (typeof _option.btn_txt1 != "undefined") {
      _html += "<button type=\"button\" name=\"button\" class=\"col1 btn md darkgray c-cancle\">" + _option.btn_txt1 + "</button>";
    }
  }

  _html += "</div>";
  _html += "</div>";
  $('body').append(_html.replace(/(\n|\r\n)/g, '<br>'));
  // addBlock("fixed");
  layerFunc($('#customAlertLayer'));
  $('#customAlertLayer .c-confirm').on('click', function () {
    if (typeof _callback1 === "function") {
      _callback1();
    }
    customAlertDel();
  });
  $('#customAlertLayer .c-cancle').on('click', function () {
    if (typeof _callback2 === "function") {
      _callback2();
    }
    customAlertDel();
  });
  function customAlertDel() {
    deleteBlock("fixed");
    $('#customAlertLayer').fadeOut().empty().remove();
  }
}


function addLoading() {
  var num = Math.floor(Math.random() * 2) + 1;
  addLoading2(num);
}

function addLoading2(_num) {
  var _html = "";
  var num;
  _html += "<div id=\"loadingLayer\" class=\"loading-layer\">";
  _html += "</div>";
  $('body').append(_html);
  if (_num == 2) {
    $("#loadingLayer").addClass('type2');
  }
  $("#loadingLayer").animateSprite({
    fps: 5,
    loop: true,
    complete: function () {

    }
  });
  //$('html').addClass('scroll-y');
  layerFunc($('#loadingLayer'));
}

function removeLoading() {
  $('#loadingLayer').fadeOut().empty().remove();
  deleteBlock();
}
//roll
jQuery(function () {
  var rollover = {
    newimage: function (src) {
      return src.substring(0, src.search(/(\.[a-z]+)$/)) + '_on' + src.match(/(\.[a-z]+)$/)[0];
    },
    oldimage: function (src) {
      return src.replace(/_on\./, '.');
    },
    init: function () {
      $('.roll').hover(
        function () {
          $(this).attr('src', rollover.newimage($(this).attr('src')));
        }, function () {
          $(this).attr('src', rollover.oldimage($(this).attr('src')));
        });
    }
  };
  rollover.init();
});
//숫자 콤마
function addComma(data_value) {
  return Number(data_value).toLocaleString('en').split(".")[0];
}
function removeComma(data_value) {  // 콤마제거
  if (typeof data_value == "undefined" || data_value == null || data_value == "") {
    return "";
  }
  var txtNumber = '' + data_value;
  var replaceNum = txtNumber.replace(/(,)/g, "")
  return parseInt(replaceNum);
}


