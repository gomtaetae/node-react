import React, {useEffect} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {
  
  const onLoginHandler = () => {
    props.history.push('/login')
  }

  const onRegisterHandler = () => {
    props.history.push('/register')
  }

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
      </span>
    </div>
    
  )
}

export default withRouter(LandingPage);