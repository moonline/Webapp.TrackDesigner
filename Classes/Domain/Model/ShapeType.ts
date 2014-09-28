import Vector = require("Classes/Domain/Model/Vector");
import Variant = require("Classes/Domain/Model/Variant");
import VariantType = require("Classes/Domain/Model/VariantType");

class ShapeType {
	// unique id
	id: string;
	name: string;	
	defaultFirstConnectionPointPosition: number;
	
	variants: Variant[];	
	connectionPoints: Vector[]; // connection points, position vector from center
	
	
	/**
	 * @constructor
	 * @param {string} name - The title for the type, e.g. 'rail straight'
	 * @param {Vector[]} connectionPoints - A list with vectors describing the connection points from the center
	 * @param {Variant[]} variants - A list with variants for this type, e.q. 12v, 4.5v, ...
	 */
	constructor(id: string, name: string, connectionPoints: Vector[] = [], variants: Variant[] = []) {
		this.id = id;
		this.name = name;
		this.connectionPoints = connectionPoints;
		this.variants = variants;
		this.defaultFirstConnectionPointPosition = 0;
	}
	
	public getName(): string {
		return this.name;
	}

	public getId(): string {
		return this.id;
	}
	
	public getVariants(): Variant[] {
		return this.variants;
	}	
	
	public getDefaultFirstConnectionPointPosition(): number {
		return this.defaultFirstConnectionPointPosition;
	}
	
	public getDefaultFirstConnectionPoint(): Vector {
		return this.connectionPoints[this.defaultFirstConnectionPointPosition];
	}
	
	public addVariant(variant: Variant): void {
		this.variants.push(variant);
	}
	
	public getVariantByType(type: VariantType): Variant {
		for(var vari in this.variants) {
			if(this.variants[vari].getType() === type) {
				return this.variants[vari];
			}
		}
		return null;
	}
	
	public getDefaultVariant(): Variant {
		for(var vari in this.variants) {
			if(this.variants[vari].getType().getName() === "Default") {
				return this.variants[vari];
			}
		}
		return null;
	}
	
	public hasVariant(type: VariantType): boolean {
		return this.getVariantByType(type) != null;
	}
	
	public addConnectionPoint(point: Vector): void {
		this.connectionPoints.push(point);
	}	
	
	
	public moveDefaultFirstConnectionPointPositionToNext(): void {
		if(this.connectionPoints.length > 0) {
			if(this.defaultFirstConnectionPointPosition < this.connectionPoints.length-1) {
				this.defaultFirstConnectionPointPosition++;
			} else {
				this.defaultFirstConnectionPointPosition = 0;
			}
		}
	}
}

export = ShapeType;