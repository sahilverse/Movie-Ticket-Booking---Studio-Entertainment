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
        defaultValues: {
            email: "",
            password: "",
            username: "",
            phone: "",
            date_of_birth: "",
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
                    <InputField type="text" id="username" placeholder="Username*" styles={styles} disabled={isLoading} {...register("username")} autoComplete='username' className={`${errors.username && "text-red-500"}`} />
                </div>

                <div>
                    <InputField type="text" id="email" placeholder="Email*" styles={styles} disabled={isLoading}  {...register("email")} autoComplete='email' className={`${errors.email && "text-red-500"}`} />
                </div>
                <div>
                    <InputField type="text" id="phone" placeholder="Mobile*" styles={styles} disabled={isLoading} {...register("phone")} autoComplete='phone' className={`${errors.phone && "text-red-500"}`} />
                </div>
                <div>
                    <InputField type="date" id="date_of_birth" styles={styles} disabled={isLoading} {...register("date_of_birth")} className={`${errors.date_of_birth && "text-red-500"}`} />
                </div>
                <div>
                    <InputField type="password" id="password" placeholder="Password (min 6 characters)*" styles={styles} disabled={isLoading} {...register("password")} autoComplete='new-password' className={`${errors.password && "text-red-500"}`} />
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