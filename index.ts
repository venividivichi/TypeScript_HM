
enum CurrencyTypeEnum {
    USD = 'USD',
    EUR = 'EUR',
    UAH = 'UAH'
}

interface IObserver {
    update(observable: IObservable): void;
}

interface ICurrencyConversionStrategy {
    convert(amount: number, targetCurrency: CurrencyTypeEnum): number;
}
  
  
interface IObservable {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(): void;
}
  
  
interface BankClient {
    id: string;
    firstName: string;
    lastName: string;
}


abstract class Observable implements IObservable {
  private readonly observers: IObserver[] = [];


  public attach(observer: IObserver): void {
    let isExist = this.observers.includes(observer);


    if (isExist)
      return console.log('Observable: Observer has been attached already.');


    this.observers.push(observer);
    console.log('Observable:: Attached an observer.');
  }


  public detach(observer: IObserver): void {
    let observerIndex = this.observers.indexOf(observer);


    if (observerIndex === -1)
      return console.log('Observable: Nonexistent observer.');


    this.observers.splice(observerIndex, 1);
    console.log('Observable: Detached an observer.');
  }


  public notify(): void {
    console.log('Observable: Notifying observer...');
    for (let observer of this.observers) {
      observer.update(this);
    }
  }
}

class Bank {
  private static instance: Bank;
  private accounts: Map<string, Map<string, BankAccount>> = new Map();

  private constructor() {
      this.accounts = new Map();
  }

  public static getInstance(): Bank {
    if (!Bank.instance) {
      Bank.instance = new Bank();
    }
    return Bank.instance;
  }

  public createAccount(client: BankClient, currency: string, conversionStrategy: ICurrencyConversionStrategy): BankAccount {
      let clientAccounts = this.accounts.get(client.id);
      if (!clientAccounts) {
          clientAccounts = new Map();
          this.accounts.set(client.id, clientAccounts);
      }
      if (clientAccounts.has(currency)) {
          throw new Error(`Account with currency ${currency} already exists for this client.`);
      }
      let newAccount = new BankAccount(client, currency, conversionStrategy);
      clientAccounts.set(currency, newAccount);
      return newAccount;
  }
  public closeAccount(client: BankClient, currency: string): boolean {
      let clientAccounts = this.accounts.get(client.id);
      if (clientAccounts && clientAccounts.has(currency)) {
          clientAccounts.delete(currency);
          if (clientAccounts.size === 0) {
              this.accounts.delete(client.id);
          }
          return true;
      }
      return false;
  }
  public getClientAccounts(client: BankClient): Map<string, BankAccount> | undefined {
      return this.accounts.get(client.id);
  }
}

class BankAccount extends Observable {
  private readonly currency: string;
  private readonly number: number;
  private balance = 1000;
  private _holderName!: string;       
  private _conversionStrategy!: ICurrencyConversionStrategy;


  constructor(
    client: BankClient,
    currency: string,
    conversionStrategy: ICurrencyConversionStrategy
  ) {
    super();
    this.currency = currency;
    this.holderName = client;
    this.number = 12345678;
    this._conversionStrategy = conversionStrategy;
  }


  public get balanceInfo(): string {
    return `${this.currency}${this.balance}`;
  }


  public get holderName(): string {
    return this._holderName;
  }

  public get accountNumber(): number {
      return this.number;
    }

  public set holderName({ firstName, lastName }: BankClient) {
    if (!firstName.trim()) throw new Error(`Client first name can't be empty!`);
    if (!lastName.trim()) throw new Error(`Client last name can't be empty!`);


    this._holderName = `${lastName} ${firstName}`;
  }


  public set conversionStrategy(strategy: ICurrencyConversionStrategy) {
    this._conversionStrategy = strategy;
  }


  public deposit(amount: number): void {
    this.balance += amount;
  }


  public withdraw(amount: number): void {
    if (this.balance < amount)
      throw new Error(
        `Sorry ${this._holderName}, you don't have enough funds!`
      );


    this.balance -= amount;
  }


  public makeTransaction(
    amount: number,
    targetCurrency: CurrencyTypeEnum
  ): void {
    let convertAmount = this._conversionStrategy.convert(
      amount,
      targetCurrency
    );
    this.balance -= convertAmount;


    console.log(
      `Transaction: ${amount} ${this.currency} => ${targetCurrency}, Converted Amount: ${convertAmount} ${targetCurrency}, Balance: ${this.balance} ${this.currency}`
    );
    this.notify();
  }
}


class SMSNotification implements IObserver {
  update(account: BankAccount): void {
    console.log(
      `SMS notification: Your account balance has changed. Current balance ${account.balanceInfo}`
    );
  }
}


class EmailNotification implements IObserver {
  update(account: BankAccount): void {
    console.log(
      `Email notification: Your account balance has changed. Current balance ${account.balanceInfo}`
    );
  }
}


class PushNotification implements IObserver {
  update(account: BankAccount): void {
    console.log(
      `Push notification: Your account balance has changed. Current balance ${account.balanceInfo}`
    );
  }
}

let bank = Bank.getInstance();

let conversionStrategy: ICurrencyConversionStrategy = {
  convert: (amount: number, targetCurrency: CurrencyTypeEnum) => {
    return amount;
  },
};

let client: BankClient = {id: '1', firstName: 'Nazar', lastName: 'Nazar'};
let account = bank.createAccount(client, CurrencyTypeEnum.USD, conversionStrategy);
let account2 = bank.createAccount(client, CurrencyTypeEnum.UAH, conversionStrategy);

console.log(`Open account's for ${client.firstName} ${client.lastName}: `);
console.log(bank.getClientAccounts(client));


bank.closeAccount(client, CurrencyTypeEnum.UAH);

console.log('After closing:', bank.getClientAccounts(client));