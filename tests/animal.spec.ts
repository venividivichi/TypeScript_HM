import { Animal } from '../entitys/Animal'

describe('Animal', () => {

    let animal: Animal;

    beforeEach( () => {
        animal = new Animal('Lion', 'Leo', 5, 'Healthy');
    })

    it('should create an instance of Animal', () => {
        expect(animal).toBeInstanceOf(Animal);
    })
    it('should have correct properties', () => {
        expect(animal.name).toBe('Leo');
        expect(animal.age).toBe(5);
        expect(animal.species).toBe('Lion');
        expect(animal.healthStatus).toBe('Healthy');
    })
}) 