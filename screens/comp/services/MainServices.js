import GetLocation from 'react-native-get-location'


const getCurrentLocation = function () {
    return new Promise((resolve, reject) => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                console.log(location);
                resolve(location)
                // setLatitude(JSON.stringify(location?.latitude))
                // setLongitude(JSON.stringify(location?.longitude))
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    })
}

export {
    getCurrentLocation
}