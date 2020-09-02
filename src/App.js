import React from 'react';
import Customer from './components/Customer'
import './App.css';

const customers = [
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
    'name': '이순신',
    'birthday': '961222',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 3,
    'image': 'https://placeimg.com/64/64/3',
    'name': '고길동',
    'birthday': '921202',
    'gender': '남자',
    'job': '직장인'
  }
]

class App extends React.Component {
  render() {
    return (
      <div>
        {
          customers.map(c =>{
            return (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            );
          })
        }
      </div>
    );
  }
}

export default App;