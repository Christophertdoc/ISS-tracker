import { getSpeed, convertSpeed } from 'geolib'


export default function calcSpeed(response) {
    const first = response[0]
    const second = response[1]
    const speed = getSpeed(
        { latitude: second.iss_position.latitude, longitude: second.iss_position.longitude, time: second.timestamp },
        { latitude: first.iss_position.latitude, longitude: first.iss_position.longitude, time: first.timestamp }
    )
    const mps = speed/1000
    const kmh = Math.round(convertSpeed(mps, 'kmh'))
    return kmh.toString()
}