import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {    
        expect(() => {let order = new Order("","123",[])})
        .toThrow("Id is required");
    });

    it("should throw error when CustomerId is empty", () => {    
        expect(() => {let order = new Order("123","",[])})
        .toThrow("CustomerId is required");
    });

    it("should throw error when Item quantity is not greater than 0", () => {    
        expect(() => {let order = new Order("123","123",[])})
        .toThrow("Items are required");
    });

    it("should calculate total", () => {    
      const item = new OrderItem("123","item1",100, 2, "p2");
      const item2 = new OrderItem("124","item2",200, 2, "p2");
      const order = new Order("123","132",[item]);
      let total = order.total();

      expect(total).toBe(200);

      const order2 = new Order("124","132",[item,item2]);
      total = order2.total();

      expect(total).toBe(600);
    });

    it("should throw error if the item quantity is less or equal 0", () => {    
        expect(()=>{
            const item = new OrderItem("123","item1",100, 0, "p2");
        const order = new Order("123","132",[item]);
        }).toThrow("Quantity must be greater than zero");
      });
});