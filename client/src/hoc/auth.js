import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null){
  //function의 옵션들은 app.js에서 Auth로 페이지를 감싸줄때의 옵션이다.
  // null -> 아무나 출입이 가능한 페이지
  // true -> 로그인한 유저만 출입가능
  // false -> 로그인한 유저는 출입 불가능
  function AuthenticationCheck(props){

    const dispatch = useDispatch();

    useEffect(() => {
      //server의 index.js에 auth를 정의했음

      dispatch(auth())
      .then(response => {
        console.log(response)

        //로그인 하지 않은 상태
        if(!response.payload.isAuth) {
          if(option) {
            props.history.push('/login')
          }
        } else {
        //로그인한 상태
          if(adminRoute && !response.payload.isAdmin){
            props.history.push('/')
          } else {
            if(option === false){
              props.history.push('/')
            }
          }
        }
        
      })
    }, [])

    return (
      <SpecificComponent />
    )
  }


  return AuthenticationCheck
}