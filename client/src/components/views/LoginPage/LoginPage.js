import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import  GoogleLogin  from 'react-google-login';
import  KaKaoLogin  from 'react-kakao-login';
import FacebookLogin from 'react-facebook-login';
import styled from 'styled-components'

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  //
  const responseGoogle = (res) => {
    let body={
      email:res.profileObj.email,
      password: res.profileObj.googleId
    }

    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess){
          props.history.push('/home')
        } else {
          alert('회원정보를 찾을 수 없습니다.')
        }
      })
    }

  const responseKaKao = (res) => {

    let pw = res.profile.id
    pw = String(pw);

    let body={
      email:res.profile.kakao_account.email,
      password: pw,
    }
    console.log(body);
    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess){
          props.history.push('/home')
        } else if(body == null){
          alert('회원정보를 찾을 수 없습니다.')
        } else{
          console.log(response);
        }
      }
    )
  }

  const responseFacebook = (res) => {
    let body={
      email:res.email,
      password: res.id
    }

    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess){
          props.history.push('/home')
        } else {
          alert('회원정보를 찾을 수 없습니다.')
        }
      })
  }

  const responseFail = (err) => {
    console.error(err);
  }
  //
  const onEamilHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); //버튼을 누를때 무조건 새로고침되는것을 막아준다.
    // console.log(Email);
    // console.log(Password);

    let body={
      email:Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess){
          props.history.push('/home')
        } else {
          alert('Error')
        }
      })
    
    
  }

  const onLanding = () => {
    props.history.push('/');
  }

  return(
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type='email' value={Email} onChange={onEamilHandler}/>
        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler}/>
        <br />
        <button type='submit'>Login</button><br />
        <GoogleLogin
          clientId={'297011327835-5bmnie06q1t9abcmp2sbv1a5oomfsk6g.apps.googleusercontent.com'}
          buttonText="Google"
          onSuccess={responseGoogle}
          onFailure={responseFail}
        />
        <KaKaoBtn
          //styled component 통해 style을 입혀 줄 예정 
          jsKey={'2c0529d015c5bd510bb0a3586f896493'}
          //카카오에서 할당받은 jsKey를 입력
          buttonText='카카오 계정으로 로그인'
          //로그인 버튼의 text를 입력
          onSuccess={responseKaKao}
          //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장 
          getProfile={true}
        />
        <FacebookLogin
          appId="231025038177009"
          fields="name,email,picture,id"
          //어떤 정보를 받아오는지 입력하는 필드
          callback={responseFacebook}
        /><br/>

        <button onClick={onLanding}>Home</button>

      </form>
    </div>
  )
}

const KaKaoBtn = styled(KaKaoLogin)`
  padding: 0;
  width: 300px;
  height: 45px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

export default withRouter(LoginPage);