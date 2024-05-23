import { IError } from '../interface/ErrorList.interface';

export function errorMessage(errorList: IError[]): string {
  const messageReturn = [];

  errorList.forEach((element: IError) => {
    messageReturn.push(
      `Campo ${element.path[0]} ${element.message}`
        .replace('Expected', 'esperava')
        .replace('received', 'recebeu'),
    );
  });

  return messageReturn.join('. \n');
}
