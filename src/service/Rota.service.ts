import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RotaEsperada, RotaTracada } from './models';

@Injectable()
export class RotaService {
  constructor(private readonly httpService: HttpService) {}

  async getRotaEsperada(origem: string, destino: string): Promise<any> {
    const apiKey = 'SUA_API_KEY_DO_GOOGLE_MAPS';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&key=${apiKey}`;
    
    const response = await this.httpService.get(url).toPromise();
    return response.data;
  }
}
