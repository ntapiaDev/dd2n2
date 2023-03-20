import Logout from "../login/Logout";
import Games from "./Games";

export default function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <Logout />
      <Games />
    </main>
  )
}
