export class Car {
	private listPrice: number;
	private salePrice: number;
	private inStock: boolean;
	private model: string;
	private travelledDistance: number;
	private exteriorColor: string;
	private interiorColor: string;

	constructor(newListPrice: number, newSalePrice: number, newInStock: boolean, newModel: string, newTravelledDistance: number, newExteriorColor: string, newInteriorColor: string) {
		this.listPrice = newListPrice;
		this.salePrice = newSalePrice;
		this.inStock = newInStock;
		this.model = newModel;
		this.travelledDistance = newTravelledDistance;
		this.exteriorColor = newExteriorColor;
		this.interiorColor = newInteriorColor;
	}

	public getListPrice(): number {
		return this.listPrice;
	}

	public setListPrice(listPrice: number): void {
		this.listPrice = listPrice;
	}

	public getSalePrice(): number {
		return this.salePrice;
	}

	public setSalePrice(salePrice: number): void {
		this.salePrice = salePrice;
	}

	public getInStock(): boolean {
		return this.inStock;
	}

	public setInStock(inStock: boolean): void {
		this.inStock = inStock;
	}

	public getModel(): string {
		return this.model;
	}

	public setModel(model: string): void {
		this.model = model;
	}

	public getTravelledDistance(): number {
		return this.travelledDistance;
	}

	public setTravelledDistance(travelledDistance: number): void {
		this.travelledDistance = travelledDistance;
	}

	public getExteriorColor(): string {
		return this.exteriorColor;
	}

	public setExteriorColor(exteriorColor: string): void {
		this.exteriorColor = exteriorColor;
	}

	public getInteriorColor(): string {
		return this.interiorColor;
	}

	public setInteriorColor(interiorColor: string): void {
		this.interiorColor = interiorColor;
	}

	private isListPriceValid(): boolean {
		return this.listPrice !== null && this.listPrice >= 0;
	}

	private isSalePriceValid(): boolean {
		return this.salePrice !== null && this.salePrice >= 0;
	}

	private isModelValid(): boolean {
		return this.model !== null && this.model.length > 3;
	}

	private isTravelledDistanceValid(): boolean {
		return this.travelledDistance !== null && this.travelledDistance >= 0;
	}

	private isExteriorColorValid(): boolean {
		return this.exteriorColor !== null && this.exteriorColor.length > 3;
	}

	private isInteriorColorValid(): boolean {
		return this.interiorColor !== null && this.interiorColor.length > 3;
	}

	public isValid(): boolean {
		return this.isListPriceValid() &&
			this.isSalePriceValid() &&
			this.isModelValid() &&
			this.isTravelledDistanceValid() &&
			this.isExteriorColorValid() &&
			this.isInteriorColorValid();
	}
}
