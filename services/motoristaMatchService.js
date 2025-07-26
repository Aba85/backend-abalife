// services/motoristaMatchService.js

const { PrismaClient } = require('@prisma/client');
const { calculateDistanceKm } = require('../utils/calculateDistance');
const prisma = new PrismaClient();

async function encontrarMotoristasProximos(latEmbarque, lonEmbarque, raioMaxKm = 8) {
  // Busca todos os motoristas ativos com localização registrada
  const motoristas = await prisma.usuario.findMany({
    where: {
      tipo: 'motorista',
      ativo: true,
      latitudeAtual: { not: null },
      longitudeAtual: { not: null },
    },
    select: {
      id: true,
      nome: true,
      latitudeAtual: true,
      longitudeAtual: true,
    },
  });

  // Filtra os motoristas dentro do raio máximo
  const motoristasProximos = motoristas.filter((motorista) => {
    const distancia = calculateDistanceKm(
      latEmbarque,
      lonEmbarque,
      motorista.latitudeAtual,
      motorista.longitudeAtual
    );
    return distancia <= raioMaxKm;
  });

  return motoristasProximos;
}

module.exports = { encontrarMotoristasProximos };
