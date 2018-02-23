export class Example {

    public name: string;
    public city: string;
    public lastName: string;
    public age: number;
  
    examples?: Example[];
  
    constructor(name: string, city: string, lastName:  string, age: number) {}
  
    getExample(): Example[] {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
          this.examples.push(new Example(this.name="Mike", this.city="Ibiúna", this.lastName="Lima", this.age=29 + index));
      });
      return this.examples;
    }
  }