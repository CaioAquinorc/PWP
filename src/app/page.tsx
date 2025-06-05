"use client"
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { jwtDecode } from "jwt-decode";
import { MyTokenPayload } from "@/types/datatype";

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
      else if(decode.role.endsWith('02')){
        console.log("Professor");
        router.push('/ProfessorPage');
      }
      else if(decode.role.endsWith('01')){
        console.log("Aluno");
        router.push('/AlunoPage');
      }
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