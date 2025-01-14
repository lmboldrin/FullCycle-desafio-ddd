import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("123", "John Doe");
const address = new Address("123 Main St", 12345,"Springfield", "IL", "62701");
customer.address= address;
customer.activate();

const item1 = new OrderItem("1", "Laptop", 1000, 1, "p1");
const item2 = new OrderItem("2", "Mouse", 20, 2, "p2");

const order = new Order("1", "123", [item1, item2]);