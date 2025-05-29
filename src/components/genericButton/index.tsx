'use client';
import React from 'react';
import './genericButton.css';
import props from '../../types/props'  

export default function GenericButton( { name, onClick } : props) {
  return ( 
    <button className="generic-button" onClick={onClick}>{name}</button>
  );
}