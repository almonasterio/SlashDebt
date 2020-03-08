import React, { Component } from 'react'

const FormField = ({name, label, type,placeholder,inputChange}) => {
        return (
        <div className="form-field">
            <label className="label">{label}</label>
            <input
                name={name} 
                type={type}
                placeholder={placeholder}
                onChange={inputChange}    
            />
        </div>
        )
}

export default FormField