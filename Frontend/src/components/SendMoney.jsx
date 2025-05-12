import { useSearchParams } from "react-router-dom"
import axios from "axios";
import { useState } from "react";

export const SendMoney = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const handleClick = async () => {
    setError(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please sign in.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/v1/account/transfer", 
        { to: id, amount },
        { headers: {
          Authorization: `Bearer ${token}`
        }}
      );
      alert("Transfer Successful");
    } catch(err) {
      console.log("Error transferring amount", err)
      setError("Payment failed !! Please try again")
    } finally {
      setLoading(false);
    }

  }

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                    <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <input
                        type="number"
                        id="amount"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={amount}
                        placeholder="Enter amount in rupees"
                        onChange={(e) => {setAmount(e.target.value)}}
                    />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                      onClick={handleClick}
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send"}
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}
