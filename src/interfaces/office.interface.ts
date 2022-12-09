export interface IOffice {
    id: number;
    name: string;
    opensAt: string;
    closesAt: string;
    workingDays: [
        string
    ];
    status: string;
    roomsCount: number;
    address: {
        address: string;
        longitude: number;
        latitude: number;
    };
    manager: {
        fullName: string;
        email: string;
        imageUrl: string;
    }
}