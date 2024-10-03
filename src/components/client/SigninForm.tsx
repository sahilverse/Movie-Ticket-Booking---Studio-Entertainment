import React from "react";



import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";




const SigninForm = ({ styles }: { styles: any }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (

        <form action="">
            <h1>Sign In</h1>
            <div className={styles.input_field}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div className={styles.input_field}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" />

            </div>
            <div className={styles.input_field}>
                <button type="submit">Sign In</button>
            </div>
            <div className={styles.input_field}>
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </div>

        </form>
    )
}

export default SigninForm;
