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
export class Example {

  @ColumnName('Name') 
  public name: string;
  @ColumnName('Cidade')
  public city: string;
  @ColumnName('Sobrenome')
  public lastName: string;
  @ColumnName('Idade')
  public age: number;

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
}