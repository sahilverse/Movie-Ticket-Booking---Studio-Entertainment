import { handlers } from "@/app/api/auth/[...nextauth]/auth"
export const { GET, POST } = handlers

export const runtime = "nodejs";