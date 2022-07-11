export class CreateDishDto {
    image: string;
    name: string;
    price: number;
    weight: number;
    description: string;
    localityId?: number;
    quantity_sold?: number;
    ingredients?: [];
    order?: []
    restaurantId?: number;
}