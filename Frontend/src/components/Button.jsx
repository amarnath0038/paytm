
export const Button = ({ label, onClick, disabled }) => {
  return (
    <button
      type="submit"
      className="w-full bg-black text-white py-2 rounded-2xl hover:bg-gray-800 transition"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
