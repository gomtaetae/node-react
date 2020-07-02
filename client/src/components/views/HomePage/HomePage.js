import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
// import {  } from 

function HomePage(props){
  
  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response.data))

  }, [])

  const onClickHandler = () => {
    axios.get(`/api/users/logout`)
    .then(response => {
      if(response.data.success){
        alert('로그아웃 성공')
        props.history.push('/')
      }else{
        alert('로그아웃 실패')
      }
    })
  }
  
  return(
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  )
}


export default withRouter(HomePage);