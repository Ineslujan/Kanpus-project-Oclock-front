import React from 'react';
import './addTextForm.scss'

export default function AddTextForm({text, set, value}) {

    const addText = (e) => {
        set(e.target.value)
    }
    return (
        <div className="text-form-container">
            <p className="form-label">{text}</p>

            <textarea name="text-form" className="text-form" onChange={addText} value={value}></textarea>
        </div>
    )
}
