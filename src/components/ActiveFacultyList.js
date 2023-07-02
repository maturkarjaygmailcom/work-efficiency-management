import React, { useEffect, useState } from "react";
import "../css/ActiveFaculty.css"

const ActiveFaculty = () => {
    // const locationToPunchout = useNavigate();

    const [data, setdata] = useState([]);

    useEffect(() => {
        // console.log("kjhkjhkj")
        // pageload();
        // loadtable2();
        getData();
    }, [])


    const getData = async () => {
        // document.querySelector("#id-table").html("");               //empty search list

        const res = await fetch('http://localhost/jay/api/api-fetch-all-fecultyList-punchingOut-zero.php')
        const actualdata = await res.json();

        console.log(actualdata)
        setdata(actualdata);
    }

    //page load fetch all data
    const pageload = () => {
        window.$("#id-table").html("");
        window.$.ajax({
            url: 'http://localhost/jay/api/api-fetch-all-fecultyList-punchingOut-zero.php',
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data.status == false) {
                    window.$("#id-table").append("<tr><td colSpan='4'><h2>" + data.message + "</h2></td></tr>")
                }
                else {

                    window.$.each(data, function (key, value) {
                        window.$("#id-table").append("<tr>" +
                            "<td>" + value["name"] + "</td>" +
                            "<td>" + value["email"] + "</td>" +
                            "<td>" + value["department"] + "</td>" +
                            "<td>" + value["punchInTime"] + "</td>" +
                            "<td><button  class='punch1 btn btn-primary'  id='" + value['name'] + "' onclick='punchbtn1()'>punch</button></td>" +
                            "<td>Outside</td>" +
                            "</tr>");


                    });


                }

            }
        });
    }




    //punch record
    // window.$(document).on("click", ".punch1", () => {


    const punchbtn1 = async () => {

        console.log("abc");
        // event.target.id

        // var name = event.target.id();
        // var name = document.getElementsByClassName("punch");
        // var name = event.target.id;
        //  .$(this).attr("id");

        // console.log(name)

        // localStorage.clear()

        // localStorage.setItem("name", name)
        // console.log(localStorage)


        // document.location.href = 'http://localhost/jay/html/punchinOut.html';
        // locationToPunchout("/PunchingOut");

    }
    // });



    return (
        <>

            <section className="tableActive" id="id-mainTable" >

                <section className="table_headerActive" >
                    <h1>Dashboard</h1>


                </section>

                <section className="table_bodyActive" >
                    <table id="id-fullTable">
                        <thead>
                            <tr>
                                <th><b>Name</b></th>
                                <th><b>Email</b></th>
                                <th><b>Department</b></th>
                                <th><b>PunchInTime</b></th>
                                <th><b>Punch</b></th>
                                <th><b>Status</b></th>
                            </tr>
                        </thead>

                        <tbody id="id-table">

                            {
                                (data.status === false) ? <tr><td colSpan='7'><h2>No records</h2></td></tr>
                                    :
                                    // document.querySelector("#id-table").html("");
                                    data.map((val, inde) => {
                                        return (
                                            // if (val.status == false) {
                                            <tr key={inde}>
                                                <td className='text-center'>{val.name}</td>
                                                <td className='text-center'>{val.email}</td>
                                                <td className='text-center'>{val.department}</td>
                                                <td className='text-center'>{val.punchInTime}</td>
                                                <td className='text-center' ><button className="punch btn btn-primary" id={val.name} onClick={punchbtn1}>punch</button></td>
                                                <td className='text-center'>Outside</td>


                                                {/* <button className='punch'  id='" + value["name"] + "'>punch</button> */}

                                            </tr>

                                            // }
                                            // else {

                                            // }


                                        )
                                    })
                            }
                        </tbody>



                        {/* <tbody id="id-table" className="text-center"></tbody> */}

                    </table>
                    {/* </center> */}


                </section>
            </section>
        </>
    )

}

export default ActiveFaculty;