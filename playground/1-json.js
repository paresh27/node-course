const book = {
  title: "Book one",
  author: "Author one",
};

const bookJson = JSON.stringify(book); //returns a string
console.log(bookJson, typeof bookJson, bookJson.title);

const parsedData = JSON.parse(bookJson); //returns an object.
console.log(parsedData, typeof parsedData, parsedData.title);
