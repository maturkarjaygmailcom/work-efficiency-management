import React from 'react'
import '../css/PunchinOut.css'
import { useEffect, useState } from 'react'


const PunchingOut = () => {

    const [data1, setdata1] = useState([]);
    const [data2, setdata2] = useState([]);

    useEffect(() => {
        // console.log("kjhkjhkj")
        // pageload();
        // loadtable2();
        getData1();
        getData2();
    }, [])


    const getData1 = async () => {
        // document.querySelector("#id-table").html("");               //empty search list

        var name = localStorage.getItem("name");
        const res = await fetch('http://localhost/jay/api/api-fetch-all-facultydetail-in-punchingpage.php?sname=' + name);
        const actualdata = await res.json();                                                          // sname="+lat+"&param2="+lon

        // console.log(actualdata)
        setdata1(actualdata);
    }

    const getData2 = async () => {
        // document.querySelector("#id-table").html("");               //empty search list

        var name = localStorage.getItem("name");
        const res = await fetch('http://localhost/jay/api/api-fetch-all-punchDetail.php?sname=' + name + '&sdate=' + todaydate)
        const actualdata = await res.json();

        // console.log(actualdata)
        setdata2(actualdata);
    }



    //page load fetch all data
    const pageload = () => {
        window.$("#id-table1").html("");

        var name = localStorage.getItem("name");
        // console.log(name)

        var obj = { sname: name };
        var jsonData = JSON.stringify(obj);


        // url: 'http://localhost/jay/api/api-fetch-all-punchDetail.php',


        window.$.ajax({
            url: 'http://localhost/jay/api/api-fetch-all-facultydetail-in-punchingpage.php',
            type: "POST",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data.status === false) {
                    window.$("#id-table1").append("<tr><td colSpan='5'><h2>" + data.message + "</h2></td></tr>");
                }
                else {


                    window.$.each(data, function (key, value) {
                        window.$("#id-table1").append("<tr>" +
                            "<td>" + value["name"] + "</td>" +
                            "<td>" + value["department"] + "</td>" +
                            "<td><button className='punchin'  id='" + value["name"] + "' onClick='" + { punchinbtn } + "'>punchIn</button></td>" +
                            "<td><button className='punchout'  id='" + value["name"] + "' onClick='" + { punchOutBtn } + "'>punchOut</button></td>" +
                            // "<td><button  onClick= {restBtn} className='rest'  id='" + value['name'] + "'>Reset</button></td>" +
                            "<td><button  onClick= " + { restBtn } + " className='rest'  id='" + value['name'] + "'>Reset</button></td>" +
                            "</tr>");

                        // console.log(value["email"], value["department"]);

                        localStorage.setItem("email1", value["email"])
                        localStorage.setItem("department1", value["department"])
                        // window.document.email1 = value["email"];
                        // window.document.department1 = value["department"];





                    });


                }

            }
        });
    }


    //onload get value and print user data
    const loadtable2 = () => {
        window.$("#id-table2").html("");
        var name = localStorage.getItem("name")
        // console.log(name)

        var obj = { sname: name };
        var jsonData = JSON.stringify(obj)

        window.$.ajax({
            url: 'http://localhost/jay/api/api-fetch-all-punchDetail.php',
            type: "POST",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data.status === false) {
                    // console.log(data)
                    window.$("#id-table2").append("<tr><td colSpan='3'><h2>" + "" + "</h2></td></tr>")
                }
                else {

                    // console.log(data)
                    window.$.each(data, function (key, value) {
                        window.$("#id-table2").append("<tr>" +
                            "<td>" + value["date"] + "</td>" +
                            "<td>" + value["day"] + "</td>" +
                            "<td>" + value["punchInTime"] + "</td>" +
                            "<td>" + value["punchOutTime"] + "</td>" +
                            "<td>" + value["durations"] + "</td>" +
                            "</tr>");


                    });
                }

            }

        });
    }


    //click on punchin

    const punchinbtn = (event) => {
        {

            // var name = window.$(this).attr("id");
            let name = event.target.id;

            //for time
            let currentdate = new Date();
            let hour = currentdate.getHours()
            let minutes = currentdate.getMinutes()
            let sec = currentdate.getSeconds()

            let punchin = hour + ":" + minutes + ":" + sec
            // console.log(punchin)
            //for day
            // const valentines = new Date();
            const day1 = currentdate.getDay();
            // console.log(day1)
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            // console.log(dayNames[day1]);

            //check same name and date exist

            var obj2 = { sdate: todaydate, sname: name };
            var myJSON2 = JSON.stringify(obj2);
            console.log(myJSON2)
            console.log(obj2)
            window.$.ajax({
                url: 'http://localhost/jay/api/api-check-already-exist-or-not.php',
                type: "POST",
                dataType: "json",
                data: myJSON2,
                success: function (data) {
                    console.log(data);
                    console.log("seee");
                    //true for data not getting
                    if (data.status === true) {

                        // namee = data[0].name;
                        // datee = data[0].date;
                        // console.log(namee, datee)
                        // document.querySelector(".punchin").disabled = false;

                        insertIntoTable();
                        // loadtable2();

                    }
                    else {
                        // console.log("ghgkhjhkjhkjhkj");
                        // document.querySelector(".punchout").disabled = false;

                        //forcely commenting updatetable()
                        updateTable();

                        //and add insertIntoTable
                        // insertIntoTable();


                        // loadtable2();
                        console.log(true)

                    }
                }
            });


        }
    }

    // window.$(document).on("click", ".punchin", punchinbtn)



    function updateTable() {

        let currentdate = new Date();
        let hour = currentdate.getHours()
        let minutes = currentdate.getMinutes()
        let sec = currentdate.getSeconds()

        let punchin = hour + ":" + minutes + ":" + sec
        console.log(punchin)
        // var name12 = window.$(this).attr("id");
        var name12 = localStorage.getItem("name");

        var obj1 = { stime1: punchin, sname: name12 };
        var myJSON1 = JSON.stringify(obj1);
        console.log(myJSON1)
        console.log(obj1)
        window.$.ajax({
            url: 'http://localhost/jay/api/api-update-punchingtime1.php',
            type: "POST",
            dataType: "json",
            data: myJSON1,
            success: function (data) {
                // console.log("sssssssssssss")

                if (data.status === 'true') {
                    // loadtable2();
                    getData2();
                    document.querySelector(".punchin").disabled = true;

                }
                else {
                    // window.$("#modal").hide();
                    // console.log("sssssssssssss")

                }
            }
        });
    }


    function insertIntoTable() {

        // var name = window.$(this).attr("id");
        var name = localStorage.getItem("name");

        //for time
        let currentdate = new Date();
        let hour = currentdate.getHours()
        let minutes = currentdate.getMinutes()
        let sec = currentdate.getSeconds()

        let punchin = hour + ":" + minutes + ":" + sec
        // console.log(punchin)

        //for day
        const day1 = currentdate.getDay();
        // console.log(day1)

        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // console.log(email1, department1);
        let email1 = localStorage.getItem("email")
        let department1 = localStorage.getItem("department")
        console.log(email1, department1)
        var obj1 = { sname: name, semail: email1, sdepartment: department1, spunchintime: punchin, sday: dayNames[day1], todaydate };

        var myJSON1 = JSON.stringify(obj1);
        // console.log(myJSON1)
        // console.log(obj1)
        window.$.ajax({
            url: 'http://localhost/jay/api/api-insert-punchingtime1.php',
            type: "POST",
            dataType: "json",
            data: myJSON1,
            success: function (data) {
                // console.log(data)

                if (data.status === true) {
                    // console.log("sssssssssssss")
                    // loadtable2();
                    getData2();
                    document.querySelector(".punchin").disabled = true;
                    // document.getElementById("id-mainTable").style.visibility = "visible";

                }
                else {

                }
            }
        });
    }



    //click on punchout
    const punchOutBtn = (event) => {
        {

            let currentdate = new Date();
            let hour = currentdate.getHours()
            let minutes = currentdate.getMinutes()
            let sec = currentdate.getSeconds()

            let punchout = hour + ":" + minutes + ":" + sec
            // console.log(punchout)

            // var name2 = window.$(this).attr("id");
            let name2 = event.target.id;

            var obj2 = { stime1: punchout, sname: name2, };
            var myJSON2 = JSON.stringify(obj2);
            // console.log(myJSON2)
            // console.log(obj2)
            window.$.ajax({
                url: 'http://localhost/jay/api/api-update-punchOuttime1.php',
                type: "POST",
                dataType: "json",
                data: myJSON2,
                success: function (data) {
                    if (data.status === 'true') {
                        // console.log(data.value);
                        // console.log("ghgkhjhkjhkjhkj");
                        document.querySelector(".punchout").disabled = true;
                        timediff1();
                        // loadtable2();
                        console.log("aaaaaaaaaaaa")

                    }
                    else {
                        // loadtable2();
                        // console.log(data.value)

                    }
                }
            });
        }
    }
    // window.$(document).on("click", ".punchout", punchOutBtn)



    //get both time and find diffrence between them
    const timediff1 = async () => {
        var name = localStorage.getItem("name")
        // var name = window.$(this).attr("id");
        var obj2 = { sname: name };
        var myJSON2 = JSON.stringify(obj2);

        window.$.ajax({
            url: 'http://localhost/jay/api/api-update-duration.php',
            type: "POST",
            dataType: "json",
            data: myJSON2,
            success: function (data) {
                if (data.status === 'true') {
                    // console.log(data.value);
                    getData2();
                    // loadtable2();
                    // document.querySelector(".punchout").disabled = true;

                }
                else {
                    // loadtable2();
                    // console.log(data.value)
                }
            }
        });
    }



    //rest both time and find diffrence between them
    const restBtn = (event) => {
        {
            // var name = window.$(this).attr("id");
            let name = event.target.id;
            var obj2 = { sname: name };
            var myJSON2 = JSON.stringify(obj2);

            window.$.ajax({
                url: 'http://localhost/jay/api/api-update-restbtn.php',
                type: "POST",
                dataType: "json",
                data: myJSON2,
                success: function (data) {
                    if (data.status === 'true') {
                        // console.log(data.value);

                        // loadtable2();
                        getData2();
                        document.querySelector(".punchin").disabled = false;
                        document.querySelector(".punchout").disabled = false;

                    }
                    else {
                        // loadtable2();
                        // console.log(data.value)

                    }
                }
            });
        }
    }
    // window.$(document).on("click", ".rest", restBtn)



    // var currentdate = new Date();
    // // // var datetime = "Last Sync: " + currentdate.getDate() + "/"
    // let day11 = currentdate.getDay()
    // let month11 = currentdate.getMonth()
    // let year11 = currentdate.getFullYear()

    // let todaydate = day11 + "/" + month11 + "/" + year11
    // // let todaydate = year + "-" + month + "-" + day
    // console.log(todaydate)

    let today = new Date();
    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');

    let todaydate = `${year}-${month}-${day}`;
    // console.log(todaydate);


    return (

        <>
            {/* table1 */}
            <section className="tablePunch" id="id-mainTable" >

                <section className="table_headerPunch" >
                    <h1>Dashboard</h1>


                </section>

                <section className="table_bodyPunch" >
                    <table id="id-fullTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>punch In Time</th>
                                <th>punch Out Time</th>
                                <th>Reset</th>
                            </tr>
                        </thead>
                        <tbody id="id-table">

                            {
                                (data1.status === false) ? <tr><td colSpan='7'><h2> Not found</h2></td></tr>
                                    :
                                    // document.querySelector("#id-table").html("");
                                    data1.map((val, inde) => {
                                        return (
                                            // if (val.status == false) {
                                            <tr key={inde}>
                                                <td className='text-center'>{val.name}</td>
                                                <td className='text-center'>{val.department}</td>
                                                <td className='text-center' ><button className="punchin btn btn-primary" id={val.name} onClick={punchinbtn} >PunchIn</button></td>
                                                <td className='text-center' ><button className="punchout btn btn-primary" id={val.name} onClick={punchOutBtn}>punchOut</button></td>
                                                <td className='text-center' ><button className="rest btn btn-primary" id={val.name} onClick={restBtn}>Reset</button></td>

                                                {/* <button className='punch'  id='" + value["name"] + "'>punch</button> */}

                                            </tr>

                                            // }
                                            // else {

                                            // }


                                        )
                                    })
                            }
                        </tbody>
                        {/* <tbody id="id-table1" className="text-center"></tbody> */}


                    </table>
                </section>
            </section>

            {/* table2 */}
            <section className="tablePunch" id="id-mainTable" >

                <section className="table_headerPunch" >
                    <h1>Dashboard</h1>


                </section>

                <section className="table_bodyPunch" >
                    <table id="id-fullTable">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Day</th>
                                <th>Punch In Time</th>
                                <th>Punch Out Time</th>
                                <th>Duration</th>
                            </tr>
                        </thead>

                        <tbody id="id-table">

                            {
                                (data2.status === false) ? <tr><td colSpan='7'><h2> No Records</h2></td></tr>
                                    :
                                    // document.querySelector("#id-table").html("");
                                    data2.map((val, inde) => {
                                        return (
                                            // if (val.status == false) {
                                            <tr key={inde}>
                                                <td className='text-center'>{val.date}</td>
                                                <td className='text-center'>{val.day}</td>
                                                <td className='text-center'>{val.punchInTime}</td>
                                                <td className='text-center'>{val.punchOutTime}</td>
                                                <td className='text-center'>{val.durations}</td>


                                                {/* <button className='punch'  id='" + value["name"] + "'>punch</button> */}

                                            </tr>

                                            // }
                                            // else {

                                            // }


                                        )
                                    })
                            }
                        </tbody>


                        {/* <tbody id="id-table2" className="text-center"></tbody> */}

                    </table>
                </section>
            </section>

        </>

    )
}
export default PunchingOut;