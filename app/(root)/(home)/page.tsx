import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {/* Image home */}
      <div className="relative h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-[20px]">
          <h1 className="text-3xl font-bold">Qual o nosso objetivo ?</h1>
        </div>
      </div>

      <div className="p-5 rounded-[20px] text-center">
        <p>
          Somos uma plataforma dedicada a impulsionar o desenvolvimento das
          cidades do interior de Minas Gerais. Nosso foco é claro: coletar e
          apresentar dados essenciais para atrair investimentos que catalisem o
          crescimento socioeconômico dessas regiões. Em um mundo cada vez mais
          conectado, reconhecemos a importância de sistemas inteligentes de
          monitoramento, destacados por especialistas como Macedo et al. (2023),
          para otimizar a gestão de recursos e elevar a qualidade de vida. Seja
          parte desse movimento, unindo-se a nós para criar um futuro mais
          próspero e vibrante para as comunidades do interior mineiro.
        </p>
      </div>

      {/* Graphics section */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-dark-1 p-5 rounded-[20px]">
          <h2 className="text-xl font-bold mb-3">Notícias</h2>
          <Image
            src="/images/news-chart.png" // Substituir futuramente para gráficos reais
            alt="Gráfico de Notícias"
            layout="responsive"
            width={500}
            height={300}
          />
        </div>
        <div className="bg-dark-1 p-5 rounded-[20px]">
          <h2 className="text-xl font-bold mb-3">Ranking</h2>
          <Image
            src="/images/ranking-chart.png" // Substituir futuramente para gráficos reais
            alt="Gráfico de Ranking"
            layout="responsive"
            width={500}
            height={300}
            className=""
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
