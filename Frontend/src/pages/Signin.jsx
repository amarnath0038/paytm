import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomLink } from "../components/BottomLink";
import { useState } from "react";
import axios from "axios";

const Signin = () => {

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    const isEmail = /\S+@\S+\.\S+/.test(identifier);

    try {
      
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
          email: isEmail ? identifier : undefined, 
          username: !isEmail ? identifier : undefined, 
          password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setSuccess(true);
      }

    } catch (err) {
      console.error(err);
      setError("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  }

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-md">
        <Heading label="Sign in to continue" />

        <InputBox onChange={(e) => setIdentifier(e.target.value)} label="Email or username" type="text" placeholder="Email or username" value={identifier} />
        <div className="mb-6">
          <InputBox onChange={(e) => setPassword(e.target.value)} label="Password" type="password" placeholder="••••••••" value={password} />
        </div>
        
        <Button
          onClick={handleSignin}  
          label={loading ? "Signing in...." : "Sign in"} 
          disabled={loading} 
        />

        {error && (
          <div className="mt-4 p-3 rounded-md bg-white text-red-800 text-md flex items-center justify-center">
            ⚠ {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 rounded-md bg-white text-green-800 text-md flex items-center justify-center">
            Signin Successful !!
          </div>
        )}
        
        <BottomLink
          label="Dont have an account?"
          linkText="Sign up"
          linkHref="/signup"
        />
      </div>
    </div>
  );
};

export default Signin;
