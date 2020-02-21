import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Spinner from "../Spinner/Spinner";
import Modal from "../Modal/Modal";

import "./UserStatistics.scss";

const UserStatistics = props => {
  const tableHeader = [
    "Id",
    "First name",
    "Last name",
    "Email",
    "Gender",
    "IP address",
    "Total clicks",
    "Total page views"
  ];

  const usersPerPage = 15;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [isPreviousPageActive, setIsPreviousPageActive] = useState(false);
  const [isNextPageActive, setIsNextPageActive] = useState(true);
  const [firstPageFromSelector, setFirstPageFromSelector] = useState(1);

  const checkPage = (cPage, lPage) => {
    if (cPage === 1) {
      setIsPreviousPageActive(false);
    } else {
      setIsPreviousPageActive(true);
    }
    if (cPage === lPage) {
      setIsNextPageActive(false);
    } else {
      setIsNextPageActive(true);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3001/users?page=${currentPage}&amount=${usersPerPage}`
        );
        if (response.status !== 200) {
          return setIsError(true);
        }
        const resData = await response.json();
        setUsers(resData.users);

        checkPage(currentPage, Math.ceil(resData.totalAmount / usersPerPage));

        setLastPage(Math.ceil(resData.totalAmount / usersPerPage));
        setIsLoading(false);
      } catch (error) {
        return setIsError(true);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const previousPage = () => {
    if (currentPage === 1) {
      return;
    }
    if (firstPageFromSelector > 1) {
      setFirstPageFromSelector(firstPageFromSelector - 1);
    }
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage === lastPage) {
      return;
    }
    if (firstPageFromSelector + 3 <= lastPage) {
      setFirstPageFromSelector(firstPageFromSelector + 1);
    }
    setCurrentPage(currentPage + 1);
  };

  const setPage = page => {
    setCurrentPage(page);
  };

  const closeModal = () => {
    setIsError(false);
  };

  return isError ? (
    <Modal closeModal={closeModal} text="something went wrong. try again later" />
  ) : isLoading ? (
    <Spinner />
  ) : (
    <section className="user-statistics">
      <h1 className="user-statistics__header">User statistics</h1>
      <table className="user-statistics__table">
        <thead>
          <tr>
            {tableHeader.map(item => (
              <th key={item}>
                <div>{item}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id} onClick={() => props.history.push(`/users/${user.id}`)}>
                <td data-label="Id">
                  <div>{user.id}</div>
                </td>
                <td data-label="First name">
                  <div>{user.first_name}</div>
                </td>
                <td data-label="Last name">
                  <div>{user.last_name}</div>
                </td>
                <td data-label="Email">
                  <div>{user.email}</div>
                </td>
                <td data-label="Gender">
                  <div>{user.gender}</div>
                </td>
                <td data-label="IP adress">
                  <div>{user.ip_address}</div>
                </td>
                <td data-label="Total clicks">
                  <div>{user.total_clicks}</div>
                </td>
                <td data-label="Total page views">
                  <div>{user.total_page_views}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <section className="user-statistics__table-controls">
        <div
          className={
            "user-statistics__previous-page" +
            (isPreviousPageActive ? "" : " user-statistics__previous-page_inactive")
          }
          onClick={previousPage}
        ></div>
        <div
          className={
            "user-statistics__page" +
            (firstPageFromSelector === currentPage ? " user-statistics__page_current" : "")
          }
          onClick={() => setPage(firstPageFromSelector)}
        >
          {firstPageFromSelector}
        </div>
        <div
          className={
            "user-statistics__page" +
            (firstPageFromSelector + 1 === currentPage ? " user-statistics__page_current" : "")
          }
          onClick={() => setPage(firstPageFromSelector + 1)}
        >
          {firstPageFromSelector + 1}
        </div>
        <div
          className={
            "user-statistics__page" +
            (firstPageFromSelector + 2 === currentPage ? " user-statistics__page_current" : "")
          }
          onClick={() => setPage(firstPageFromSelector + 2)}
        >
          {firstPageFromSelector + 2}
        </div>
        <div
          className={
            "user-statistics__next-page" +
            (isNextPageActive ? "" : " user-statistics__next-page_inactive")
          }
          onClick={nextPage}
        ></div>
      </section>
    </section>
  );
};

export default withRouter(UserStatistics);
