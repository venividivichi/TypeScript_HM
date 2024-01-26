
// Вам потрібно створити умовний тип, що служить для встановлення типу, що повертається з функції. 
// Як параметр типу повинен обов'язково виступати функціональний тип.

type ReturnFunctionType<T> = T extends () => infer returnType ? returnType : undefined;

function testFunction(): string {
  return 'bla';
}

type TestReturnType = ReturnFunctionType<typeof testFunction>;


// Вам потрібно створити умовний тип, який приймає функціональний тип з одним параметром (або задовільним) 
// та повертає кортеж, де перше значення - це тип, що функція повертає, а другий - тип її параметру

type ReturnFunctionInfo<T> = T extends (param: infer paramType) => infer returnType ? [returnType, paramType] : undefined;


  function testFunc(param: number): string {
    return 'bla'; 
  }
  
  type TestReturnTypee = ReturnFunctionInfo<typeof testFunc>;