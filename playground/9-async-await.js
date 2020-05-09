// copied from 8-promises.js, with slight alterations
// reject will be returned when x and/or y is less than 0
const add = (x, y) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(x < 0 || y < 0)
                return reject('Numbers cannot be negative!')

            let sum = x + y
            resolve(sum)
        }, 2000)
    })
}

// async function -> will return a Promise
// fulfilled with value returned by function
const doWork = async () => {
    // await - gets used with a Promise
    // add method will also return a Promise
    // add was called multiple times without doing chaining: compare with 8-promises.js
    let sum = await add(1, 2)
    let sum2 = await add(sum, 3)
    // this will return an error, so only the first two operations above will be performed
    let sum3 = await add(sum2, -4)
    return sum3
}

doWork().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})