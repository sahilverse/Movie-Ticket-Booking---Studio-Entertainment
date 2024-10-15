"use client"
import React, { useState } from 'react'
import InputField from './inputs/InputField';
import ErrorText from './formError/ErrorText';
import LoginBtn from './buttons/LoginBtn';
import Link from 'next/link';
import GoogleBtn from './buttons/GoogleBtn';
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/zod";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerCredentials } from "@/actions/register";
import toast from 'react-hot-toast';
import FormError from './formError/FormError';
import { TStyle } from '@/types/types';


const RegisterForm = ({ styles }: { styles: TStyle }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showFormError, SetShowFormError] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            email: "",
            password: "",
            username: "",
        }
    });

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        setIsLoading(true);
        const loadingToastId = toast.loading("Signing Up...");

        try {
            const response = await registerCredentials(data);

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
        <> <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <p>Sign Up</p>
            <div className={styles.input_fields}>
                {showFormError && <FormError message={errors.root?.message} setCloseError={SetShowFormError} />}
                <div>
                    <InputField type="text" id="username" placeholder="Username" styles={styles} disabled={isLoading} {...register("username")} autoComplete='username' />
                    <ErrorText styles={styles} message={errors.username?.message} />
                </div>

                <div>
                    <InputField type="text" id="email" placeholder="Email" styles={styles} disabled={isLoading}  {...register("email")} autoComplete='email' />
                    <ErrorText styles={styles} message={errors.email?.message} />
                </div>
                <div>
                    <InputField type="password" id="password" placeholder="Password" styles={styles} disabled={isLoading} {...register("password")} autoComplete='password' />
                    <ErrorText styles={styles} message={errors.password?.message} />
                </div>
                <div className={styles.btn_container}>
                    <LoginBtn type="Sign Up" styles={styles} disabled={isLoading} />
                </div>
                <div className={styles.google_btn_container}>
                    <div className={styles.line_container}>
                        <div className={styles.line}></div>
                        <p>OR</p>
                        <div className={styles.line}></div>
                    </div>
                    <GoogleBtn styles={styles} disabled={isLoading} />
                    <p>Already a Member? <Link href="/login">Sign In</Link></p>

                </div>
            </div>
        </form>


        </>
    )
}

export default RegisterForm;