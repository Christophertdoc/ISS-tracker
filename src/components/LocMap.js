import React, { useEffect, useState } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import {fromLonLat} from 'ol/proj'


const LocMap = (props) => {

	// const [map, setMap] = useState('')

    useEffect(() => {
        set_map()
	},[props]) 
	
	const set_map = () => {
		// let map = new Map({
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
		// setMap(map)
	}
	
	return <div id="map" style={{ height: '500px', width: '500px' }}></div>
}

export default LocMap





