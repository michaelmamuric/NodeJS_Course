const doWorkCallback = (callback) => {
    setTimeout(() => {
        // Signal that an error has occurred
        // callback('Error', undefined)

        // Signal that processing is successful
        callback(undefined, [1, 2, 3])
    }, 2000)
}

doWorkCallback((error, result) => {
    if(error)
        return console.log(error)
    
    console.log(result)
})