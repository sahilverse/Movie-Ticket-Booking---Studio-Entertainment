import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";



interface InputProps {
    id: string;
    type: string;
    placeholder: string;
    error?: string;
    register: UseFormRegister<any>
    styles: Record<string, string>
    disabled?: boolean

}

const InputField: React.FC<InputProps> = ({ id, type, placeholder, error, styles, register, disabled }) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <div className={styles.input_field}>

            <input
                id={id}
                type={inputType}
                placeholder={placeholder}
                className={styles.input}
                autoComplete={id}
                disabled={disabled}
                {...register(id)}
            />

            {/* Conditionally render password toggle for password fields */}
            {type === "password" && (
                <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                    {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </span>
            )}


        </div>
    );
};

export default InputField;
