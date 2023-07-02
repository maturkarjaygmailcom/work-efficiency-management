import React, { useEffect, useState } from 'react'
import '../css/Repo.css'
import { isVisible } from '@testing-library/user-event/dist/utils';
// import '../css/Report.css'



const Report1 = () => {

  // const [num,setnum]=useState();

  useEffect(() => {
    pageload();

    // lastLine();
    // document.getElementById("id-mainTable").style.visibility ="visible";
    // document.getElementById("id-search").focus();
  }, [])

  // window.$(document).ready(function () {
  // pageload();


  // document.body.style.backgroundImage = "url(../Image/1.jpg) center/ cover";
  // document.body.style.backgroundPosition = "center";
  //     document.body.style.display = "flex";
  //     document.getElementById("id-mainTable").style.justifyContent= "center";
  // document.body.style.backgroundSize = "cover";

  window.$("#id-search").focus()


  // });


  function tableToExcel() {
    window.$("#id-fullTableRepo").table2excel({
      filename: "Reports.xls",
      name: "worksheet"
    })
  }




  const fun1 = () => {
    let prefer = document.forms[0].selectMin.value;
    // console.log("Worker");
    if (prefer === "name") {
      namewise(prefer);
      // last7DayCountSum();
      document.querySelector("#selectDay").style.visibility = "hidden"

    }
    else if (prefer === "all") {
      // namewise(prefer);
      // pageloadCountSum();
      pageload()
      document.querySelector("#selectDay").style.visibility = "hidden"

    }
    else if (prefer === "department") {
      namewise(prefer);
      // pageloadCountSum();
      document.querySelector("#selectDay").style.visibility = "hidden"

    }
    else if (prefer === "date") {
      namewise(prefer);
      document.querySelector("#selectDay").style.visibility = "visible"

    }
    else if (prefer === "day") {
      namewise(prefer);
      document.querySelector("#selectDay").style.visibility = "hidden"

    }
    else if (prefer === "punchInTime") {
      namewise(prefer);
      document.querySelector("#selectDay").style.visibility = "hidden"

    }
    else if (prefer === "punchOutTime") {
      namewise(prefer);
      document.querySelector("#selectDay").style.visibility = "hidden"

    }
    else if (prefer === "durations") {

      namewise(prefer);
      document.querySelector("#selectDay").style.visibility = "hidden"
    }
  }





  //page load fetch all data
  const pageload= ()=> {
    window.$("#id-table").html("");
    window.$.ajax({
      url: 'http://localhost/jay/api/api-fetch-all-report.php',
      type: "GET",
      dataType: "json",
      success: function (data) {
        if (data.status === false) {
          window.$("#id-table").append("<tr><td colSpan='3'><h2>" + data.message + "</h2></td></tr>")
        }
        else {

          // console.log(data)
          window.$.each(data, function (key, value) {
            window.$("#id-table").append("<tr>" +
              "<td>" + value["name"] + "</td>" +
              "<td>" + value["department"] + "</td>" +
              "<td>" + value["date"] + "</td>" +
              "<td>" + value["day"] + "</td>" +
              "<td>" + value["punchInTime"] + "</td>" +
              "<td>" + value["punchOutTime"] + "</td>" +
              "<td>" + value["durations"] + "</td>" +
              "</tr>");


          });

          lastLine();
          let totaltime = localStorage.getItem("time")
          let totalper = localStorage.getItem("totalperson")
          // console.log(totaltime)
          // console.log(totalper)
          window.$("#id-table").append("<tr>" +
            "<td>" + totalper + "</td>" +
            "<td>" + "</td>" +
            "<td>" + "</td>" +
            "<td>" + "</td>" +
            "<td>" + "</td>" +
            "<td>" + "</td>" +
            "<td>" + totaltime + "</td>" +
            "</tr>");
        }

      }
    });

  }
  function namewise(prefer) {
    // console.log(prefer);

    let obj = { "sname": prefer }
    let jsondata = JSON.stringify(obj);

    window.$("#id-table").html("");
    window.$.ajax({
      url: 'http://localhost/jay/api/api-fetch-all-punchDetail-namewise.php',
      type: "POST",
      dataType: "json",
      data: jsondata,
      success: function (data) {

        if (data.status === false) {
          window.$("#id-table").append("<tr><td colSpan='3'><h2>" + data.message + "</h2></td></tr>")
        }
        else {
          // console.log(data)
          window.$.each(data, function (key, value) {
            window.$("#id-table").append("<tr>" +
              "<td>" + value["name"] + "</td>" +
              "<td>" + value["department"] + "</td>" +
              "<td>" + value["date"] + "</td>" +
              "<td>" + value["day"] + "</td>" +
              "<td>" + value["punchInTime"] + "</td>" +
              "<td>" + value["punchOutTime"] + "</td>" +
              "<td>" + value["durations"] + "</td>" +
              "</tr>");


          });

          lastLine();
          let totaltime3 = localStorage.getItem("time")
          let totalper3 = localStorage.getItem("totalperson")

          window.$("#id-table").append("<tr>" +
            "<td>" + totalper3 + "</td>" +
            "<td>" + "</td>" +
            "<td>" + "</td>" +
            "<td>" + "</td>" +
            "<td>" + "</td>" +
            "<td>" + "</td>" +
            "<td>" + totaltime3 + "</td>" +
            "</tr>");
        }

      }
    });
  }

  // window.$("#id-serach").on("keyup", searching);

  function searching() {
    // console.log("Worker")
    window.$("#id-table").html("");               //empty search list
    // var lab_name = window.$(this).val();

    var searchval = window.$("#id-serach").val();
    // console.log(searchval)
    if (searchval !== "") {
      window.$.ajax({
        url: 'http://localhost/jay/api/api-search-feculty.php?sname=' + searchval,
        type: "GET",
        dataType: "json",
        success: function (data) {
          // console.log(data)

          if (data.status === false) {
            //  console.log(data.status)
          }
          else {
            // window.$("#id-table").val("")
            window.$.each(data, function (key, value) {
              window.$("#id-table").append("<tr>" +
                "<td>" + value["name"] + "</td>" +
                "<td>" + value["department"] + "</td>" +
                "<td>" + value["date"] + "</td>" +
                "<td>" + value["day"] + "</td>" +
                "<td>" + value["punchInTime"] + "</td>" +
                "<td>" + value["punchOutTime"] + "</td>" +
                "<td>" + value["durations"] + "</td>" +
                "</tr>");

            });
            lastLine();
            let totaltime1 = localStorage.getItem("time")
            let totalper1 = localStorage.getItem("totalperson")

            // console.log(totaltime1)
            window.$("#id-table").append("<tr>" +
              "<td>" + totalper1 + "</td>" +
              "<td>" + "</td>" +
              "<td>" + "</td>" +
              "<td>" + "</td>" +
              "<td>" + "</td>" +
              "<td>" + "</td>" +
              "<td>" + totaltime1 + "</td>" +
              "</tr>");

          }
        }
      });
      // window.$("#id-lab-4").focusout(("#testlist").fadeOut);
    }
    else {
      // window.$("#testlist4").fadeOut();
      pageload();

    }
  }

  const todayData = (prefer1) => {
    // console.log(prefer1)
    let obj = { "sname": prefer1 }
    let jsondata = JSON.stringify(obj);

    window.$("#id-table").html("");
    window.$.ajax({
      url: 'http://localhost/jay/api/api-fetch-today-punchDetail.php',
      type: "POST",
      dataType: "json",
      data: jsondata,
      success: function (data) {

        if (data.status === false) {
          window.$("#id-table").append("<tr><td colSpan='7'><h2>" + data.message + "</h2></td></tr>")
        }
        else {
          // console.log(data)
          window.$.each(data, function (key, value) {
            window.$("#id-table").append("<tr>" +
              "<td>" + value["name"] + "</td>" +
              "<td>" + value["department"] + "</td>" +
              "<td>" + value["date"] + "</td>" +
              "<td>" + value["day"] + "</td>" +
              "<td>" + value["punchInTime"] + "</td>" +
              "<td>" + value["punchOutTime"] + "</td>" +
              "<td>" + value["durations"] + "</td>" +
              "</tr>");


          });

          lastLine();
          let totaltime2 = localStorage.getItem("time")
          var totalper2 = localStorage.getItem("totalperson")

          window.$("#id-table").append("<tr>" +
            "<td>" + totalper2 + "</td>" +
            "<td>" + "</td>" +
            "<td>" + "</td>" +
            "<td>" + "</td>" +
            "<td>" + "</td>" +
            "<td>" + "</td>" +
            "<td>" + totaltime2 + "</td>" +
            "</tr>");


        }

      }
    });
  }



  const days = () => {

    let prefer1 = document.forms[1].selectDay.value;
    if (prefer1 === "today") {
      prefer1 = 1
      todayData(prefer1);
      // console.log("hii")

    }
    else if (prefer1 === "last-7-days") {
      prefer1 = 7
      todayData(prefer1);
    }
    else if (prefer1 === "all") {
      namewise(prefer1);
    }
    else if (prefer1 === "last-15-days") {
      prefer1 = 15
      todayData(prefer1);
    }
    else if (prefer1 === "last-30-days") {
      prefer1 = 30
      todayData(prefer1);
    }
  }


  // window.$(document).on("click", "#btn-excel", tableToExcel);
  // window.$(document).on("change", "#selectMin", fun1);
  // window.$(document).on("change", "#selectDay", days);

  const lastLine = async () => {

    // Get the table element
    var table = document.getElementById("id-fullTableRepo");

    // Initialize variables for count and total time
    var totalCount = 0;
    var totalSeconds = 0;
    // console.log("hi1")

    // Iterate through each row in the table (excluding the header row)
    for (let i = 1; i < table.rows.length; i++) {
      let row = table.rows[i];

      // Get the name and increment the total count
      var name = row.cells[0].innerHTML;
      totalCount++;

      // Get the time and convert it to seconds
      var timeParts = row.cells[6].innerHTML.split(":");
      // console.log(timeParts, row)
      var hours = parseInt(timeParts[0]);
      var minutes = parseInt(timeParts[1]);
      var seconds = parseInt(timeParts[2]);
      var timeInSeconds = (hours * 3600) + (minutes * 60) + seconds;
      totalSeconds += timeInSeconds;
      // console.log("totalSeconds")
    }
    // console.log(totalCount)
    // console.log("hi2")


    // Convert total time in seconds to "hh:mm:ss" format
    var formattedTime = new Date(totalSeconds * 1000).toISOString().substr(11, 8);

    // Display the total count and total time in "hh:mm:ss" format in the console
    // console.log("Total Count: " + totalCount);
    // console.log("Total Time: " + formattedTime);
    localStorage.setItem("time", formattedTime);
    localStorage.setItem("totalperson", totalCount);
  }

  // lastLine();
  const cssss = {
    // "width": "109px",
    "borderRadius": "8px",
    "border": "none",
    "marginLeft": "70%",
  }
  const cssss2 = {
    // "width": "109px",
    "borderRadius": "8px",
    "border": "none",
    "marginLeft": "150%",
    "visibility": "hidden"
  }
  return (

    <div className='repo'>
      <section>
      </section>


      <section className="tableRepo" id="id-mainTable">

        <section className="table_headerRepo" >
          <h1>REPORT</h1>

          <div className="input-group">
            <input type="search" placeholder="Search Data..." id="id-serach" className="testname" name="stestname4" onKeyUp={searching} autoComplete='false' autoFocus />
            {/* <img src='Image/3.png' alt="" /> */}
          </div>
          <form>

            <select id="selectMin" onChange={fun1} style={cssss}>
              <option value="all">All</option>
              <option value="name">Name</option>
              <option value="department">Department</option>
              <option value="date">Date</option>
              <option value="day">Day</option>
              <option value="punchInTime">PunchInTime</option>
              <option value="punchOutTime">PunchOutTime</option>
              <option value="durations">Duration</option>
            </select>
          </form>

          <form>

            <select id="selectDay" onChange={days} style={cssss2}  >
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="last-7-days">last 7 days</option>
              <option value="last-15-days">last 15 days</option>
              <option value="last-30-days">last 30 days</option>
            </select>
          </form>

          <button className="btn_export" onClick={tableToExcel} id="btn-excel">Export Excel</button>
          <button id="" onClick={window.print} className="btn_pdf" >Export Pdf</button>
        </section>

        <section className="table_bodyRepo">
          <table id="id-fullTableRepo">
            <thead>

              <tr>

                {/* <!-- <td><b>No</b></td> --> */}
                <th>Name</th>
                <th>Department</th>
                <th>Date</th>
                <th>Day</th>
                <th>punch In Time</th>
                <th>punch Out Time</th>
                <th>Duration</th>
              </tr>
            </thead>


            <tbody id="id-table" className="text-center"></tbody>

          </table>
        </section>

      </section >


    </div>
  )
}

export default Report1;
