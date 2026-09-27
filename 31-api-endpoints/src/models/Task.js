export class Task {
  constructor(name, completed) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.completed = completed;
  }
}
 