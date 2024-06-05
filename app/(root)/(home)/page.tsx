import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {/* Image home */}
      <div className="relative h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-[20px]">
          <h1 className="text-3xl font-bold">What is our objective ?</h1>
        </div>
      </div>

      <div className="p-5 rounded-[20px] text-center">
        <p>
          We are a platform dedicated to boosting the development of cities in
          the interior of Minas Gerais. Our focus is clear: collecting and
          present essential data to attract investments that catalyze the
          socioeconomic growth of these regions. In a world increasingly
          connected, we recognize the importance of intelligent monitoring,
          highlighted by experts such as Macedo et al. (2023), to optimize
          resource management and improve quality of life. It is part of this
          movement, joining us to create a brighter future prosperous and
          vibrant for the communities in the interior of Minas Gerais.
        </p>
      </div>

      {/* Graphics section */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-dark-1 p-5 rounded-[20px]">
          <h2 className="text-xl font-bold mb-3">News</h2>
          <Image
            src="/images/news-chart.png" // Substituir futuramente para gráficos reais
            alt="News Chart"
            layout="responsive"
            width={500}
            height={300}
          />
        </div>
        <div className="bg-dark-1 p-5 rounded-[20px]">
          <h2 className="text-xl font-bold mb-3">Ranking</h2>
          <Image
            src="/images/ranking-chart.png" // Substituir futuramente para gráficos reais
            alt="Ranking Chart"
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
