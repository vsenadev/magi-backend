import { Controller, Get, Query } from '@nestjs/common';
import { RotaService } from '../service/Rota.service';
import { VerificacaoRotaService } from '../service/verificarRota.service';
import { RotaTracada } from './models';

@Controller('rota')
export class RotaController {
  constructor(
    private readonly rotaService: RotaService,
    private readonly verificacaoRotaService: VerificacaoRotaService
  ) {}

  @Get('verificar')
  async verificarRota(
    @Query('origem') origem: string,
    @Query('destino') destino: string,
    @Query('coordenadas') coordenadas: string // Coordenadas passadas como string
  ): Promise<string> {
    const rotaEsperada = await this.rotaService.getRotaEsperada(origem, destino);
    
    const coordenadasArray = JSON.parse(coordenadas);
    const rotaTracada: RotaTracada = { coordenadas: coordenadasArray, status: 'EM_PROGRESSO' };

    const status = this.verificacaoRotaService.verificarRota(rotaEsperada, rotaTracada);
    return status;
  }
}
