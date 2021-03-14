import React from 'react';
import Card from '../Card';

const Home = ({ data, totalData }) => {
  const cards = data?.length>0 && data.map((value, index) => (
    <div  className="flex-row-item" key={index}>
      <Card value={value}/>
    </div>
  ))

  return <div className="flex-row-container">{cards}</div>
}

export default Home;
