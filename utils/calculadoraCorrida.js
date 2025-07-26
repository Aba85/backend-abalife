// utils/calculadoraCorrida.js

const haversine = require('./haversine');

async function calcularValorCorrida({ lat_origem, lon_origem, lat_destino, lon_destino, categoria }) {
  const distancia = haversine(lat_origem, lon_origem, lat_destino, lon_destino); // km
  let valor = 0;

  if (categoria === 'alpha') {
    if (distancia <= 2) valor = 8;
    else if (distancia <= 3) valor = 10;
    else if (distancia <= 4) valor = 12;
    else if (distancia <= 5) valor = 14;
    else if (distancia <= 6) valor = 16;
    else if (distancia <= 7) valor = 18;
    else if (distancia <= 8) valor = 20;
    else if (distancia <= 9) valor = 22;
    else if (distancia <= 10) valor = 23;
    else {
      const excedente = distancia - 10;
      valor = 24 + (excedente * 2);
    }
  }

  return parseFloat(valor.toFixed(2));
}

module.exports = { calcularValorCorrida };
