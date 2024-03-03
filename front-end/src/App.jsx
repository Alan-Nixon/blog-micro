import Login from "./components/login/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from "./components/signup/Signup";
import { IsLoggedInFunc } from "./BackendFunc";
import { useEffect, useState } from "react";
import Home from "./components/Home/Home";

function App() {

  const PrivateRoute = ({ ifSession, notSession }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const checkAuthentication = async () => {
        const result = await IsLoggedInFunc();
        setUserData(result);
      }; 

      checkAuthentication();
    }, []);

    return userData === null ? null : userData ? ifSession : notSession;
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<PrivateRoute ifSession={<Home />} notSession={<Navigate to='/login' />} />} />
        <Route path='/login' element={<PrivateRoute ifSession={<Navigate to='/' />} notSession={<Login />} />} />
        <Route path="/signup" element={<PrivateRoute ifSession={<Navigate to='/' />} notSession={<Signup />} />} />
      </Routes>
    </Router>
  );
}



export default App;
