var excel = require("exceljs");
import { Example } from '../model/Example';
import "reflect-metadata";

import { getType } from "reflect-helper";
import { log } from 'util';

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

        sheet.columns = Example.getExecel().columnName.map(e => {
            return { header: e.columnName, key: e.key, width: this.getColumnWidth(e.key) }
        });

        const columnName = Example.getExecel().columnName;

        sheet.lastRow.eachCell( (cell, index) => {
            cell.style = this.getColumnHeaderStyle(columnName[index - 1].key);
        });

        result.forEach(c => {
            sheet.addRow(c);
            sheet.lastRow.eachCell( (cell, index) => {
                cell.style = this.getColumnContentStyle(columnName[index - 1].key);
            });
        })
    
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
        return await workbook.xlsx.write(res)
    }

    private static getColumnWidth(key: string): number {
        return Example.getExecel().columnWidth.filter(c => c.key === key)[0].columnWidth;
    }

    private static getColumnHeaderStyle(key: string): number {
        return Example.getExecel().columnHeaderStyle.filter(c => c.key === key)[0].columnStyle;
    }

    private static getColumnContentStyle(key: string): number {
        return Example.getExecel().columnContentStyle.filter(c => c.key === key)[0].columnStyle;
    }
}