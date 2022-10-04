import React, { useState } from 'react'
import { useEffect } from 'react'
import getInstance from './instances/help2'
import ReactStars from 'react-stars'
import { useSelector } from 'react-redux'
import { getUserData } from './redux/reducers/userSlice'
import getDistance from 'geolib/es/getDistance';

const Filter = () => {
	const token = localStorage.getItem('authToken');
	const pro = useSelector(getUserData);

	const [location, setLocation] = useState({
		min : 0,
		max : 100,
		minValue : 10,
		maxValue : 90,
		step : 1,
	})
	const [Age, setAge] = useState({
		min : 18,
		max : 60,
		minValue : 20,
		maxValue : 55,
		step : 1,
	})
	console.log(Age)
	const [tags, setTags] = useState({
		min : 1,
		max : 5,
		minValue : 2,
		maxValue : 4,
		step : 1,
	})
	const [four, setFour] = useState({
		set : [false, false, false, false],
		name : ["Fame Rating.", "Age.", "Location.", "Common Tags."]
	})
	const [allProfiles, setAllProfiles] = useState([]);
	const [star, setStar] = useState(2.6);

	useEffect(() => {
		const getProfiles = async () => {
			const response = await getInstance(token).get('http://localhost:5000/filter/sex_prefs');
			setAllProfiles(response.data.filtredUsers);
		}
		getProfiles();

	 	}, [token])
		
	const handlerange = (e) => {
		const priceGap = 1;
		let Price = parseInt(e.target.value);

		const s = document.getElementById("sliderProgress");
        if(e.target.classList[0] === "range-min"){
			if(parseInt(Age.maxValue - Price) < priceGap)
				Price = Age.maxValue - priceGap
			setAge({...Age, minValue : Price})
            s.style.left = ((Price - 18) * 2.38) + "%";	
        } else {
			if (Price - Age.minValue < priceGap)
				Price = Age.minValue + priceGap;
			setAge({...Age, maxValue : Price})
            s.style.right = (100 - ((Price - 18)) * 2.38) + "%";
		}
	}

	const handleLocation = (e) => {
		const kmGap = 1;
		let km = parseInt(e.target.value);

		const s = document.getElementById("sliderProgresskm");
        if(e.target.classList[0] === "location-min"){
			if(parseInt(location.maxValue - km) < kmGap)
				km = location.maxValue - kmGap
			setLocation({...location, minValue : km})
            s.style.left = km  + "%";	
        } else {
			if (km - location.minValue < kmGap)
				km = location.minValue + kmGap;
			setLocation({...location, maxValue : km})
            s.style.right = (100 - km ) + "%";
		}
	}
	const handletags = (e) => {
		const tagGap = 1;
		let tag = parseInt(e.target.value);

		const s = document.getElementById("sliderProgresstags");
        if(e.target.classList[0] === "tag-min"){
			if(parseInt(tags.maxValue - tag) < tagGap)
				tag = tags.maxValue - tagGap
			setTags({...tags, minValue : tag})
            s.style.left = ((tag * 25) - 25)  + "%";
        } else {
			if (tag - tags.minValue < tagGap)
				tag = tags.minValue + tagGap;
			setTags({...tags, maxValue : tag})
            s.style.right = (100 - ((tag * 25) - 25)) + "%";
		}
	}

	const changebox = (index) => {
		const box = four.set;

		box[index] = !(box[index]);
		setFour({...four, set : box})
	}

	const filterit = () => {

	}

	const calculAge = (birthDay) => {
		if(birthDay)
		{
			var bday = birthDay.substr(0, 10);
			bday = bday.split("-");
			var bday_in_milliseconds = new Date(parseInt(bday[0], 10), parseInt(bday[1], 10) - 1 , parseInt(bday[2]), 10).getTime();
			var now = new Date().getTime();
			var date = (now - bday_in_milliseconds) / 31556952000;
			const dat = date.toString();
			return dat.substr(0, 2)
		}
	}

	const changeStar = (value) => {
		setStar(value);
	}

	const getdis = (user) => {
		let dis = getDistance(
			{ latitude: pro.lat, longitude: pro.lng },
			{ latitude: user.latitude, longitude: user.longitude }
		)
		return dis / 1000;
	}
	const mapfour = 
	<div className='flex justify-center items-center space-x-10 mt-20'>
		{four.set.map((some, index) => {
			return(
				<div className='flex space-x-2 justify-between items-center' key={index}>
					<div className={some === true ? 'h-[20px] w-[20px] border rounded-lg hover:bg-gray-100 bg-indigo-600' : 'h-[20px] w-[20px] border rounded-lg bg-gray-100 hover:bg-indigo-600'} onClick={() => changebox(index)}></div>
					<h1 className='text-xs font-bold'>{four.name[index]}</h1>
				</div>
		)})}
	</div>
	
	const mapUsers = 
		<div className='flex flex-wrap  gap-5 justify-center'>
			{allProfiles?.filter(item => item.public_famerating >= star && (calculAge(item.birthdate) >= Age.minValue && calculAge(item.birthdate) <= Age.maxValue) ).sort((a, b) => b.public_famerating - a.public_famerating).map((user, index) => (
					<div className='w-[200px] h-[300px] border  rounded-3xl flex flex-col items-center gap-3 cursor-pointer' key={index} >
						<img className='w-full h-[60%] rounded-t-3xl' src={user?.profile_img} alt='al'></img>
						<h1 className='text-xs font-mono font-bold mt-4'>{user?.first_name} {user?.last_name}, {calculAge(user?.birthdate)}</h1>
						<div className='flex'>
							<ReactStars  count={5} value={user.public_famerating} size={18} color2={'#FFA500'} edit={false}/>
							<h1 className='text-[0.5rem] font-bold ml-1'>({user.public_famerating})</h1>
						</div>
						<h1 className='text-xs font-bold'>{getdis(user)} (km)</h1>
					</div>
			))}
		</div>



  return (
    <div  className='mt-[150px] px-[15%] flex flex-col space-y-10 justify-center items-center'>
        <div className='w-full bg-white rounded-2xl flex flex-col justify-between py-[20px] px-[40px]'>
            <div className='flex justify-between items-center'>
                <div className='flex-col spacey-4'>
                    <h1 className="text-sm font-bold font-mono">Frame Rating.</h1>
					<ReactStars  
					count={5}
					value={star}
					size={25}
					color2={'#ffd700'}
					onChange={changeStar}
					/>
                </div>
				<div className='flex-col space-y-4  w-40'>
                    <h1 className="text-sm font-bold font-mono">Age.</h1>
					<div>
						<div className="slider">
       						<div className="progress" id="sliderProgress"></div>
      					</div>
						<div className="range-input ">
        					<input type="range" className="range-min" min={Age.min} max={Age.max} value={Age.minValue} step={Age.step} onChange={(e) => handlerange(e)} />
        					<input type="range" className="range-max" min={Age.min} max={Age.max} value={Age.maxValue} step={Age.step} onChange={(e) => handlerange(e)} />
      					</div>
					</div>
                </div>
				<div className='flex-col space-y-4  w-40'>
                    <h1 className="text-sm font-bold font-mono">Location.</h1>
					<div>
						<div className="sliderkm">
       						<div className="progress" id="sliderProgresskm"></div>
      					</div>
						<div className="range-inputkm ">
        					<input type="range" className="location-min" min={location.min} max={location.max} value={location.minValue} step={location.step} onChange={(e) => handleLocation(e)} />
        					<input type="range" className="location-max" min={location.min} max={location.max} value={location.maxValue} step={location.step} onChange={(e) => handleLocation(e)} />
      					</div>
					</div>
                </div>
				<div className='flex-col space-y-4  w-40'>
                    <h1 className="text-sm font-bold font-mono">Common Tags.</h1>
					<div>
						<div className="slidertags">
       						<div className="progress" id="sliderProgresstags"></div>
      					</div>
						<div className="range-inputtags ">
        					<input type="range" className="tag-min" min={tags.min} max={tags.max} value={tags.minValue} step={tags.step} onChange={(e) => handletags(e)} />
        					<input type="range" className="tag-max" min={tags.min} max={tags.max} value={tags.maxValue} step={tags.step} onChange={(e) => handletags(e)} />
      					</div>
					</div>
                </div>
            </div>
			{mapfour}
        </div>
		<button className='w-[150px] h-[25px]' onClick={filterit()}>filter</button>
		{mapUsers}
    </div>  
  )
}

export default Filter