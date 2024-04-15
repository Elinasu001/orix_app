window.onload = function(){

('use strict');

//DOM
const form = document.querySelector('#form-wrap'); //데이터를 전송하는 form
const checkAll = document.querySelector('.input-check-all input');// 모두 동의 체크박스
const checkBoxes = document.querySelectorAll('.input-check input');// 모두 동의를 제외한 3개의 체크박스//// querySelector메서드는 문서에서 해당하는 첫 번째 요소반환 따라서 checkBoxes는 단일 요소가 됨 이를 해결하기 위해 querySelectorAll 사용하여 해당 클래스 모든 요소를 가져와야함. //checkBoxes는NodeList가 되며, nodelist에는 forEach메서드가 있음.
const submitButton = document.querySelector('button.btn.btn-primary'); // 확인 버튼 개발에서 따로 관리 할 수 있으므로 일단 주석 처리


//Oject(객체) - true&false 값으로 상태 확인 - 체크박스 각각의 id와 동일하게 작성한 후 default 값을 줌. (임시저장공간)
const agreements = {
    termsOfService: false,// 첫번째 필수동의 체크박스
    privacyPolicy: false,// 두번째 필수동의 체크박스
    allowPromotions: false,// 이벤트 수신동의 체크박스
};

form.addEventListener('submit', (e) => e.preventDefault());

/** 3개 체크박스 **/
//3개의 체크 박스에 대한 이벤트 //체크박스 input이벤트 발생할 때마다 toggleCheckbox(); 함수 실행
//input 이벤트는 <input> <select> 및 <textarea> 요소의 value 속성이 바뀔 때마다 발생.
checkBoxes.forEach((item) => item.addEventListener('input', toggleCheckbox));

function toggleCheckbox(e) {//toggleCheckbox함수는 input 이벤트가 발생된 요소를 받아와서
    const { checked, id } = e.target;//id와 checked(체크 상태) 값을 변수에 담고
    agreements[id] = checked;//agreements object에 id값과 동일한 곳에 checked 값을 넣어준 다음에
    this.parentNode.classList.toggle('active');
    checkAllStatus();// checkAllStatus()실행하고
    toggleSubmitButton();// toggleSubmitButton()함수 실행
};


/** 3개의 체크박스의 상태를 확인해서 모두동의 체크박스의 체크 여부를 정하는 함수 **/
function checkAllStatus() {
    const { termsOfService, privacyPolicy, allowPromotions } = agreements;//agreements objects의 요소들을 변수로 담고
    if(termsOfService && privacyPolicy&&allowPromotions) {
        checkAll.checked = true;//3개의 체크박스가 모두 체크상태이면 ture
    }else {
        checkAll.checked = false;//아니면 false
    }
};

//필수동의 체크 여부 버튼 활성화 or 비활성화
function toggleSubmitButton() {
    const { termsOfService, privacyPolicy } = agreements;
    if(termsOfService && privacyPolicy) {
        submitButton.disabled = false;//버튼 활성화
    }else {
        submitButton.disabled = true;//버튼 비활성화
    }
};

/** 모두동의 **/
//모두동의 체크 또는 해제하게 되면 모든 체크박스들 체크 또는 해제 그리고 그 체크 상태를 위해 작성한 object에 보내주고 버튼을 활성화 또는 비활성화 함수 실행
//모두동의 체크에 click event가 발생하면 코드 실행
checkAll.addEventListener('click', (e) => {
    const { checked } = e.target;//모두동의 체크박스 요소 (target의 checked 값 갖옴.)
    if (checked) {//checkBoxe의 체크 상태 확인할 수 있는 checked는 true(체크 o),false(체크 n) 값 반환.//체크 되면 수행문 실행해야 되니 if문 작성
        checkBoxes.forEach((item) => {//event target에서 받은 checked 값이 ture체크면 forEach문을 통해 체크박스 요소들 하나씩 돌려 수행
            item.checked = true;//item(체크박스)
            agreements[item.id] = true;//위에서 작성한 object에서 체크박스의 id값과 동일하게 작성한 것을 볼 수 있음 > item의 id값을 받아와서 object에서 작성한 id값과 동일한 부분에 true값을 넣어주기.체크박스의 체크 여부(true & false)를 확인하고 버튼을 활성화할지 비활성화할지 정해야 하기 때문입니다.
            item.parentNode.classList.add('active');
        });
    } else {
        checkBoxes.forEach((item) => {//forEach문을 돌려 체크를 해제하고 요소의 id의 Objcet 값들을 false로 보냄
            item.checked = false;
            agreements[item.id] = false;
            item.parentNode.classList.remove('active');
        });
    }
    toggleSubmitButton();//if문 끝나면 바로 함수 실행
});


}





