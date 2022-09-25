import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Filter = () => {
    const [array, setArray] = useState({ 
		color : [false, false, false, false, false]}
		)

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
				<div className='flex-col spacey-4'>
                    <h1 className="text-sm font-bold font-mono">Age.</h1>
                    {mapStar}
                </div>
            </div>
        </div>
    </div>  
  )
}

export default Filter