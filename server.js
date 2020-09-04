const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
  res.send([
   {
     'id': 1,
     'image': 'https://placeimg.com/64/64/1',
     'name': '윤경재',
     'birthday': '791221',
     'gender': '남자',
     'job': 'IRONMAN'
    },
    {
     'id': 2,
     'image': 'https://placeimg.com/64/64/2',
     'name': '세종대왕',
     'birthday': '961222',
     'gender': '남자',
     'job': '대학생'
    },
    {
     'id': 3,
     'image': 'https://placeimg.com/64/64/3',
     'name': '태종',
     'birthday': '921202',
     'gender': '남자',
     'job': '직장인'
    }
   ]);
})

app.listen(port, () => console.log(`Listening on port ${port}`));
