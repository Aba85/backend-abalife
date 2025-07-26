// controllers/corridaController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { geocodeEndereco } = require('../services/geocodingService');
const { calcularDistanciaEmKm } = require('../utils/calculateDistance');

exports.chamarCorrida = async (req, res) => {
  try {
    const {
      passageiroId,
      enderecoEmbarque,
      enderecoDestino,
      latitudeEmbarque,
      longitudeEmbarque,
      latitudeDestino,
      longitudeDestino,
      categoria,
      formaPagamento,
      valorOferta
    } = req.body;

    let localEmbarque = { latitude: latitudeEmbarque, longitude: longitudeEmbarque };
    let localDestino = { latitude: latitudeDestino, longitude: longitudeDestino };

    // Buscar coordenadas se o endereço foi digitado e não vieram coordenadas
    if ((!latitudeEmbarque || !longitudeEmbarque) && enderecoEmbarque) {
      const resultado = await geocodeEndereco(enderecoEmbarque);
      if (!resultado) return res.status(400).json({ erro: 'Endereço de embarque inválido' });
      localEmbarque = {
        latitude: resultado.latitude,
        longitude: resultado.longitude,
      };
    }

    if ((!latitudeDestino || !longitudeDestino) && enderecoDestino) {
      const resultado = await geocodeEndereco(enderecoDestino);
      if (!resultado) return res.status(400).json({ erro: 'Endereço de destino inválido' });
      localDestino = {
        latitude: resultado.latitude,
        longitude: resultado.longitude,
      };
    }

    // Calcular distância
    const distanciaKm = calcularDistanciaEmKm(
      localEmbarque.latitude,
      localEmbarque.longitude,
      localDestino.latitude,
      localDestino.longitude
    );

    const novaCorrida = await prisma.corrida.create({
      data: {
        passageiroId,
        categoria,
        formaPagamento,
        valorOferta,
        status: 'pendente',
        enderecoEmbarque,
        enderecoDestino,
        latitudeEmbarque: localEmbarque.latitude,
        longitudeEmbarque: localEmbarque.longitude,
        latitudeDestino: localDestino.latitude,
        longitudeDestino: localDestino.longitude,
        distanciaKm,
      },
    });

    return res.status(201).json(novaCorrida);
  } catch (erro) {
    console.error('Erro ao chamar corrida:', erro);
    return res.status(500).json({ erro: 'Erro interno ao chamar corrida' });
  }
};