"use client";
import React, { useState } from "react";
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
    const [isLoading, setIsLoading] = useState(false);
    const [showFormError, SetShowFormError] = useState<boolean>(false);
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
                SetShowFormError(true);
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
                    {showFormError && <FormError message={errors.root?.message} setCloseError={SetShowFormError} />}

                    <div>
                        <InputField type="text" id="email" placeholder="Email" styles={styles} disabled={isLoading} {...register("email")} autoComplete="email" />
                        <ErrorText styles={styles} message={errors.email?.message} />
                    </div>
                    <div>
                        <InputField type="password" id="password" placeholder="Password" styles={styles} disabled={isLoading} {...register("password")} autoComplete="current-password" />
                        <ErrorText styles={styles} message={errors.password?.message} />
                    </div>
                    <div className={styles.btn_container}>
                        <LoginBtn type="Sign In" styles={styles} disabled={isLoading} />
                        <Link href="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className={styles.google_btn_container}>
                        <div className={styles.line_container}>
                            <div className={styles.line}></div>
                            <p>OR</p>
                            <div className={styles.line}></div>
                        </div>
                        <GoogleBtn styles={styles} disabled={isLoading} />
                        <p>Not a Member? <Link href="/register">Sign Up</Link></p>

                    </div>

                </div>
            </form>
        </>
    )
}

export default LoginForm;



