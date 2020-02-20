import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Navigation from "../../components/Navigation/Navigation";

import variables from "../../_variables.scss";
import "./UserPage.scss";

const UserPage = props => {
  const addDay = date => {
    let newDate = new Date(date);
    newDate = new Date(newDate.setDate(newDate.getDate() + 1));
    const year = newDate.getFullYear();
    const month =
      newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : `${newDate.getMonth() + 1}`;
    const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`;
    let dateString = `${year}-${month}-${day}`;
    return dateString;
  };

  const arrayFromDateRange = (fromDate, toDate) => {
    const datesArray = [];
    for (let i = fromDate; i <= toDate; i = addDay(i)) {
      datesArray.push(i);
    }
    return datesArray;
  };

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [fromDate, setFromDate] = useState("2019-10-01");
  const [toDate, setToDate] = useState("2019-10-07");
  const [newDatesArray, setNewDatesArray] = useState(arrayFromDateRange(fromDate, toDate));
  const [clicksDataArray, setClicksDataArray] = useState([]);
  const [viewsDataArray, setViewsDataArray] = useState([]);
  const [diagramHeight, setDiagramHeight] = useState(null);

  const clicksData = {
    labels: newDatesArray,
    datasets: [
      {
        fill: false,
        borderColor: variables.primaryColor,
        data: clicksDataArray
      }
    ]
  };

  const viewsData = {
    labels: newDatesArray,
    datasets: [
      {
        fill: false,
        borderColor: variables.primaryColor,
        data: viewsDataArray
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
            // steps: 10,
            // stepValue: 5,
            // max: 100
          }
        }
      ]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
      // enabled: false
      // callbacks: {
      //   label: function(tooltipItem) {
      //     console.log(tooltipItem);
      //     return tooltipItem.yLabel;
      //   }
      // }
    },
    elements: {
      point: {
        radius: 0
      }
    }
    // maintainAspectRatio: false,
    // responsive: false
    // width: "400",
    // height: "400"
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
    fetchUser();
  }, []);

  useEffect(() => {
    setNewDatesArray(arrayFromDateRange(fromDate, toDate));
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchUser();
  }, [newDatesArray]);

  const fetchUser = async () => {
    try {
      // setIsLoading(true);
      const response = await fetch(
        `http://localhost:3001/users/${props.match.params.userId}?fromDate=${fromDate}&toDate=${toDate}`
      );
      const resData = await response.json();
      console.log(resData);
      setUser(resData.user);
      setClicksDataArray(objToArr(resData.clicks));
      setViewsDataArray(objToArr(resData.views));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const objToArr = obj => {
    const arr = [];
    newDatesArray.forEach(date => {
      let amount;
      if (obj.hasOwnProperty(date)) {
        amount = obj[date];
      } else {
        amount = 0;
      }
      arr.push(amount);
    });
    return arr;
  };

  const dateToString = date => {
    let newDate = new Date(date);
    const year = newDate.getFullYear();
    const month =
      newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : `${newDate.getMonth() + 1}`;
    const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`;
    let dateString = `${year}-${month}-${day}`;
    return dateString;
  };

  const changeFromDate = date => {
    setFromDate(dateToString(date));
  };

  const changeToDate = date => {
    setToDate(dateToString(date));
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="user-page">
      <Navigation
        list={[
          { title: "Main page", path: "/", isActive: false },
          { title: "User statistics", path: "/users", isActive: false },
          {
            title: `${user.first_name} ${user.last_name}`,
            path: `/users/${user.id}`,
            isActive: true
          }
        ]}
      />
      <h1 className="user-page__header">{`${user.first_name} ${user.last_name}`}</h1>
      <section className="user-page__date-picker-section">
        <div className="user-page__date-picker-from">
          <span>from</span>
          <DatePicker
            className="user-page__date-picker"
            dateFormat="dd/MM/yyyy"
            selected={new Date(fromDate)}
            onChange={changeFromDate}
          />
        </div>
        <div className="user-page__date-picker-to">
          <span>to</span>
          <DatePicker
            className="user-page__date-picker"
            dateFormat="dd/MM/yyyy"
            selected={new Date(toDate)}
            onChange={changeToDate}
          />
        </div>
      </section>
      <h6 className="user-page__clicks">Clicks</h6>
      <Line data={clicksData} options={options} height={diagramHeight} />
      <h6 className="user-page__views">Views</h6>
      <Line data={viewsData} options={options} height={diagramHeight} />
    </div>
  );
};

export default UserPage;
