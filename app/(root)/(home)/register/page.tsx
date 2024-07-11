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

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", formData);
      if (response.status === 201) {
        showAlert({ text: "City registered successfully 😃", type: "success" });
      }
    } catch (error) {
      showAlert({ text: "Error registering city 😞", type: "danger" });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

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
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl"
      >
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sky-1">City name</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter the name of the city"
            className="input input-text"
          />
        </div>
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
        <div className="col-span-1 md:col-span-2">
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
