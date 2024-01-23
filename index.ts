
//Вам потрібно створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.

type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

interface IAnimalEntity {
  name: string;
  age: number;
  bla: {
    bla1: string
  }
}

let json = '{"name": "animal", "age": 0}';

let animal: DeepReadonly<IAnimalEntity> = JSON.parse(json);

animal.age = 12 
animal.bla.bla1 = 'name'

//Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.

type DeepRequireReadonly<T> = {
  readonly [P in keyof T]-?: DeepRequireReadonly<T[P]>;
};

interface IAnimalEntity2 {
  name: string;
  age: number;
  region: {
    city: string
  }
}

let json2 = '{"name": "animal", "age": 0, "region": {"city": "kyiv"}}';

let animal2: DeepRequireReadonly<IAnimalEntity2> = JSON.parse(json2);

animal2.age = 12
animal2.region = {}  

// Вам потрібно сворити тип UpperCaseKeys, який буде приводити всі ключи до верхнього регістру.

type UpperCaseKeys<T> = {
  [P in keyof T as Uppercase<string & P>]: T[P];
};

interface Test {
  name: string;
  age: number;
}

const test: UpperCaseKeys<Test> = {
  NAME: "Nazar",
  age: 12
};



