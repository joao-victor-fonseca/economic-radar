"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeftIcon,
  Building,
  User,
  Users,
  MapPin,
  Briefcase,
  BarChart,
  Truck,
  Globe,
  ShieldCheck,
  Award,
} from "lucide-react";

interface CityData {
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

import Card from "@/components/Card";

const CityDetails = () => {
  const router = useRouter();
  const params = useParams();
  const cityParam = params?.city;
  const [cityData, setCityData] = useState<CityData | null>(null);

  useEffect(() => {
    if (cityParam) {
      const city = Array.isArray(cityParam) ? cityParam[0] : cityParam;
      const cities = JSON.parse(localStorage.getItem("cities") || "[]");
      console.log("Cidades Recuperadas:", cities);

      // Encontrar a cidade ignorando maiúsculas e minúsculas
      const selectedCity = cities.find(
        (cityItem: CityData) =>
          cityItem.city.toLowerCase() === decodeURIComponent(city).toLowerCase()
      );
      console.log("Cidade Selecionada:", selectedCity);
      if (selectedCity) {
        setCityData(selectedCity);
      } else {
        console.log(`Cidade ${city} não encontrada`);
      }
    } else {
      console.log("Parâmetro city não encontrado na URL");
    }
  }, [cityParam]);

  if (!cityData) {
    return (
      <section className="flex-1 flex flex-col items-center justify-center p-6 text-white">
        <h1 className="text-3xl mb-8 font-bold">Cidade não encontrada</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Voltar para o Dashboard
        </button>
      </section>
    );
  }

  return (
    <section className="flex-1 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-3xl mb-8 font-bold">{cityData.city}</h1>
      <div className="bg-dark-1 p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="PIB" value={cityData.pib} Icon={BarChart} />
          <Card title="UF" value={cityData.uf} Icon={MapPin} />
          <Card title="Prefeito" value={cityData.mayor} Icon={User} />
          <Card title="População" value={cityData.population} Icon={Users} />
          <Card title="IDH" value={cityData.idh} Icon={Globe} />
          <Card
            title="Benefícios"
            value={cityData.benefits}
            Icon={Briefcase}
            wide
          />
          <Card
            title="Logística"
            value={cityData.logistics}
            Icon={Truck}
            wide
          />
          <Card
            title="Localização"
            value={cityData.location}
            Icon={MapPin}
            wide
          />
          <Card
            title="Liberdade Econômica"
            value={cityData.economicFreedom}
            Icon={ShieldCheck}
          />
          <Card title="Setor" value={cityData.sector} Icon={Building} />
          <Card
            title="Qualificação"
            value={cityData.qualification}
            Icon={Award}
          />
          <Card
            title="Licença Ambiental"
            value={cityData.environmentalLicense}
            Icon={Award}
          />
          <Card
            title="Áreas"
            value={cityData.areas.join(", ")}
            Icon={Building}
            wide
          />
        </div>
        <div className="mt-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Voltar para o Dashboard
          </button>
        </div>
      </div>
    </section>
  );
};

export default CityDetails;
