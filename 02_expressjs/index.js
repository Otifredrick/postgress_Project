import express from 'express';
const app = express();

const router = express.Router();

const PORT = 3000;

app.use(express.json());
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

let cars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2020 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019 },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2021 },
    { id: 4, make: 'Chevrolet', model: 'Impala', year: 2018 },
];



app.get('/', (req, res) => {
    res.send('Hello from the cars API!');
});
router.get('/', (req, res) => {
    res.json(cars);
});

router.get('/:id', (req, res) => {
    const id=Number(req.params.id);
    const car = cars.find(car => car.id === id);
    if (!car) {
        return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
});
router.post('/', (req, res) => {
    const { make, model, year } = req.body;
    const newCar = {
        id: cars.length + 1,
        make,
        model,
        year,
    };
    cars.push(newCar);
    res.status(201).json(newCar);
});
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const car = cars.find(car => car.id === id);
    if (!car) {
        return res.status(404).json({ error: 'Car not found' });
    }
    const { make, model, year } = req.body;
    car.make = make;
    car.model = model;
    car.year = year;
    res.json(car);
});
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const car = cars.find(car => car.id === id);
    if (!car) {
        return res.status(404).json({ error: 'Car not found' });
    }
    cars = cars.filter(car => car.id !== id);
    res.json({ message: 'Car deleted successfully' });
}); 

app.use('/api/v1/cars', router);







app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

