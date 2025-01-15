import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import OrderItem from "./domain/checkout/entity/order_item";
import Order from "./domain/checkout/entity/order";


let customer = new Customer("123", "John Doe");
const address = new Address("123 Main St", 12345,"Springfield", "IL", "62701");
customer.address= address;
customer.activate();

const item1 = new OrderItem("1", "Laptop", 1000, 1, "p1");
const item2 = new OrderItem("2", "Mouse", 20, 2, "p2");

const order = new Order("1", "123", [item1, item2]);