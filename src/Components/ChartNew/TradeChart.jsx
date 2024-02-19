import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { convertData } from "../../utils/utils";
import axios from "axios";

const TradeChart = props => {
  const { tickers, addChart, id, removeChart, closable } = props;
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: `${tickers[current]}`,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const series = [
    {
      data,
    },
  ];

  const handleClick = index => {
    setCurrent(index);
  };

  useEffect(() => {
    const stock = tickers[current];
    const fetchData = async () => {
      try {
        const data = {
          query: `webserver --ticker ${stock} --interval day --do get --indicator ohlc --n 1000`,
        };
        const response = await axios.post(
          "https://gorgeous-turtle-loudly.ngrok-free.app/ohlc",
          data
        );

        const convertedData = convertData(response.data);
        const chartData = convertedData.map(item => {
          return {
            x: item.time,
            y: [item.open, item.high, item.low, item.close],
          };
        });
        setData(chartData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [current, tickers]);

  return (
    <Container fluid>
      <Row className="my-1">
        <Col>
          <div className="d-flex gx-1">
            <button
              className="subButton"
              onClick={() => {
                setCurrent(prev => prev - 1);
              }}
              disabled={current == 0}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="subButton"
              onClick={() => {
                setCurrent(prev => prev + 1);
              }}
              disabled={current == tickers.length - 1}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
            {/* <Dropdown className="dropDown">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {tickers[current]}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {tickers &&
                  tickers.map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleClick(index)}
                    >
                      {item}
                    </Dropdown.Item>
                  ))}
                <Dropdown.Item>No option</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
            <div>
              <Form.Select
                className="bg-success text-light"
                value={current}
                onChange={e => handleClick(e.target.value)}
              >
                {tickers &&
                  tickers.map((ticker, index) => (
                    <option key={ticker} value={index}>
                      {ticker}
                    </option>
                  ))}
              </Form.Select>
            </div>
            <button className="subButton" onClick={addChart}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              className="subButton"
              disabled={!closable}
              onClick={() => {
                removeChart(id);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </Col>
      </Row>
      <Row
        style={{
          height: "100vh",
        }}
      >
        <Col>
          <ReactApexChart
            options={options}
            series={series}
            type="candlestick"
            height="650px"
            height="650px"
            title="TCS Chart"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TradeChart;
