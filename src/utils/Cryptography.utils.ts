import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

dotenv.config();

@Injectable()
export class Cryptography {
  private readonly saltRounds: number;
  constructor() {
    this.saltRounds = parseInt(process.env.SALT_ROUNDS);
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
