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
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import Card from "@/components/Card";
import Link from "next/link";
import Image from "next/image";

// Definição da interface para os dados da cidade
interface CityData {
  id: number;
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

// Componente principal que exibe os detalhes da cidade
const CityDetails = () => {
  const router = useRouter(); // Inicializa o roteador
  const params = useParams(); // Obtém os parâmetros da URL
  const cityParam = params?.city as string; // Extrai o parâmetro da cidade da URL
  const [cityData, setCityData] = useState<CityData | null>(null); // Estado para armazenar os dados da cidade
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar o carregamento
  const [error, setError] = useState<string | null>(null); // Estado para armazenar erros

  // Efeito colateral para buscar os dados da cidade quando o parâmetro da cidade é alterado
  useEffect(() => {
    if (cityParam) {
      // Verifica se o parâmetro da cidade existe
      const fetchCityData = async () => {
        // Função assíncrona para buscar os dados da cidade
        try {
          // Fazendo a requisição para a API para obter os dados da cidade
          const response = await axios.get(
            `/api/cities/${encodeURIComponent(cityParam)}` // Codifica o parâmetro da cidade para a URL
          );
          if (response.data) {
            // Verifica se há dados na resposta
            setCityData(response.data); // Armazena os dados da cidade no estado
          } else {
            console.log(`City ${decodeURIComponent(cityParam)} not found`); // Log caso a cidade não seja encontrada
            setError(`City ${decodeURIComponent(cityParam)} not found`); // Atualiza o estado de erro
          }
        } catch (error) {
          console.error("Error fetching city data:", error); // Log de erro ao buscar os dados
          setError("Error fetching city data"); // Atualiza o estado de erro
        } finally {
          setLoading(false); // Finaliza o carregamento
        }
      };

      fetchCityData(); // Chama a função para buscar os dados
    } else {
      console.log("City parameter not found in URL"); // Log caso o parâmetro da cidade não exista
      setError("City parameter not found in URL"); // Atualiza o estado de erro
      setLoading(false); // Finaliza o carregamento
    }
  }, [cityParam]); // Dependência do efeito, executa quando cityParam muda

  // Renderiza um carregador enquanto os dados estão sendo buscados
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Image
          src="/icons/loading-circle.svg" // Ícone de carregamento
          alt="Loading..."
          width={80}
          height={80}
        />
      </div>
    );
  }

  // Renderiza uma mensagem de erro caso ocorra algum erro ao buscar os dados
  if (error) {
    return (
      <section className="flex-1 flex flex-col items-center justify-center p-6 text-white">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl mb-8 font-bold">{error}</h1>
        <Link
          href="/dashboard" // Link para retornar ao dashboard
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Return to Dashboard
        </Link>
      </section>
    );
  }

  // Renderiza uma mensagem caso os dados da cidade não sejam encontrados
  if (!cityData) {
    return (
      <section className="flex-1 flex flex-col items-center justify-center p-6 text-white">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl mb-8 font-bold">City not found</h1>
        <Link
          href="/dashboard" // Link para retornar ao dashboard
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Return to Dashboard
        </Link>
      </section>
    );
  }

  // Renderiza os detalhes da cidade caso sejam encontrados
  return (
    <section className="flex-1 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-3xl mb-8 font-bold">{cityData.city}</h1>
      <div className="bg-dark-1 p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sky-2">
          {/* Renderiza os cartões com informações da cidade */}
          <Card title="PIB" value={cityData.pib} Icon={BarChart} />
          <Card title="UF" value={cityData.uf} Icon={MapPin} />
          <Card title="Mayor" value={cityData.mayor} Icon={User} />
          <Card title="Population" value={cityData.population} Icon={Users} />
          <Card title="IDH" value={cityData.idh} Icon={Globe} />
          <Card title="Benefits" value={cityData.benefits} Icon={Briefcase} />
          <Card title="Logistics" value={cityData.logistics} Icon={Truck} />
          <Card title="Location" value={cityData.location} Icon={MapPin} />
          <Card
            title="Economic freedom"
            value={cityData.economicFreedom}
            Icon={ShieldCheck}
          />
          <Card
            title="Area of ​​Activity"
            value={cityData.sector}
            Icon={Building}
          />
          <Card
            title="Qualification"
            value={cityData.qualification}
            Icon={Award}
          />
          <Card
            title="Environmental license"
            value={cityData.environmentalLicense}
            Icon={Award}
          />
        </div>
        <div className="mt-8">
          <Link
            href="/dashboard" // Link para retornar ao dashboard
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CityDetails;
