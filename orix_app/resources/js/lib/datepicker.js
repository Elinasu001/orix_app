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
        monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        dayNamesMin: ['일','월','화','수','목','금','토'],
        dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
        showOn: 'both',
        showAnim: '',
        onSelect: function () {
            dimDisplay('none');
        },
        beforeShow: function(input, inst) {
            disableScroll();
        },
        onClose: function() {
            enableScroll();
        }
    }).datepicker("setDate", new Date());

    $('#datepicker').datepicker('setDate', 'today'); // set date as today

    // custom datepicker 
    var dateInput = $('.datepicker'),
        dateIcon = $('.ui-datepicker-trigger'),
        calendar = $('#ui-datepicker-div');

    // add back layer
    var dim = $('<div class="datepicker-layer"></div>');
    calendar.before(dim);

    // back layer show
    dateInput.focus(function () {
        if (calendar.css('display') === 'block') {
            dimDisplay('block');
        }
    });

    // back layer hide
    $(document).on('click', '.datepicker-layer', function () {
        dimDisplay('none');
    });

    function dimDisplay(display) {
        $('.datepicker-layer').css('display', display);
    }

    /** Scroll common **/
    function disableScroll() {
        $('body').css('overflow', 'hidden');
    }

    function enableScroll() {
        $('body').css('overflow', 'auto');
    }

    // back layer click/touch event (if needed)
    // $(document).on('click touchstart', '.datepicker-layer', function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    // });
});