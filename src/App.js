import "./App.css";
import LoginForm from "./components/LoginForm";
import Registration from "./components/Registration";
import ActiveFacultyList from "./components/ActiveFacultyList";
import FacultyList from "./components/FacultyList";
import PunchingOut from "./components/PunchingOut";
import Repo from "./components/Repo";
import Error1 from "./components/Error1";

import NavBar from './components/NavBar'
import {
  Routes, // instead of 
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />

      {/* <LoginForm /> */}
      {/* <Registration /> */}
      {/* <ActiveFacultyList /> */}
      {/* <FacultyList /> */}
      {/* <PunchingOut /> */}
      {/* <Repo /> */}
      {/* <Error1 /> */}


      <Routes>
        <Route exact path="/" Component={LoginForm} />
        <Route exact path="/Reg" Component={Registration} />
        <Route exact path="/ActiveFacultyList" Component={ActiveFacultyList} />
        <Route exact path="/FacultyList" Component={FacultyList} />
        <Route exact path="/PunchingOut" Component={PunchingOut} />
        <Route exact path="/Report122" Component={Repo} />

        <Route exact Component={Error1} />
      </Routes>


    </>
  );
}

export default App;

