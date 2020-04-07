import React from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import {fromLonLat} from 'ol/proj'


class LocMap extends React.Component {
 
	componentDidMount() {
		var map = new Map({
			target: this.refs.mapContainer,
			layers: [
				new TileLayer({
					source: new XYZ({
						url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					})
				})
			],
			view: new View({
				center: fromLonLat([this.props.lng, this.props.lat]),
				zoom: 4,
			})
		})
		this.setState({ 
			map: map
		})
	}

	render () {
		return <div ref="mapContainer" style={{ height: '500px', width: '500px' }}></div>
	}
}

export default LocMap


