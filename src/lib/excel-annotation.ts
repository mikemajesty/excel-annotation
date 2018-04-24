var excel = require("exceljs");
import { Example } from '../model/Example';
import "reflect-metadata";

import { getType } from "reflect-helper";

export class Excel {

    constructor() {
        
    }

    public static async create(res: any): Promise<any> {
        
        const result = await new Example().getExample();
        
        var workbook = new excel.Workbook();
        let fileName = "mike" + '.xlsx';
        workbook.creator = 'Me';
        workbook.lastModifiedBy = 'Her';
        workbook.created = new Date(1985, 8, 30);
        workbook.modified = new Date();
        workbook.lastPrinted = new Date(2016, 9, 27);
        var sheet = workbook.addWorksheet('My Sheet', {properties:{tabColor:{argb:'FFC0000'}}});

        sheet.columns = Example.getExecel().map(e => {
            return { header: e.columnName, key: e.key, width: 10, style: { font: { name: 'Arial Black' } }  }
        });
        
        result.forEach(c => {
            sheet.addRow(c);
        })
    
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
        return await workbook.xlsx.write(res)
    }
}