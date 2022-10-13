import { useSelector } from 'react-redux';
import instance from './instances/helpaxios';
import { getUserData } from './redux/reducers/userSlice';


export const CheckAuth = async () => {
  // const user = useSelector(getUserData);
  // console.log(user)
    const auth = localStorage.getItem("authToken");
    const initiat  = {
      status : false,
      complited : false,
      userId : 0
    }
    if (auth){
        const res = await instance.post("/authToken/authTokenValidation", {
            authToken: auth,
        })
        if (res.data.status === 0)
        {
          initiat.userId  = res.data.userId
          initiat.status = true;
          if (res.data.complited === 1)
            initiat.complited = true;
        	return initiat;
        }
        else return initiat;
      } else {
        return initiat
      }
}

