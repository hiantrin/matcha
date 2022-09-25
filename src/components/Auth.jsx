import instance from './instances/helpaxios';

export const CheckAuth = async () => {
    const auth = localStorage.getItem("authToken");
    const initiat  = {
      status : false,
      complited : false,
    }
    if (auth){
        const res = await instance.post("/authToken/authTokenValidation", {
            authToken: auth,
        })
        if (res.data.status === 0)
        {
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

