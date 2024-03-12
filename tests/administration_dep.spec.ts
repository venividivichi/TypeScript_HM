import { Administration } from '../departments/Administration';
import { AdvertisingDepartment } from '../departments/AdvertisingDepartment';
import { Employee } from '../entitys/Employee';
import { Animal } from '../entitys/Animal';

describe('Administration', () => {
  let administration: Administration;
  let advertisingDept: AdvertisingDepartment;

  beforeEach(() => {
    advertisingDept = new AdvertisingDepartment();
    administration = new Administration(advertisingDept);
  });

  it('should add employee correctly', () => {
    let employee = new Employee('Bruno Mars', 'Zookeeper', ['Oversee zoo operations'], 3000);
    administration.addEmployee(employee);
    expect(administration.getEmployees()).toContain(employee);
  });

  it('should remove employee correctly', () => {
    let employee = new Employee('Bruno Mars', 'Zookeeper', ['Oversee zoo operations'], 3000);
    administration.addEmployee(employee);
    administration.removeEmployee(employee.name);
    expect(administration.getEmployees()).not.toContain(employee);
  });

  it('should add animal correctly', () => {
    let animal = new Animal('Lion', 'Leo', 5, 'Healthy');
    administration.addAnimal(animal);
    expect(administration.getAnimals()).toContain(animal);
  });

  it('should remove animal correctly', () => {
    let animal = new Animal('Lion', 'Leo', 5, 'Healthy');
    administration.addAnimal(animal);
    administration.removeAnimal(animal.name);
    expect(administration.getAnimals()).not.toContain(animal);
  });

  it('getEmployees returns all added employees', () => {
    let employee1 = new Employee('Nazarii Kishman', 'Zookeeper', ['Feed animals', 'Clean enclosures'], 4000);
    let employee2 = new Employee('Bruno Mars', 'Zookeeper', ['Oversee zoo operations'], 3000);
    administration.addEmployee(employee1);
    administration.addEmployee(employee2);

    let employees = administration.getEmployees();
    expect(employees).toContain(employee1);
    expect(employees).toContain(employee2);
    expect(employees.length).toBe(2);
  });

  it('getAnimals returns all added animals', () => {
    let animal1 = new Animal('Lion', 'Leo', 5, 'Healthy');
    let animal2 = new Animal('Lion', 'Cristiano', 8, 'Healthy');
    administration.addAnimal(animal1);
    administration.addAnimal(animal2);

    let animals = administration.getAnimals();
    expect(animals).toContain(animal1);
    expect(animals).toContain(animal2);
    expect(animals.length).toBe(2);
  });

});