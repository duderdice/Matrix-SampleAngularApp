import { VehicleType } from '../models/vehicleType';

export class VehicleTypesMock {

    public getVehicleTypes(): Array<VehicleType> {
        const vehicleTypes = [
            {
                id: 'S',
                name: 'Model S',
                description: 'Luxury sedan with great performance',
                imageUrl: 'http://insideevs.com/wp-content/uploads/2013/12/tesla-model-s-beach.jpg',
                basePrice: 65000,
            },
            {
                id: '3',
                name: 'Model 3',
                description: 'An affordable compact car for the masses',
                imageUrl: 'http://cdn.coresites.factorymedia.com/mpora_new/wp-content/uploads/2015/06/1966_vw_beetle_by_dangeruss-d5qbyyz.jpg',
                basePrice: 35000,
            },
            {
                id: 'X',
                name: 'Model X',
                description: 'Luxury SUV with great performance and cargo capacity',
                imageUrl: 'https://cdn.arstechnica.net/wp-content/uploads/2014/05/DSC_2096-980x651.jpg',
                basePrice: 75000,
            },
        ];
        return vehicleTypes;
    }

}
