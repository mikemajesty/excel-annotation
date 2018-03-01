var excel = require("exceljs");
import { Example } from '../model/Example';

export async function createExcel(res): Promise<any> {
    const result = await new Example().getExample()
    result.forEach((item) => {
        console.log(`getOwnPropertyDescriptor`, Object.getOwnPropertyDescriptor(item.city, `city`));
        console.log(`getOwnPropertyNames`, Object.getOwnPropertyNames(Example.prototype));
        console.log(`getOwnPropertySymbols`, Object.getOwnPropertySymbols(Example.prototype));
        console.log(`getPrototypeOf`, Object.getPrototypeOf(Example.prototype));
    });

    var workbook = new excel.Workbook();
    let fileName = "mike" + '.xlsx';
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);
    var sheet = workbook.addWorksheet('My Sheet', {properties:{tabColor:{argb:'FFC0000'}}});
    sheet.columns = [
        { header: 'Estado', key: 'state', width: 10, style: { font: { name: 'Arial Black' } }  },
        { header: 'Cidade', key: 'city', width: 32, style: { font: { name: 'Arial Black' } } },
        { header: 'País', key: 'country', width: 10, style: { font: { name: 'Arial Black' } }  }
    ];
    
    sheet.addRow({state: "SP", city: 'Mike Lima', country: "Brasil"});
    sheet.addRow({state: "PR", city: 'Jane Barbosa', country: "Brasil"});

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    return await workbook.xlsx.write(res)
}