"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Home(){

  const router = useRouter();

  useEffect((): any => {
    const logado = localStorage.getItem("user")

    if(logado){

      return (
        <div>
          <h1>Home</h1> 
        </div>
  )

    } else {
      router.push('/loginPage')
    }
  })
}