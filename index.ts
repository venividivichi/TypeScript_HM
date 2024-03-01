
//Створіть інтерфейс з декількома властивостями. Відтворіть ту саму структуру завдяки Type alias.

interface User {
    id: number;
    firstName: string;
    email?: string;
}

type UserType = {
    id: number;
    firstName: string;
    email?: string;
};

//Створіть інтерфейс з анотацією будь-якого функціонального виразу. Відтворіть ту саму структуру завдяки Type alias.

interface toStringFunction {
    (input: any): string;
}

type toStringFunctionType = (input: any) => string;

//Продемонструйте у коді цей вираз: створіть псевдонім типу для примітивного значення, обʼєднання та кортежу.

type UserID = number;

type StrOrNumb = string | number;

type UserTuple = [number, string];

//Продемонструйте цей вираз у вашому коді: 
  // 1. Один інтерфейс розширює інший;

  interface Client {
    firstName: string;
  }
  
  interface ITest extends Client {
    userId: number;
  }

  class LastUser implements ITest {
    firstName: string;
    userId: number;
  }

  //2. Один інтерфейс розширює псевдонім типу

  type Contact = {
    email: string;
  }
  
  interface ITest2 extends Contact {
    customerId: number;
  }

  class LastUser1 implements ITest2 {
    email: string;
    customerId: number;
  }

  //3. Один псевдонім типу розширює інтерфейс
  
  interface Product {
    productId: number;
  }
  
  type DetailedProduct = Product & {
    description: string;
  }

  class LastUser2 implements DetailedProduct {
    productId: number;
    description: string;
  }

  //4. Один псевдонім типу розширює інший

  type BasicAddress = {
    street: string;
    city: string;
  }
  
  type FullAddress = BasicAddress & {
    country: string;
    postalCode: string;
  }

  class LastUser3 implements FullAddress {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  }

//Створіть класи, котрі будуть реалізовувати в одному випадку інтерфейси, а в іншому псевдонім типу. 
//Наприкінці, спробуйте вимусити клас реалізувати  псевдонім типу, який іменує тип об’єднання.

//Реалізація інтерфейсу класом

interface ITest3 {
    id: number;
    name: string;
  }
  
  class Urok implements ITest3 {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
  }

//Реалізація псевдоніма типу класом

type TMilk = {
    productId: number;
    dateProduction: Date;
}
  
class Product2 implements TMilk {
    productId: number;
    dateProduction: Date;

    constructor(productId: number) {
        this.productId = productId;
        this.dateProduction = new Date;
    }
}

//Реалізація псевдоніма типу об’єднання класом

interface IManager {
    level: string;
  }
  
type EmployeeType = ITest3 | IManager;
  
class Manager implements IManager {
    id: number;
    name: string;
    level: string;

    constructor(id: number, name: string, level: string) {
        this.id = id;
        this.name = name;
        this.level = level;
    }
}

//На відміну від псевдоніма типу, інтерфейс можна визначати кілька разів і розглядатиметься як єдиний інтерфейс (з об’єднаними членами всіх декларацій). 
//Продемонструйте цю властивість інтерфейсів у своєму рішенні.

interface IPerson {
    id: number;
    firstName: string;
}

interface IPerson {
    lastName: string;
    age: number;
}

interface IPerson {
   email: string;
   height: number;
}

class Person implements IPerson {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    height: number;

    constructor(id: number, firstName: string, lastName: string, age: number, email: string, height: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.height = height;
    }
}