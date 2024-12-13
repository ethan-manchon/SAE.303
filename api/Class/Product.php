<?php
class Product implements JsonSerializable {
    private ?int $id = null;
    private ?string $product_name;
    private ?float $sales_count;
    private ?float $stock;

    public function getId(): int { return $this->id; }
    public function setId(int $id): self { $this->id = $id; return $this; }

    public function getProductName(): string { return $this->product_name; }
    public function setProductName(string $product_name): self { $this->product_name = $product_name; return $this; }

    public function getSale(): float { return $this->sales_count; }
    public function setSale(float $sales_count): self { $this->sales_count = $sales_count; return $this; }

    public function getStock(): float { return $this->stock; }
    public function setStock(float $stock): self { $this->stock = $stock; return $this; }

    public function jsonSerialize(): mixed {
        return [
            "id" => $this->id ?? null,
            "product_name" => $this->product_name ?? null,
            "sales_count" => $this->sales_count ?? null,
            "stock" => $this->stock ?? null,
        ];
    }
}