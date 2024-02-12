import React, { useEffect, useRef, useState } from "react";
import { createChart, ColorType } from "lightweight-charts";
import "./Chartview.css";
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
import TradeChart from "../ChartNew/TradeChart";

function Chartview(props) {
  const [data, setDate] = useState([
    { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
    { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
    { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
    { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
    { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
    { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
    { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
    { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
    { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
    { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
  ]);

  const stocks = ["NSEBANK", "EXIDEIND", "ACE"];
  const [current, setCurrent] = useState(0);
  const {
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
    addChart,
    id,
    removeChart,
    closable,
    tickers,
  } = props;
  console.log(tickers);
  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return (
    <Container fluid>
      <Row className="my-1">
        <Col>
          <div>
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
              disabled={current == stocks.length - 1}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <Dropdown className="dropDown">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {tickers[0]}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* {tickers &&
                  tickers.map(item => {
                    <Dropdown.Item>{item}</Dropdown.Item>;
                  })} */}
                <Dropdown.Item>No option</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
          <div className="custom-div" ref={chartContainerRef} />
        </Col>
      </Row>
    </Container>
  );
}

export default Chartview;
