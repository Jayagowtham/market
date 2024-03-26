import { useEffect, useState } from "react";
import Search from "../search";
import axios from "axios";

export default function Stock() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [stockData, setStockData] = useState(null);
  const [wrongInput, setWrongInput] = useState(false);

  async function fetchStockData(stockId) {
    try {
      const fetchData = async () => {
        const data = JSON.stringify({
           mode: "FULL",
          exchangeTokens: {
            NSE: [stockId],
          },
        });

        const config = {
          method: "post",
          url: "https://apiconnect.angelbroking.com/rest/secure/angelbroking/market/v1/quote/",
          headers: {
            "X-PrivateKey": "sFrEQ3Ko",
            Accept: "application/json, application/json",
            "X-UserType": "USER",
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6Iks2NzY4NjUiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwidG9rZW4iOiJleUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKemRXSWlPaUpMTmpjMk9EWTFJaXdpWlhod0lqb3hOekV4TlRVek5UYzNMQ0pwWVhRaU9qRTNNVEUwTmpFMk5qWXNJbXAwYVNJNkltSTBOREUyWldJMkxXTTBORFF0TkRKbE9DMDVNMlUyTFRjNU5UUmtOREl6WTJGaE5pSXNJbTl0Ym1WdFlXNWhaMlZ5YVdRaU9qTXNJbk52ZFhKalpXbGtJam9pTXlJc0luVnpaWEpmZEhsd1pTSTZJbU5zYVdWdWRDSXNJblJ2YTJWdVgzUjVjR1VpT2lKMGNtRmtaVjloWTJObGMzTmZkRzlyWlc0aUxDSm5iVjlwWkNJNk15d2ljMjkxY21ObElqb2lNeUlzSW1SbGRtbGpaVjlwWkNJNklqRXlNREV3TTJFNUxUazVNemd0TXpFNU15MDRZVEl3TFdVeE9UVTJObUZoWkdKak9TSXNJbUZqZENJNmUzMTkuNThTOUhiUFFtWlpYUG4zUXJVVWxjWDVKNXB4ejVKd21IaWlCTUZyM1plVXYtdEF6aW5RREF6RC1vNm9uTi1jSFFKWnNyaTUwWkZESHQtaTR5UVhtenciLCJBUEktS0VZIjoic0ZyRVEzS28iLCJpYXQiOjE3MTE0NjE3MjYsImV4cCI6MTcxMTU1MzU3N30.Vth1721ZOYH_qTmzmRJMTA42pRPTUnEm6shcI4bHjA0XY18gk_GXszKpWZKCwL3LH8cVikrJPDaPfAE5q0VFnA", //  ewty token should be pasted here
            "Content-Type": "application/json",
          },
          data: data,
        };

        const resp = (await axios(config))?.data;

        if (resp?.status === true) {
          console.log(resp);
          console.log(resp.data?.fetched?.[0]);
          setStockData(resp.data?.fetched?.[0]);
          console.log(stockData);
          setWrongInput(false);
        } else {
          setWrongInput(true);
        }
      };

      await fetchData();

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  async function handleSearch() {
    setLoading(true);
    setStockData(null);
    setWrongInput(false);
    fetchStockData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <h4 className="loading">Loading...</h4>
      ) : wrongInput ? (
        <h2>Record not found! please enter right stock Id</h2>
      ) : !stockData ? (
        <h2>Enter the stock Id to fetch the data</h2>
      ) : (
        <div>
          <div className="script">
            <h2>
              <span>{stockData?.exchange}</span> {stockData?.tradingSymbol} <span>({stockData?.symbolToken})</span>
            </h2>
          </div>
          <div className="date">
            <span>{stockData.exchTradeTime}</span>
          </div>
          
          <div className="current-price">{stockData?.ltp}</div>
          <p className="description">
            Current Price
          </p>
          <div className="stock-info">
            <div className="column">
              <div>
                <p className="price">{stockData?.high}%</p>
                <p>HighestPrice</p>
              </div>
            </div>
          </div>
          <div className="stock-info">
            <div className="column">
              <div>
                <p className="price">{stockData?.low}%</p>
                <p>LowestPrice</p>
              </div>
            </div>
             <div className="column">
              <div>
                <p className="price">{stockData?.avgPrice}%</p>
                <p>AveragePrice</p>
              </div>
            </div> 
            </div>
        </div>
      )}
    </div>
  );
}
