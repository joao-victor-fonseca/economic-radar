-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "pib" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "mayor" TEXT NOT NULL,
    "population" TEXT NOT NULL,
    "areas" TEXT[],
    "idh" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "logistics" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "economicFreedom" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "environmentalLicense" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);
