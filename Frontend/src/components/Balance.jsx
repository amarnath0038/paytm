export const Balance = ({ amount = 10000 }) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium mb-2">Your balance</h2>
      <div className="text-2xl font-bold">₹ {amount.toLocaleString()}</div>
    </div>
  );
};

