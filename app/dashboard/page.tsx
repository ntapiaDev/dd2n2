import axios from "axios";
import Games from "./Games";
import Logout from "../login/Logout";

export default async function Dashboard() {
  const response = await axios.get(`${process.env.BASE_URL}/api/game`);
  const games = await response.data;
  return (
    <main>
      <h1>Dashboard</h1>
      <Logout />
      <Games games={games} />
    </main>
  )
}
