import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import  GoogleLogin  from 'react-google-login';
//import  KaKaoLogin  from 'react-kakao-login';
//import FacebookLogin from 'react-facebook-login';
//import styled from 'styled-components'

function LandingPage(props) {
  
  const onLoginHandler = () => {
    props.history.push('/login')
  }

  const onRegisterHandler = () => {
    props.history.push('/register')
  }

  /*
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Url, setUrl] = useState("");

  
  const responseGoogle = (res) => {
    console.log(res);
    setName(res.profileObj.name);
    setEmail(res.profileObj.email);
    setUrl(res.profileObj.imageUrl);
  }

  const responseKaKao = (res) => {
    setName(res.profile.properties.nickname);
    setEmail(res.profile.kakao_account.email);
    setUrl(res.profile.properties.profile_image);
    console.log(res);
    console.log(res.profile.properties.nickname);
  }

  const responseFacebook = (res) => {
    console.log(res);
    setName(res.name);
    setEmail(res.email);
    setUrl(res.picture.data.url);
  }

  const responseFail = (err) => {
    console.error(err);
  }
*/
  

  return(
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <span>
        <h2> 시작 페이지 </h2>
        <br />
      
        <button onClick={onLoginHandler}>로그인</button>
        <button onClick={onRegisterHandler}>회원가입</button>
        {/*
        <h1>Login with Google</h1>
        <h2>Welcome: {Name}</h2>
        <h2>Email: {Email}</h2>
        <img src={Url} alt={Name} width="100px" height="100px"/>
        
        <GoogleLogin
          clientId={'297011327835-5bmnie06q1t9abcmp2sbv1a5oomfsk6g.apps.googleusercontent.com'}
          buttonText="Google"
          onSuccess={responseGoogle}
          onFailure={responseFail}
        />
        <br />
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
          fields="name,email,picture"
          callback={responseFacebook}
        />
        */}

      </span>
      
    </div>
    
  )
}
/*
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
*/


export default withRouter(LandingPage);