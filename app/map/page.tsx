import axios from "axios";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import getQueryClient from "../website/getQueryClient";
import { UserType } from "@/app/types/User";
import MapTable from "./MapTable";

const getMap = async (game_id?: number) => {
  const response = await axios.get(`${process.env.BASE_URL}/api/area?game_id=${game_id}`);
  return response.data;
}

export default async function Map() {
  const user: UserType = (await getServerSession(authOptions))?.user;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: ['map'], queryFn: () => getMap(user.game_id) });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main>
      <h1>Carte</h1>
      <Hydrate state={dehydratedState}>
        <MapTable />
      </Hydrate>
    </main>
  )
}
