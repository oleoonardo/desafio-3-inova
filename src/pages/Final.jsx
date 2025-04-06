import React from "react";
import { useNavigate } from "react-router-dom";

function Final() {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-col justify-center items-center max-w-[1000px] w-full min-h-[500px] mx-auto mt-50 rounded-2xl shadow-lg p-6">
      {/* Logo e Título */}
      <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
        <img className="w-[50px]" src="./assets/checkedVerde.png" alt="Logo" />
        <h1 className="text-black text-lg md:text-xl lg:text-2xl font-semibold">
          Inscrição Concluida com Sucesso!
        </h1>
      </div>

      {/* Parágrafo de inscrição */}
      <p className=" text-center mt-4 max-w-[800px] text-sm md:text-base lg:text-lg" style={{color: "black"}}>
        Muito obrigado por participar do Inova Maranhão! Sua inscrição foi realizada com sucesso. Agora você pode aproveitar essa oportunidade de fazer parte dessa experiência inovadora. Aguarde o contato.
      </p>

      {/* Botão de Envio */}
        <button onClick={() => navigate("/")} className="bg-green-500 text-black rounded-[10px] cursor-pointer px-4 py-2 sm:px-6 sm:py-3 mt-10 w-1/3 sm:w-[12.5rem] hover:opacity-80 transition">
          Voltar ao Inicio
        </button>
    
    </div>
  );
}

export default Final;
