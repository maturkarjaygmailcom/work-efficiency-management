import React from 'react'
import '../css/LoginForm.css'
import { NavLink, useNavigate } from 'react-router-dom';

const val1 = 11;

const LoginForm=() => {

  //fetch reg data

  const locationToActivePage = useNavigate()

  // window.$(document).ready(function () {

  const loginbtn = () => {


    var email = window.$("#id-email").val();
    var password = window.$("#id-password").val();

    if (email === "" && password === "") {
      window.$("#id-alert").text("Enter your detail")

    }
    else {

      var obj = { semail: email };
      var jsonData = JSON.stringify(obj)
      console.log(jsonData)
      window.$.ajax({
        url: 'http://localhost/jay/api/api-fetch-login-auth.php',
        type: "POST",
        dataType: "json",
        data: jsonData,
        success: function (data) {
          console.log(data)

          if (data.status === 'false') {
            console.log("nw")
            window.$("#id-alert").text("Invalid email or password")
          }
          else {
            window.$.each(data, function (key, value) {
              if (value.password === password && value.password !== "") {
                console.log(value.email, value.password)
                console.log("w")
                // document.getElementById("loginsys").visibility = "hidden";
                document.getElementById("ulLinks").style.display = "block";
                // ulElement.style.display = "block";
                // document.location.href = "http://localhost/jay/html/fecultyList.html"

                // locationToActivePage("/navBar")
                locationToActivePage("/ActiveFacultyList")

                
                // document.getElementsByClassName("links").show();
                // try
                // document.getElementsByClassName("links").removeClass('visible').addClass('invisible');

              }
            });
          }
        }
      });
    }

  }

  return (
    <>


      <div className="box" id="loginsys">
        <div className="container">

          <div className="top">

            <header>Login</header>
          </div>

          <div className="input-field">
            <input type="text" className="input" placeholder="Username" id="id-email" color='white' required autoFocus />
            {/* <i className='bx bx-user' ></i> */}
          </div>

          <div className="input-field">
            <input type="Password" className="input" placeholder="Password" id="id-password" color='white' required />
            {/* <i className='bx bx-lock-alt'></i> */}
          </div>




          <div id="id-alert" className='alert'></div>
          <div className="input-field">
            <button type="submit" className="submit" value="Login" id="id-login" onClick={loginbtn}>LogIn</button>
          </div>


          <div className="two-col">
            {/* <div className="one">
                   <input type="checkbox" name="" id="check"/>
                   <label htmlFor="check"> Remember Me</label>
                </div> */}

            <div className="two">
              {/* <label><a href="#">Forgot password?</a></label> */}
            </div>
            <NavLink to="/Reg">register your self</NavLink>

          </div>
        </div>
      </div>



    </>
  )
}

export default LoginForm;
export { val1 };