import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class Email {
  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  sendEmailWithCode(
    to: string,
    subject: string,
    company: string,
    code: string,
  ): Promise<boolean> {
    const template: string = `
      <html>
        <body style="width:100%; height:100%; padding:0; margin:0; background-color:#F6F6F6; font-family: Arial, sans-serif;">
          <div style="background-color: #FFFFFF; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px;">
            <h1 style="font-size: 24px; color: #333333; text-align: center;">MAGI</h1>
            <h2 style="font-size: 20px; color: #333333; text-align: center;">Bem-vindo ao MAGI, ${company}!</h2>
            <p style="font-size: 14px; color: #333333; text-align: center;">Para prosseguir com seu acesso à nossa plataforma, precisamos que você clique no botão abaixo e defina sua senha.</p>
            <div style="text-align: center;">
              <img src="https://i.ibb.co/0hTp3qk/bloqueado.png" alt="Cadeado representando a senha" style="display: block; margin: 20px auto; width: 80px;"/>
            </div>
            <p style="font-size: 14px; color: #333333; text-align: center;">Para liberar a criação da senha, digite o código abaixo:</p>
            <div style="text-align: center; font-size: 20px; color: #333333; margin: 20px 0;">
              <div style="display: inline-block; padding: 10px; border: 1px solid #333333; border-radius: 8%; margin: 5px;"><strong>${code.charAt(1)}</strong></div>
              <div style="display: inline-block; padding: 10px; border: 1px solid #333333; border-radius: 8%; margin: 5px;"><strong>${code.charAt(0)}</strong></div>
              <div style="display: inline-block; padding: 10px; border: 1px solid #333333; border-radius: 8%; margin: 5px;"><strong>${code.charAt(2)}</strong></div>
              <div style="display: inline-block; padding: 10px; border: 1px solid #333333; border-radius: 8%; margin: 5px;"><strong>${code.charAt(3)}</strong></div>
              <div style="display: inline-block; padding: 10px; border: 1px solid #333333; border-radius: 8%; margin: 5px;"><strong>${code.charAt(4)}</strong></div>
              <div style="display: inline-block; padding: 10px; border: 1px solid #333333; border-radius: 8%; margin: 5px;"><strong>${code.charAt(5)}</strong></div>
            </div>
            <div style="text-align: center; margin: 20px 0;">
              <a href="#" style="text-decoration: none; color: #FFFFFF;">
                <button style="background-color: #3170d5; color: #FFFFFF; padding: 10px 20px; border: none; border-radius: 10px; font-size: 18px; font-weight: bold;">IR PARA A PÁGINA</button>
              </a>
            </div>
            <footer style="font-size: 14px; color: #c3c2c2; text-align: center; margin-top: 20px;">MAGI - Monitoramento de Ativos por Geolocalização Inteligente</footer>
          </div>
        </body>
      </html>
    `;

    return SendGrid.send({
      to: to,
      from: { email: 'monitoramentodeativos@gmail.com' },
      subject: subject,
      text: 'MAGI',
      html: template,
    })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
