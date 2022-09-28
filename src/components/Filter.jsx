import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Filter = () => {
    const [array, setArray] = useState({ 
		color : [false, false, false, false, false]
	})
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
	const [tags, setTags] = useState({
		min : 1,
		max : 5,
		minValue : 2,
		maxValue : 4,
		step : 1,
	})

	const changeColor = (index) => {
		console.log("dhasdfhafjs");
		const arr = array.color;
		let type = null;
		(arr[index] === true) ? type = true : type = false;
		console.log(type);
		if (type === false)
		{
			for (let i = 0; i <= index ; i++) {
				arr[i] = true;
			}
		}
		else {
			for (let i = 4; i >= index ; i--) {
				arr[i] = false;
			}
		}
		
		setArray({...array, color : arr})
	}

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
		console.log(tag);
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

    const mapStar =
    <div>
        {array.color.map((ar, index) => {
        	return(
					<FontAwesomeIcon key={index} icon={faStar} size="1x" className={ar === false ? 'text-gray-300 hover:text-yellow-400' : 'hover:text-gray-300 text-yellow-400'} onClick={() => changeColor(index)}/>
        )})}
    </div>

  return (
    <div  className='mt-[150px] px-[15%] flex flex-col'>
        <div className='w-full h-32 bg-white rounded-2xl flex flex-col py-[20px] px-[40px]'>
            <div className='flex justify-between items-center'>
                <div className='flex-col spacey-4'>
                    <h1 className="text-sm font-bold font-mono">Frame Rating.</h1>
                    {mapStar}
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
        </div>
    </div>  
  )
}

export default Filter