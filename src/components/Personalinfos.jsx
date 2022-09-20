import React from 'react'
import { useDispatch } from 'react-redux';
import { addUserData } from './redux/reducers/userSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import getInstance from './instances/help2';
import Modal from './Modal/Modal';

const Personalinfos = () => {

	const [userInfo, SetUserInfo] = useState({
		username : "",
		firstName : "",
		lastName : "",
		email : "",
		biography : "",
		birthDay : "",
	});
	const [errors, setErrors] = useState({})
	const [position, setPosition ] = useState({
		latitude: null,
		longitude: null
})

	const returndata = async () => {
		const res = await getInstance.get('/getInfos/infos');
		return res;
	}


	
	const dispatch = useDispatch();
	// const diskotek = (infos) => {
		
	// }
	useEffect( () => {
		const fix_date = (date) => {
			const mp = [date.substr(0, 4) , date.substr(5, 2), date.substr(8, 2)];			
			return mp.join('-');
		}
		const setpos = (data) => {
			const posi = {
				longitude : data.lng,
				latitude : data.lat
			}
			setPosition(posi);
		}
		const Fetchdata = async () => {
			const { data : {userInfos} } = await returndata();
			const date = fix_date(userInfos[0].birthDay.substr(0, 10));
			userInfos[0].birthDay = date;
			dispatch(addUserData(userInfos[0]));
			setpos(userInfos[0]);
			SetUserInfo(userInfos[0]);
		}
		Fetchdata()
	}, [dispatch])

	const handleit = (e) => {
        const  name = e.target.name;
		console.log(e.target.value);
        SetUserInfo({...userInfo , [name] : e.target.value});
		
    }

	const redirect = () => {
		const er = validate();
		if(er) setErrors(er);
		else change_in_back()
	}

	const validate = () => {
		const error = {};
		const form = userInfo;
		console.log( "hna validateform =>>");
		console.log(form);
		var bday = form.birthDay;
		bday = bday.split("-");
		var bday_in_milliseconds = new Date(parseInt(bday[0], 10), parseInt(bday[1], 10) - 1 , parseInt(bday[2]), 10).getTime();
		var now = new Date().getTime();
		if (form.username === "" || Object.keys(form.username).length < 3)
		{
			error.username = "your username must contain at least 3 characters";
		}
		if (form.lastName === "" || Object.keys(form.lastName).length < 3)
		{
			error.lastName = "your lastname must contain at least 3 characters";
		}
		if (form.firstName === "" || Object.keys(form.firstName).length < 3)
		{
			error.firstName = "your firstname must contain at least 3 characters";
		}
		if (form.biography === "" ) {
			error.biography = "please write a biography"
		} else if (Object.keys(form.biography).length < 20){
			error.biography = "you must write at least 20 letters"
		}
		if (form.birthDay === "") {
			error.birth = "please enter your birth day"
		}
		else if (now - bday_in_milliseconds < 567648000000) {
			error.birthDay = "your age must be over than 18"
		}
		if (Object.keys(error).length === 0) {
            return false;
		}
		console.log(error);
		return (error);
	}


	const change_in_back = () => {

	}
	

  return (
		
	<div className='h-auto lg:h-screen w-screen bg-zinc-100 px-[15%] py-[140px] overflow-y-auto'>
		<div className="h-full w-full flex flex-col lg:flex-row">
			<div className='sm:w-[80%] h-full lg:w-[50%] flex flex-col justify-center items-center lg:items-start order-last lg:order-first '>
				<h1 className="text-2xl font-bold mb-3">Be in Match.</h1>
				<p className='text-xs mb-6 max-w-[350px]'>You Are Never Too Old To Set Another Goal Or To Dream A New Dream.</p>
				<p className='text-sm font-bold'>First Name.</p>
				<div className='w-full max-w-[350px] h-[30px] rounded-xl bg-gray-200 flex justify-between items-center pl-3  left-shadow pr-3 '>
					<input name="firstName" type="text" className='h-[50px] w-[250px] sm:w-[350px] bg-transparent outline-none  placeholder:text-[0.7rem] font-bold ' defaultValue={userInfo.firstName} onChange={(e) => handleit(e)}></input>
				</div>
				<p className='text-xs font-bold text-red-600 mb-3 ml-3'>{errors.firstName}</p>
				<p className='text-sm font-bold'>Last Name.</p>
				<div className='w-full max-w-[350px] h-[30px] rounded-xl bg-gray-200 flex justify-between items-center pl-3  left-shadow pr-3 '>
					<input name="lastName" type="text" className='w-[250px] sm:w-[350px] bg-transparent outline-none  placeholder:text-[0.7rem] font-bold ' defaultValue={userInfo.lastName} onChange={handleit}></input>
				</div>
				<p className='text-xs font-bold text-red-600 mb-3 ml-3'>{errors.lastName}</p>
				<p className='text-sm font-bold'>Username.</p>
				<div className='w-full max-w-[350px] h-[30px] rounded-xl bg-gray-200 flex justify-between items-center pl-3  left-shadow pr-3'>
					<input name="username" type="text" className='w-[250px] sm:w-[350px] bg-transparent outline-none  placeholder:text-[0.7rem] font-bold ' defaultValue={userInfo.username} onChange={handleit}></input>
				</div>
				<p className='text-xs font-bold text-red-600 mb-3 ml-3'>{errors.username}</p>
				<p className='text-sm font-bold'>Your e-mail.</p>
				<div className='w-full max-w-[350px] h-[30px] rounded-xl bg-gray-200 flex justify-between items-center pl-3  left-shadow pr-3 '>
					<input name="email" type="text" className='w-[250px] sm:w-[350px] bg-transparent outline-none  placeholder:text-[0.7rem] font-bold ' defaultValue={userInfo.email} onChange={handleit}></input>
				</div>
				<p className='text-xs font-bold text-red-600 mb-3 ml-3'>{errors.email}</p>
				<p className='text-sm font-bold'>Biography.</p>
				<div className='w-full max-w-[350px] h-[60px] rounded-xl bg-gray-200 flex pl-3  left-shadow pr-3 '>
					<textarea name="biography" type="text" className='w-[320px] bg-gray-200 outline-none text-sm  py-1 resize-none' defaultValue={userInfo.biography} onChange={handleit}/>
				</div>
				<p className='text-xs font-bold text-red-600 mb-3 ml-3'>{errors.biography}</p>
				<p className='text-sm font-bold'>Your birthday.</p>
				<div className='w-full max-w-[350px] h-[30px] rounded-xl bg-gray-200 flex justify-between items-center pl-3  left-shadow pr-3 '>
					<input name="birthDay" type="date" className='w-[250px] sm:w-[350px] bg-transparent outline-none  placeholder:text-[0.7rem] font-bold text-sm' defaultValue={userInfo.birthDay} onChange={handleit}></input>
				</div>
				<p className='text-xs font-bold text-red-600 mb-3 ml-3'>{errors.birthDay}</p>
				<Modal />
				<button className='w-[350px] h-[35px] text-sm font-bold' onClick={redirect}>Save Changes</button>
			</div>
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

export default Personalinfos