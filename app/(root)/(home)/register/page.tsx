"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import useAlert from "@/hooks/useAlert"; // Certifique-se de que o caminho está correto
import Alert from "@/components/Alert";

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

const Register = () => {
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
  const { alert, showAlert, hideAlert } = useAlert();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      areas: checked
        ? [...prevData.areas, name]
        : prevData.areas.filter((area) => area !== name),
    }));
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Salvar a cidade no localStorage
    const cities = JSON.parse(localStorage.getItem("cities") || "[]");
    cities.push(formData);
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log("Cidades Salvas:", JSON.stringify(cities));

    // Mostrar alerta de sucesso
    showAlert({ text: "City registered successfully 😃", type: "success" });

    // Rolar para o topo da página imediatamente
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Limpar formulário após cadastro
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

    // Ocultar alerta após 3 segundos
    setTimeout(() => {
      hideAlert();
    }, 3000);
  };

  return (
    <section className="flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-3xl font-extrabold mb-6">City registration</h1>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <form
        onSubmit={handleRegister}
        className="grid grid-cols-2 gap-4 w-full max-w-4xl"
      >
        <div className="col-span-2">
          <label className="block text-gray-300">City name</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter the name of the city"
            className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-full focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300">PIB</label>
          <input
            type="text"
            name="pib"
            value={formData.pib}
            onChange={handleInputChange}
            placeholder="PIB"
            className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-full focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300">UF</label>
          <input
            type="text"
            name="uf"
            value={formData.uf}
            onChange={handleInputChange}
            placeholder="UF"
            className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-full focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300">Mayor</label>
          <input
            type="text"
            name="mayor"
            value={formData.mayor}
            onChange={handleInputChange}
            placeholder="Mayor"
            className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-full focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300">Population</label>
          <input
            type="text"
            name="population"
            value={formData.population}
            onChange={handleInputChange}
            placeholder="Population"
            className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-full focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-300">IDH</label>
          <input
            type="text"
            name="idh"
            value={formData.idh}
            onChange={handleInputChange}
            placeholder="IDH"
            className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-full focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-300">
            Benefits offered by the Municipality
          </label>
          <textarea
            name="benefits"
            value={formData.benefits}
            onChange={handleInputChange}
            placeholder="Benefits offered by the Municipality"
            className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-lg focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-300">Necessary Logistics</label>
          <textarea
            name="logistics"
            value={formData.logistics}
            onChange={handleInputChange}
            placeholder="Necessary Logistics"
            className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-lg focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-300">Geographic location</label>
          <textarea
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Geographic location"
            className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-lg focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300">Economic Freedom Act</label>
          <select
            name="economicFreedom"
            value={formData.economicFreedom}
            onChange={handleInputChange}
            className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-full focus:outline-none"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300">Area of ​​Activity</label>
          <input
            type="text"
            name="sector"
            value={formData.sector}
            onChange={handleInputChange}
            placeholder="Area of ​​Activity"
            className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-full focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300">Employee qualification</label>
          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleInputChange}
            className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-full focus:outline-none"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300">Environmental license</label>
          <select
            name="environmentalLicense"
            value={formData.environmentalLicense}
            onChange={handleInputChange}
            className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-full focus:outline-none"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full focus:outline-none"
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
