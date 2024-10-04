import { useState, useEffect } from 'react';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import './App.css'; // Ensure this imports your Tailwind CSS styles

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1); // Amount to convert
  const [convertedAmount, setConvertedAmount] = useState(''); // Converted amount
  const [exchangeRate, setExchangeRate] = useState(1);
  const [error, setError] = useState(null);

  // Fetch available currencies
  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/2039f131294cc682c58de28a/codes')
      .then(response => response.json())
      .then(data => {
        setCurrencyOptions(data.supported_codes.map(code => code[0]));
      })
      .catch(err => setError('Failed to fetch currency options'));
  }, []);

  // Fetch exchange rates
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`https://v6.exchangerate-api.com/v6/2039f131294cc682c58de28a/latest/${fromCurrency}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          return res.json();
        })
        .then(data => {
          setExchangeRate(data.conversion_rates[toCurrency]);
        })
        .catch(error => {
          setError('Failed to fetch exchange rates');
          console.error(error);
        });
    }
  }, [fromCurrency, toCurrency]);

  // Update the converted amount whenever the amount or exchange rate changes
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    const conversion = (value * exchangeRate).toFixed(2);
    setConvertedAmount(conversion); // Update the converted amount
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 to-pink-100">
      <div className="custom-box"> {/* Apply the custom-box class here */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Currency Converter</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Input field and currency selector side by side */}
        <div className="flex items-center space-x-4 mb-4">
          <AmountInput
            amount={amount}
            onChangeAmount={handleAmountChange}
          />
          <CurrencySelector
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          />
        </div>

        {/* To Converted Amount */}
        <div className="flex flex-col items-center">
          <label className="text-lg mb-2">Exchange Amount: </label>
          <input
            type="text"
            value={convertedAmount} // Show the converted amount
            readOnly
            className="border-2 rounded-md p-2 text-xl text-gray-800 w-40"
          />
          <CurrencySelector
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
