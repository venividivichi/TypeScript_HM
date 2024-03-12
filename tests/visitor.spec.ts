import { Visitor } from '../entitys/Visitor'

describe('Visitor', () => {

    let visitor: Visitor;
    
    beforeEach( () => {
        visitor = new Visitor('Taras Dean', 'taras@example.com');
    })
    it('should create an instance of Visitor', () => {
        expect(visitor).toBeInstanceOf(Visitor);
    })
    it('should have correct properties', () => {
        expect(visitor.name).toBe('Taras Dean');
        expect(visitor.contactInfo).toBe('taras@example.com');
    })
});
