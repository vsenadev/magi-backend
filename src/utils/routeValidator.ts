import { Injectable } from '@nestjs/common';
import { Client } from '@googlemaps/google-maps-services-js';
//pnpm install @googlemaps/google-maps-services-js


@Injectable()
export class RotaValidatorService {
  private googleMapsClient: Client;

  constructor() {
    this.googleMapsClient = new Client({});
  }

  async validarRota(rotaAtual: { lat: number, lng: number }[], rotaEsperada: { lat: number, lng: number }[]): Promise<boolean> {
    try {
      const distancia = await this.calcularDistanciaRota(rotaAtual, rotaEsperada);
      const limiteTolerancia = 1000;
      return distancia <= limiteTolerancia;
    } catch (error) {
      console.error('Erro ao validar a rota:', error);
      return false;
    }
  }

  async calcularDistanciaRota(rotaAtual: { lat: number, lng: number }[], rotaEsperada: { lat: number, lng: number }[]): Promise<number> {
    let distanciaTotal = 0;

    for (let i = 0; i < rotaAtual.length - 1; i++) {
      const pontoAtual = rotaAtual[i];
      const proximoPonto = rotaAtual[i + 1];
      distanciaTotal += await this.calcularDistanciaEntrePontos(pontoAtual, proximoPonto);
    }

    return distanciaTotal;
  }

  async calcularDistanciaEntrePontos(ponto1: { lat: number, lng: number }, ponto2: { lat: number, lng: number }): Promise<number> {
    try {
      const response = await this.googleMapsClient.distancematrix({
        params: {
          origins: [{ lat: ponto1.lat, lng: ponto1.lng }],
          destinations: [{ lat: ponto2.lat, lng: ponto2.lng }],
          key: 'API_DO_GOOGLE_MAPS',
        },
      });

      const distancia = response.data.rows[0].elements[0].distance.value;
      return distancia;
    } catch (error) {
      console.error('Erro ao calcular a distância entre pontos:', error);
      return 0;
    }
  }
}
