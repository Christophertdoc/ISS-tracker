import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Data = () => {

    const [response, setResponse] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`http://api.open-notify.org/iss-now.json`)
            .then(response => {
                console.log('response', response.data)
                setResponse(response.data)
            })
        }, 5000);
        return () => clearInterval(interval);
      }, []);


    return (
        <div>
            <h2>International Space Station Position</h2>
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