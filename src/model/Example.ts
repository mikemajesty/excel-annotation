const ColumnName = (columnName: string)  => {
  return (target: Object, key: string | symbol) => {
      let value = target[key];
      console.log('value - - - ', value)
      const getter = () =>  value;
      const setter = (val) => {
          if (!columnName) {
              throw new Error(`Column name is required`);
          }
          value = val;
      }
      Reflect.deleteProperty[key];
      Reflect.defineProperty(target, key, {
          get: getter,
          set: setter
      });
  }
}

function decoratorExpression(target) {
  // Add a property on target
  target.annotated = true;
}

@decoratorExpression
export class Example {

  @ColumnName('Cidade')
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

  getAnnotation(): Symbol {
    return Symbol('ColumnName');
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
        return typeof Reflect.getOwnPropertyDescriptor(this.prototype, name)["get"] === "function";
    }) as string[];
  }

  public static getSetters(): string[] {
      return Reflect.ownKeys(this.prototype).filter(name => {
          return typeof Reflect.getOwnPropertyDescriptor(this.prototype, name)["set"] === "function";
      }) as string[];
  }
}