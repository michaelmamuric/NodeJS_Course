// Default values are provided if none is provided
const greeter = (name = 'user') => {
    console.log('Hello, ' + name)
}

// Output: Hello, Michael
greeter('Michael')
// Output: Hello, user
greeter()