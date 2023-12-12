
$(document).ready(function() {

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


    /**  3자리 수마다 콤마 적용 **/
    $(document).on('keyup', 'input[inputmode=numeric]', function (event) {
        this.value = this.value.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
        this.value = this.value.replace(/,/g, ''); // ,값 공백처리
        this.value = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가
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
        }else{
			//선택약관(상품서비스) 전체동의
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
        var terms_id = $(this).attr('terms-pop');
        $(".layerpopup").removeClass('on');
        $("#"+terms_id).addClass('on');
        $('body').css("overflow", "hidden");

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
    // terms-pop 약관 팝업
    $('.btn-layer-close').on('click', function() {
        $(".layerpopup").removeClass('on');
        $('body').css("overflow", "auto");

    });




    

});





