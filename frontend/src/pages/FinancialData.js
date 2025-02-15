import React, { useState } from "react";
import axios from "axios";

const FinancialData = () => {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/fmp/financial-data?symbol=${symbol}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching financial data:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  return (
    <div>
      <h1>Financial Data</h1>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter Stock Symbol (e.g., AAPL)"
      />
      <button onClick={fetchData}>Fetch Data</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default FinancialData;
