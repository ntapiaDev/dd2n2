export { default } from "next-auth/middleware"

export const config = { matcher: ["/admin/:path*", "/dashboard/:path*", "/encampment/:path*", "/map/:path*"] }
// export const config = { matcher: ["/nothing"] }
