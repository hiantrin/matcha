import React, {useRef, useEffect} from "react";

import Map from "../Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";


export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const ModalRef = useRef(0)


  useEffect(() => {
    
    const HanleModal = (event) => {
        if (ModalRef.current && !ModalRef.current.contains(event.target)) {
            setShowModal(false)
          }    
    }
    if (showModal)
        document.addEventListener('click',HanleModal,true);
    return () => {
      document.removeEventListener('click',HanleModal,true);
    }
  }, [showModal])
  
  return (
    <>
	<div className='flex justify-center items-center w-full max-w-[350px] h-auto' onClick={() => setShowModal(true)}>
		<div className='w-full max-w-[300px] h-[40px] rounded-xl bg-gray-200 flex justify-center items-center pl-3  left-shadow pr-3 mb-3 cursor-pointer'>
			<h1 className='text-xs font-bold mr-1'>Update your Location</h1>
			<h1 className='text-xs'><FontAwesomeIcon icon={faLocationDot} size="1x"/></h1>
		</div>
	</div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
                <div ref={ModalRef} className="w-[30%] h-[50%] flex flex-col p-10 bg-white gap-10 rounded-xl">
                    <Map />
                    <div className="flex justify-between  w-full ">
                        <button className="w-[40%] self-center" onClick={() => setShowModal(false) }>close</button>
                        <button className="w-[40%] self-center">save</button>
                    </div>
                   
                </div> 
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}