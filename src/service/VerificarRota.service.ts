import { Injectable } from '@nestjs/common';
import { RotaEsperada, RotaTracada } from './models';

@Injectable()
export class VerificacaoRotaService {
  verificarRota(rotaEsperada: any, rotaTracada: RotaTracada): string {
    const pontosEsperados = rotaEsperada.routes[0].overview_path; // Pontos da rota esperada

    for (let i = 0; i < rotaTracada.coordenadas.length; i++) {
      const coordenadaAtual = rotaTracada.coordenadas[i];
      const pontoEsperado = pontosEsperados[i];

      if (!this.estaNoCaminho(coordenadaAtual, pontoEsperado)) {
        return 'FORA_DO_CAMINHO';
      }
    }
    return 'EM_PROGRESSO';
  }

  private estaNoCaminho(coordenadaAtual: { lat: number, lng: number }, pontoEsperado: { lat: number, lng: number }): boolean {
    const tolerancia = 0.001; 
    return Math.abs(coordenadaAtual.lat - pontoEsperado.lat) < tolerancia && Math.abs(coordenadaAtual.lng - pontoEsperado.lng) < tolerancia;
  }
}
