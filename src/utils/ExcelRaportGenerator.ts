import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

class ExcelRaportGenerator {
	private workbook: ExcelJS.Workbook;
	private sheet: ExcelJS.Worksheet;
	constructor({ worksheet = '' }) {
		this.workbook = new ExcelJS.Workbook();
		this.SetWorkbookProperties();
		this.sheet = this.workbook.addWorksheet(worksheet);
		this.sheet.columns = [];
	}
	private SetWorkbookProperties() {
		this.workbook.creator = 'WS_PRO';
		this.workbook.created = new Date();
	}
	SetColumns(columns: Partial<ExcelJS.Column>[], mergeKeys: string[] = []) {
		this.sheet.columns = columns;
		// let cellToMerge: ExcelJS.Cell[] = [];
		// let row = this.sheet.getRow(0);
		// mergeKeys.forEach((key) => cellToMerge.push(row.getCell(key)));
		// cellToMerge[0].merge(cellToMerge[1]);
		// cellToMerge[0].merge(cellToMerge[2]);
		// cellToMerge.reduce((prev, acc) => {
		// 	prev.merge(acc);
		// 	return prev;
		// });
	}

	AutoWidth(minimalWidth = 10) {
		this.sheet.columns.forEach((column) => {
			let maxColumnLength = 0;
			// @ts-ignore
			column.eachCell({ includeEmpty: true }, (cell) => {
				maxColumnLength = Math.max(
					maxColumnLength,
					minimalWidth,
					cell.value ? cell.value.toString().length : 0,
				);
			});
			column.width = maxColumnLength + 2;
		});
	}

	SetData(data: { [key: string]: string | number }[]) {
		data.forEach((row) => this.sheet.addRow(row).commit());
		this.AutoWidth();
	}

	GetRaport(filename: string) {
		return this.workbook.xlsx.writeBuffer().then(function (buffer) {
			saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${filename}.xlsx`);
		});
	}
}

export default ExcelRaportGenerator;
