import Address from "../value-object/address";

export default class Customer{
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this.validate();
    }

    get id(){
        return this._id;
    }
    
    get name(){
        return this._name;
    }

    get rewardPoints(){
        return this._rewardPoints;
    }

    get isActive(){
        return this._active;
    }

    get address(){
        return this._address;
    }

    validate(){
        if(this._id.length === 0){
            throw new Error("Id is required");
        }

        if(this._name.length === 0){
            throw new Error("Name is required");
        }

    }

    changeName(name: string){
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address){
        this._address = address;
    }

    activate(){
        if(this._address === undefined){
            throw new Error("Address is mandadotry to activate a customer");
        }
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    set address(address: Address){
        this._address = address;
    }

    addRewardPoints(points: number){
        this._rewardPoints += points;
    }
}