<?php
class Customer implements JsonSerializable {
    private ?int $id = null;
    private ?string $first_name;
    private ?string $last_name;
    private ?string $email;
    private ?string $country;
    private ?string $city;
    private ?float $lat;
    private ?float $lng;

    public function getId(): int { return $this->id; }
    public function setId(int $id): self { $this->id = $id; return $this; }

    public function getFirstName(): string { return $this->first_name; }
    public function setFirstName(string $first_name): self { $this->first_name = $first_name; return $this; }

    public function getLastName(): string { return $this->last_name; }
    public function setLastName(string $last_name): self { $this->last_name = $last_name; return $this; }

    public function getEmail(): string { return $this->email; }
    public function setEmail(string $email): self { $this->email = $email; return $this; }

    public function getCountry(): string { return $this->country; }
    public function setCountry(string $country): self { $this->country = $country; return $this; }

    public function getCity(): string { return $this->city; }
    public function setCity(string $city): self { $this->city = $city; return $this; }

    public function getLat(): float { return $this->lat; }
    public function setLat(float $lat): self { $this->lat = $lat; return $this; }

    public function getLng(): float { return $this->lng; }
    public function setLng(float $lng): self { $this->lng = $lng; return $this; }

    public function jsonSerialize(): mixed {
        return [
            "id" => $this->id ?? null,
            "first_name" => $this->first_name ?? null,
            "last_name" => $this->last_name ?? null,
            "email" => $this->email ?? null,
            "country" => $this->country ?? null,
            "city" => $this->city ?? null,
            "lat" => $this->lat ?? null,
            "lng" => $this->lng ?? null,
        ];
    }
}