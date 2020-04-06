import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getSpeed, convertSpeed } from 'geolib'
// import Map from './Map'

const Data = () => {

    const [response, setResponse] = useState([])
    const [speed, setSpeed] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {
            getData()
        }, 3000)
        return () => clearInterval(interval)
    }, [response]) 

    const getData = () => {
        axios.get(`http://api.open-notify.org/iss-now.json`)
        .then(resp => {
            if (response.length < 1) {
                setResponse(response => [resp.data, ...response])
            } else {
                setResponse(response => [resp.data, response[0]])
            } 
        })
    }

    // if (response.length === 2) {
    //     const first = response[0]
    //     const second = response[1]
    //     const speed = getSpeed(
    //         { latitude: second.iss_position.latitude, longitude: second.iss_position.longitude, time: second.timestamp },
    //         { latitude: first.iss_position.latitude, longitude: first.iss_position.longitude, time: first.timestamp }
    //     )
    //     const mps = speed/1000
    //     const kmh = convertSpeed(mps, 'kmh')
    //     // console.log('kmh', kmh)
    //     setSpeed(kmh)
    // }

    console.log('response', response)
    // console.log('speed', speed)

    return (
        <div>
            {response.length &&
                <div>
                    <h3>Latitude: { response[0].iss_position.latitude }</h3>
                    <h3>Longitude: { response[0].iss_position.longitude }</h3>
                </div>
            }
        </div>
    )
}

export default Data