export class CreateDishDto {
    image: string;
    name: string;
    price: number;
    weight: number;
    description: string;
    localityId?: number | null |never;
    quantity_sold?: number;
    ingredients?: [];
    order?: []
    restaurantId?: number;
}