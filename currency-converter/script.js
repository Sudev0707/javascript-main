
const fromAmountElement = document.querySelector(".amount");
const convertedAmountElement = document.querySelector(".convertedAmount");
const fromCurrencyElement = document.querySelector(".fromCurrency");
const toCurrencyElement = document.querySelector(".toCurrency");
const resultElement = document.querySelector(".result");

const countries = [
  { code: "USD", name: "United Arab Dollar" },
  { code: "INR", name: "Indian Rupee" },
];

//showing
countries.forEach((country) => {
  const option1 = document.createElement("option");
  option1.value = country.code;
  option1.textContent = `${country.code} (${country.name})`;
});
