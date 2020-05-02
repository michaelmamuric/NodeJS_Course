// Object property shorthand
const firstName = 'Michael'
const lastName = 'Mamuric'

const user = {
    firstName, //shorthand for firstName: firstName
    lastName, // shorthand for lastName: lastName
    location: 'Calgary'
}

console.log(user);

// Object destructuring
const product = {
    label: 'Notebook',
    price: 3,
    stock: 200,
    salePrice: undefined
}

/*
    Shorthand for:
    const label = product.label
    const stock = product.stock
    const productPrice = product.price
    const rating = 5 -> default value, if product does not have a rating property/attribute
                     -> if a property called rating exists, the value of the rating variable will be the
                        identical to the value of product.rating
*/
const {label, stock, price: productPrice, rating = 5} = product

console.log(label)
console.log(stock)
console.log(productPrice)
console.log(rating) // will return 5, since product does not have a rating property/attribute

/* 
    {label, stock} -> Destructured the product object passed to it to create variables called label and stock
                      Other properties of product will not be accessed
*/
const transaction = (type, {label, stock}) => {
    console.log(type, label, stock)
}

transaction('order', product)