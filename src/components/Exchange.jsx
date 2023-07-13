import React, { useState } from "react";
import Coin from "./Coin";
import { useGetExchangesQuery } from "../services/cryptoExchaneApi";
import Loader from "./Loader";

function Exchange() {
  const [search, setSearch] = useState("");

  const { data: coins = [], isFetching } = useGetExchangesQuery();

  if (isFetching) return <Loader />;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search for a Cryptocurrency</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search..."
          />
        </form>
      </div>
      {filteredCoins.map((coin) => (
        <Coin
          key={coin.id}
          name={coin.name}
          price={coin.current_price}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          volume={coin.total_volume}
          image={coin.image}
          priceChange={coin.price_change_percentage_24h}
        />
      ))}
    </div>
  );
}

export default Exchange;
