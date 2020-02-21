import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import variables from "../../_variables.scss";

import "./Charts.scss";

const Charts = props => {
  const [diagramHeight, setDiagramHeight] = useState(60);

  const clicksData = {
    labels: props.newDatesArray,
    datasets: [
      {
        fill: false,
        borderColor: variables.primaryColor,
        data: props.clicksDataArray
      }
    ]
  };

  const viewsData = {
    labels: props.newDatesArray,
    datasets: [
      {
        fill: false,
        borderColor: variables.primaryColor,
        data: props.viewsDataArray
      }
    ]
  };

  const chartsOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  useEffect(() => {
    if (window.innerWidth > 1180) {
      setDiagramHeight(60);
    } else if (window.innerWidth > 766 && window.innerWidth < 1181) {
      setDiagramHeight(80);
    } else if (window.innerWidth > 450 && window.innerWidth < 767) {
      setDiagramHeight(100);
    } else if (window.innerWidth < 450) {
      setDiagramHeight(170);
    }
  }, []);

  return (
    <div className="charts">
      <h1 className="user-page__header">{`${props.user.first_name} ${props.user.last_name}`}</h1>
      <div className="user-page__date-picker-section">
        <div className="user-page__date-picker-from">
          <span>from</span>
          <DatePicker
            className="user-page__date-picker"
            dateFormat="dd/MM/yyyy"
            selected={new Date(props.fromDate)}
            onChange={props.changeFromDate}
          />
        </div>
        <div className="user-page__date-picker-to">
          <span>to</span>
          <DatePicker
            className="user-page__date-picker"
            dateFormat="dd/MM/yyyy"
            selected={new Date(props.toDate)}
            onChange={props.changeToDate}
          />
        </div>
      </div>
      <h6 className="user-page__clicks">Clicks</h6>
      <Line data={clicksData} options={chartsOptions} height={diagramHeight} />
      <h6 className="user-page__views">Views</h6>
      <Line data={viewsData} options={chartsOptions} height={diagramHeight} />
    </div>
  );
};

export default Charts;
