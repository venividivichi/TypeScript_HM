import { Employee } from '../entitys/Employee'

describe('Employee', () => {

    let employee: Employee;

    beforeEach( () => {
        employee = new Employee('Nazarii Kishman', 'Zookeeper', ['Feed animals', 'Clean enclosures'], 4000);
    })

    it('should create an instance of Employee', () => {
        expect(employee).toBeInstanceOf(Employee);
    })
    it('should have correct properties', () => {
        expect(employee.name).toBe('Nazarii Kishman');
        expect(employee.position).toBe('Zookeeper');
        expect(employee.duties).toStrictEqual(['Feed animals', 'Clean enclosures']);
        expect(employee.salary).toBe(4000);
    })
})  