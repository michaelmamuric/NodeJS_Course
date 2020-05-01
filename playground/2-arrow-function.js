// Traditional function declaration
const square1 = function(x) {
    return x * x;
}


// Using arrow function
const square2 = (x) => {
    return x * x;
}

// Arrow function 2: used if function only returns a value and does nothing else
 const square3 = (x) => x * x;

// console.log(square3(2));

/* printGuestList() -> ES6 shorthand syntax for:
   printGuestList: function() {
       do something here
   }
} */

const event = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() {
        console.log('Guess list for ' + this.name);

        this.guestList.forEach((guestName) => {
            console.log(guestName + ' is attending ' + this.name);
        });
    }
}

event.printGuestList();