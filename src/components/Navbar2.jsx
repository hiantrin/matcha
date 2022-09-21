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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar2 = () => {
    const [icon, setIcon] = useState(false)
	const showdrop = (e) =>{
        if (e.icon === faGear) setIcon(!icon)
        
    }
    const navigate =useNavigate();
    const redirectpath = (e) => {
        if (e.name === "Edit Infos") navigate("/account")
        if (e.name === "Edit Password") navigate("/account/password");
    }
    
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
    const params = [
        {name: "Edit Infos", path : ""},
        {name: "Edit Preferences", path : ""},
        {name: "Edit Password", path : ""},
        {name: "Edit Photos", path : ""},
    ]

    const map = 
        <div className='flex justif-center items-center space-x-2'>
            {links.map((tg, id) => {
                return (
                    <div className='text-indigo-600 py-1 px-2 rounded-full bg-white cursor-pointer hover:bg-gray-200'   key={id} onClick={() => showdrop(tg)}>
                        <FontAwesomeIcon icon={tg.icon} size="1x" />
                    </div>
                )
            })}
            
        </div>
    const map2 = 
        <div className={!icon ? 'hidden' : 'absolute px-4 py-4 flex flex-col bg-white  drop-shadow-lg right-0 w-[20%] mr-[15%] rounded-md'}>
            {params.map((tg, id) => {
                 return(
                     <div className='w-full hover:bg-gray-100 py-2 cursor-pointer hover:text-indigo-600  rounded-md' key={id}  onClick={() => redirectpath(tg)}>
                         <h1 className='ml-2 text-xs text-gray200 '>{tg.name}</h1>
                     </div>
            )})}
        </div>
  return (
    <div className='w-screen h-[80px] z-20 fixed '>
    	<div className='w-full h-full bg-zinc-100 drop-shadow-lg flex justify-between items-center px-[15%]'>
       		<h1 className='text-black font-bold text-2xl sm:text-3xl md:text-3xl'><Link to="/">Matcha.</Link></h1>
            {map}
    	</div>
        {map2}
	</div>
  )
}

export default Navbar2