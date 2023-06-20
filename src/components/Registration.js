import React from "react";
import '../css/Reg2.css'
import { useNavigate } from "react-router-dom";
// import '../Image/1.jpg'

export default function Registration() {


const locationToLogin=useNavigate()

    //insert reg data

    const regbtn = () => {

        var name = window.$("#id-name").val();
        var email1 = window.$("#id-email").val();
        var dep = window.$("#id-dep").val();
        var date = window.$("#id-date").val();
        var confpass = window.$("#id-confpass").val();
        var pass = window.$("#id-pass").val();

        if (name === "" && email1 === "" && dep === "" && date === "" && confpass === "" && pass === "") {
            // window.$('#id-alert').text("");
            window.$("#id-alert").text("Enter your Detail")

        } else {


            var obj = { sname: name, semail: email1, sdept: dep, sjoingdate: date, spass: pass };
            var dataJson1 = JSON.stringify(obj);
            console.log(dataJson1, obj)

            if (confpass === pass) {
                window.$('#id-alert').text("");

                var email = window.$("#id-email").val();

                var obj1 = { semail: email };
                var jsonData2 = JSON.stringify(obj1)
                console.log(jsonData2)
                window.$.ajax({
                    url: 'http://localhost/jay/api/api-fetch-login-auth.php',
                    type: "POST",
                    dataType: "json",
                    data: jsonData2,
                    success: function (data) {
                        // console.log(data)

                        if (data.status === 'false') {
                            console.log("new data ")
                            insertRegData(dataJson1)

                        }
                        else {
                            window.$.each(data, function (key, value) {
                                if (value.email === email && email !== "") {
                                    // window.$('#id-alert').text("");
                                    window.$("#id-alert").text("you already have account")
                                    console.log("notworking.....same email")
                                }
                                else {
                                    if (value.name !== "" && value.email !== "" && value.department !== "" && value.joingdate !== "" && value.password !== "") {
                                        insertRegData(dataJson1);
                                    }
                                }
                            });
                        }
                    }
                });
            }
            else {
                window.$('#id-alert').text("");
                window.$('#id-alert').text("password & conform password mismatch");
                console.log("password & conform password mismatch")
            }
        }
    }


    function insertRegData(dataJson1) {

        window.$.ajax({
            url: 'http://localhost/jay/api/api-insert-reg-detail.php',
            type: "POST",
            data: dataJson1,
            success: function (data) {

                if (data.status === false) {
                    console.log("notW")
                }
                else {
                    // document.location.href = "http://localhost/jay/html/login.html";
                    locationToLogin("/")
                }
            }
        });
    }



    return (
        <>

            <div className="box">
                <div className="containerReg">

                    <div className="top">

                        <header className="headerReg">Registration</header>
                    </div>

                    <div className="input-field">
                        <input id="id-name" type="name" className="input" placeholder="Full Name" required autoFocus />
                        {/* <i className='bx bx-user' ></i> */}
                    </div>

                    <div className="input-field">
                        <input id="id-email" type="email" className="input" placeholder="Email" required />
                        <label for="" id="email-alert"></label>
                        {/* <i className='bx bx-lock-alt'></i> */}
                    </div>

                    <div className="input-field">
                        <input id="id-dep" type="name" className="input" placeholder="Department" required />
                        {/* <!-- <i className='bx bx-user' ></i> --> */}
                    </div>

                    <div className="input-field">
                        <input id="id-date" type="date" className="input" placeholder="Joining Date" required />
                        {/* <!-- <i className='bx bx-user' ></i> --> */}
                    </div>

                    <div className="input-field">
                        <input id="id-pass" type="password" className="input" placeholder="Password" required />
                        {/* <!-- <i className='bx bx-user' ></i> --> */}
                    </div>

                    <div className="input-field">
                        <input id="id-confpass" type="password" className="input" name="" placeholder="Confirm Password" />
                        {/* <!-- <i className='bx bx-user' ></i> --> */}
                    </div>
                    <div id="id-alert"></div>

                    <div className="input-field">
                        <button className="submit" value="Login" id="id-signin" onClick={regbtn}>Register</button>
                    </div>

                    <div className="two-col">
                        {/* <div className="one">
                   <input type="checkbox" name="" id="check"/>
                   <label for="check"> Remember Me</label>
                </div> */}
                        {/* <div className="two">
                    <label><a href="#">Forgot password?</a></label>
                </div> */}

                    </div>
                </div>
            </div>

            {/*     
      <center>

        <div className="title">
            Registration
        </div>
        <div>
            <label >Full Name</label>
            <input id="id-name" type="name" required/> <br/>

            <label >Email</label>
            <input id="id-email" type="email" required/>
            <label  id="email-alert"></label>
            <br/>

            <label >Department</label>
            <input id="id-dep" type="name" required/> <br/>


            <label >Joing Date</label>
            <input id="id-date" type="date" required/> <br/>

            <label >password</label>
            <input id="id-pass" type="password" required/> <br/>

            <label >Confirm password</label>
            <input id="id-confpass" type="password" name=""/><br/>
            <br/>
            <div id="id-alert"></div>
            <button id="id-signin">SignIn</button>
        </div>

    </center>  */}

        </>
    )
}