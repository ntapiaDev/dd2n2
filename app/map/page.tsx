import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import MapTable from "./MapTable";

export default async function Map() {
  const session = await getServerSession(authOptions);
  const response = await axios.get(`${process.env.BASE_URL}/api/area?game_id=${session.user.game_id}`);
  const map = await response.data;
  return (
    <main>
      <h1>Carte</h1>
      <MapTable map={map} />
    </main>
  )
}
