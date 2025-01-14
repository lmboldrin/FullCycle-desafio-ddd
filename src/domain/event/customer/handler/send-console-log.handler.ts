import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressUpdatedEvent from "../customer-address-updated.event";

export default class SendConsoleLogHandler
 implements EventHandlerInterface<CustomerAddressUpdatedEvent> {

    handle(event: CustomerAddressUpdatedEvent): void {
        console.log(`Endereço do cliente ${event.eventData.id} - ${event.eventData.name} alterado para ${event.eventData.address},`);
    }
}