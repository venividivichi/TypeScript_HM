class AirConditioner {
    private temperature: number;

    constructor() {
        this.temperature = 24;
    }

    increaseTemperature(): void {
        this.temperature++;
        console.log(`Температура збільшена до ${this.temperature}°C`);
    }

    decreaseTemperature(): void {
        this.temperature--;
        console.log(`Температура зменшена до ${this.temperature}°C`);
    }

    changeMode( mode: string ): void {
        if ( mode == 'cooling' )
            console.log(`Обрано режим охолодження`);
        if ( mode == 'heat' )
            console.log(`Обрано режим обігріву`);
        if ( mode == 'ventilation' )
            console.log(`Обрано режим вентляції`);
    }

    turnOn(): void {
        console.log('Кондиціонер увімкнений');
    }

    turnOff(): void {
        console.log('Кондиціонер вимкнений');
    }
}

class AirConditionerFacade {
    private airConditioner: AirConditioner;

    constructor(airConditioner: AirConditioner) {
        this.airConditioner = airConditioner;
    }

    changeMode( mode: string ): void {
        this.airConditioner.changeMode(mode);
    }

    coolDownRoom(): void {
        this.airConditioner.decreaseTemperature();
    }

    warmUpRoom(): void {
        this.airConditioner.increaseTemperature();
    }

    turnOn(): void {
        this.airConditioner.turnOn();
    }

    turnOff(): void {
        this.airConditioner.turnOff();
    }
}

let airConditioner = new AirConditioner();
let facadeAirConditioner = new AirConditionerFacade(airConditioner);

facadeAirConditioner.turnOn();
facadeAirConditioner.changeMode('cooling');
facadeAirConditioner.coolDownRoom();
facadeAirConditioner.warmUpRoom();
facadeAirConditioner.turnOff();