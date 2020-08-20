import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
// import {  } from 

function HomePage(props){

  //const [user, setUser] = useState(false);

  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response.data))

  }, [])

/*
  const UserDate = ({email, name, image}) => {
    let loginUser = {email, name, image}
    axios.get("/api/users/auth", loginUser)
      .then((response) => {
        console.log(response)
        let arr = {email, name, image}
          return {
            email: response.data.email,
            name: response.data.name,
            image: response.data.image,
          }
        })
        /*
        if(response.data.success){
          console.log("사용자");
          console.log(response);
        }else{
          console.log("사용자없음");
        }
      }
        */


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