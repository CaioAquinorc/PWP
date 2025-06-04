"use client"
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { jwtDecode } from "jwt-decode";

interface MyTokenPayload {
  sub: string;
  role: string;
  exp: number;
  iat: number;
}

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/loginPage');
  };

  useEffect(() => {
    const logado = localStorage.getItem('token');
    if (logado) {
      const decode = jwtDecode<MyTokenPayload>(logado);

      if (decode.role.endsWith('03')) {
        console.log("Admin");
        router.push('/AdminPage');
      }
      // Você pode adicionar lógica para outros papéis (01, 02) aqui, se necessário

    } else {
      router.push('/loginPage');
    }
  }, [router]);

  return (
    <div>
      <Header titulo={'Controle Acadêmico'} subtitulo={'Página inicial.'} OnLogOut={handleLogout} />
      <h1></h1>
    </div>
  );
}