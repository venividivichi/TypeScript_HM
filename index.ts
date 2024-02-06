

//Вам потрібно написати функцію, яка повертатиме об'єкт, де буде властивість result і це буде паліндром, 
//і властивість steps — це число викликів до знаходження паліндрома. Для того, щоб перевірити себе 
//використовуйте число 196. Це так зване Lychrel number — число яке немає поліндрому.

function isPalindrome(num: number): boolean {
  let strNum = num.toString();
  return strNum === strNum.split('').reverse().join('');
}

function generatePalindrome(num: number): { result: number | null; steps: number } {
  
  let steps = 0;
  let currentNumber = num;
  let maxSteps = 1000;
  while (!isPalindrome(currentNumber)) {
      let reversedNumber = parseInt(currentNumber.toString().split('').reverse().join(''), 10);
      currentNumber += reversedNumber;
      steps++;
      if (steps >= maxSteps) {
          return { result: null, steps };
      }
  }
  return { result: currentNumber, steps };
}

let result = generatePalindrome(96);
console.log(result);


//Напишіть функцію, яка приймає масив унікальних елементів і генерує всі можливі перестановки цього масиву.
//Використовуйте рекурсію для знаходження всіх перестановок. Наприклад, якщо вхідний масив [1, 2, 3], 
//функція має повернути масив, що містить [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [2, 3, 1], [3, 1, 2] і [3, 2, 1].

function genCombination(arr: number[]): number[][] {
  
  let result: number[][] = [];

  function combine(start: number): void {
      
    if (start === arr.length - 1) {
        result.push([...arr]);
        return;
    }

    for (let i = start; i < arr.length; i++) {
        [arr[start], arr[i]] = [arr[i], arr[start]];
        combine(start + 1);
        [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }

  combine(0);
  return result;
}

let testArray = [1, 2, 3];
console.log(genCombination(testArray));
