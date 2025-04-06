import React from "react";
import { useNavigate } from "react-router-dom";

function Inicial() {

  const navigate = useNavigate();

  return (
    <div className="bg-[#222061] flex flex-col justify-center items-center max-w-[1000px] w-full min-h-[500px] mx-auto mt-30 rounded-2xl shadow-lg loading-border p-6">
      {/* Logo e Título */}
      <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
        <img className="w-[50px]" src="./assets/Vector.png" alt="Logo" />
        <h1 className="text-white text-lg md:text-xl lg:text-2xl font-semibold">
          Bem-vindo ao site do Inova Maranhão
        </h1>
      </div>

      {/* Parágrafo de inscrição */}
      <p className="text-white text-center mt-4 max-w-[800px] text-sm md:text-base lg:text-lg" style={{color: "white"}}>
        Para participar do Inova Maranhão, preencha o nosso formulário de inscrição com seus dados. Essa etapa é essencial para garantir sua vaga e receber todas as informações sobre o evento. Não perca essa oportunidade de fazer parte dessa experiência inovadora!
      </p>

      {/* Imagens organizadas */}
      <div className="relative w-full flex justify-center mt-10">
        <img className="w-[80px] sm:w-[100px] absolute left-4 sm:left-10 bottom-[-100px] hidden sm:block" src="./assets/Camada_1.png" alt="Imagem 1" />
        <img className="w-[120px] sm:w-[150px] absolute right-4 sm:right-10 top-[-300px] hidden sm:block" src="./assets/Camada_2.png" alt="Imagem 2" />
      </div>

      {/* Botão de Envio */}
      <div className="flex justify-center gap-4">
        <button onClick={() => navigate("/cadastrar")} className="bg-[#1b1a4b] text-white rounded-[10px] cursor-pointer px-4 py-2 mt-10 w-[12.5rem] hover:bg-[#2c2a7f] transition">
          Realizar cadastro
        </button>
        <button onClick={() => navigate("/login")} className="bg-[#1b1a4b] text-white rounded-[10px] cursor-pointer px-4 py-2 mt-10 w-[12.5rem] hover:bg-[#2c2a7f] transition">
          Realizar login
        </button>
      </div>
    
    </div>
  );
}

export default Inicial;
