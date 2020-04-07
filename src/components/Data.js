import React, { useEffect, useState } from 'react'
import axios from 'axios'
import calcSpeed from '../services/calcSpeed'
import LocMap from './LocMap'


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
                setSpeed(calcSpeed(response))
            }
        }, 1500)
        return () => clearInterval(interval)
    }, [response]) 

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
                    <LocMap lat={response[0].iss_position.latitude} lng={response[0].iss_position.longitude} />
                </div>
            ) : (
                <h3>Loading...</h3>
            )}      
        </div>
    )
}

export default Data