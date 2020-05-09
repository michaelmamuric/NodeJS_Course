const add = (x, y) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let sum = x + y
            resolve(sum)
        }, 2000)
    })
}

// add(1, a1).then((sum) => {
//     console.log(sum)
// }).catch((error) => {
//     console.log(error)
// })

// Promise chaining example
add(1, 2).then((sum) => {
    console.log(sum)
    // Return the result of the first promise
    return add(sum, 3)
}).then((sum2) => {
    console.log(sum2)
}).catch((error) => {
    console.log(error)
})