import Address from "../value-object/address";
import Customer from "../entity/customer";
import CustomerAddressUpdatedEvent from "./customer-address-updated.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLogHandler from "./handler/send-console-log.handler";
import SendConsoleLog1Handler from "./handler/send-console-log1.handler";
import SendConsoleLog2Handler from "./handler/send-console-log2.handler";
import EventDispatcher from "../../@shared/event/event-dispatcher";

describe("Customer Events Tests", () => {

    it("should notify all event handlers when a customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: 1,
            name: "Customer 1",
            email: "teste@email.com",
            address: {
                street: "Street 1",
                city: "City 1",
                state: "State 1",
                zipCode: "123456"
            }
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalledTimes(1);
        expect(spyEventHandler2).toHaveBeenCalledTimes(1);
        
    });

    it("should notify event when the customer address is updated", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerAddressUpdatedEvent", eventHandler);

        const customer = new Customer("1", "Customer 1");

        var addres = new Address("Street 1", 123 ,"City 1", "State 1", "123456");
        
        customer.changeAddress(addres);

        const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent({
            id: "1",
            name: "Customer 1",
            address: "Street 1, 123, City 1, State 1, 123456"
        });

        eventDispatcher.notify(customerAddressUpdatedEvent);

        expect(spyEventHandler).toHaveBeenCalledTimes(1);
    });

});