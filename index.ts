class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: Array<Area> = [];
  _lecturers: Array<Lecturer> = []; // Name, surname, position, company, experience, courses, contacts

  get areas() {
    return this._areas;
  }

  get lecturers() {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  addLecture(lecture: Lecturer): void {
    this._lecturers.push(lecture);
  }

  removeArea(area: Area): void {
    const index = this._areas.findIndex((existArea) => existArea === area);
    if (index !== -1) {
      this._areas.splice(index, 1);
    }
  }

  removeLecture(surname: string): void {
    const index = this._lecturers.findIndex((lecturer) => lecturer.surname === surname);
    if (index !== -1) {
      this._lecturers.splice(index, 1);
    }
  }
}

class Lecturer {
  constructor(
    public name: string,
    public surname: string,
    public position: string,
    public company: string,
    public experience: number,
    public courses: Array<string>,
    public contacts: string
  ) {}
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Array<Level> = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get levels(): Array<Level> {
    return this._levels;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(level: Level): void {
    const index = this._levels.findIndex((existLevel) => existLevel === level);
    if (index !== -1) {
      this._levels.splice(index, 1);
    }
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: Array<Group> = [];
  _name: string;  
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get groups(): Array<Group> {
    return this._groups;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(group: Group): void {
    const index = this._groups.findIndex((existGroup) => existGroup === group);
    if (index !== -1) {
      this._groups.splice(index, 1);
    }
  }
}

const enum GroupStatus {
  Active = 'active',
  Inactive = 'inactive',
}

class Group {

  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: string;
  _status: GroupStatus;
  _students: Array<Student> = []; // Modify the array so that it has a valid toSorted method*
  _directionName: string;
  _levelName: string;

  constructor(area: string, directionName: string, levelName: string, status: GroupStatus) {
    this._area = area;
    this._directionName = directionName;
    this._levelName = levelName;
    this._status = status;
  }

  get area(): string {
    return this._area;
  }

  get directionName(): string {
    return this._directionName;
  }

  get levelName(): string {
    return this._levelName;
  }
  
  get students(): Student[] {
    return this._students;
  }

  get status(): GroupStatus {
    return this._status;
  }

  setStatus(status: GroupStatus): void {
    this._status = status;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(student: Student): void {
    const index = this._students.findIndex((existStudent) => existStudent === student);
    if (index !== -1) {
      this._students.splice(index, 1);
    }
  }

  showPerformance() {
    const sortedStudents = this._students.slice().sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    return sortedStudents;
  }

}

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: {workName: string; mark: number}[] = []; // workName: mark
  _visits: {lessonName: string; present: boolean}[] = [] // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrade(workName: string ,mark: number): void {
    this._grades.push({workName, mark});
  }

  setVisit(lessonName: string, present: boolean): void {
    this._visits.push({lessonName, present});
  }

  getPerformanceRating() {
    const gradeValues = this._grades.map((grade) => grade.mark);

    if (!gradeValues.length) return 0;

    const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage = (this._visits.filter(present => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
