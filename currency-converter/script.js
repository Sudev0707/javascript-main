import { countries } from "./countries.js";

const fromAmountElement = document.querySelector(".amount");
const convertedAmountElement = document.querySelector(".convertedAmount");
const fromCurrencyElement = document.querySelector(".fromCurrency");
const toCurrencyElement = document.querySelector(".toCurrency");
const resultElement = document.querySelector(".result");

//show
// countries.forEach((country) => {
//   const option1 = document.createElement("option");
//   const option2 = document.createElement("option");

//   option1.value = country.code;
//   option2.value = country.code;

//   option1.textContent = `${country.code} (${country.name})`;
//   option2.textContent = `${country.code} (${country.name})`;

//   fromCurrencyElement.appendChild(option1);
//   toCurrencyElement.appendChild(option2);
// });

countries.forEach(({ code, name }) => {
  const text = `${code} (${name})`;

  [fromCurrencyElement, toCurrencyElement].forEach((select) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = text;
    select.appendChild(option);
  });

  //default value
  fromCurrencyElement.value = "USD";
  toCurrencyElement.value = "INR";
});

//
const api_Key = "ebfe75dba910f2f0dcf32c2f";
const getExchangerate = async () => {
  const amount = parseFloat(fromAmountElement.value);
  const fromCurrency = fromCurrencyElement.value;
  const toCurrency = toCurrencyElement.value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  // Show loading
  resultElement.textContent = "Loading...";
  //fetch

  try {
    //https://v6.exchangerate-api.com/v6/ebfe75dba910f2f0dcf32c2f/latest/USD
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/ebfe75dba910f2f0dcf32c2f/latest/${fromCurrency}`
    );
    const data = await response.json();
    if (!data.conversion_rates) {
      resultElement.textContent = "Error fetching data!";
      return;
    }

    const conversionRate = data.conversion_rates[toCurrency];
    const convertedAmount = amount * conversionRate;
    convertedAmountElement.value = convertedAmount;
    resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;

    // const lastUpdated = new Date(data.time_last_update_utc);
    // resultElement.innerHTML += `<br><small>Last updated: ${lastUpdated.toLocaleString()}</small>`;
  } catch (err) {
    resultElement.textContent = "Failed to fetch exchange rate.";
    console.error(err);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fromAmountElement.addEventListener("input", getExchangerate);
  fromCurrencyElement.addEventListener("change", getExchangerate);
  toCurrencyElement.addEventListener("change", getExchangerate);
});
// fromAmountElement.addEventListener('input', getExchangerate)
// toCurrencyElement.addEventListener('change', getExchangerate)
