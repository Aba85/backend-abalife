// services/geocodingService.js

const axios = require('axios');

const geocodeEndereco = async (endereco) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}&limit=1`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'AbaLifeApp/1.0'
      }
    });

    if (response.data.length === 0) {
      return null;
    }

    const resultado = response.data[0];
    return {
      latitude: parseFloat(resultado.lat),
      longitude: parseFloat(resultado.lon),
      display_name: resultado.display_name
    };
  } catch (erro) {
    console.error('Erro ao geocodificar endereço:', erro);
    return null;
  }
};

module.exports = {
  geocodeEndereco,
};
