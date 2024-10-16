import React from 'react'
import styles from "./login.module.css"
import FormImage from '@/components/client/form/image/FormImage'
import LoginForm from '@/components/client/form/LoginForm'


const LoginPage = async () => {


    return (
        <main className='main_container mb-8'>
            <div className={styles.container}>
                <FormImage styles={styles} />
                <div className={styles.form_container}>
                    <LoginForm styles={styles} />
                </div>
            </div>
        </main>
    )
}

export default LoginPage;