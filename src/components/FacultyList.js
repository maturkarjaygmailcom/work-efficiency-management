import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/FecultyList.css"
// import '../Image/1.jpg'
// import '../Image/3.png'

const FacultyList = () => {

    const [data, setdata] = useState([]);
    // const [data1, setdata1] = useState([]);
    useEffect(() => {
        getData();

    }, []);




    const location1 = useNavigate();


    // //punch record
    const punchin = (event) => {
        // console.log(this)

        let name = event.target.id;
        // console.log(event.target.id)
        // console.lab(event.target.parentElement.parentElement.childNodes[2]);

        let row = (event.target.parentElement.parentElement);
        var cells = row.cells;

        let email=(cells[1].textContent);
        let department=(cells[2].textContent);


        localStorage.clear()

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("department", department)

        location1("/PunchingOut")

    }


    const getData = async () => {
        // document.querySelector("#id-table").html("");               //empty search list

        const res = await fetch('http://localhost/jay/api/api-fetch-all-fecultyList.php')
        const actualdata = await res.json();

        // console.log(actualdata)
        setdata(actualdata);
    }





    //   window.$("#id-lab-4").focus()
    //searching..            

    // window.$("#id-lab-4").on("keyup", testname4);


    async function searching1(e) {
        console.log(e.target.value)
        let searchval = e.target.value
        // document.querySelector("#id-table").html("");               //empty search list


        if (searchval != "") {
            const res = await fetch('http://localhost/jay/api/api-search-faculty-for-facultyList.php?sname=' + searchval)
            const actualdata2 = await res.json();
            console.log(actualdata2)
            setdata(actualdata2);
        } else {
            // aadd/
            // document.querySelector("#id-table").html("");

            getData();
        }
    }


    //get total+1 value of feculty
    function getMaxValOfFaculty() {

        window.$.ajax({
            url: 'http://localhost/jay/api/api-max-feculty.php',
            type: "GET",
            success: function (data) {
                // console.log(data);
                data = JSON.stringify(data)
                // console.log(data);
                var db = (JSON.parse(data));
                // console.log(db);

                if (data.status == 'false') {
                    alert(data.value)
                    // $("#id-table").html("");
                    // pageload();
                    // console.log("hiiii")
                }
                else {

                    console.log(db.value)
                    var maxPluseOne = db.value
                    localStorage.clear()
                    localStorage.setItem("name", maxPluseOne)
                    console.log(localStorage)

                }
            }
        })

    }


    // insert data

    const btnInsert = () => {
        {
            // window.$("#idd").()
            // const maxValPluseOne11=await getMaxValOfFaculty();
            // document.querySelector("#idd").disabled = true;
            getMaxValOfFaculty();
            var maxValPluseOne1 = localStorage.getItem("name")

            console.log(maxValPluseOne1)
            // localStorage.getItem();

            //show
            window.$("#modal").show();

            document.querySelector("#idd").value = maxValPluseOne1;


            //hide
            window.$("#btn-sub-modal").hide();
            window.$("#btn-sub-modal-Insert").show();
            window.$("#name").focus();

            // addModalSubBtn();

        }

    }

    const addModalSubBtn = (e) => {
        {

            e.preventDefault();

            var arr = window.$("#modal-body").serializeArray();

            var objArr = {};

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].value == "") {
                    alert("fil all filed");
                    return false;
                }
                objArr[arr[i].name] = arr[i].value;
            }

            var jsonInsertData = JSON.stringify(objArr);
            console.log(jsonInsertData);

            window.$.ajax({
                url: 'http://localhost/jay/api/api-add-feculty.php',
                type: "post",
                data: jsonInsertData,
                success: function (data) {
                    if (data.status == true) {
                        console.log(jsonInsertData, data)
                        // alert(data.message)
                        window.$("#id-table").html("");
                        window.$("#id-table").html("");
                        // pageload();
                        window.$("#modal").hide();

                        getData();
                    }
                }
            })

        }
    }


    // window.$("#btn-sub-modal-Insert").on("click", addModalSubBtn(e))



    // window.$(document).on("click", "#btn-ins", btnInsert)






    //edit record
    //Fetch Single Record : Show in Modal Box

    const showModelForEdit = (e) => {
        {


            window.$("#modal").show();
            window.$("#btn-sub-modal-Insert").hide();
            window.$("#btn-sub-modal").show();
            window.$("#name").focus();

            // var name = window.$(this).attr("id");

            var name = e.target.id;
            var obj = { sname: name };
            var myJSON = JSON.stringify(obj);

            // console.log(obj,myJSON)
            window.$.ajax({
                url: 'http://localhost/jay/api/api-fetch-search-fecultyList.php',
                type: "POST",
                dataType: "json",
                data: myJSON,
                success: function (data) {
                    // console.log(myJSON,data)
                    window.$("#idd").val(data[0].id);
                    console.log((data[0].id))
                    window.$("#name").val(data[0].name);
                    window.$("#email").val(data[0].email);
                    window.$("#department").val(data[0].department);
                    window.$("#work").val(data[0].work);
                    window.$("#joingDate").val(data[0].joingDate);
                }
            });
        }
    }
    // window.$(document).on("click", ".edit", showModelForEdit)



    //close modal
    const modalCloseBtn = () => {
        {
            window.$("#modal").hide();

        }
    }
    // window.$(document).on("click", ".close", modalCloseBtn)




    //inserted  model data upated in table list
    const insertModalDataInTable = (e) => {
        {
            e.preventDefault();

            var arr = window.$("#modal-body").serializeArray();

            var objArr = {};

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].value == "") {
                    alert("fil all filed");
                    return false;
                }
                objArr[arr[i].name] = arr[i].value;
            }

            var jsonInsertData = JSON.stringify(objArr);
            // console.log(jsonInsertData);

            window.$.ajax({
                url: 'http://localhost/jay/api/api-upate-feculty-data-using-model.php',
                type: "post",
                data: jsonInsertData,
                success: function (data) {
                    console.log(data)
                    if (data.status == true) {
                        alert(data.message)
                        window.$("#id-table").html("");
                    }
                    else {
                        window.$("#modal").hide();
                        // pageload();
                        console.log(data)
                        getData();
                    }
                }
            })

        }
    }
    // window.$("#btn-sub-modal").on("click", insertModalDataInTable(e))




    //delete record

    const deleteBtn = (event) => {
        {
            if (window.confirm("do you really want to delete")) {

                let name = event.target.id;
                // var name = window.$(this).attr("id");

                console.log(name)
                localStorage.clear()
                localStorage.setItem("name", name)

                var obj = { sname: name };
                var jsonDelete = JSON.stringify(obj)

                console.log(jsonDelete)

                var row = this

                window.$.ajax({
                    url: 'http://localhost/jay/api/api-delete-feculty.php',
                    type: 'POST',
                    data: jsonDelete,
                    success: function (data) {

                        if (data.status == true) {
                            row.closest("tr").fadeOut();
                            // alert(data.message);
                        }
                        else {

                            // alert(data.message);
                            getData();


                        }
                    }
                })
                // pageload()
                getData();
            }
        }
    }

    // window.$(document).on("click", ".delete", deleteBtn)




    return (
        <>


            {/* <div id="autocomplete"> */}

            {/* <div id="testlist4" className="list"></div>
            </div> */}

            {/* <input type="text" id="id-search" onKeyUp={searching1} className="testname" name="stestname4" placeholder="search here..." autoComplete="false" /> */}


            <section className="table" id="id-mainTable">

                <section className="table_header" >
                    <h1>FacultyList</h1>

                    <div className="input-group">
                        <input type="search" placeholder="Search Data..." id="id-serach" className="testname" name="stestname4" onKeyUp={searching1} autoComplete='false' autoFocus />
                        {/* <img src='Image/3.png' alt="" /> */}
                    </div>
                    <button style={{ "marginInlineStart": "0px" }} id="btn-ins" className='btn btn-danger' onClick={btnInsert}> + </button>
                </section>


                <section className="table_body">
                    <table id="id-fullTable">
                        <thead>

                            <tr>

                                <th className='text-center'><b>Name</b></th>
                                <th className='text-center'><b>Email</b></th>
                                <th className='text-center'><b>Department</b></th>
                                <th className='text-center'><b>Work</b></th>
                                <th className='text-center'><b>Joing Date</b></th>
                                <th className='text-center'><b>Punch</b></th>
                                <th className='text-center'><b>Edit</b></th>
                                <th className='text-center'><b>Delete</b></th>
                            </tr>
                        </thead>

                        <tbody id="id-table">

                            {
                                (data.status === false) ? <tr><td colspan='7'><h2> Not found</h2></td></tr>
                                    :
                                    // document.querySelector("#id-table").html("");
                                    data.map((val, inde) => {
                                        return (
                                            // if (val.status == false) {
                                            <tr key={inde}>
                                                <td className='text-center'>{val.name}</td>
                                                <td className='text-center'>{val.email}</td>
                                                <td className='text-center'>{val.department}</td>
                                                <td className='text-center'>{val.work}</td>
                                                <td className='text-center'>{val.joingDate}</td>
                                                <td className='text-center' ><button className="punch btn btn-primary" id={val.name} onClick={punchin} >Punch</button></td>
                                                <td className='text-center' ><button className="edit btn btn-primary" id={val.name} onClick={showModelForEdit}>Insert</button></td>
                                                <td className='text-center' ><button className="delete btn btn-primary" id={val.name} onClick={deleteBtn}>Delete</button></td>

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
                </section >
                {/* <!-- <script src="../javascript/list.js"></script> --> */}
            </section>



            {/* <!-- Modal --> */}
            < div className="modal-class" id="modal" tabIndex="-1" role="dialog" ariaLabelledby="exampleModalCenterTitle"
                ariaHidden="true" style={{ 'display': 'none' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle"></h5>
                            <button type="button" className="close" data-dismiss="modal" ariaLabel="Close">
                                <button ariaHidden="true" className="btn btn-danger" onClick={modalCloseBtn}>&times;</button>
                            </button>
                        </div>
                        <form id="modal-body">


                            <label htmlFor="" id="lbl-id">
                                ID
                            </label>
                            <input type="text" className="form-control" id="idd" name="sid" ariaDescribedby="emailHelp"
                                placeholder="id" />

                            NAME
                            <input type="text" className="form-control" id="name" name="sname" ariaDescribedby="emailHelp"
                                placeholder="name" />

                            Email
                            <input type="text" className="form-control" id="email" name="semail" placeholder="email" />

                            Department
                            <input type="text" className="form-control" id="department" name="sdepartment"
                                placeholder="depadrtment" />

                            Work
                            <input type="text" className="form-control" id="work" name="swork" placeholder="work" />

                            Joingdate
                            <input type="text" className="form-control" id="joingDate" name="sjoingDate"
                                placeholder="joingDate" />


                            <input type="submit" className="btn btn-primary" id="btn-sub-modal" onClick={insertModalDataInTable} />

                            <input type="submit" className="btn btn-primary" id="btn-sub-modal-Insert" onClick={addModalSubBtn} />
                        </form>
                    </div>
                </div>
            </div>

        </>

    )
}

export default FacultyList;