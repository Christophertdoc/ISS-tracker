import React, { useEffect } from 'react'
import axios from 'axios'

const Data = () => {
    useEffect(() => {
        console.log('useEffect')
        axios.get(`http://api.open-notify.org/iss-now.json`)
        .then(response => {
            console.log('response', response)
        })
    })
    return (
        <div>
            <h2>Data</h2>
        </div>
    )
}

export default Data