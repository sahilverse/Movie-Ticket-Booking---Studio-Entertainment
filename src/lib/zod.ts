import { object, string } from "zod"

export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid Email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
})


export const registerSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters"),
    username: string({ required_error: "Name is required" })
        .min(3, "Username is required")
        .max(32, "Username must be less than 32 characters"),
    phone: string({ required_error: "Phone number is required" })
        .min(10, "Phone number must be at least 10 characters")
        .max(10, "Phone number must be less than 10 characters"),
    date_of_birth: string({ required_error: "Date of Birth is required" }),
});