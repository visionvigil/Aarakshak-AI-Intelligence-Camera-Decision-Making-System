import React from 'react'

export default function InputControl(props) {
    return (
        <>
            <div className="form-group">
                <input type="text" required {...props} />
                {props.label && <label htmlFor="">{props.label}</label>}
                <i className={`fa-solid fa-${props.icon}`}></i>
            </div>
        </>
    )
}
