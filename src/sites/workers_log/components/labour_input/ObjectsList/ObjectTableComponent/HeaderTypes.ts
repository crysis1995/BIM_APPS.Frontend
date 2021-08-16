export enum HeaderTypes {
	Element = 'element',
	Status = 'status',
	LabourInput = 'labour_input',
}

export const HeaderTypesDescription = {
	[HeaderTypes.Element]: 'Element (Revit ID)',
	[HeaderTypes.Status]: 'Status',
	[HeaderTypes.LabourInput]: 'Nakład pracy',
};
