import React, {useState} from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { getUserData } from './redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { addUserData } from './redux/reducers/userSlice';




function MyMap({setGetLan, getLan, data}) {
	const dispatch = useDispatch();
  useMapEvents({
    click: (e) => {
      setGetLan([e.latlng.lat,e.latlng.lng])
	  console.log(data);
	  data.lat = e.latlng.lat;
	  data.lng = e.latlng.lng;
		// dispatch(addUserData(data));
    },
 
  })
  return null
}



const Map = () => {
	const data = useSelector(getUserData);
	const [getLan, setGetLan] = useState([data.lat, data.lng])

	const iconMarkup = renderToStaticMarkup(
    	<FontAwesomeIcon icon={faLocationDot} size="2x" className='text-red-600'/>
	);
	const customMarkerIcon = divIcon({
		className: 'Leaflet',
		html: iconMarkup
	});

  return (
      
       <MapContainer center={getLan} zoom={13} scrollWheelZoom={true} eventHandlers={{
              click:(event)=>{
              console.log(event.latlng.lat());
                }}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={getLan} icon={customMarkerIcon} className="leaflet-marker-icon">
    </Marker>
    <MyMap setGetLan={setGetLan} getLan={getLan} data={data}/>
  </MapContainer>
   
  )
}

export default Map