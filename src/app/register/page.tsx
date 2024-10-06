import React from "react";
import FormImage from "@/components/client/form/image/FormImage";
import LoginForm from "@/components/client/form/LoginForm";

import styles from "./register.module.css";


const RegisterPage: React.FC = () => {



    return (
        <div className='main_container'>
            <div className={styles.container}>
                <FormImage styles={styles} />
                <div className={styles.form_container}>
                    <LoginForm styles={styles} />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
