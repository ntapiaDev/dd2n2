import Games from "./Games";
import Logout from "../login/Logout";

export default async function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <Logout />
      <Games />
    </main>
  )
}
