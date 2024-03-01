
interface ICompany {
  name: string;
  departments: Department[];
  preHiredEmployees: IPreHiredEmployee[];

  hirePreHiredEmployee(preHiredEmployee: IPreHiredEmployee, department: Department): IEmployee;
}

interface IDepatament {
  name: string;
  domain: string;
  employees: IEmployee[];
  budgetDebit: number;
  budgetCredit: number;

  calculateBalance(): number;
  addEmployee(): void;
  updateBudget(): void;
  convertToEmployee(): IEmployee;
  removeEmployee(): void;
  isEmployee(): IEmployee;
}

interface IPreHiredEmployee {
  firstName: string;
  lastName: string;
  salary: number;
  bankAccountNumber: string;
}

interface IEmployee {
  firstName: string;
  lastName: string;
  paymentInfo: string;
  salary: number;
  status: 'active' | 'inactive' | 'unpaid leave';
  department: Department;
}

interface IAccounting {
  balance: number;

  takeOnBalance(): void;
  removeFromBalance(): void;
  paySalaries(): void;
}

class Company implements ICompany {
  public name: string;
  public departments: Department[] = []; 
  public preHiredEmployees: IPreHiredEmployee[] = [];

  constructor(name: string) {
    this.name = name;
  }

  hirePreHiredEmployee(preHiredEmployee: IPreHiredEmployee, department: Department): IEmployee {
    let employee: IEmployee = department.convertToEmployee(preHiredEmployee);
    return employee;
  }
}

class Department {
  public name: string;
  public domain: string;
  public employees: IEmployee[] = [];
  public budgetDebit: number = 0;
  public budgetCredit: number = 0;

  constructor(name: string, domain: string) {
    this.name = name;
    this.domain = domain;
  }

  calculateBalance(): number {
    return this.budgetDebit - this.budgetCredit;
  }

  addEmployee(employee: IEmployee): void {
    this.employees.push(employee);
    this.updateBudget(employee.salary);
  }

  updateBudget(amount: number): void {
    this.budgetDebit += amount;
  }

  convertToEmployee(preHiredEmployee: IPreHiredEmployee): IEmployee {
    let employee: IEmployee = {
      firstName: preHiredEmployee.firstName,
      lastName: preHiredEmployee.lastName,
      paymentInfo: preHiredEmployee.bankAccountNumber,
      salary: preHiredEmployee.salary,
      status: 'active',
      department: this,
    };
    this.addEmployee(employee);
    return employee;
  }

  removeEmployee(employee: IEmployee): void {
    let index = this.employees.indexOf(employee);
    if (index !== -1) {
      this.employees.splice(index, 1);
      this.updateBudget(-employee.salary);
    }
  }

  isEmployee(entity: any): entity is IEmployee {
    return 'paymentInfo' in entity && 'salary' in entity && 'status' in entity;
  }
}

class Accounting extends Department {
  
  public balance: number = 0;

  constructor() {
    super('Accounting', 'Finance');
  }

  takeOnBalance(entity: IEmployee | Department): void {
    if (this.isEmployee(entity)) {
      if (entity.status === 'active') {
        this.balance += entity.salary;
      }
    } else if (entity instanceof Department) {
      this.balance += entity.calculateBalance();
    }
  }

  removeFromBalance(amount: number): void {
    this.balance -= amount;
  }

  paySalaries(employees: IEmployee[]): void {
    employees.forEach((employee) => {
      if (employee.status === 'active') {
        this.removeFromBalance(employee.salary);
      }
    });
  }
}

let company = new Company('Bruno Corp');
let accounting = new Accounting();

let hrDepartment = new Department('HR', 'Human Resources');
let itDepartment = new Department('IT', 'Information Technology');

company.departments.push(hrDepartment, itDepartment, accounting);

let preHiredEmployee1: IPreHiredEmployee = { firstName: 'Nazar', lastName: 'Nazar', salary: 2000, bankAccountNumber: '123456789' };
let preHiredEmployee2: IPreHiredEmployee = { firstName: 'Ivan', lastName: 'Ivan', salary: 3500, bankAccountNumber: '123456788' };
let preHiredEmployee3: IPreHiredEmployee = { firstName: 'Taras', lastName: 'Taras', salary: 4500, bankAccountNumber: '123456779' };

company.hirePreHiredEmployee(preHiredEmployee1, hrDepartment);
company.hirePreHiredEmployee(preHiredEmployee2, itDepartment);
company.hirePreHiredEmployee(preHiredEmployee3, itDepartment);

console.log(`Greetings from "${company.name}"`);

console.log(`Balance for ${hrDepartment.name} department: `, hrDepartment.calculateBalance()); 
console.log(`Balance for ${hrDepartment.name} department: `, itDepartment.calculateBalance());

accounting.takeOnBalance(hrDepartment);
accounting.takeOnBalance(itDepartment);

console.log('Take on balance summary: ', accounting.balance);

let allEmployees = [...hrDepartment.employees, ...itDepartment.employees];
accounting.paySalaries(allEmployees);
console.log('Pay salaries done!');

console.log('Balance: ', accounting.balance);