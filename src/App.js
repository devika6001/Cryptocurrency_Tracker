import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';   // Helps us in fetching data from the API
import Coin from './Coin';
import { Routes, Route } from 'react-router-dom';
import Scoin from './routes/Scoin';
import { Link } from 'react-router-dom';

function App() {

  const [coins, setCoins] = useState([]);
  let [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en').then(res => {
      setCoins(res.data);
    }).catch(error => console.log(error)); // catch executes when certain error arises
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin => {
    return coin.name.toLowerCase().includes(search.toLowerCase())
  })

  const handleSearch = () => {
    setSearch("");
  }

  return (
    <div className='coin-app'>
      <Routes>
        <Route path='/' element=
        {[<div className='coin-search'>
            <h1 className='coin-text'>Search a currency</h1>
            <form style={{position:"relative"}}>
              <button type="button" style={{cursor:"pointer", position:"absolute", right:"20px", top:"14px", backgroundColor:"#4801ff", border:"none"}} onClick={() => handleSearch()}>	&#x2715;</button>
              <input type="text" placeholder='Search' value={search} className='coin-input' onChange={handleChange}/>
            </form>
          </div>
          , filteredCoins.map(coin => {
            return (
              <Link to={`/coin/${coin.id}`} element={< Scoin/>} key={coin.id}>
                  <Coin 
                    key={coin.id} 
                    name={coin.name} 
                    image={coin.image} 
                    symbol={coin.symbol}
                    volume={coin.total_volume} //How much has been traded in last 24h
                    price={coin.current_price} 
                    priceChange={coin.price_change_percentage_24h}
                    marketcap={coin.market_cap} // price * supply
                  />
              </Link>
            );
          })
        ]} />
        <Route path='/coin' element={<Scoin />}>
          <Route path=':coinId' element={<Scoin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;