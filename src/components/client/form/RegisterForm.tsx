"use client"
import React, { useState, useTransition } from 'react'
import InputField from './inputs/InputField';
import ErrorText from './formError/ErrorText';
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
import { Button } from '@/components/ui/button';
import Spinner from '@/components/spinner/Spinner';


const RegisterForm = ({ styles }: { styles: TStyle }) => {
    const [isPending, startTransition] = useTransition();
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

        startTransition(async () => {
            try {
                const response = await registerCredentials(data);

                if (response?.error) {
                    setError("root", { message: response.error });
                    SetShowFormError(true);
                }

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                toast.error("An error occurred! Please try again");
            }
        });

    }
    return (
        <> <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <p>Sign Up</p>
            <div className={styles.input_fields}>
                {showFormError && <FormError message={errors.root?.message} setCloseError={SetShowFormError} />}
                <div>
                    <InputField type="text" id="username" placeholder="Username*" styles={styles} disabled={isPending} {...register("username")} autoComplete='username' className={`${errors.username && "text-red-500"}`} />
                </div>

                <div>
                    <InputField type="text" id="email" placeholder="Email*" styles={styles} disabled={isPending}  {...register("email")} autoComplete='email' className={`${errors.email && "text-red-500"}`} />
                </div>
                <div>
                    <InputField type="text" id="phone" placeholder="Mobile*" styles={styles} disabled={isPending} {...register("phone")} autoComplete='phone' className={`${errors.phone && "text-red-500"}`} />
                </div>
                <div>
                    <InputField type="date" id="date_of_birth" styles={styles} disabled={isPending} {...register("date_of_birth")} className={`${errors.date_of_birth && "text-red-500"}`} />
                </div>
                <div>
                    <InputField type="password" id="password" placeholder="Password (min 6 characters)*" styles={styles} disabled={isPending} {...register("password")} autoComplete='new-password' className={`${errors.password && "text-red-500"}`} />
                    {errors.password && <ErrorText message={errors.password?.message} styles={styles} />}
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
                                Signing Up...
                            </span>
                        ) : (
                            <>

                                Sign Up
                            </>
                        )}

                    </Button>
                </div>
                <div className={styles.google_btn_container}>
                    <div className={styles.line_container}>
                        <div className={styles.line}></div>
                        <p>OR</p>
                        <div className={styles.line}></div>
                    </div>
                    <GoogleBtn styles={styles} disabled={isPending} />
                    <p>Already a Member? <Link href="/login">Sign In</Link></p>

                </div>
            </div>
        </form>


        </>
    )
}

export default RegisterForm;