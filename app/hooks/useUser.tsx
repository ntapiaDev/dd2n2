import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const getUser = async () => {
    const session = await getSession();
    return session?.user || null;
}

export default function useUser() {
    const { data: user } = useQuery({ queryKey: ['user'], queryFn: getUser });
    return user;
}
