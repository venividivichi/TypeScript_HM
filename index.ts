class School {
    directions: any[] = [];
  
    addDirection(direction: string) {
      this.directions.push(direction);
    }
  }
  
  class Direction {
    levels: any[] = [];
    private _name: string;
  
    get name(): string {
      return this._name;
    }
  
    constructor(name: string) {
      this._name = name;
    }
  
    addLevel(level: number) {
      this.levels.push(level);
    }
  }
  
  class Level {
    groups: any[] = [];
    private _name: string;
    private _program: string;
  
    constructor(name: string, program: string) {
      this._name = name;
      this._program = program;
    }
  
    get name(): string {
      return this._name;
    }
  
    get program(): string {
      return this._program;
    }
  
    addGroup(group: string) {
      this.groups.push(group);
    }
  }
  
  class Group {
    private _students: any[] = [];
    _directionName: string;
    _levelName: string;
  
    get students(): any[] {
      return this._students;
    }
  
    constructor(directionName:string, levelName: string) {
      this._directionName = directionName;
      this._levelName = levelName;
    }
  
    addStudent(student:string) {
      this.students.push(student);
    }
  
    showPerformance() {
      const sortedStudents = this.students.slice().sort(
        (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
      );
  
      return sortedStudents;
    }
  }
  
  class Student {
    grades: any = {};
    attendance: any[] = [];
    _firstName: string;
    _lastName: string;
    _birthYear: number;
  
    constructor(firstName: string, lastName: string, birthYear: number) {
      this._firstName = firstName;
      this._lastName = lastName;
      this._birthYear = birthYear;
    }
  
    get fullName(): string {
      return `${this._lastName} ${this._firstName}`;
    }
  
    set fullName(value: string) {
      [this._lastName, this._firstName] = value.split(" ");
    }
  
    get age(): number {
      return new Date().getFullYear() - this._birthYear;
    }
  
    setGrade(subject: string, grade: number) {
      this.grades[subject] = grade;
    }
  
    markAttendance(present: number) {
      this.attendance.push(present);
    }
  
    getPerformanceRating() {
      const gradeValues: any = Object.values(this.grades);
  
      if (gradeValues.length === 0) return 0;
  
      const averageGrade: number =
        gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;
  
      const attendancePercentage: number =
        (this.attendance.filter((present) => present).length / this.attendance.length) * 100;
  
      return (averageGrade + attendancePercentage) / 2;
    }
  }