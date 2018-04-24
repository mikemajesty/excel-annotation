import "reflect-metadata";
import { log } from "util";

let ojb = [];
const ColumnName = (columnName: string) => {
  return (target: Object, key: string | symbol) => {
    let value = target[key];
    const getter = () => value;
    const setter = (val) => {
      if (!columnName) {
        throw new Error(`Column name is required`);
      }
      value = val;
    }
    Reflect.deleteProperty[key];
    Reflect.defineMetadata(key, value, this);

    Reflect.defineProperty(target, key, {
      get: getter,
      set: setter
    });

    ojb.push({ columnName, key });
  }
}

export class Example {

  @ColumnName('Nome')
  name: string;
  @ColumnName('Cidade')
  city: string;
  @ColumnName('Sobrenome')
  lastName: string;
  @ColumnName('Idade')
  age: number;

  examples?: Example[];

  constructor() {
    this.examples = new Array<Example>();
  }

  async getExample(): Promise<Example[]> {
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
      const e = new Example();
      e.name = "Mike", e.city = "Ibiúna" + index, e.lastName = "Lima", e.age = 29 + index;
      this.examples.push(e);
    });
    return await this.examples;
  }

  public static getExecel(): any {
    return ojb
  }
}