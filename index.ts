interface Calculator {
  add: (a: number, b: number) => number;
  sub_tr: (a: number, b: number) => number;
  multpl: (a: number, b: number) => number;
  div: (a: number, b: number) => number;
}

function calculate(calc: Calculator, operation: string, a: number, b: number): number {
  switch (operation) {
    case 'add':
      return calc.add(a, b);
    case 'sub_tr':
      return calc.sub_tr(a, b);
    case 'mult':
      return calc.multpl(a, b);
    case 'div':
      return calc.div(a, b);
    default:
      throw new Error('Incorrect operation');
  }
}

let сalcOperation: Calculator = {
  add: (a, b) => a + b,
  sub_tr: (a, b) => a - b,
  multpl: (a, b) => a * b,
  div: (a, b) => a / b
};

let result: number = calculate(сalcOperation, 'div', 8, 2);
console.log(result);  