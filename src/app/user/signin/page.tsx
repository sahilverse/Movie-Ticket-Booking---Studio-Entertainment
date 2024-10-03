import React from 'react'
import styles from './signin.module.css'
import signInImg from "@/assets/Signin/signin.webp"
import Image from 'next/image'


import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link'




const SigninPage: React.FC = () => {
    return (
        <div className="main_container mt-20 ">
            <div className={styles.container}>
                <div className={styles.img_container}>
                    <Image src={signInImg} alt="Signin" className={styles.signin_image} />
                </div>

                <div className={styles.form_container}>


                    <form action="" className={styles.form}>
                        <h1>Sign In</h1>

                        <div className={styles.form_inputs}>
                            <div className={styles.input_field}>
                                <input type="email" name="email" id="email" placeholder="Email" />
                            </div>
                            <div className={styles.input_field}>
                                <input type="password" name="password" id="password" placeholder="Password" />

                            </div>
                            <div className={styles.btn_container}>
                                <button type="submit" className={styles.signin_btn}>Sign In</button>
                                <p>
                                    <Link href="/user/forget-password">
                                        Forgot Password?
                                    </Link>
                                </p>

                            </div>

                            <div className={styles.google_login}>
                                <div className={styles.line_container}>

                                    <span className={styles.line}></span> <p>Or</p><span className={styles.line}></span>
                                </div>

                                <button type="submit" className={`${styles.signin_btn} ${styles.google_btn}`}>
                                    <span>
                                        <FaGoogle />
                                    </span>
                                    Sign In With Google


                                </button>


                            </div>

                            <p>Not a Member? <Link href="/user/register">Sign Up</Link></p>

                        </div>


                    </form>


                </div>

            </div>


        </div>
    )
}


export default SigninPage;