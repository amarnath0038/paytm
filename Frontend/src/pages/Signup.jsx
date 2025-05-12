import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomLink } from "../components/BottomLink";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        name, username, email, password
      });
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => { navigate("/signin"); }, 1000);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-md">
        <Heading label="Create new account" />

        <InputBox onChange={(e) => setName(e.target.value)} label="Full Name" placeholder="Amarnath" value={name} />
        <InputBox onChange={(e) => setUsername(e.target.value)} label="Username" placeholder="amarnath00" value={username} />
        <InputBox onChange={(e) => setEmail(e.target.value)} label="Email" type="email" placeholder="amarnath@example.com" value={email} />
        <div className="mb-6">
          <InputBox onChange={(e) => setPassword(e.target.value)} label="Password" type="password" placeholder="••••••••" value={password} />
        </div>

        <Button
          onClick={handleSignup}  
          label={loading ? "Signing up...." : "Sign Up"} 
          disabled={loading} 
        />

        {error && (
          <div className="mt-4 p-3 rounded-md bg-white text-red-800 text-sm flex items-center justify-center">
            ⚠ {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 rounded-md bg-white text-green-800 text-sm flex items-center justify-center">
            Signup successful !! 
          </div>
        )}

        <BottomLink
          label="Already have an account?"
          linkText="Sign in"
          linkHref="/signin"
        />
      </div>
    </div>
  );
};

export default Signup;
