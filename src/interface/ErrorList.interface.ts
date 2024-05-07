export interface IError {
    code: string,
    expected: string,
    received: string,
    path: string[],
    message: string
} 