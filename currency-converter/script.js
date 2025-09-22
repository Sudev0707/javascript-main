<div class="container">
  <h1>Currency Converter</h1>
  <div class="input-container">
    <label for="amount">Enter amount:</label>
    <input
      type="number"
      class="amount"
      name="amount"
      placeholder="Enter value"
      value="1"
      min="1"
    />
    <select class="fromCurrency">
      <option value="INR">INR</option>
    </select>
  </div>
  <div class="arrow">⬇️</div>

  <div class="input-container">
    <label for="amount">Enter amount:</label>
    <input
      type="number"
      class="convertedAmount"
      name="amount"
      placeholder="Enter value"
    />
    <select class="toCurrency">
      <option value="INR">INR</option>
    </select>
  </div>
  <div class="result">
    <p> USD = 84 INR</p>
  </div>
</div>;

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
