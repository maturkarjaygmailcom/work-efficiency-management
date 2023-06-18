import React, { useEffect, useState } from 'react'
import '../css/Repo.css'
import { isVisible } from '@testing-library/user-event/dist/utils';
// import '../css/Report.css'



const Report1 = () => {

  // const [num,setnum]=useState();

  useEffect(() => {
    pageload();

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
    window.$("#id-fullTable").table2excel({
      filename: "Reports.xls",
      name: "worksheet"
    })
  }




  const fun1 = () => {
    let prefer = document.forms[0].selectMin.value;
    console.log("Worker");
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
  function pageload() {
    window.$("#id-table").html("");
    window.$.ajax({
      url: 'http://localhost/jay/api/api-fetch-all-report.php',
      type: "GET",
      dataType: "json",
      success: function (data) {
        if (data.status === false) {
          window.$("#id-table").append("<tr><td colspan='3'><h2>" + data.message + "</h2></td></tr>")
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
          window.$("#id-table").append("<tr><td colspan='3'><h2>" + data.message + "</h2></td></tr>")
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


        }

      }
    });
  }

  // window.$("#id-serach").on("keyup", searching);

  function searching() {
    console.log("Worker")
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
          console.log(data)

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
    console.log(prefer1)
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
          window.$("#id-table").append("<tr><td colspan='7'><h2>" + data.message + "</h2></td></tr>")
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




  return (
    <div className='repo'>
      <section>
        {/* <form>

        <select id="selectMin" onChange={fun1}>
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

        <select id="selectDay" onChange={days} style={{ "marginLeft": "60%", "visibility": "hidden" }}>
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="last-7-days">last 7 days</option>
          <option value="last-15-days">last 15 days</option>
          <option value="last-30-days">last 30 days</option>
        </select>
      </form> */}
      </section>


      <section className="table" id="id-mainTable">

        <section className="table_headerRepo" >
          <h1>REPORT</h1>

          <div className="input-group">
            <input type="search" placeholder="Search Data..." id="id-serach" className="testname" name="stestname4" onKeyUp={searching} autoComplete='false' autoFocus  />
            {/* <img src='Image/3.png' alt="" /> */}
          </div>

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