import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";

describe("Customer Repository unit tests", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Product 1");
        const address = new Address("Street 1", 100, "City 1", "State 1", "12345-678");
        customer.address = address;
        customer.activate();
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual(
            {
                id: "1",
                name: "Product 1",
                street: "Street 1",
                number: 100,
                state: "State 1",
                city: "City 1",
                zipcode: "12345-678",
                active: true,
                rewardPoints: 0
            });

    });

    it("should update a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Product 1");
        const address = new Address("Street 1", 100, "City 1", "State 1", "12345-678");
        customer.address = address;
        await customerRepository.create(customer);

        customer.changeName("Product 2");
        const address2 = new Address("Street 2", 200, "City 2", "State 2", "54321-876");
        customer.changeAddress(address2);
        customer.activate();
        customer.addRewardPoints(100);

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual(
            {
                id: "1",
                name: "Product 2",
                street: "Street 2",
                number: 200,
                state: "State 2",
                city: "City 2",
                zipcode: "54321-876",
                active: true,
                rewardPoints: 100
            });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Product 1");
        const address = new Address("Street 1", 100, "City 1", "State 1", "12345-678");
        customer.address = address;
        await customerRepository.create(customer);

        const customerFound = await customerRepository.find("1");

        expect(customerFound).toStrictEqual(customer);
    });


    it ("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();
        expect(async ()=>{
            await customerRepository.find("ace45");
        }).rejects.toThrow("Customer not found");
    });

    it("should find all customers", async () => {

        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Product 1");
        const address1 = new Address("Street 1", 100, "City 1", "State 1", "12345-678");
        customer1.address = address1;
        await customerRepository.create(customer1);

        const customer2 = new Customer("2", "Product 2");
        const address2 = new Address("Street 2", 200, "City 2", "State 2", "54321-876");
        customer2.address = address2;
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);

    });
});
