import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Register from "./Pages/Register";
import Init from "./Pages/init";
import Account from "./Pages/Account";
import Confirm from "./components/Confirm";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
	<BrowserRouter>
    <Routes>
			<Route path='/' element={<Home />}></Route>
			<Route path='/auth' element={<Auth />}></Route>
			<Route path='/auth/register' element={<Register />}/>
      <Route path='/init' element={<Init />}/>
      <Route path='/account' element={<Account />}/>
      <Route path='/auth/confirm/:slug' element={<Confirm />}/>
		</Routes>
	</BrowserRouter>
    </>
  );
}

export default App;
