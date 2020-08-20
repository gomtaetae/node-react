const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const config = require("./config/key");

//application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//json 타입으로 된것을 분석해서 가져온다.
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("새해복많이 받아라 Wktlr"));

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요");
});

app.post("/api/users/register", (req, res) => {
  //회원 가입에 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  //요청된 이메일을 데이터베이스에 있는지 찾는다. //findeOne => 몽고디비에서 지원하는 메소드
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렷습니다.",
        });
      //비밀 번호까지 같다면 Token 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err); //status 400 => 실패했다는 뜻 -> send(err)

        // 토큰을 저장한다. 어디에?  쿠키, 로컬스토리지... 저장하는 방법은 여러가지가 있다.
        // 쿠키에 저장하기 위해서는 모듈을 설치해야한다.
        res
          .cookie("x_auth", user.token)
          .status(200) //성공했다는 표시
          .json({ loginSuccess: true, userId: user._id });
      });                               //userId가 리덕스 스토어에 들어왔음
    });                                 //payload를 통해서 payload에는 request가 들어가 있음
  });                                   //requset는 백엔드에서 가져온 모든 data를 가지고 있다.
});

// role 0 -> 일반유저 role이 0이 아니면 관리자
//ex) role 1 -> 어드민 , role 2 => 특정 부서 어드민

app.get("/api/users/auth", auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 것은
  //Authentication이 true라는 것이다.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});


app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
