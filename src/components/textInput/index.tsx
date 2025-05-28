import React from 'react';
import './TextInput.css';
import props from '../../types/props'

export default function TextInput({ label, type, onChange } : props ) {
  return (
    <div className="text-input">
      <label>{label}:</label>
      <input type={type} onChange={onChange}/>
    </div>
  );
}