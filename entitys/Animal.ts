import { IAnimal } from "../interfaces/Interfaces";

export class Animal implements IAnimal {
    public name: string;
    public age: number;
    public species: string;
    public healthStatus: string;
  
    constructor(species: string, name: string, age: number, healthStatus: string) {
      this.name = name;
      this.age = age;
      this.species = species;
      this.healthStatus = healthStatus;
    }
  }