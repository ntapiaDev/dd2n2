export const revalidate = 60;

import axios from "axios";
import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from "../website/getQueryClient";
import Games from "./Games";
import Logout from "../login/Logout";

const getGames = async () => {
  const response = await axios.get(`${process.env.BASE_URL}/api/game`);
  return response.data;
}

export default async function Dashboard() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey:['games'], queryFn: getGames });
  const dehydratedState = dehydrate(queryClient);
  return (
    <main>
      <h1>Dashboard</h1>
      <Logout />
      <Hydrate state={dehydratedState}>
        <Games />
      </Hydrate>
    </main>
  )
}
