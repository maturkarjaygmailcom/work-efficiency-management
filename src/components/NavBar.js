import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import '../css/Navbar.css'

const NavBar = (props) => {
  const visiNav = '"hidden"';

  console.log(visiNav);
  // document.getElementsByClassName("links").visibility = "hidden";
  return (
    <>
      <header className="haderNav">
        <div className="navbar">
          <div className="logo"><a href="">Work-Efficiency</a></div>
          <ul className="links" >

            <li className="nav-item">
              <NavLink  className="nav-link" to="/ActiveFacultyList" >ActiveFacultyList</NavLink>
            </li>

            <li className="nav-item">
              <NavLink  className="nav-link" to="/FacultyList" >FacultyList</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/PunchingOut" >PunchingOut</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Report122" >Report</NavLink>
            </li>




          </ul>
          <NavLink to="/" className="action_btn">Log in</NavLink>
          <div className="toggle_btn">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>


        {/* <div className="dropdown_menu "> */}

        {/* <li><a href="#" className="action_btn">Get started</a></li> */}
        {/* </div> */}
      </header>

      {/* <NavLink  to="/" >home</NavLink>
            <br/>
            <NavLink to="/nev" >nev</NavLink>
            <br/>

            <NavLink to="/list" >list</NavLink>
            <br/>
            
            <NavLink to="/about" >about</NavLink>  
            <br/>

            <NavLink to="/sidebar" >sidebar</NavLink>   */}



{/*
      <header>
        <div className="navbar">
          <div className="logo"><a href="">Work-Efficiency</a></div>
          <ul className="links">
            
            <li className="nav-item">
                  <NavLink className="nav-link" to="/ActiveFacultyList">Dashboard</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/FacultyList">FacultyList</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/PunchingOut">PunchingOut</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Report122">Report</NavLink>
              </li>
            <div className="animation start-dashboard"></div>      



          </ul>
          <NavLink to="/" className="action_btn">Log in</NavLink>
          <div className="toggle_btn">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>


        </header>

        {/* <div className="dropdown_menu "> */}

          {/* <li><a href="#" className="action_btn">Get started</a></li> */}
        {/* </div> */}

  

      {/* comment */}
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" to="#">Work Efficiency</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" ariaControls="navbarSupportedContent" ariaExpanded="false" ariaLabel="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink className="nav-link" ariaCurrent="page" to="/ActiveFacultyList">ActiveFacultyList</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/FacultyList">FacultyList</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/PunchingOut">PunchingOut</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Report122">Report</NavLink>
              </li>
            </ul>



            {/*             
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" ariaLabel="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}


      {/* <button className=" btn btn-outline-primary" >
              <NavLink className="nav-link" to="/">Login</NavLink>
            </button> */}


      {/* <button className="mx-2 btn btn-outline-primary" type="submit">Login</button> */}

      {/* </div> */}
      {/* </div> */}
      {/* </nav> */}


    </>

  )
}

export default NavBar