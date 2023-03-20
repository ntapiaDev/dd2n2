import Link from "next/link";
import MapTable from "./MapTable";

export default function Map() {
  return (
    <main>
      <h1>Carte</h1>
      <Link href="/map/area">Entrer dans la zone</Link>
      <MapTable />
    </main>
  )
}
