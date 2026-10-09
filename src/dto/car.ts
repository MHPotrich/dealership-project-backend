export class CarDto {
	public id: number;
	public listPrice: number;
	public salePrice: number;
	public inStock: boolean;
	public model: number;
	public travelledDistance: number;
	public exteriorColor: string;
	public interiorColor: string;

	constructor(id: number, listPrice: number, salePrice: number, inStock: boolean, model: number, travelledDistance: number, exteriorColor: string, interiorColor: string) {
		this.id = id;
		this.listPrice = listPrice;
		this.salePrice = salePrice;
		this.inStock = inStock;
		this.model = model;
		this.travelledDistance = travelledDistance;
		this.exteriorColor = exteriorColor;
		this.interiorColor = interiorColor;
	}
}
