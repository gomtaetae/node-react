import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEamil] = useState("")
  const [Password, setPassword] = useState("")

  const onEamilHandler = (event) => {
    setEamil(event.currentTarget.value)
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
        <button onClick={onLanding}>Home</button>
      </form>
    </div>
  )
}

export default withRouter(LoginPage);