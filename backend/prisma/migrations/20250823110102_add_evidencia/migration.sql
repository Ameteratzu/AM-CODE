-- CreateEnum
CREATE TYPE "public"."EvidenciaTipo" AS ENUM ('SCREENSHOT', 'RECORDING');

-- CreateTable
CREATE TABLE "public"."evidencias" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "bytes" INTEGER,
    "kind" "public"."EvidenciaTipo" NOT NULL,
    "marcacionId" INTEGER,
    "note" TEXT,
    "ip" VARCHAR(64),
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evidencias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "evidencias_usuarioId_createdAt_idx" ON "public"."evidencias"("usuarioId", "createdAt");

-- AddForeignKey
ALTER TABLE "public"."evidencias" ADD CONSTRAINT "evidencias_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."evidencias" ADD CONSTRAINT "evidencias_marcacionId_fkey" FOREIGN KEY ("marcacionId") REFERENCES "public"."marcaciones"("id") ON DELETE SET NULL ON UPDATE CASCADE;
