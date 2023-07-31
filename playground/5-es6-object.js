// object property shorthand
const firstName = "Paresh";
const age = 28;

const user = {
  //   firstName: firstName,
  firstName, //this is same as above
  age: age,
  location: "India",
};

console.log(user);

//object destructuring

const product = {
  label: "product one",
  price: 3,
  stock: 201,
  salePrice: undefined,
  rating: 8,
};

// const { label: newName, price, stock, rating = 5 } = product;
// console.log(newName, price, stock, rating);

const transaction = (type, { label, stock }) => {
  console.log(type, label, stock);
};

transaction("order", product);
