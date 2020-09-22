const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection=mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

const multer = require('multer');

/*multer 미들웨어 등록.*/
/*multer 미들웨어를 등록하면 요청 객체( req )에 file, files 객체가 추가*/
const upload = multer({dest: './upload'});
app.use('/image', express.static('./upload'));

app.get('/api/customers', (req, res) => {
  console.log('apt.get');
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
    (err, rows, fields) => {
      console.log(rows);
      res.send(rows);
    }
  );
});

// 파일 업로드 처리
app.post('/api/customers', upload.single('image'), (req, res) => {

  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  console.log(sql);
  connection.query(sql, params,
      (err, rows, fields) => {
        res.send(rows);
        console.log(rows);
      }
  );
});

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  console.log(sql, req.params.id);
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
