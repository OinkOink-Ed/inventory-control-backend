//Нейронка подсказала
// [Тут перебор ключей]: далее проверяется тип каждого ключа, после идет проверка на объект или примитив, если объект, то рекурсия
//Если объект Date, то обрабатывается как примитив
export type SelectFields<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Date
      ? true
      : SelectFields<T[K]>
    : true;
};
