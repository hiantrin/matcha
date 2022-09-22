import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Register from "./Pages/Register";
import Init from "./Pages/init";
import Account from "./Pages/Account";
import Confirm from "./components/Confirm";
import PrivateRoutes from "./components/privateRoutes/PrivateRoutes";
import Loading from "./components/Loading/Loading";
import { useState, useEffect } from "react";
import { CheckAuth } from "./components/Auth";
import getInstance from "./components/instances/help2";
import { addUserData } from "./components/redux/reducers/userSlice";
import { useDispatch } from 'react-redux';
import EditPreferences from "./Pages/EditPreferences";



import {
  Routes,
  Route,
  useLocation,
  Outlet,
  Navigate
} from "react-router-dom";
import PublicRoutes from "./components/publicRoutes/PublicRoutes";
import Error404 from "./Pages/404";
import EditPass from "./Pages/EditPass";


function App() {
  const [auth, setAuth] = useState(null);
  let success = true
  const [isloading, setIsloading] = useState(false);
  const location = useLocation();
  

  const dispatch = useDispatch();

  const fix_date = (date) => {
    const mp = [date.substr(0, 4) , date.substr(5, 2), date.substr(8, 2)];			
    return mp.join('-');
  }

  const getdata = async () => {
    const token = localStorage.getItem('authToken');
		const {data : {userInfos}} = await getInstance(token).get('/getInfos/infos');
    userInfos[0].birthDay = fix_date(userInfos[0].birthDay.substr(0, 10));
		dispatch(addUserData(userInfos[0]));
	}

  useEffect(() => {
  setIsloading(true);
  const check = async () => {
      const res = await CheckAuth();
      setAuth(res ? 'success' : 'failed');
      if (res) await getdata();
      setTimeout(() => {
          setIsloading(false);
      }, 500)
      
  }
  check();
   
  },[location])
  if (isloading)
      return <Loading />;

  const PrivateInit = () => {
    return success  ? <Navigate to="/account" /> : <Outlet/>
  }
  return (


    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path="/" element={<PrivateInit/>}>
        <Route path='init' element={<Init />}/>
      </Route>
      <Route path="/" element={<PrivateRoutes auth={auth}/>}>
        <Route path='account' element={<Account />}/>
        <Route path='auth/confirm/:slug' element={<Confirm />}/>
        <Route path="account/password" element={<EditPass />}/>
        <Route path="/account/preferences" element={<EditPreferences /> } />
      </Route>
      <Route path='/' element={<PublicRoutes auth={auth}/>}>
        <Route path='/auth' element={<Auth />}></Route>
        <Route path='/auth/register' element={<Register />}/>
      </Route>
      <Route path="*" element={<Error404 />}/>
		</Routes>
  );
}

export default App;
