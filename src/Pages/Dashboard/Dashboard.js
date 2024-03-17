import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidenav from "../../Components/Sidenav/Sidenav";
import Header from "../../Components/Header/Header";
import axios from "axios";
import TradeChart from "../../Components/ChartNew/TradeChart";
import { useRecoilValue } from "recoil";
import { queryAtom } from "../../utils/state";
import API from "../../utils/url";
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
        API['root'],
        obj
      );
      const arr = response.data.tickers;
      // console.log(arr);
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
        <div className="dashboard">
          <div className="dashboard-content">
            {charts.map(chart => (
              <div className="chart-container" key={chart.id}>
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
    </div>
  );
}

export default Dashboard;
