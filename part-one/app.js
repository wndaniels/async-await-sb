let baseURL = "http://numbersapi.com";
let favNum = 5;

// 1. Make a request to the Numbers API to get a fact about your favorite number.
// (Make sure you get back JSON by including the json query key, specific to this API.
async function num() {
  let data = await $.getJSON(`${baseURL}/${favNum}?json`);
  console.log(data);
}
num();

// 2. Figure out how to get data on multiple numbers in a single request.
// Make that request and when you get the data back, put all of the number facts on the page.
const favNums = [1, 13, 40, 15, 20];
async function nums() {
  let data = await $.getJSON(`${baseURL}/${favNums}?json`);
  console.log(data);
}
nums();

// 3. Use the API to get 4 facts on your favorite number.
// Once you have them all, put them on the page.It’s okay if some of the facts are repeats.
async function numAll() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNum}?json`))
  );
  facts.forEach((data) => {
    $("body").append(`<p>${data.text}</p>`);
  });
}
numAll();
