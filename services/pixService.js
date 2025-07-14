// services/pixService.js
// Serviço básico para integração com Pix (placeholder)

module.exports = {
  enviarPix: async (chavePix, valor) => {
    console.log(`Enviando PIX para chave ${chavePix} valor R$${valor}`);
    // Simular retorno sucesso
    return {
      status: 'sucesso',
      idPagamento: `PIX-${Date.now()}`
    };
  }
};
