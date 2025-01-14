import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";

export default class OrderRepository implements OrderRepositoryInterface{

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId
            }))
        },
            { include: [{ model: OrderItemModel }] });
    }

    async update(entity: Order): Promise<void> {
        const transaction = await OrderModel.sequelize.transaction();
        try {
            await OrderModel.update(
                { total: entity.total() },
                { where: { id: entity.id }, transaction }
            );
    
            await OrderItemModel.destroy({ where: { order_id: entity.id }, transaction });
    
            const items = entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                order_id: entity.id,
                product_id: item.productId
            }));
    
            await OrderItemModel.bulkCreate(items, { transaction });
    
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async find(id: string): Promise<Order | null> {
        const orderModel = await OrderModel.findOne(
            { where: { id }, include: ["items"] });

        if (!orderModel) {
            return null;
        }

        const items = orderModel.items.map((item: any) => new OrderItem(
            item.id,
            item.name,
            item.price,
            item.quantity,
            item.product_id
        ));

        return new Order(orderModel.id, orderModel.customer_id, items);
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: ["items"] });

        return orderModels.map((orderModel: any) => {
            const items = orderModel.items.map((item: any) => new OrderItem(
                item.id,
                item.name,
                item.price,
                item.quantity,
                item.product_id
            ));

            return new Order(orderModel.id, orderModel.customer_id, items);
        });
    }
}