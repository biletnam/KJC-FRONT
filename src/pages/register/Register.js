import React, {Component} from 'react';
import {Col, Form, FormGroup, Label, Input} from 'reactstrap';
import MaskedInput from 'react-text-mask';
import './Register.css';
class Register extends Component {
    componentDidMount () {
        const script = document.createElement("script");
        script.src = "https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 도로명 조합형 주소 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }
                // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
                if(fullRoadAddr !== ''){
                    fullRoadAddr += extraRoadAddr;
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample4_postcode').value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById('sample4_roadAddress').value = fullRoadAddr;
                document.getElementById('sample4_jibunAddress').value = data.jibunAddress;

                // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                if(data.autoRoadAddress) {
                    //예상되는 도로명 주소에 조합형 주소를 추가한다.
                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    document.getElementById('guide').innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';

                } else if(data.autoJibunAddress) {
                    var expJibunAddr = data.autoJibunAddress;
                    document.getElementById('guide').innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';

                } else {
                    document.getElementById('guide').innerHTML = '';
                }
            }
        }).open();
    }
    render() {
        return (
            <div>
                <div className="page-title">회원가입</div>
                <div className="register-parent-div">
                  <div className="register-form-div">
                      <div className="registerInformation">
                          <p>KJC 회원가입</p>
                      </div>
                      <Form className="form">
                           <FormGroup row>
                              <Label for="id" sm={3}>아이디</Label>
                                  <Col sm={4}>
                                    <Input type="text" name="id" id="idInput" placeholder="아이디"/>
                                  </Col>
                                  <Col sm={2}>
                                      <button className="col-id-check-button">중복확인</button>
                                  </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>비밀번호</Label>
                              <Col sm={4}>
                                <Input type="password" name="password" id="passwordInput" placeholder="비밀번호"/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="passwordCheck" sm={3}>비밀번호 확인</Label>
                              <Col sm={4}>
                                <Input type="password" name="passwordCheck" id="passwordCheckInput" placeholder="비밀번호 확인"/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>주민등록번호</Label>
                              <Col sm={4}>
                                <MaskedInput
                                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                    className="form-control"
                                    placeholder="주민등록번호"/>
                              </Col>
                             </FormGroup>
                             <div className="form-line">
                                 <div></div>
                             </div>
                        </Form>
                  </div>
                </div>
            </div>)
    }
}

export default Register;