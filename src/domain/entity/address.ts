export default class Address {

    private _street: string;
    private _number: number;
    private _city: string;
    private _state: string;
    private _zipcode: string;

    constructor(street: string, number: number, city: string, state: string, zip: string){

        this._street = street;
        this._number = number;
        this._city = city;
        this._state = state;
        this._zipcode = zip;
        this.validate();
    }

    get street(){
        return this._street;
    }

    get number(){
        return this._number;
    }

    get city(){
        return this._city;
    }

    get state(){
        return this._state;
    }

    get zipcode(){
        return this._zipcode;
    }

    validate(){
        if(this._street.length === 0){
            throw new Error("Street is required");
        }
        
        if(this._city.length === 0){
            throw new Error("City is required");
        }

        if(this._state.length === 0){
            throw new Error("State is required");
        }

        if(this._zipcode.length === 0){
            throw new Error("Zip is required");
        }
    }

    toString(){
        return `${this._street}, ${this._city}, ${this._state}, ${this._zipcode}`;
    }

}