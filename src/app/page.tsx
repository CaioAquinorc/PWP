"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Header from '@/components/header';

export default function Home(){

  const router = useRouter();

  const handleLogout = () => {
    // 1. Remover o token de autenticação 
    localStorage.removeItem('token'); // Remove o token do Local Storage

    // 2. Redirecionar o usuário para a página de login
    router.push('/loginPage');
  };

  useEffect((): any => {
    const logado = localStorage.getItem('token');

    if(logado){
      return (
        <div>
          <Header titulo={'Controle Acadêmico'} subtitulo={'Pagina inicial.'} OnLogOut={handleLogout}/>
          <h1>Home</h1> 
        </div>
  )
    } else {
      router.push('/loginPage')
    }
  })
}