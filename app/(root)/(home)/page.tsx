/* eslint-disable react/no-unescaped-entities */
// page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { Monitor, BarChart } from "lucide-react";

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("body");
    }
  }, []);

  const openModal = (content: string) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent("");
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <section className="flex flex-col gap-10 p-5 text-white">
      {/* Imagem de destaque */}
      <div className="relative h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black bg-opacity-50 flex flex-col justify-center items-center rounded-[20px] p-5">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white text-shadow-soft">
            The platform dedicated to the development of cities in the interior
            of Minas Gerais.
          </h1>
          <button
            onClick={handleRegisterClick}
            className="mt-4 px-4 md:px-6 py-2 md:py-3 bg-blue-1 rounded-[10px] text-white transition hover:bg-blue-2"
          >
            Register a City
          </button>
        </div>
      </div>

      {/* Seção de descrição */}
      <div className="p-5 bg-dark-1 rounded-[20px] text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Who we are?</h2>
        <p className="mb-4 text-sky-2">
          We are a platform dedicated to boosting the development of cities in
          the interior of Minas Gerais. Our focus is clear: collecting and
          present essential data to attract investments that catalyze the
          socioeconomic growth of these regions.
        </p>
        <p className="italic text-sm  text-sky-2">
          "Intelligent monitoring is essential for optimizing management of
          resources and improving quality of life." - Macedo et al. (2023)
        </p>
      </div>

      {/* Seção de funcionalidades / chamadas para ação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          className="bg-dark-1 p-5 rounded-[20px] flex flex-col items-center justify-center shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => openModal("Real-Time Monitoring")}
        >
          <Monitor className="w-16 h-16 md:w-20 md:h-20" />
          <h3 className="text-lg md:text-xl font-bold mt-4">
            Real-Time Monitoring
          </h3>
          <p className="text-center mt-2">
            Tools that provide real-time data on the economy, safety, health and
            infrastructure of cities.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-1 rounded-[10px] text-white transition hover:bg-blue-2">
            Learn more
          </button>
        </div>
        <div
          className="bg-dark-1 p-5 rounded-[20px] flex flex-col items-center justify-center shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => openModal("Data Analysis and Reports")}
        >
          <BarChart className="w-16 h-16 md:w-20 md:h-20" />
          <h3 className="text-lg md:text-xl font-bold mt-4">
            Data Analysis and Reports
          </h3>
          <p className="text-center mt-2 text-sky-2">
            Detailed reports and analytics that help you understand needs and
            opportunities of cities.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-1 rounded-[10px] text-white transition hover:bg-blue-2">
            Learn more
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Functionality Mode"
        className="bg-dark-1 p-5 rounded-[20px] max-w-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">{modalContent}</h2>
        <p className="mb-4 text-white">
          {modalContent === "Real-Time Monitoring" && (
            <span className="text-sky-2">
              Real-time monitoring allows for continuous data collection
              essential information on the economy, security, health and
              infrastructure of cities. This functionality helps public managers
              to take informed decisions, responding quickly to changes and
              emergencies, and optimizing resource allocation to improve quality
              of life of citizens.
            </span>
          )}
          {modalContent === "Data Analysis and Reports" && (
            <span className="text-sky-2">
              Data analysis and detailed reporting are essential for identifying
              trends and opportunities in cities from the interior of Minas
              Gerais. Using advanced tools analysis, our system transforms raw
              data into insights valuable, allowing the creation of effective
              strategies to attract investments and promote socioeconomic
              development sustainable.
            </span>
          )}
        </p>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-red-500 rounded-[10px] text-white transition hover:bg-red-600"
        >
          Close
        </button>
      </Modal>
    </section>
  );
};

export default Home;
