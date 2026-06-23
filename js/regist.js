
// 자동 탭
window.onload = function(){
    const ssn1 = document.getElementById("ssn1")
    ssn1.addEventListener("keyup", () => { // keyup이 발생할 때 익명함수 호출
        if(ssn1.value.length >= 6){ // 6번째를 누르는 순간
            document.getElementById("ssn2").focus() // ssn2에 focus를 맞춰라
        }
    })

    // 정보 한 번이라도 수정하면 다시 인증해야함
    const ssn = document.querySelectorAll(".ssn") // 클래스 ssn을 배열로 가져옴
    ssn.forEach((s) => { // 모두 탐색하면서 반복문과 같은 역할
        // console.log(s) : s는 객체 = s는 각각 앞자리, 뒷자리 input객체 찍힘(console)
        s.addEventListener("input", () => { // input이 일어나게 되면(문자 입력)
            document.getElementById("ssncheck").value = "n" // ssncheck를 무조건 n으로 돌려라
        })
    }) 
}



function sendit(){
    const userid = document.getElementById("userid")
    const userpw = document.getElementById("userpw")
    const userpw_re = document.getElementById("userpw_re")
    const name = document.getElementById("name")
    const hp = document.getElementById("hp")
    const email = document.getElementById("email")
    const ssncheck = document.getElementById("ssncheck")


    // [userid]
    const expIdText = /^[A-Za-z0-9]{4,20}$/ // 4글자이상, 20자이하 (띄어쓰기 안댐!!!)

    /*
        [userpw]
        (?=.*): 어디엔가 원하는 패턴이 하나라도 있어야 함
        (?=.*[A-za-z]): 영문자가 최소 1개이상 있어야 함
        (?=.*\d): 숫자가 최소 1개이상 있어야 
        (?=.*[!@#$%^&*()]): 제시된 특수문자 최소 1개이상 있어야 함
    */
    const expPwText = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,20}$/

    // [name]
    const expNameText = /^[가-힣]+$/

    // [hp]
    // const expHpText = /^010\d{3,4}\d{4}$/
    const expHpText = /^\d{3}-\d{3,4}-\d{4}$/

    // [email]
    // const expEmailText = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    const expEmailText = /^[A-Za-z0-9\-\.]+@[A-Za-z0-9\-]+\.[A-Za-z]+$/



    // [userid]
    if(userid.value === ""){
        // 입력값이 없다면
        alert("아이디를 입력하세요")
        userid.focus()
        return false // false를 해줘야 페이지 넘어가지않고 포커스됨.
    }
    if(!expIdText.test(userid.value)){ // !를 붙여 통과하지 못하면 if문에 들어오도록
        alert("아이디는 4자 이상 20자 이하의 영문자 또는 숫자로 입력하세요")
        userid.focus()
        return false
    }

    // [userpw]
    if(!expPwText.test(userpw.value)){
        alert("비밀번호는 8자 이상 20자 이하의 영문자, 숫자, 특수문자를 한 자 이상 꼭 포함해야합니다.")
        userpw.focus()
        return false
    }
    // [userpw_re]
    if(userpw.value != userpw_re.value){
        alert("비밀번호가 일치하지 않습니다.")
        userpw_re.focus()
        return false
    }

    // [name]
    if(!expNameText.test(name.value)){
        alert("이름은 한글로 입력하세요")
        name.focus()
        return false
    }
    
    // [hp]
    if(!expHpText.test(hp.value)){
        alert("휴대폰번호를 올바르게 입력해주세요\n하이픈을 꼭 입력하세요")
        hp.focus()
        return false
    }

    // [email]
    if(!expEmailText.test(email.value)){
        alert("이메일 형식을 올바르게 입력해주세요")
        email.focus()
        return false
    }

    // [ssncheck]
    if(ssncheck.value == "n"){
        alert("주민등록번호 인증버튼을 눌러주세요")
        return false
    }

}



// 주민번호 인증하기
function checkSsn(){
    // 값 바꾸기를 해야하기때문에 let으로 설정
    let ssncheck = document.getElementById("ssncheck")
    const ssn1 = document.getElementById("ssn1")
    const ssn2 = document.getElementById("ssn2")

    // 주민번호 일단 합침
    const ssn = ssn1.value + ssn2.value

    // 곱할숫자
    const checkNum = [2,3,4,5,6,7,8,9,2,3,4,5]

    // 곱한것 총 합
    let total = 0

    // 반복문으로 곱하기
    for(let i=0; i<checkNum.length; i++){
        total += ssn[i] * checkNum[i]
    }


    // 검사
    result = (11 - (total % 11)) % 10

    // 비교
    if(result == ssn[12]){
        alert("인증되었습니다")
        ssncheck.value = "y" // 인증되면 hidden input y로 값 바뀜
    }else{
        alert("주민번호를 다시 입력하세요")
        ssn1.focus()
        return false
    }


}

/* 
    0 0 1 0 1 1 3 0 6 8 5 1   8
    2 3 4 5 6 7 8 9 2 3 4 5
    0 + 0 + 4 + 0 + 6 + 7 + 2 4 + 0 + 12 + 24 + 20 + 5 = 102
    102 % 11 =3
    11 - 3 = 8 (단, 값이 10이상일 경우 : 10으로 나눈 나머지 값을 구함 그럼 0또는 1이 됨 
    > 이때 이 값이 빼놓은 8과 같으면 주민번호 유효함)


    0 2 0 4 1 6 4 6 8 5 5 1   4
    2 3 4 5 6 7 8 9 2 3 4 5 

    0 6 0 20 6 42 32 54 16 15 20 5
    216 % 11 = 7
    11 - 7 = 4
*/