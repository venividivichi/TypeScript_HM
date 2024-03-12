import { AdvertisingDepartment } from "./AdvertisingDepartment";
import { Animal } from "../entitys/Animal";
import { Employee } from "../entitys/Employee";
import { IAdministration } from "../interfaces/Interfaces";

export class Administration implements IAdministration {
 
    private employees: Employee[] = [];
    private animals: Animal[] = [];
    private advertisingDept: AdvertisingDepartment;
  
    constructor(advertisingDept: AdvertisingDepartment) {
      this.advertisingDept = advertisingDept;
    }
  
    addEmployee(newEmployee: Employee): void {
      this.employees.push(newEmployee);
      console.log(`Added employee: ${newEmployee.name} with salary: $${newEmployee.salary}`);
    }
  
    removeEmployee(employeeName: string): void {
      let index = this.employees.findIndex(emp => emp.name === employeeName);
      if (index !== -1) {
          this.employees.splice(index, 1);
          console.log(`Employee removed: ${employeeName}`);
      } else {
          console.log(`Employee not found: ${employeeName}`);
      }
    }
  
    addAnimal(animal: Animal): void {
      this.animals.push(animal);
      console.log(`Animal added: ${animal.species} named ${animal.name}`);
    }
  
    removeAnimal(animalName: string): void {
      let index = this.animals.findIndex(animal => animal.name === animalName);
      if (index !== -1) {
          this.animals.splice(index, 1);
          console.log(`Animal removed: ${animalName}`);
      } else {
          console.log(`Animal not found: ${animalName}`);
      }
    }
  
    setAdvertisingDepartment(advertisingDept: AdvertisingDepartment): void {
      this.advertisingDept = advertisingDept;
    }
  
    notifyClientsAboutPromotion(promotionDetails: string, clients: string[]): void {
      this.advertisingDept.sendPromotions(promotionDetails, clients);
    }
  
    getEmployees(): Employee[] {
      return this.employees;
    }

    getAnimals(): Animal[] {
      return this.animals;
    }
}