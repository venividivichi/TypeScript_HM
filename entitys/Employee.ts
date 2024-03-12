import { IEmployee } from "../interfaces/Interfaces";

export class Employee implements IEmployee {
    public name: string;
    public position: string;
    public duties: string[];
    public salary: number;
  
    constructor(name: string, position: string, duties: string[], salary: number) {
      this.name = name;
      this.position = position;
      this.duties = duties;
      this.salary = salary;
    }
  }