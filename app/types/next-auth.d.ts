import NextAuth from "next-auth"
import { Role } from "./User"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: number,
      username: string,
      role: Role,
      game_id: number
    }
  }
}
