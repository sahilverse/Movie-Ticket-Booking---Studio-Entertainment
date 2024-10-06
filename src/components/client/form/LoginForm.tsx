"use client";
import React from "react";
import LoginBtn from "./buttons/LoginBtn";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/lib/zod";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./inputs/InputField";
import Link from "next/link";
import { credentialsLogin } from "@/actions/login";
import ErrorText from "./formError/ErrorText";
import toast from "react-hot-toast";
import FormError from "./formError/FormError";
import GoogleBtn from "./buttons/GoogleBtn";


const LoginForm = ({ styles }: { styles: Record<string, string> }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {

        setIsLoading(true);
        const loadingToastId = toast.loading("Signing In...");

        try {
            const response = await credentialsLogin(data);

            if (response?.error) {
                setError("root", { message: response.error });
            }

        } catch (error) {
            toast.error("An error occurred! Please try again");
        } finally {
            setIsLoading(false);
            toast.dismiss(loadingToastId);
        }

    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <p>Sign In</p>
                <div className={styles.input_fields}>
                    <FormError message={errors.root?.message} />

                    <div>
                        <InputField type="text" id="email" placeholder="Email" styles={styles} register={register} disabled={isLoading} />
                        <ErrorText styles={styles} message={errors.email?.message} />
                    </div>
                    <div>
                        <InputField type="password" id="password" placeholder="Password" styles={styles} register={register} disabled={isLoading} />
                        <ErrorText styles={styles} message={errors.password?.message} />
                    </div>
                    <div className={styles.btn_container}>
                        <LoginBtn type="Sign In" styles={styles} disabled={isLoading} />
                        <Link href="/forgot-password">Forgot Password?</Link>
                    </div>
                </div>

            </form>
            <div className={styles.google_btn_container}>
                <div className={styles.line_container}>
                    <div className={styles.line}></div>
                    <p>OR</p>
                    <div className={styles.line}></div>
                </div>
                <GoogleBtn styles={styles} disabled={isLoading} />
                <p>Not a Member? <Link href="/register">Sign Up</Link></p>

            </div>

        </>
    )
}

export default LoginForm;



