import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import autoTable from 'jspdf-autotable';

@Injectable({
    providedIn: 'root'
})
export class CdmpTableService {

    toPdf(cols?: any[], datas?: any[], fileName = 'file') {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(x => {
                const doc = new jsPDF.default('l', 'mm');
                // doc.autoTable(cols, datas);
                autoTable(doc, {
                    head: cols,
                    body: datas,
                    didDrawCell: (data) => {
                    },
                });
                doc.save(fileName + '.pdf');
            });
        });
    }

    toExcel(datas: any[], fileName = 'file') {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(datas);
            const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
            const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
            this.saveAsExcelFile(excelBuffer, fileName);
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
}
