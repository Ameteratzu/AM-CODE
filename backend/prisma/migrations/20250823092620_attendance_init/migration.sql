/*
  Warnings:

  - You are about to drop the `Automovil` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orden` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrdenProducto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Producto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Rol" AS ENUM ('ADMIN', 'MANAGER', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "public"."PunchType" AS ENUM ('CLOCK_IN', 'CLOCK_OUT', 'BREAK_START', 'BREAK_END', 'LUNCH_START', 'LUNCH_END', 'TOILET_START', 'TOILET_END');

-- DropForeignKey
ALTER TABLE "public"."Automovil" DROP CONSTRAINT "Automovil_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Orden" DROP CONSTRAINT "Orden_automovilId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Orden" DROP CONSTRAINT "Orden_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Orden" DROP CONSTRAINT "Orden_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrdenProducto" DROP CONSTRAINT "OrdenProducto_ordenId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrdenProducto" DROP CONSTRAINT "OrdenProducto_productoId_fkey";

-- DropTable
DROP TABLE "public"."Automovil";

-- DropTable
DROP TABLE "public"."Cliente";

-- DropTable
DROP TABLE "public"."Orden";

-- DropTable
DROP TABLE "public"."OrdenProducto";

-- DropTable
DROP TABLE "public"."Producto";

-- DropTable
DROP TABLE "public"."Usuario";

-- DropEnum
DROP TYPE "public"."EstadoOrden";

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" "public"."Rol" NOT NULL DEFAULT 'EMPLOYEE',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "tz" TEXT NOT NULL DEFAULT 'America/Lima',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."marcaciones" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "tipo" "public"."PunchType" NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" VARCHAR(64),
    "userAgent" TEXT,
    "note" TEXT,
    "lat" DECIMAL(9,6),
    "lng" DECIMAL(9,6),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "marcaciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- CreateIndex
CREATE INDEX "marcaciones_usuarioId_at_idx" ON "public"."marcaciones"("usuarioId", "at");

-- AddForeignKey
ALTER TABLE "public"."marcaciones" ADD CONSTRAINT "marcaciones_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
