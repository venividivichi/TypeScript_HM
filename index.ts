
// Визначте інтерфейс, який використовує сигнатуру індексу з типами об'єднання. 
// Наприклад, тип значення для кожного ключа може бути число | рядок.

interface IMySignIndex {
  [key: string]: number | string;
}

const myObj: IMySignIndex = {
  name: 'Nazarii',
  age: 31,
  city: 'Kyiv',
};

// Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями. 
// Ключами можуть бути рядки, а значеннями — функції, які приймають будь-які аргументи.

interface IFunctionIndex {
  [key: string]: (...args: any[]) => string | number;
}

const functionObj: IFunctionIndex = {
  hi: (name: string) => `Hello, I'm ${name}!`,
  sum: (x: number, y: number) => x + y,
  mult: (x: number, y: number) => x * y,
};

// Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта, 
//подібного до масиву. Ключі повинні бути числами, а значення - певного типу.

interface IArrLikeObj {
  [index: number]: string; // або тип, який ви хочете використовувати
  length: number;
}

const arrLike: IArrLikeObj = {
  0: 'first',
  1: 'second',
  2: 'third',
  length: 3,
};

// Створіть інтерфейс з певними властивостями та індексною сигнатурою. Наприклад, ви можете мати 
// властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей.

interface ExampleInterface {
  age: number;
  [key: string]: string | number;
}

const exampleObject: ExampleInterface = {
  name: 'Nazarii',
  age: 31,
  city: 'Kyiv',
  count: 2
};

// Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості.

interface IIndexSignature {
  [key: string]: number | string | boolean;
}

interface IExtendedInterface extends IIndexSignature {
  specificProperty: number;
  anotherSpecificProperty: string;
  ['test']: number;
}

const Obj: IExtendedInterface = {
  specificProperty: 27,
  anotherSpecificProperty: 'Hello',
  additionalProperty: true,
  ['test']: 27
};

// Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє, 
// чи відповідають значення певних ключів певним критеріям (наприклад, чи всі значення є числами).

interface IIndexSignatureObj {
  [key: string]: number | string,
} 

function checkValues(obj: IIndexSignatureObj): void {
  
  for (let value of Object.values(obj)) {
    if (typeof value !== 'number') {
      return console.log('Не всі значення є числами.');
    }
  }
  return console.log('Всі значення є числами.');
}

const testObj: IIndexSignatureObj = {
  key1: 42,
  key2: 100,
  key3: 'not a number',
};

let result = checkValues(testObj);