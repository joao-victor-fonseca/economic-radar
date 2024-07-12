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

const CityDetails = () => {
  const router = useRouter();
  const params = useParams();
  const cityParam = params?.city as string;
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cityParam) {
      const fetchCityData = async () => {
        try {
          const response = await axios.get(
            `/api/cities/${encodeURIComponent(cityParam)}`
          );
          if (response.data) {
            setCityData(response.data);
          } else {
            console.log(`City ${decodeURIComponent(cityParam)} not found`);
            setError(`City ${decodeURIComponent(cityParam)} not found`);
          }
        } catch (error) {
          console.error("Error fetching city data:", error);
          setError("Error fetching city data");
        } finally {
          setLoading(false);
        }
      };

      fetchCityData();
    } else {
      console.log("City parameter not found in URL");
      setError("City parameter not found in URL");
      setLoading(false);
    }
  }, [cityParam]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Image
          src="/icons/loading-circle.svg"
          alt="Loading..."
          width={80}
          height={80}
        />
      </div>
    );
  }

  if (error) {
    return (
      <section className="flex-1 flex flex-col items-center justify-center p-6 text-white">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl mb-8 font-bold">{error}</h1>
        <Link
          href="/dashboard"
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Return to Dashboard
        </Link>
      </section>
    );
  }

  if (!cityData) {
    return (
      <section className="flex-1 flex flex-col items-center justify-center p-6 text-white">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl mb-8 font-bold">City not found</h1>
        <Link
          href="/dashboard"
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Return to Dashboard
        </Link>
      </section>
    );
  }

  return (
    <section className="flex-1 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-3xl mb-8 font-bold">{cityData.city}</h1>
      <div className="bg-dark-1 p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sky-2">
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
            href="/dashboard"
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
