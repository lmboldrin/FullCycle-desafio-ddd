import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductFactory from "./product.factory";

describe("ProductFactory Unit tests", () => {

    it("should create a product type A", () => {
        const product = ProductFactory.create("a","Product A", 10);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(10);
        expect(product.constructor.name).toBe("Product");
        expect(product).toBeInstanceOf(Product);
    });

    it("should create a product type B", () => {
        const product = ProductFactory.create("b","Product B", 10);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(20);
        expect(product.constructor.name).toBe("ProductB");
        expect(product).toBeInstanceOf(ProductB);
    });


    it("should throw an error when product type is not supported", () => {
        expect(() => {
            ProductFactory.create("c","Product C", 10);
        }).toThrow("Product type not supported");
    });

});