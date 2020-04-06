import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getSpeed, convertSpeed } from 'geolib'
// import Map from './Map'

const Data = () => {

    const [response, setResponse] = useState([])
    const [speed, setSpeed] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`http://api.open-notify.org/iss-now.json`)
            .then(resp => {
                if (response.length < 1) {
                    setResponse(response => [resp.data, ...response])
                } else {
                    setResponse(response => [resp.data, response[0]])
                } 
            })
            if (response.length === 2) {
                const first = response[0]
                const second = response[1]
                const speed = getSpeed(
                    { latitude: second.iss_position.latitude, longitude: second.iss_position.longitude, time: second.timestamp },
                    { latitude: first.iss_position.latitude, longitude: first.iss_position.longitude, time: first.timestamp }
                )
                const mps = speed/1000
                const kmh = Math.round(convertSpeed(mps, 'kmh'))
                setSpeed(kmh.toString())
            }
        }, 1500)
        return () => clearInterval(interval)
    }, [response]) 

    // console.log('response', response)

    return (
        <div>
            {response.length ? (
                <div>
                    <h3>Latitude: { response[0].iss_position.latitude }</h3>
                    <h3>Longitude: { response[0].iss_position.longitude }</h3>
                    {speed !== '' ? (
                        <h4>Speed: {speed} kmh</h4>
                    ) : (
                        <h4>Loading Speed...</h4>
                    )}     
                </div>
            ) : (
                <h3>Loading...</h3>
            )}      
        </div>
    )
}

export default Data