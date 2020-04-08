import React, { useEffect } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import {fromLonLat} from 'ol/proj'


const LocMap = (props) => {

    useEffect(() => {
		new Map({
			target: document.getElementById('map'),
			layers: [
				new TileLayer({
					source: new XYZ({
						url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					})
				})
			],
			view: new View({
				center: fromLonLat([props.lng, props.lat]),
				zoom: 5,
			})
		})
		setTimeout(() => window.location.reload(false), 15000)
	},[props]) 

	return (
		<div id="map">		
			<img id="iss" alt="International Space Station" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/512px-International_Space_Station.svg.png" />			
		</div>
	)
}

export default LocMap