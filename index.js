require('dotenv').config();

const express = require('express');
const db = require('./modules/connect-mysql'); //資料庫
const cors = require('cors');

// WARN 之後移和登入一起移掉
const bcrypt = require('bcryptjs');
// NOTE: 都在router 處理了 理論上不用 先留著 in case
// const uploadImg = require('./modules/joey/upload-image');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// NOTE start
app.use(express.static('public')); // public

//////////////////////////////////
// TEAM START

// WARN 之後移和bcrypt一起移掉
// login
app.post('/members/login', async (req, res) => {
  const output = {
    success: false,
  };

  //   TODO: 欄位檢查
  const [rs] = await db.query('SELECT * FROM members WHERE `account`=?', [
    req.body.account,
  ]);

  if (!rs.length) {
    //   帳號錯誤
    return res.json(output);
  }

  // 和資料庫對照
  const success = await bcrypt.compare(req.body.password, rs[0].password);

  // 暗黑兵法 當作預設確定
  // const success = true

  if (success) {
    // NOTE 目前除了密碼之外都先給好了
    console.log(rs);
    const { id, account, email, avatar, mobile, address, birthday, nickname } =
      rs[0];
    output.success = true;
    output.member = {
      id,
      account,
      email,
      avatar,
      mobile,
      address,
      birthday,
      nickname,
    };
  }

  res.json(output);
});

// 取得 params 這種不可以出現在這邊!!!
// 只可以有app.use('/path',require('./path'))
app.get('/test/:id', (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

/////////////////////////////////////
//Tommy

/////////////////////////////////////
// Joey
app.use('/meetup', require('./routes/joey/meetup')); //test
app.use('/meetup/create', require('./routes/joey/meetup-create')); //post
app.use('/meetup/join', require('./routes/joey/meetup-join')); //get

/////////////////////////////////////
// leo

/////////////////////////////////////
// li
app.use('/products', require('./routes/li/product'));
/////////////////////////////////////
// henry
app.use('/cart',require('./routes/henry/cart'))
/////////////////////////////////////
// emma

//////////////////////////////////
// NOTE end
app.use((req, res) => {
  res.status(404).send(`<h1>找不到頁面😒</h1>`);
});

// server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(new Date().toLocaleString());
  console.log(`App running on port ${port}...😊 `);
});
