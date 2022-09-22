import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserData } from './redux/reducers/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import getInstance from './instances/help2'

const EditPref = () => {
	const user = useSelector(getUserData)

	const initiate = {
		userTags : "",
	}

	const [infos, setInfos] = useState(initiate);
	const array = [ "male", "female" ]
	const [visible, setVisible] = useState(false);


	const getit = async () => {
		const token = localStorage.getItem('authToken');
		const res = await getInstance(token).get("/getPreferences/prefs");
		return (res.data);
	}
	
	useEffect(() => {
		const getprefs = async () => {
			const res = await getit();
			const data = res.userPrefs;
			const data2 = res.userTags;
			setInfos(() => { return {
				...data,
				userTags : data2,
		 }});
		}
		getprefs();
	}, [])

	const handleit = (e) => {
		console.log(e.target.name);
		setInfos({...infos, gender: e.target.name});
	}

	const map = 
		<div className='w-[350px] h-auto flex flex-wrap max-w-[350px]'>
			{array.map((ar, id) => {
				return (
					<input type="button" name={ar} className='w-full bg-zinc-100  h-[30px] drop-shadow-lg text-xs font-bold flex justify-center items-center hover:bg-zinc-200 cursor-pointer' 
                 	value={ar}  onClick={handleit} key={id}></input>
				)})}
		</div>

	return (
    	<>
			<div className='h-auto lg:h-screen w-screen bg-zinc-100 px-[15%] py-[140px] overflow-y-auto'>
        		<div className="h-full w-full flex flex-col lg:flex-row">
					<div className='sm:w-[80%] h-full lg:w-[50%] flex flex-col justify-center items-center lg:items-start order-last lg:order-first '>
						<p className='text-sm font-bold'>Your Gender.</p>
						<div className='w-full max-w-[350px] h-[30px] rounded-xl bg-gray-200 flex justify-between items-center pl-3  left-shadow pr-3 ' onClick={() =>{setVisible(!visible)}}>
							<h1 className='text-xs font-bold'>{infos.gender}</h1>
							<h1 className='text-black mb-2 text-xl '><FontAwesomeIcon icon={faChevronDown}  size='1x' className='mt-3 mr-4'/></h1>
						</div>
						<div className={visible ? 'flex z-10 w-full  max-w-[350px] h-auto  relative' : 'hidden z-10'}>
                    		{map}
                		</div>
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

    	</>
  )
}

export default EditPref