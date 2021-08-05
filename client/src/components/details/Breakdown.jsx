// import dotenv from "dotenv";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Breakdown = () => {
  const { symbol } = useParams();
  
  const [state, setState] = useState({
    symbol: {},
    financial: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/finn/${symbol}/profile`),
      axios.get(`/finn/${symbol}/financials`),
    ])
    .then((all) => {
      const [symbol, financial] = all;
      setState((prev) => {
        return {...prev, symbol: symbol.data, financial: financial.data};
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  
  useEffect(() => {
    const socket = new WebSocket('ws:localhost:3001/')
    
    socket.onopen = function(event) {
      console.log('connected to websocket-server');
      socket.send(symbol)
    }
    socket.onmessage = function(event) {
      console.log(event.data)
    }

    
    return (() => {
      console.log("hello")
      socket.close();
    })
    }, []);

  return (
    <div className='details-breakdown'>
      <img src={state.symbol.logo}></img>
      <h1>{state.symbol.name}</h1>
      <p>{state.symbol.ticker}</p>
      <p>Market Capitalization: ${state.symbol.marketCapitalization}</p>
      <p>Share Outstanding: {state.symbol.shareOutstanding}</p>
      <p>Daily Trading Volume (10 Day): {state.financial['10DayAverageTradingVolume']}</p>
      <p>52 Week High: ${state.financial['52WeekHigh']}</p>
      <p>52 Week Low: ${state.financial['52WeekLow']}</p>
    </div>
  )
    // return (
    // <div className='details-breakdown'>

  //     <p>{state.earning.date}</p> change to P/E ratio (Price to earnings)
  //     <p>{state.basic['marketCapitalization']}</p>

  //     <p>{state.basic['10DayAverageTradingVolume']}</p>
  //     </div>
  //     </div>
  //     <div className='right'>
  //     <div className='right-left'>
  //     <p>52 Week High</p>
  //     <p>52 Week Low</p>
  //     <p>Outstanding Shares</p>
  //     </div>
  //     <div className='right-right'>
  //     <p>${state.basic['52WeekHigh']}</p>
  //     <p>${state.basic['52WeekLow']}</p>
  //     <p>{state.profile['shareOutstanding']}</p>
  //     </div>
  //     </div>
  //     </div>
  // </div>
  // )
};

export default Breakdown;
