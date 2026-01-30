// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { QueryFailedError } from 'typeorm';

//Расширяем типы из этого модуля
declare module 'typeorm' {
  //позволяет расширить существующий интерфейс в рамках модуля объявленного выше
  interface QueryFailedError {
    code?: string;
  }
}
