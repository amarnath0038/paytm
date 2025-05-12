import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <Appbar username="U" />
      <Balance amount={10000} />
      <Users />
    </div>
  );
};

export default Dashboard;

