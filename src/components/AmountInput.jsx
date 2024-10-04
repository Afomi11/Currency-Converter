import React from 'react';

function Amountinput({ amount, onChangeAmount }) {
  return (
    <div className="flex items-center space-x-2">
        <label className="text-gray-600 font-semibold">Enter Amount: </label>
      <input
        type="number"
        value={amount}
        onChange={onChangeAmount}
        className="border rounded px-3 py-2"
      />
    </div>
  );
}

export default Amountinput;