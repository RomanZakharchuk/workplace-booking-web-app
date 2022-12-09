export interface IRoom {
    id: number;
    name: string;
    opensAt: string;
    closesAt: string;
    status: string;
    seatsCount: number;
    seatsCountAvailable: number;
    address: {
        address: string;
        longitude: number;
        latitude: number;
    }
}