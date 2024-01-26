
//Напишіть узагальнену функцію filterArray(array, condition), яка фільтрує масив елементів на основі наданої умови.

function sortArray<T>(arr: T[], condition: (a: T, b: T) => number): T[] {
  return arr.slice().sort(condition);;
}

let array = [12, 5, 3, 1, 0];
let sortedArr = sortArray(array, (a, b) => a - b);
console.log(sortedArr);

//Створіть узагальнений клас Stack, який являє собою стек елементів з методами push, pop і peek.

class Stack<T> {
  
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

const stack = new Stack<number>();

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(5);

console.log(stack.peek());

console.log(stack.pop());

console.log(stack.peek()); 


//Створіть узагальнений клас Dictionary, який являє собою словник (асоціативний масив) 
//з методами set, get і has. Обмежте ключі тільки валідними типами для об'єкта

interface IPerson<T0, T1> {
  name: T0;
  age: T1;
}

class Dictionary<T extends object> {
  
 private data: { [key: string]: T } = {}

 set(key: string, value: T): void {
  this.data[key] = value;
 }

 get(key: string): T | undefined {
  return this.data[key];
 }

 has(key: string): boolean {
  return key in this.data;
 }

}

let personDictionary = new Dictionary<IPerson<string, number>>();
personDictionary.set('Nazar', { name: 'Nazar', age: 31 });

console.log(personDictionary.has('Nazar')); // true