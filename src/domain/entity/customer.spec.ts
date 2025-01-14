import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {    
        
        expect(() => {let customer = new Customer("","John")})
        .toThrow("Id is required");
    });

    it("should throw error when name is empty", () => {    
        
        expect(() => {let customer = new Customer("132","")})
        .toThrow("Name is required");
    });

    it("should change name", () => {    
        
        const customer = new Customer("132","John");
        customer.changeName("Doe");
        expect(customer.name).toBe("Doe");
    });

    it("should activate customer", () => {    
        
        const customer = new Customer("132","John");
        const address = new Address("Main St",123,"NY","NY", "12345");
        customer.address = address;
        customer.activate();
        expect(customer.isActive).toBe(true);
    });

    it("should throw error when address is undefined when a customer is activated", () => {    
        expect(()=>{
            const customer = new Customer("132","John");
            customer.activate();
        }).toThrow("Address is mandadotry to activate a customer");
    });

    it("should deactivate customer", () => {    
        const customer = new Customer("132","John");
        customer.deactivate();
        expect(customer.isActive).toBe(false);
    });

    it("should add reward points", () => {    
        const customer = new Customer("132","John");
        expect(customer.rewardPoints).toBe(0);
        
        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(100);

        customer.addRewardPoints(200);
        expect(customer.rewardPoints).toBe(300);
    });
});