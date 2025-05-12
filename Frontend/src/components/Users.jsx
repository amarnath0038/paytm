import { useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);

  const fetchData = debounce(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("NO token found. Please sign in");
      }
      
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?name=${filter}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data.users);
      } catch(err) {
        console.error("Error fetching data", err);
        setError("Could not load users. Please try again!");
      }
    }, 500);


  useEffect(() => {
    if (filter.trim() !== "") {
      fetchData();
    }
  },[filter]);

  return (
    <div className="px-6 pb-6"> 
      <div className="font-bold mt-6 text-2xl">Users</div>

      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => {setFilter(e.target.value)}}
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>

      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {

  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center border p-3 rounded-md mb-2">
      <div className="flex items-center space-x-3">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center text-xl font-semibold">
          {user.name[0]}
        </div>
        <div>
          {user.name}
        </div>
      </div>

      <div className="mr-2"> 
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition px-3"
          onClick={() => {
            navigate(`/transfer?id=${user._id}&name=${user.name}`);
          }}
        >
          Send Money
        </button>
      </div>
    </div>
  );
}
