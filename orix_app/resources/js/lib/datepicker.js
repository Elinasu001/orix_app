$(function () {
    $('.datepicker, .timepicker').wrap('<div class="input_wrap"></div>');

    /** datepicker custom **/
    var datepicker = $('.datepicker');

    datepicker.datepicker({
        dateFormat: 'yy-mm-dd',
        showOtherMonths: true,
        showMonthAfterYear: true,
        changeYear: true,
        changeMonth: true,
        monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'], //달력의 월 부분 텍스트
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], //달력의 월 부분 Tooltip 텍스트
        dayNamesMin: ['일','월','화','수','목','금','토'], //달력의 요일 부분 텍스트
        dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'], //달력의 요일 부분 Tooltip 텍스트
        showOn: 'both',
        buttonImage: ('https://cdn-icons-png.flaticon.com/512/2838/2838779.png'),
        buttonImageOnly: true,
        showAnim: '',
        onSelect: function () {
            dimDisplay('none'); //hide back layer when date selected
        },
        // onSelect: function () {
        //     enableScroll(''); // 날짜 선택 시 스크롤 잠금 해제
        // },
        beforeShow: function(input, inst) {
            disableScroll(); // datepicker가 열릴 때 스크롤 잠금
        },
        onClose: function() {
            enableScroll(); // datepicker가 닫힐 때 스크롤 잠금 해제
        }
    });

 

    $('#datepicker').datepicker('setDate', 'today'); // set date as today

    // custom datepicker 
    const dateInput = document.querySelector('.datepicker'),
        dateIcon = document.querySelector('.ui-datepicker-trigger'),
        calendar = document.querySelector('#ui-datepicker-div');

    // add back layer
    const dim = document.createElement('div');
    dim.classList.add('datepicker-layer');

    calendar.before(dim);


    // back layer show
    dateInput.addEventListener('focus', function () {
        if (calendar.style.display === 'block') {
            dimDisplay('block');
        }
    })

    dateIcon.addEventListener('click', function () {
        if (calendar.style.display == 'block') {
            dimDisplay('block');
        }

    })


    //back layer hide
    const layer = document.querySelector('.datepicker-layer');

    window.addEventListener('click', function (e) {
        if (e.target === layer) {
            dimDisplay('none');
        }
    });

    // back layer display control
    function dimDisplay(display) {
        layer.style.display = display;
    }

     /** 스크롤 공통 **/
    // 스크롤을 잠그는 함수
    function disableScroll() {
        $('body').css('overflow', 'hidden');
    }

    // 스크롤을 다시 활성화하는 함수
    function enableScroll() {
        $('body').css('overflow', 'auto');
    }

    // // back layer click/touch event
    // layer.addEventListener('click', function (e) {
    //     e.preventDefault(); // 기본 클릭 이벤트 동작 막기
    //     e.stopPropagation(); // 클릭 이벤트 전파 방지
    // });

    // layer.addEventListener('touchstart', function (e) {
    //     e.preventDefault(); // 기본 터치 이벤트 동작 막기
    //     e.stopPropagation(); // 터치 이벤트 전파 방지
    // });


});