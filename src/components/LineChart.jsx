// import React, { useEffect, useRef } from "react";
// import { Line } from "react-chartjs-2";
// import { Col, Row, Typography } from "antd";
// import { Chart } from "chart.js";

// const { Title } = Typography;

// const LineChart = ({ coinHistory, currentPrice, coinName }) => {
//   const chartRef = useRef(null);
//   const chartInstanceRef = useRef(null);

//   useEffect(() => {
//     if (chartInstanceRef.current) {
//       chartInstanceRef.current.destroy();
//     }

//     const coinPrice = [];
//     const coinTimestamp = [];

//     for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//       coinPrice.push(coinHistory?.data?.history[i].price);
//     }

//     for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//       coinTimestamp.push(
//         new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
//       );
//     }

//     const data = {
//       labels: coinTimestamp,
//       datasets: [
//         {
//           label: "Price In USD",
//           data: coinPrice,
//           fill: false,
//           backgroundColor: "#0071bd",
//           borderColor: "#0071bd",
//         },
//       ],
//     };

//     const options = {
//       scales: {
//         yAxes: [
//           {
//             ticks: {
//               beginAtZero: true,
//             },
//           },
//         ],
//       },
//     };

//     const ctx = chartRef.current.getContext("2d");
//     chartInstanceRef.current = new Chart(ctx, {
//       type: "line",
//       data,
//       options,
//     });

//     return () => {
//       if (chartInstanceRef.current) {
//         chartInstanceRef.current.destroy();
//       }
//     };
//   }, [coinHistory, coinName, currentPrice]);

//   return (
//     <>
//       <Row className="chart-header">
//         <Title level={2} className="chart-title">
//           {coinName} Price Chart
//         </Title>
//         <Col className="price-container">
//           <Title level={5} className="price-change">
//             Change: {coinHistory?.data?.change}%
//           </Title>
//           <Title level={5} className="current-price">
//             Current {coinName} Price: $ {currentPrice}
//           </Title>
//         </Col>
//       </Row>
//       <canvas ref={chartRef} />
//     </>
//   );
// };

// export default LineChart;

// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function LineChart() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_362c4') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "NASDAQ:AAPL",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "in",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_362c4"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-widget-container'>
      <div id='tradingview_362c4' />
      <div className="tradingview-widget-copyright">
        <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
      </div>
    </div>
  );
}
