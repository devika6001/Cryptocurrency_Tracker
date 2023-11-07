import React from "react";
import './Coin.css';

const Coin = ({name, image, symbol, price, volume, priceChange, marketcap}) => {
    return (
        <div className="coin-container">
            <div className="coin-row">
                <div className="coin">
                    <img src={image} alt="crypto" />
                    <h1>{name}</h1>
                    <p className="coin-symbol">{symbol}</p>
                </div>
                <div className="coin-data">
                    <p className="coin-price">${price}</p>
                    <p className="hide-volume coin-volume">${volume.toLocaleString()}</p> {/* toLocaleString will add commas to the volume as per place value chart */}
                    {priceChange < 0 ? 
                        (<p className="hide-depth coin-percent red">{priceChange.toFixed(2)}%</p>) : 
                        (<p className="hide-depth coin-percent green">{priceChange.toFixed(2)}%</p>)
                    }
                    <p className="hide-mobile coin-marketcap">Mkt Cap: ${marketcap.toLocaleString()}</p>
                </div>  
            </div>
        </div>
    );
}

export default Coin;