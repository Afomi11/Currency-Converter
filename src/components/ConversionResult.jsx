function ConversionResult({ result, fromCurrency, toCurrency }) {
    return (
      <div className="mt-4 text-center">
        <h2 className="text-xl text-white">Converted Amount:</h2>
        <p className="text-3xl font-bold text-white">
          <label className="text-gray-600 font-semibold">Result:</label> {result} {fromCurrency} to {toCurrency}
        </p>
      </div>
    );
  }