import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { AreaType } from "@/app/types/Area";
import Link from "next/link";
import Table from "./Table";

export default async function Area({ searchParams }: { searchParams: { x: string, y: string } }) {
  const { x } = searchParams;
  const { y } = searchParams;
  
  if (!x || !y || parseInt(x) < 1 || parseInt(x) > 9 || parseInt(y) < 1 || parseInt(y) > 9) return (
    <main>
      <h1>Zone</h1>
      <p>Cette zone est invalide.</p>
    </main>
  )

  const session = await getServerSession(authOptions);
  const response = await axios.get(`${process.env.BASE_URL}/api/area?x=${x}&y=${y}&game_id=${session.user.game_id}`);
  const area: AreaType = await response.data;

  if (!area.cells?.length) {
    const cells = await axios.post('http://localhost:3000/api/cell/', {
      id: area.id,
      biome: area.biome,
      level: area.level
    });
    area.cells = cells.data;
  }
  
  return (
    <main>
      <h1>Zone</h1>
      <Link href="/map">Retour à la carte</Link>
      <Table x={x} y={y} area={area} />
    </main>
  )
}
