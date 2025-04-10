import React from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import lineChart from '../../assets/imgs/lineChart.png'
import ActiveCards from '../../assets/imgs/active-cards.png'
import CardType from '../../assets/imgs/card-type.png'
import TotalRev from '../../assets/imgs/total-rev.png'
import '../../styles/Dashboard.css'

export default function Dashboard() {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();

  return ( 
    <main className="dashboard">
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Home
              </a>
            </li>
          </ul>
        </div>
        <a href="#" className="btn-download">
          <i className="bx bxs-cloud-download"></i>
          <span className="text">Download PDF</span>
        </a>
      </div>

      <ul className="box-info">
        <li>
          <span className="text">
            <h1>Total Users</h1>
            <div className="stats">
              <h3>2834</h3>
              <h4>+3.8%</h4>
            </div>
            <p>Gained +460 new users this month</p>
          </span>
        </li>
        <li>
          <span className="text">
            <h1>Active EcBarko Cards</h1>
            <div className="stats">
              <h3>9,230</h3>
              <h4>+2.5%</h4>
            </div>
            <p>+225 new cards activated</p>
          </span>
        </li>
        <li>
          <span className="text">
            <h1>Total Revenue</h1>
            <div className="stats">
              <h3>&#8369;2,150,000</h3>
              <h4>+1.4%</h4>
            </div>
            <p>&#8369;123,000 drop in revenue</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="totalUsers">
          <span className="lineGraph">
            <h3>Total Users</h3>
            <h4>Active RFID Card</h4>
          </span>
          <img src={lineChart} alt="Line Chart" />
        </div>
        <div className="active-cards">
          <div className="head">
            <h3>Active Cards by Type</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <img src={ActiveCards} alt="Active Cards" />
          <img
            className="card-type"
            src={CardType}
            alt="Card Type"
          />
        </div>
        <div className="total-revenue">
          <div className="head">
            <h3>Total Revenue Per Month</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <img src={TotalRev} alt="Total Revenue" />
        </div>
      </div>
    </main>
  );
}
