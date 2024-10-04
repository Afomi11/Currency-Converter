function CurrencySelector({ currencyOptions, selectedCurrency, onChangeCurrency }) {
    return (
      <div className="flex flex-col">
        <select
          value={selectedCurrency}
          onChange={onChangeCurrency}
          className="p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="" disabled>Select a currency</option>
          {currencyOptions.map((curr) => (
            <option key={curr} value={curr}>
              {curr.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default CurrencySelector;
  