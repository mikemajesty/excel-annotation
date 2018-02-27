import * as excel from 'excel4node';
var excel = require("exceljs");

export async function createExcel(res): Promise<any> {
    var workbook = new excel.Workbook();
    let fileName = "mike" + '.xlsx';
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);
    var sheet = workbook.addWorksheet('My Sheet', {properties:{tabColor:{argb:'FFC0000'}}});
    sheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
    ];
    
    // Access an individual columns by key, letter and 1-based column number
    var idCol = sheet.getColumn('id');
    var nameCol = sheet.getColumn('B');
    var dobCol = sheet.getColumn(3);
    //https://github.com/guyonroche/exceljs#set-workbook-properties
    // set column properties
    
    // Note: will overwrite cell value C1
    dobCol.header = 'Date of Birth';
    
    // Note: this will overwrite cell values C1:C2
    dobCol.header = ['Date of Birth', 'A.K.A. D.O.B.'];
    
    // from this point on, this column will be indexed by 'dob' and not 'DOB'
    dobCol.key = 'dob';
    
    dobCol.width = 15;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    return await workbook.xlsx.write(res)
}