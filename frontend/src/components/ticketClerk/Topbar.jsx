import React from 'react'
import '../syles/topbar.css';


export default function Topbar() {
  return (
    <nav className="topbar">
      <i className="bx bx-menu"></i>
      <a href="#" className="nav-link">Categories</a>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <i className="bx bx-search"></i>
          </button>
        </div>
      </form>
      <a href="#" className="notification">
        <i className="bx bxs-bell"></i>
        <span className="num">8</span>
      </a>
    </nav>
  )
}
