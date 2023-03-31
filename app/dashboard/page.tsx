// export const revalidate = 60;

import axios from "axios";
import { dehydrate, Hydrate } from '@tanstack/react-query';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import getQueryClient from "../website/getQueryClient";
import { UserType } from "@/app/types/User";
import Games from "./Games";
import Logout from "../login/Logout";

const getGames = async () => {
  const response = await axios.get(`${process.env.BASE_URL}/api/game`);
  return response.data;
}

export default async function Dashboard() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: ['games'], queryFn: getGames });
  const dehydratedState = dehydrate(queryClient);

  const user: UserType = (await getServerSession(authOptions))?.user;

  return (
    <main>
      <h1>Dashboard</h1>
      <Logout />
      <Hydrate state={dehydratedState}>
        <Games user={user} />
      </Hydrate>
    </main>
  )
}
