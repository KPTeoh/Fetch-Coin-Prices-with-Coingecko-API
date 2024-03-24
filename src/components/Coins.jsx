import React from 'react'
import { useState, useEffect } from 'react'
import { Baseurl } from './baseUrl'
import Loader from './Loader'
import axios from 'axios'
import Header from './Header'
import { Link } from 'react-router-dom'

const Coins = () => {
  const [loading, setLoading]=useState(true)
  const[coins, setCoins]=useState([])
  const [currency, setCurrency]=useState('usd')
  const currencySymbol = currency ==='gbp' ? '£': '$'
  useEffect(()=>{
    const getCoinsData=async()=>{
      const {data} =await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`)
      console.log(data)
      setCoins(data)
      setLoading(false)
    }
    getCoinsData()
  },[currency])

  return (
    <>
    {
      loading? <Loader/> : <> 
        <Header/ >
          <div className='btns'>
            <button onClick={()=>setCurrency('gbp')}>gbp</button>
            <button onClick={()=>setCurrency('usd')}>usd</button>
          </div>
          {
            coins.map((coindata, i)=>{
              return(
              <CoinCard coindata={coindata} id={coindata.id} i={i} currencySymbol={currencySymbol} />
              )
            })
          }
      </>
    }
    </>
  )
}

const CoinCard=({coindata, currencySymbol, i, id})=>{
  const profit = coindata.price_change_percentage_24h>0
  return (
    <Link to={`/coins/${id}`} style={{color:"white", textDecoration:'none '}}>
          <div key={i} className='ex-cards'>
      <div className='image'>
        <img height={"80px"} src={coindata.image} alt="" />
      </div>
      <div className="name">
        {coindata.name}
      </div>
      <div className="price">
        {currencySymbol} {coindata.current_price.toFixed(2)}
      </div>
      <div style={profit? {color:"green"} : {color:"red"}} className="rank">
        {profit ? "+" + coindata.price_change_percentage_24h.toFixed(4): coindata.price_change_percentage_24h.toFixed(4)}
      </div>
    </div>
    </Link>
  )
}

export default Coins