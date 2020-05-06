import React, { useEffect, useState } from 'react';

import './App.css';
import axios from 'axios';
import styled from 'styled-components';

const QuoteCard = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

function App() {
  const [quoteData, setQuoteData] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/posts')
    .then(res =>setQuoteData(res.data))
    .catch(err=>(err))

  })


  return (
    <div className="App">
      <h2>Quotes and stuff!</h2>
      <QuoteCard>
        {quoteData.map(data=>{
          return (
            <quoteCard>
          <h3>Quote: {data.title}</h3>
          <p>Content: {data.contents} </p>
          </quoteCard>
          )
        })}
      </QuoteCard>
      
    </div>
  );
}

export default App;
