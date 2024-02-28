import React, { useState } from 'react';
import { Input } from "@/components/ui/input"

type InputWithIconProps = {
    field: any;
    onBlur: any;
}

function InputWithIcon({ field, onBlur }: InputWithIconProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{ position: 'relative', paddingLeft: isHovered ? '30px' : '0' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <svg
                style={{
                    position: 'absolute',
                    left: '0',
                    top: '10px',
                    width: '10px',
                    height: '16px',
                    visibility: isHovered ? 'visible' : 'hidden',
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
            >
                <path d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z" />
            </svg>
            <Input
                {...field}
                onBlur={onBlur}
            />
        </div>
    );
}

export default InputWithIcon;