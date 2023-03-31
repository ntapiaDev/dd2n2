import axios from "axios";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import getQueryClient from "../../website/getQueryClient";
import { UserType } from "@/app/types/User";
import Link from "next/link";
import Table from "./Table";

type Param = {
  [key: string]: string | string[] | undefined
}
type Props = {
  params: { slug: string },
  searchParams: { [key: string]: Param }
}

const getArea = async (x: Param, y: Param, game_id?: number) => {
  const response = await axios.get(`${process.env.BASE_URL}/api/area?x=${x}&y=${y}&game_id=${game_id}`);
  return response.data;
}

export default async function Area({ params, searchParams }: Props) {
  const x = searchParams.x;
  const y = searchParams.y;

  const user: UserType = (await getServerSession(authOptions))?.user;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: [`area-${x}-${y}`], queryFn: () => getArea(x, y, user.game_id) });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main>
      <h1>Zone</h1>
      <Link href="/map">Retour à la carte</Link>
      <Hydrate state={dehydratedState}>
        <Table />
      </Hydrate>
    </main>
  )
}
