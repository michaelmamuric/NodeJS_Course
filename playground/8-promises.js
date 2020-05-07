// resolve is called when processing was successful
// reject is called when processing has failed
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Processing has failed')
        //resolve([1, 2, 3])
    }, 2000)
})

// then will called when processing was successful
// we can chain catch that will be called when processing has failed
// similar to Java's try..catch
doWorkPromise.then((result) => {
    console.log('Success', result)        
}).catch((error) => {
    console.log('Error', error)
})