import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getSpeed } from 'geolib'
import Map from './Map'

const Data = () => {

    const [firstResponse, setFirstResponse] = useState('')
    const [secondResponse, setSecondResponse] = useState('')
    const [target, setTarget] = useState('setFirstResponse')

    useEffect(() => {
        getData()
        const interval = setInterval(() => {
            if (target === 'setFirstResponse') {
                getData(target)
            } else if (target === 'setSecondResponse') {
                getData('setSecondResponse') 
            }
        }, 3000)
        return () => clearInterval(interval)
    }, [target])  // The empty array at the end of useEffect allows this function to only run once after the initial render. 

    const getData = (targ) => {
        axios.get(`http://api.open-notify.org/iss-now.json`)
        .then(resp => {
            if (targ === 'setFirstResponse') {
                setFirstResponse(resp.data)
                setTarget('setSecondResponse')
                
            } else {
                setSecondResponse(resp.data)
                setTarget('setFirstResponse')
            }
            console.log('targ', targ)
        })
    }

    const calcSpeed = () => {
        // const speed = getSpeed(
        //     { latitude: response.iss_position.latitude, longitude: response.iss_position.longitude, time: response.timestamp },
        //     { latitude: lat, longitude: lng, time: time }
        // )
        // console.log('speed', speed)
    }

    console.log('tweet', firstResponse)

    return (
        <div>
            {firstResponse &&
                <div>
                    <h3>Latitude: { firstResponse.iss_position.latitude }</h3>
                    <h3>Longitude: { firstResponse.iss_position.longitude }</h3>
                </div>
            }
        </div>
    )
}

export default Data