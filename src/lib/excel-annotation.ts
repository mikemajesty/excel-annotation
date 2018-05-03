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

        sheet.columns = Example.getExecel().columnNames.map(e => {
            return { header: e.columnName, key: e.key, width: this.getColumnWidth(e.key) }
        });

        const columnNames = Example.getExecel().columnNames;
        sheet.lastRow.eachCell( (cell, index) => {
            cell.style = this.getColumnStyle(columnNames[index - 1].key);
        });

        /*sheet.columns.forEach( (e, i) => {
            sheet.lastRow.eachCell
            const cell = sheet.lastRow.getCell(i + 1);
            cell.style = this.getColumnStyle(e.key);
        });
        /*for (let index = 0; index < sheet.columns.length; index++) {
            const element = sheet.lastRow;
            const cell = element.getCell(index + 1);
            console.log(cell);
            //this.getColumnStyle(e.key)
            
        }*/
        
        result.forEach(c => {
            sheet.addRow(c);
        })
    
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
        return await workbook.xlsx.write(res)
    }

    private static getColumnWidth(key: string): number {
        return Example.getExecel().columnWidth.filter(c => c.key === key)[0].columnWidth;
    }

    private static getColumnStyle(key: string): number {
        return Example.getExecel().columnStyles.filter(c => c.key === key)[0].columnStyle;
    }

    
}