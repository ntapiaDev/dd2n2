import Link from "next/link";
import Table from "./Table";

export default async function Area() {
  return (
    <main>
      <h1>Zone</h1>
      <Link href="/map">Retour à la carte</Link>
      <Table />
    </main>
  )
}
