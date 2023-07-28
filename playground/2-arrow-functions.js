// function square(x) {
//   return x * x;
// }

// const square = (x) => {
//   return x * x;
// };

// const square = (x) => x * x;

// console.log(square(2));

const events = {
  name: "Birthday party!",
  //   printPartyName: function () {
  //     console.log(`The party name is ${this.name}`);
  //   },
  guestList: ["Paresh", "Raj", "Alley"],
  printPartyName() {
    // console.log(`Welcome to my ${this.name} ${this.guestList}`);
    this.guestList.forEach((guest) => {
      //arrow functions don't bind their own this value; the access the this value in the context in which they are created
      console.log(guest + " is attending " + this.name);
    });
  },
};

events.printPartyName();
