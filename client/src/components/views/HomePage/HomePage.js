import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
// import {  } from 
import EmojiReact from "react-emoji-react";
//import { useDispatch } from "react-redux";


function HomePage(props){
  //const dispatch = useDispatch();
  //const [user, setUser] = useState(false);

  useEffect(() => {
    axios.get('/api/users/getReaction').then((response)=>{
      console.log("뭐ㅑㄴ",response);
      console.log("뭐ㅑㄴ",response.data.user[0].reaction);
      let arr = response.data.user[0].reaction.map((evs)=>{
        let { _id, name, count } = evs;
        return { _id, name, count }
      })
      setEmojis(arr)
    })

  }, [])


  ///
  const [emojis, setEmojis] = useState([]);

  function emojiTest(name){
    
    let emoji = emojis.map(emojied => {
      if (emojied.name === name){
        //console.log("이모지이등드드ㅡㄷ", emojied.name);
        //console.log("이모지지", name);
        emojied.count += 1;
      }
      //console.log("이모지드", emojied);
      return emojied;
    })
    setEmojis(emoji)
  }

  function emojiClick(name){

    let emoji = { name, count: 1 }
    axios.post('/api/users/reaction', emoji)
      .then((response) =>{
        console.log("하욤",response);
        console.log("하욤",response.data.user);
        let emojied = response.data.user.map((evs)=>{
          let { _id, name, count } = evs
          return { _id, name, count }
        })
        console.log("1번",emojied);
        setEmojis(emojied)
      })
  }
  
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
        <div>
        <EmojiReact
          reactions={emojis}
          onReaction={emojiTest}
          onEmojiClick={emojiClick}
        />
        </div>
    </div>
  )
}


export default withRouter(HomePage);