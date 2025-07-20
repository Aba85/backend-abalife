/*
  Warnings:

  - You are about to drop the column `telefone` on the `Usuarios` table. All the data in the column will be lost.
  - Added the required column `celular` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carteiras" ALTER COLUMN "createdAt" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Corridas" ALTER COLUMN "createdAt" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Recompensas" ALTER COLUMN "createdAt" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "telefone",
ADD COLUMN     "celular" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT now();
