import instance from './instances/helpaxios';

export const CheckAuth = async () => {
    const auth = localStorage.getItem("authToken");
    if (auth){
        const res = await instance.post("/authToken/authTokenValidation", {
            authToken: auth,
        })
        if (res.data.status === 0)
        {
			
        	return true
        }
        else return false
      } else {
        return false
      }
}

