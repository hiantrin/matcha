import React from 'react'
// import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashArrowUp} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEarthEurope } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar2 = () => {
    const links = [
        {icon : faTrashArrowUp  , path : ""},
        {icon : faUser  , path : ""},
        {icon : faEarthEurope  , path : ""},
        {icon : faClockRotateLeft  , path : ""},
        {icon : faCommentDots  , path : ""},
        {icon : faBell  , path : ""},
        {icon : faGear  , path : ""},
        {icon : faRightFromBracket  , path : ""},
    ]
    // const [icon, setIcon] = useState(false)
	// const handleClick = () => setIcon(!icon)

    const map = 
        <div className='flex justif-center items-center space-x-2'>
            {links.map((tg, id) => {
                return (
                    <Link className='text-indigo-600 py-1 px-2 rounded-full bg-white cursor-pointer' to={tg.path} key={id}><FontAwesomeIcon icon={tg.icon} size="1x"/></Link>
                )
            })}
            
        </div>
  return (
    <div className='w-screen h-[80px] z-20 fixed'>
    	<div className='w-full h-full bg-zinc-100 drop-shadow-lg flex justify-between items-center px-[15%]'>
       		<h1 className='text-black font-bold text-2xl sm:text-3xl md:text-3xl'><Link to="/">Matcha.</Link></h1>
            {map}
    	</div>
	</div>
  )
}

export default Navbar2