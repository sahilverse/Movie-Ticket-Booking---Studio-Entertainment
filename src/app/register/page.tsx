import React from "react";
import FormImage from "@/components/client/form/image/FormImage";


import styles from "./register.module.css";
import RegisterForm from "@/components/client/form/RegisterForm";


const RegisterPage: React.FC = () => {

    return (
        <div className='main_container'>
            <div className={styles.container}>
                <FormImage styles={styles} />
                <div className={styles.form_container}>
                    <RegisterForm styles={styles} />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
