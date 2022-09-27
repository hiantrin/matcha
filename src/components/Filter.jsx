import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Filter = () => {
    const [array, setArray] = useState({ 
		color : [false, false, false, false, false]}
		)

	const [Age, setAge] = useState({
		min : 18,
		max : 60,
		minValue : 20,
		maxValue : 55,
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


		const s = document.getElementById("sliderProgress")
            if(e.target.classList[0] === "range-min"){
				if (parseInt(Age.maxValue - Price) >= priceGap)
				{
					setAge({...Age, minValue : Price})
                	s.style.left = ((Price - 18) * 2.38) + "%";
				}
				else {
					setAge({...Age, minValue : Age.maxValue - priceGap})
				}
				
            }else{
				if (Price - Age.minValue >= priceGap) {
					setAge({...Age, maxValue : Price})
                	s.style.right = (100 - ((Price - 18)) * 2.38) + "%";
				}
				else {
					setAge({...Age, maxValue : Age.minValue + priceGap})
				}
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
            </div>
        </div>
    </div>  
  )
}

export default Filter