import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(userId: string): string {
    const payload = { userId };
    return this.jwtService.sign(payload);
  }

  async validateUser(userId: string): Promise<any> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  private async findUserById(userId: string): Promise<any> {
    // Aqui, você substituiria por sua lógica de banco de dados ou consulta a um serviço externo
    // Simulação de um usuário encontrado
    return { userId, username: 'ExemploUsuario' }; // Retorna um objeto de usuário simulado
  }
}
