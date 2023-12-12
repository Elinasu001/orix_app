//신규
$(document).ready(function(){

   /*
	* 전체동의
	*/
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


	/*
	* 개별 약관
	*/

	$('.check').on('click', function() {
		var totalNum = $(".level2 fieldset > .check").length;	
		var checkNum = $(".level2 fieldset > .check:checked").length;

		var dmTotalNum	= $(".level3 .check").length;
		var dmCheckNum = $(".level3 .check:checked").length;

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
});