import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

import OrderItemModel from "./order-item.model";
import CustomerModel from "../../../../customer/repository/sequelize/model/customer.model";

@Table({
    tableName: 'orders',
    timestamps: false
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({allowNull: false})
    declare customer_id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @Column({allowNull: false})
    declare total: number;

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];

}