"use client";
import React, { useState, useTransition } from "react";
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
import { TStyle } from "@/types/types";
import { start } from "node:repl";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner/Spinner";


const LoginForm = ({ styles }: { styles: TStyle }) => {
    const [isPending, startTransition] = useTransition();
    const [showFormError, SetShowFormError] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {

        startTransition(async () => {
            try {
                const response = await credentialsLogin(data);

                if (response?.error) {
                    setError("root", { message: response.error });
                    SetShowFormError(true);
                }

            } catch (error) {
                toast.error("An error occurred! Please try again");
            }
        });



    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <p>Sign In</p>
                <div className={styles.input_fields}>
                    {showFormError && <FormError message={errors.root?.message} setCloseError={SetShowFormError} />}

                    <div>
                        <InputField type="text" id="email" placeholder="Email" styles={styles} disabled={isPending} {...register("email")} autoComplete="email" />
                        <ErrorText styles={styles} message={errors.email?.message} />
                    </div>
                    <div>
                        <InputField type="password" id="password" placeholder="Password" styles={styles} disabled={isPending} {...register("password")} autoComplete="current-password" />
                        <ErrorText styles={styles} message={errors.password?.message} />
                    </div>
                    <div className={styles.btn_container}>
                        <Button
                            type="submit"
                            className={`${styles.btn} `}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <span className="flex gap-2">
                                    <Spinner />
                                    Signing In...
                                </span>
                            ) : (
                                <>

                                    Sign In
                                </>
                            )}

                        </Button>
                        <Link href="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className={styles.google_btn_container}>
                        <div className={styles.line_container}>
                            <div className={styles.line}></div>
                            <p>OR</p>
                            <div className={styles.line}></div>
                        </div>
                        <GoogleBtn styles={styles} disabled={isPending} />
                        <p>Not a Member? <Link href="/register">Sign Up</Link></p>

                    </div>

                </div>
            </form>
        </>
    )
}

export default LoginForm;



