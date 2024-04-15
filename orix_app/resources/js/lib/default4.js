window.onload = function(){

    /** //약관동의 **/
    class AgreementManager {
        constructor() {
            // 초기 agreement 상태 설정
            this.agreements = {
                termsOfService: false,
                privacyPolicy: false,
                allowPromotions: false,
                allowPromotions11: false,
                allowPromotions22: false,
            };
            // DOM 요소들을 참조
            this.form = document.querySelector('#formWrap');
            this.checkAll = document.querySelector('.input-check-all input');
            this.checkBoxes = document.querySelectorAll('.input-check input');
            this.submitButton = document.querySelector('button.btn.btn-primary');
        }

        // 체크박스 상태를 변경하는 메소드
        toggleCheckbox(e) {//이벤트 객체 'e'
            const { checked, id } = e.target;//checked 와 id값 추출
            this.agreements[id] = checked;//추출된 값을 checked와 id변수에 할당 후 agreements 객체 내부의 해당하는 체크박스에 대한 상태 업데이트 > 객체 비구조화 할당(destructuring assignment) 사용
            // 체크박스 상태에 따라 활성/비활성 클래스를 토글
            this.checkBoxes.forEach(item => {
                if (item.id === id) { // 현재 이벤트 발생시킨 체크박스의 id와 현재 반복되고 있는 체크박스의 id가 일치하는지 확인.
                    item.parentNode.classList.toggle('active', checked);//이는 클릭된 체크박스의 부모 노드에만 active 클래스를 토글하기 위함입니다.
                }
            });
            // 모든 체크박스 상태를 확인하여 모두 동의 체크박스 상태 업데이트
            this.checkAllStatus();
            // submit 버튼 상태 업데이트
            this.toggleSubmitButton();
        }

        // 모든 체크박스의 상태를 확인하여 모두 동의 체크박스 상태를 업데이트하는 메소드 [필수],[선택]
        checkAllStatus() {
            const { termsOfService, privacyPolicy, allowPromotions, allowPromotions11, allowPromotions22 } = this.agreements;
            this.checkAll.checked = termsOfService && privacyPolicy && allowPromotions && allowPromotions11 && allowPromotions22;
        }

         // submit 버튼 활성/비활성화 메소드 [필수]
        toggleSubmitButton() {
            const { termsOfService, privacyPolicy } = this.agreements;
            this.submitButton.disabled = !(termsOfService && privacyPolicy);
        }

        // 초기화 메소드 - 체크박스 이벤트 리스너 등록
        initialize() {
            this.checkBoxes.forEach(item => item.addEventListener('input', this.toggleCheckbox.bind(this)));
            // 모두 동의 체크박스에 대한 클릭 이벤트 리스너 등록
            this.checkAll.addEventListener('click', (e) => {
                const { checked } = e.target;
                // 모든 체크박스의 상태를 변경하고 업데이트
                this.checkBoxes.forEach(item => {
                    item.checked = checked;
                    this.agreements[item.id] = checked;
                    // 체크박스 상태에 따라 활성/비활성 클래스를 토글
                    item.parentNode.classList.toggle('active', checked);
                });
                // submit 버튼 상태 업데이트
                this.toggleSubmitButton();
            });
            // 초기 submit 버튼 상태 업데이트
            this.toggleSubmitButton();
        }
    }

    // AgreementManager 클래스의 인스턴스 생성
    const agreementManager = new AgreementManager();
    // 초기화 메소드 호출
    agreementManager.initialize();
    /** 약관동의// **/
    
}