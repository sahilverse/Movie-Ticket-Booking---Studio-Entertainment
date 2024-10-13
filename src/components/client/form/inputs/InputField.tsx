import React, { useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";


type InputProps = React.ComponentPropsWithRef<"input"> & {
    styles: Record<string, string>;
};


const InputField = React.forwardRef<HTMLInputElement, InputProps>(
    ({ type, styles, ...rest }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const inputType = type === "password" && showPassword ? "text" : type;

        return (
            <div className={styles.input_field}>
                <input
                    type={inputType}
                    className={styles.input}
                    ref={ref}
                    {...rest}
                />

                {/* Conditionally render password toggle for password fields */}
                {type === "password" && (
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }}
                    >
                        {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </span>
                )}
            </div>
        );
    }
);


InputField.displayName = "InputField";

export default InputField;
