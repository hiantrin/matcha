import React, { useState } from 'react'
import {  useSelector } from 'react-redux';
import instance from './instances/helpaxios';
import {  getUserData } from './redux/reducers/userSlice';

const EditPassword = () => {
	const user = useSelector(getUserData);
	const infos = [
		{id: "newPass", name: "New Password", text: "Please Enter The New Password"},
		{id: "confPass", name: "Confirm Password" ,text: "Please Confirm Your New Password"}
	]
	const [all, setAll] = useState({
		newPass: "",
		confPass: ""
	})
	const [errors, setErrors] = useState({})
	const testerror = (tg, e) => {
		setAll({...all, [tg.id] : e.target.value});
	}
	const submit = async () => {
		console.log(user.username, all.newPass, all.confPass);
		const res = await instance.post("resetPassword/resetPasswordValidation", {
			userName: user.username,
			newPassword: all.newPass,
			confNewPassword: all.confPass,
		})
		console.log(res);
	}

	const map = 
		<div className='sm:w-[80%] h-full lg:w-[50%] flex flex-col justify-center items-center lg:items-start order-last lg:order-first '>
			<h1 className="text-2xl font-bold mb-3">Be in Match.</h1>
			<p className='text-xs mb-6 max-w-[350px]'>You Are Never Too Old To Set Another Goal Or To Dream A New Dream.</p>
			{infos.map((tg, id) => {
				return (
					<div key={id}>
						<p   className='text-red-600 text-xs mb-4 ml-3 '>{errors.firstname}</p>
						<p   className='text-sm font-bold'>{tg.text}</p>
				 		<div  className='w-full max-w-[350px] h-[30px] rounded-xl bg-gray-200 flex justify-between items-center pl-3  left-shadow pr-3 '>
				 			<input type="text" placeholder={tg.name} className='w-[250px] sm:w-[350px] bg-transparent outline-none  placeholder:text-[0.7rem] font-bold text-sm' onChange={(e) => testerror(tg, e)}></input>
				 		</div>
						 <p   className='text-red-600 text-xs mb-4 ml-3 '>{errors.firstname}</p>
					</div>
				)})}
			<button className='w-[350px] h-[35px] text-sm font-bold mt-10' onClick={submit}>Change Password</button>
		</div>

	return (
    	<div className='h-auto lg:h-screen w-screen bg-zinc-100 px-[15%] py-[140px] overflow-y-auto'>
        	<div className="h-full w-full flex flex-col lg:flex-row">
				{map}
				<div className='w-[250px] h-[400px] sm:w-[500px] sm:h-[700px] lg:w-[50%] lg:h-full flex justify-center items-center Box2 relative mb-[100px] lg:mb-0'>
				<div className='w-full h-full bg-indigo-600 opacity-50 absolute '></div>
				<div className='z-10 max-w-[200px] sm:max-w-[250px] text-center'>
					<h1 className=' text-white font-bold mb-8'> Shop With Confidence </h1>
					<h1 className='text-xs text-white '> Browse a catalog of ecommerce services by our vetted experts or submit custom request</h1>
				</div>	
			</div>
			</div>
    	</div>
  )
}

export default EditPassword