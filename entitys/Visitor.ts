import { IVisitor } from "../interfaces/Interfaces";

export class Visitor implements IVisitor{
    public name: string;
    public contactInfo: string;
  
    constructor(name: string, contactInfo: string) {
      this.name = name;
      this.contactInfo = contactInfo;
    }
  }