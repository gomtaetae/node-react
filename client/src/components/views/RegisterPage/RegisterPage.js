import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import  GoogleLogin  from 'react-google-login';
import  KaKaoLogin  from 'react-kakao-login';
import FacebookLogin from 'react-facebook-login';
import styled from 'styled-components'



function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  ///////////////////////////////////////////////
  const [Url, setUrl] = useState(null);
  

  const responseGoogle = (res) => {
    
    //set하지말고 요청갈김
    let body = {
      email: res.profileObj.email,
      name: res.profileObj.name,
      password: res.profileObj.googleId,
      image: res.profileObj.imageUrl,
    }
    console.log("바디", body);

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success){
          alert("회원가입 성공")
          props.history.push('/login')
        }else if(body != null){
          alert("이미 가입된 회원입니다")
          props.history.push('/')
        }
      }
    )
  }

  const responseKaKao = (res) => {
    //
    let pw = res.profile.id
    
    pw = String(pw);
    console.log(pw);
    let body = {
      email: res.profile.kakao_account.email,
      name: res.profile.properties.nickname,
      password: pw,
      image: res.profile.properties.profile_image,
    }
    console.log("바디", body);

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success){
          alert("회원가입 성공")
          props.history.push('/login')
        }else if(body != null){
          alert("이미 가입된 회원입니다")
          props.history.push('/')
        }
      }
    )

  }

  const responseFacebook = (res) => {
    //
    let body = {
      email: res.email,
      name: res.name,
      password: res.id,
      image: res.picture.data.url,
    }
    console.log("바디", body);

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success){
          alert("회원가입 성공")
          props.history.push('/login')
        }else if(body != null){
          alert("이미 가입된 회원입니다")
          props.history.push('/')
        }
      }
    )

  }

  const responseFail = (err) => {
    console.error(err);
  }
  //////////////////////////////////////////

  const onEamilHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {

    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호 확인이 다릅니다.')
    }
      event.preventDefault(); //버튼을 누를때 무조건 새로고침되는것을 막아준다.
    // console.log(Email);
    // console.log(Password);

    let body={
      email:Email,
      name: Name,
      password: Password,
      image: Url,
    }
    console.log("바디", body);

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success){
          props.history.push('/login')
        }else{
          alert('Fail to Sign Up')
        }
      }
    )
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
          
          <label>Name</label>
          <input type='text' value={Name} onChange={onNameHandler}/>
          
          <label>Password</label>
          <input type='password' value={Password} onChange={onPasswordHandler}/>
          
          <label>Confirm Password</label>
          <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
          
          <br />
          <button type='submit'>회원가입</button>

          <br/>
          <button onClick={onLanding}>Home</button>
        
        <br/>
          <GoogleLogin
            clientId={'297011327835-5bmnie06q1t9abcmp2sbv1a5oomfsk6g.apps.googleusercontent.com'}
            buttonText="Google"
            onSuccess={result => responseGoogle(result)}
            onFailure={responseFail}
            /*
            render={(props) => (
              <button onClick={props.onClick} onSubmit={onSubmitHandler} >Google</button>
              
            )}
            */
          />
          <br/>
          <KaKaoBtn
            //styled component 통해 style을 입혀 줄 예정 
            jsKey={'2c0529d015c5bd510bb0a3586f896493'}
            //카카오에서 할당받은 jsKey를 입력
            buttonText='카카오 계정으로 회원가입'
            //로그인 버튼의 text를 입력
            onSuccess={responseKaKao}
            //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장 
            getProfile={true}
          /><br/>
          <FacebookLogin
          appId="231025038177009"
          fields="name,email,picture,id"
          callback={responseFacebook}
        />
        
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

const GoogleBtn = styled(GoogleLogin)`
  font: Roboto-Medium;
  size: 14px;
  color: #000000 / 0,0,0(54%);

`


export default withRouter(RegisterPage);