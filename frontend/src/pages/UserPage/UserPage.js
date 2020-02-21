import React, { useState, useEffect, useCallback } from "react";

import Header from "../../components/Header/Header";
import Wrapper from "../../components/Wrapper/Wrapper";
import Navigation from "../../components/Navigation/Navigation";
import Charts from "../../components/Charts/Charts";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";

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
  const [isError, setIsError] = useState(false);

  const [user, setUser] = useState(null);
  const [fromDate, setFromDate] = useState("2019-10-01");
  const [toDate, setToDate] = useState("2019-10-07");
  const [newDatesArray, setNewDatesArray] = useState(arrayFromDateRange(fromDate, toDate));
  const [clicksDataArray, setClicksDataArray] = useState([]);
  const [viewsDataArray, setViewsDataArray] = useState([]);

  const fetchUser = useCallback(async () => {
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

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3001/users/${props.match.params.userId}?fromDate=${fromDate}&toDate=${toDate}`
      );
      if (response.status !== 200) {
        return setIsError(true);
      }
      const resData = await response.json();
      setUser(resData.user);
      setClicksDataArray(objToArr(resData.clicks));
      setViewsDataArray(objToArr(resData.views));
      setIsLoading(false);
    } catch (error) {
      return setIsError(true);
    }
  }, [fromDate, toDate, props.match.params.userId, newDatesArray]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
    setNewDatesArray(arrayFromDateRange(dateToString(date), toDate));
  };

  const changeToDate = date => {
    setToDate(dateToString(date));
    setNewDatesArray(arrayFromDateRange(fromDate, dateToString(date)));
  };

  const closeModal = () => {
    setIsError(false);
  };

  return isError ? (
    <Modal closeModal={closeModal} text="something went wrong. try again later" />
  ) : isLoading ? (
    <Spinner />
  ) : (
    <>
      <Header />
      <Wrapper>
        <Navigation
          list={[
            { title: "Main page", path: "/" },
            { title: "User statistics", path: "/users" },
            {
              title: `${user.first_name} ${user.last_name}`
            }
          ]}
        />
        <Charts
          user={user}
          fromDate={fromDate}
          toDate={toDate}
          changeFromDate={changeFromDate}
          changeToDate={changeToDate}
          newDatesArray={newDatesArray}
          clicksDataArray={clicksDataArray}
          viewsDataArray={viewsDataArray}
        />
      </Wrapper>
      <Footer />
    </>
  );
};

export default UserPage;
