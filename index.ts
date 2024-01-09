abstract class Shape {
  
  private readonly color: string;
  private readonly name: string;

  constructor(color: string, name: string) {
    this.color = color;
    this.name = name;
  }

  public display(): string {
    return `${this.name}, ${this.color}`;
  }

  abstract calculateArea(): string

}

class Circle extends Shape {
  
  private radius: number;

  constructor(color: string, radius: number) {
    super(color, 'Circle');
    this.radius = radius;
  }

  calculateArea(): string {
    return (Math.PI * this.radius ** 2).toFixed(2);
  }
}

class Rectangle extends Shape {
  
  private width: number;
  private height: number;

  constructor(color: string, width: number, height: number) {
    super(color, 'Rectangle');
    this.width = width;
    this.height = height;
  }

  calculateArea(): string {
    return (this.width * this.height).toFixed(2);
  }

  print(): void {
    console.log('Rectangle formula for calculating area: width * height');
  }
}

class Square extends Shape {

  private side: number;

  constructor(color: string, side: number) {
    super(color, 'Square');
    this.side = side;
  }

  calculateArea(): string {
    return (this.side * this.side).toFixed(2);
  }

  print(): void {
    console.log('Square formula for calculating area: side * side');
  }
}

class Triangle extends Shape {
  
  private base: number;
  private height: number;

  constructor(color: string, base: number, height: number) {
    super(color, 'Triangle');
    this.base = base;
    this.height = height;
  }

  calculateArea(): string {
    return (0.5 * this.base * this.height).toFixed(2);
  }
}

let circle: Shape = new Circle('Red', 5);
console.log(circle.display());
console.log('Area: ' + circle.calculateArea());
console.log('---------------------------');


let rectangle = new Rectangle('Blue', 4, 6);
console.log(rectangle.display());
console.log('Area: ' + rectangle.calculateArea());
rectangle.print();
console.log('---------------------------');

let square = new Square('Green', 4);
console.log(square.display());
console.log('Area: ' + square.calculateArea());
square.print();
console.log('---------------------------');

let triangle: Shape = new Triangle('Gray', 4, 6);
console.log(triangle.display());
console.log('Area :' + triangle.calculateArea());
console.log('---------------------------');
