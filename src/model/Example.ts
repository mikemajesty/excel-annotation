import "reflect-metadata";

let ojb = { };
const ColumnName = (columnName: string)  => {
  return (target: Object, key: string | symbol) => {
      let value = target[key];
      const getter = () =>  value;
      const setter = (val) => {
          if (!columnName) {
              throw new Error(`Column name is required`);
          }
          value = val;
      }
      Reflect.deleteProperty[key];
      Reflect.defineMetadata(key, value, this);

      this.prototype = {
        greet: function () {
            return 'Hello, my name is ' + this.name;
        }
    };

    Object.create(Object.prototype, {
      foo: { value: 123, enumerable: true },
      bar: { value: "abc", enumerable: true }
    });

      Reflect.defineMetadata('ColumnName', key, target);

      Reflect.defineProperty(target, key, {
          get: getter,
          set: setter
      });

      this.add = () => {
        return {
          get: getter,
          set: setter
        };
      }
      return this.add();
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
      e.name="Mike", e.city="Ibiúna" + index, e.lastName="Lima", e.age=29 + index;
      this.examples.push(e);
    });
    return await this.examples;
  }

  public static getGetters(): string[] {
    return Reflect.ownKeys(this.prototype).filter(name => {
        if (typeof Reflect.getOwnPropertyDescriptor(this.prototype, name)["get"] === "function") {
          console.log(name)
        }
        return typeof Reflect.getOwnPropertyDescriptor(this.prototype, name)["get"] === "function";
    }) as string[];
  }

  public static getSetters(): string[] {
      return Reflect.ownKeys(this.prototype).filter(name => {
          return typeof Reflect.getOwnPropertyDescriptor(this.prototype, name)["set"] === "function";
      }) as string[];
  }

  public static getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata('ColumnName', target, propertyKey);
  }
}