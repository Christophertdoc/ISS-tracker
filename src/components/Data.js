import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getSpeed } from 'geolib'
import Map from './Map'

const Data = () => {

    const [response, setResponse] = useState('')

    useEffect(() => {
        getData()
        const interval = setInterval(() => {
            getData()
        }, 3000)
        return () => clearInterval(interval)
    }, [])  // The empty array at the end of useEffect allows this function to only run once after the initial render. 

    const getData = () => {
        axios.get(`http://api.open-notify.org/iss-now.json`)
        .then(resp => {
            setResponse(resp.data)
        })
    }

    const calcSpeed = () => {
        // const speed = getSpeed(
        //     { latitude: response.iss_position.latitude, longitude: response.iss_position.longitude, time: response.timestamp },
        //     { latitude: lat, longitude: lng, time: time }
        // )
        // console.log('speed', speed)
    }

    return (
        <div>
            {response &&
                <div>
                    <h3>Latitude: { response.iss_position.latitude }</h3>
                    <h3>Longitude: { response.iss_position.longitude }</h3>
                </div>
            }
        </div>
    )
}

export default Data