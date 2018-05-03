import "reflect-metadata";
import { log } from "util";

let ojb = {
  columnNames: [],
  columnWidth: [],
  columnStyles: []
};
const ColumnName = (columnName: string) => {
  return (target: Object, key: string | symbol) => {
    ojb.columnNames.push({ columnName, key });
  }
}

const ColumnWidth = (columnWidth: number) => {
  return (target: Object, key: string | symbol) => {
    ojb.columnWidth.push({ columnWidth, key });
  }
}

const ColumnContentStyle = (columnStyle: Object) => {
  return (target: Object, key: string | symbol) => {
    ojb.columnStyles.push({ columnStyle, key });
  }
}

export class Example {

  @ColumnName('Nome')
  @ColumnWidth(50)
  @ColumnContentStyle({ font: { name: 'Arial Black' } })
  name: string;
  @ColumnName('Cidade')
  @ColumnWidth(50)
  @ColumnContentStyle({ font: { name: 'Arial Black' } })
  city: string;
  @ColumnName('Sobrenome')
  @ColumnWidth(50)
  @ColumnContentStyle({ font: { name: 'Arial Black' } })
  lastName: string;
  @ColumnName('Idade')
  @ColumnWidth(20)
  @ColumnContentStyle({ font: { name: 'Arial Black' } })
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