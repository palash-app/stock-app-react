import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidenav from "../../Components/Sidenav/Sidenav";
import Header from "../../Components/Header/Header";
import axios from "axios";
import TradeChart from "../../Components/ChartNew/TradeChart";
import { useRecoilValue } from "recoil";
import { queryAtom } from "../../utils/state";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [charts, setCharts] = useState([{ id: 1 }]);
  const [tickers, setTickers] = useState([]);
  const queries = useRecoilValue(queryAtom);
  console.log(queries);

  const fetchTickers = async () => {
    try {
      const obj = {
        query: "webserver --ticker all --do get --indicator tickers",
      };
      const response = await axios.post(
        "https://communal-vocal-mayfly.ngrok-free.app/ohlc",
        obj
      );
      const arr = response.data.tickers.slice(0, 20);
      console.log(arr);
      setTickers(arr);
    } catch (err) {
      console.log(err);
    }
  };

  const addChart = () => {
    const newCharts = [...charts, { id: Date.now() }];
    setCharts(newCharts);
  };
  const removeChart = id => {
    const updatedCharts = charts.filter(chart => chart.id !== id);
    setCharts(updatedCharts);
  };

  useEffect(() => {
    fetchTickers();
  }, []);

  return (
    <div className="app-container">
      <Sidenav />
      <div className="main">
        <Header addChart={addChart} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginTop: "10px",
          }}
        >
          {charts.map(chart => (
            <div
              key={chart.id}
              style={{ flex: 1, boxSizing: "border-box", minWidth: 0 }}
            >
              {/* <Chartview
                id={chart.id}
                addChart={addChart}
                removeChart={removeChart}
                closable={charts.length > 1}
                tickers={tickers}
              /> */}
              <TradeChart
                id={chart.id}
                addChart={addChart}
                removeChart={removeChart}
                closable={charts.length > 1}
                tickers={tickers}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
