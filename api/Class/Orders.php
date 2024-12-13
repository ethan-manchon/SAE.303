<?php
/**
 *  Class Order
 * 
 *  Represents an order with several properties (id, order_date, order_status, shipping_cost, productName, totalSales, categ)
 * 
 *  Implements the JsonSerializable interface 
 *  which requires defining a jsonSerialize method. This method specifies how the objects
 *  of the Order class should be converted to JSON. See the method for more details.
 */
class Order implements JsonSerializable {
    private int $id;

    private ?string $order_date;
    private ?string $order_status;
    private ?float $shipping_cost;
    private ?string $productName;
    private ?float $totalSales;
    private ?string $categ;

    public function getId(): int { return $this->id; }
    public function setId(int $id): self { $this->id = $id; return $this; }

    public function getOrderDate(): ?string { return $this->order_date; }
    public function setOrderDate(?string $order_date): self { $this->order_date = $order_date; return $this; }

    public function getOrderStatus(): ?string { return $this->order_status; }
    public function setOrderStatus(?string $order_status): self { $this->order_status = $order_status; return $this; }

    public function getShippingCost(): ?float { return $this->shipping_cost; }
    public function setShippingCost(?float $shipping_cost): self { $this->shipping_cost = $shipping_cost; return $this; }

    public function getProductName(): ?string { return $this->productName; }
    public function setProductName(?string $productName): self { $this->productName = $productName; return $this; }

    public function jsonSerialize(): mixed {
        return [
            "id" => $this->id ?? null,
            "order_date" => $this->order_date ?? null,
            "order_status" => $this->order_status ?? null,
            "shipping_cost" => $this->shipping_cost ?? null,
            "productName" => $this->productName ?? null,

        ];
    }
}
