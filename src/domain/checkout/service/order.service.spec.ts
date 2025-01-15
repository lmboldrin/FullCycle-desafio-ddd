import Customer from "../../customer/entity/customer";
import OrderItem from "../entity/order_item";
import OrderService from "../service/order.service";
import Order from "../entity/order";

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("1", "John Doe");
        const item = new OrderItem("1", "Produto 1", 100, 2, "p1");
        const order = OrderService.placeOrder(customer, [item]);

        expect(customer.rewardPoints).toBe(100);
        expect(order.total()).toBe(200);
    });

    it("should get total of all orders", () => {
        const item = new OrderItem("1", "Product 1", 100, 2, "p1");
        const item2 = new OrderItem("2", "Product 2", 200, 2, "p2");

        const order = new Order("1","John Doe",[item]);
        const order2 = new Order("2","John Doe",[item2]);
        const order3 = new Order("3","John Doe",[item, item2]);

        const total = OrderService.total([order, order2, order3]);

        expect(total).toBe(1200);
    });
});