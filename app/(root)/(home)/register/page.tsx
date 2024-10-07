"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import useAlert from "@/hooks/useAlert";
import Alert from "@/components/Alert";
import axios from "axios";

interface FormData {
  city: string;
  pib: string;
  uf: string;
  mayor: string;
  population: string;
  areas: string[];
  idh: string;
  benefits: string;
  logistics: string;
  location: string;
  economicFreedom: string;
  sector: string;
  qualification: string;
  environmentalLicense: string;
}

// Componente de registro de cidades
const Register = () => {
  // Hook useState para armazenar e atualizar os dados do formulário
  const [formData, setFormData] = useState<FormData>({
    city: "",
    pib: "",
    uf: "",
    mayor: "",
    population: "",
    areas: [],
    idh: "",
    benefits: "",
    logistics: "",
    location: "",
    economicFreedom: "",
    sector: "",
    qualification: "",
    environmentalLicense: "",
  });

  // Hook personalizado para gerenciar o estado dos alertas
  const { alert, showAlert, hideAlert } = useAlert();

  // Função para lidar com mudanças nos campos do formulário (inputs)
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target; // Captura o nome e valor do campo que foi alterado
    setFormData({ ...formData, [name]: value }); // Atualiza o estado do formData com o novo valor
  };

  // Função para lidar com o envio do formulário
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

    try {
      // Faz uma requisição POST para a API com os dados do formulário
      const response = await axios.post("/api/register", formData);
      if (response.status === 201) {
        // Exibe uma mensagem de sucesso se o cadastro for concluído
        showAlert({ text: "City registered successfully 😃", type: "success" });
      }
    } catch (error) {
      // Exibe uma mensagem de erro caso algo dê errado
      showAlert({ text: "Error registering city 😞", type: "danger" });
    }

    // Rola a página para o topo após o envio do formulário
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Reseta os campos do formulário
    setFormData({
      city: "",
      pib: "",
      uf: "",
      mayor: "",
      population: "",
      areas: [],
      idh: "",
      benefits: "",
      logistics: "",
      location: "",
      economicFreedom: "",
      sector: "",
      qualification: "",
      environmentalLicense: "",
    });

    // Esconde o alerta após 3 segundos
    setTimeout(() => {
      hideAlert();
    }, 3000);
  };

  return (
    <section className="flex flex-col items-center justify-center p-6 text-white">
      {/* Título do formulário */}
      <h1 className="text-3xl font-extrabold mb-6">City registration</h1>

      {/* Componente de alerta exibido caso exista alguma mensagem de alerta */}
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      {/* Formulário de registro */}
      <form
        onSubmit={handleRegister} // Chama a função de envio ao clicar no botão "Register"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl"
      >
        {/* Campo para o nome da cidade */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sky-1">City name</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange} // Atualiza o estado ao digitar
            placeholder="Enter the name of the city"
            className="input input-text"
          />
        </div>

        {/* Demais campos do formulário seguem o mesmo padrão: label, input e atualização de estado */}
        <div className="col-span-1">
          <label className="block text-sky-1">PIB</label>
          <input
            type="text"
            name="pib"
            value={formData.pib}
            onChange={handleInputChange}
            placeholder="PIB"
            className="input input-text"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sky-1">UF</label>
          <input
            type="text"
            name="uf"
            value={formData.uf}
            onChange={handleInputChange}
            placeholder="UF"
            className="input input-text"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sky-1">Mayor</label>
          <input
            type="text"
            name="mayor"
            value={formData.mayor}
            onChange={handleInputChange}
            placeholder="Mayor"
            className="input input-text"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sky-1">Population</label>
          <input
            type="text"
            name="population"
            value={formData.population}
            onChange={handleInputChange}
            placeholder="Population"
            className="input input-text"
          />
        </div>

        {/* Campo para IDH */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sky-1">IDH</label>
          <input
            type="text"
            name="idh"
            value={formData.idh}
            onChange={handleInputChange}
            placeholder="IDH"
            className="input input-text"
          />
        </div>

        {/* Campos de textarea para benefícios, logística, localização, etc. */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sky-1">
            Benefits offered by the Municipality
          </label>
          <textarea
            name="benefits"
            value={formData.benefits}
            onChange={handleInputChange}
            placeholder="Benefits offered by the Municipality"
            className="textarea textarea-text"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sky-1">Necessary Logistics</label>
          <textarea
            name="logistics"
            value={formData.logistics}
            onChange={handleInputChange}
            placeholder="Necessary Logistics"
            className="textarea textarea-text"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sky-1">Geographic location</label>
          <textarea
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Geographic location"
            className="textarea textarea-text"
          />
        </div>

        {/* Campos adicionais como liberdade econômica, setor, qualificação e licença ambiental */}
        <div className="col-span-1">
          <label className="block text-sky-1">Economic Freedom</label>
          <input
            type="text"
            name="economicFreedom"
            value={formData.economicFreedom}
            onChange={handleInputChange}
            placeholder="Economic Freedom"
            className="input input-text"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sky-1">Sector</label>
          <input
            type="text"
            name="sector"
            value={formData.sector}
            onChange={handleInputChange}
            placeholder="Sector"
            className="input input-text"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sky-1">Qualification</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleInputChange}
            placeholder="Qualification"
            className="input input-text"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sky-1">Environmental License</label>
          <input
            type="text"
            name="environmentalLicense"
            value={formData.environmentalLicense}
            onChange={handleInputChange}
            placeholder="Environmental License"
            className="input input-text"
          />
        </div>

        {/* Botão de submissão do formulário */}
        <div className="col-span-1 md:col-span-2">
          <button type="submit" className="w-full btn btn-submit">
            Register
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
