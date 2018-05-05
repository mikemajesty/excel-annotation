import "reflect-metadata";
import { log } from "util";

let ojb = {
  columnName: [],
  columnWidth: [],
  columnHeaderStyle: [],
  columnContentStyle: []
};
const ColumnName = (columnName: string) => {
  return (target: Object, key: string | symbol) => {
    ojb.columnName.push({ columnName, key });
  }
}

const ColumnWidth = (columnWidth: number) => {
  return (target: Object, key: string | symbol) => {
    ojb.columnWidth.push({ columnWidth, key });
  }
}

const ColumnHeaderStyle = (columnStyle: Object) => {
  return (target: Object, key: string | symbol) => {
    ojb.columnHeaderStyle.push({ columnStyle, key });
  }
}

const ColumnContentStyle = (columnStyle: Object) => {
  return (target: Object, key: string | symbol) => {
    ojb.columnContentStyle.push({ columnStyle, key });
  }
}

export class Example {

  @ColumnName('Nome')
  @ColumnWidth(50)
  @ColumnHeaderStyle({ 
    font: { name: 'Arial Black' },
    alignment: { vertical: 'middle', horizontal: 'center' }
  })
  @ColumnContentStyle( { font: {  
    color: { argb: '9b7d8f' },
    family: 2,
    size: 12,
    italic: true
  }})
  name: string;
  @ColumnName('Cidade')
  @ColumnWidth(50)
  @ColumnHeaderStyle({ 
    font: { name: 'Arial Black' },
    alignment: { vertical: 'middle', horizontal: 'center' }
  })
  @ColumnContentStyle( { font: {  
    color: { argb: '9b7d8f' },
    family: 2,
    size: 12,
    italic: true
  }})
  city: string;
  @ColumnName('Sobrenome')
  @ColumnWidth(50)
  @ColumnHeaderStyle({ 
    font: { name: 'Arial Black' },
    alignment: { vertical: 'middle', horizontal: 'center' }
  })
  @ColumnContentStyle( { font: {  
    color: { argb: '9b7d8f' },
    family: 2,
    size: 12,
    italic: true
  }})
  lastName: string;
  @ColumnName('Idade')
  @ColumnWidth(20)
  @ColumnHeaderStyle({ 
    font: { name: 'Arial Black' },
    alignment: { vertical: 'middle', horizontal: 'center' }
  })
  @ColumnContentStyle( { font: {  
    color: { argb: '9b7d8f' },
    family: 2,
    size: 12,
    italic: true
  }})
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