import { AdvertisingDepartment } from '../departments/AdvertisingDepartment'
import { Employee } from '../entitys/Employee'
import { TicketType } from '../types/Types'

export interface IObserver {
    update(message: string): void;
}
  
export interface ISubject {
    registerObserver(observer: IObserver): void;
    removeObserver(observer: IObserver): void;
    notifyObservers(message: string): void;
}

export interface ITicket {
    price: number;
}

export interface IVisitor {
    name: string;
    contactInfo: string;
}

export interface IEmployee {
    name: string;
    position: string;
    duties: string[];
    salary: number;
}

export interface IAnimal {
    name: string;
    age: number;
    species: string;
    healthStatus: string;
}

export interface IAccounting {
    manageBudget(amount: number, isExpense: boolean): void;
    generateFinancialReport(): void;
    paySalaries(employees: IEmployee[], totalSalaries: number): void;
    purchaseFeed(feedCost: number): void;
    maintainZoo(maintenanceCost: number): void;
    calculateTotalSalaries(employees: IEmployee[]): number;
}

export interface IAdministration {
    addEmployee(newEmployee: IEmployee): void;
    removeEmployee(employeeName: string): void;
    addAnimal(animal: IAnimal): void;
    removeAnimal(animalName: string): void;
    setAdvertisingDepartment(advertisingDept: AdvertisingDepartment): void;
    notifyClientsAboutPromotion(promotionDetails: string, clients: string[]): void;
    getEmployees(): Employee[]
}

export interface IAdvertisingDepartment {
    sendPromotions(message: string, clients: string[]): void
}

export interface ICashier {
    sellTicket(visitorName: string, contactInfo: string, ticketType: TicketType): void;
    reportEarningsToAccounting(): void;
    sendClosingMessage(): void;
    sendZooScheduleMessage(): void;
    sendZooWorkHoursMessage(): void;
    getClients(): string[];
}