import React from 'react'
import ReactDOM from 'react-dom'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import {fromLonLat} from 'ol/proj'


class LocMap extends React.Component {

    constructor(props) {
		super(props)
        this.mapRef = null;
        this.setMapRef = element => {
          	this.mapRef = element;
        }
        this.state = {
			map: '',
        }
    }
 
	componentDidMount() {
		this.set_map()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.lng !== this.props.lng) {
			this.set_map()
		}
	}

	set_map = () => {
		const mapDOMNode = ReactDOM.findDOMNode(this.mapRef)
		let map = new Map({
			target: mapDOMNode,
			layers: [
				new TileLayer({
					source: new XYZ({
						url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					})
				})
			],
			view: new View({
				center: fromLonLat([this.props.lng, this.props.lat]),
				zoom: 5,
			})
		})
		this.setState({ map: map })
	}

	render () {
		if (this.state.map !== '') {
			return <div ref={this.setMapRef} style={{ height: '500px', width: '500px' }}></div>
		} else {
			return <div />
		}
	}
}

export default LocMap


