const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');
const Campground = require('../models/campground');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i=0; i < 50; i++) {
        const rand1000 = Math.floor(Math.random() * 1000); 
        const price = Math.floor(Math.random() * 20) + 10; 
        const camp = new Campground ({
            author: '5ff09e4d08013e03a4d9413e',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde autem, reprehenderit ipsa repellat nobis, architecto maiores numquam magni voluptate excepturi adipisci accusantium dolore ab ut temporibus sint expedita. Eaque, incidunt.Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/asfand038/image/upload/v1609668009/YelpCamp/rekjd7fmzgvhxtxkng8c.jpg',
                    filename: 'YelpCamp/rekjd7fmzgvhxtxkng8c'
                },
                {
                    url: 'https://res.cloudinary.com/asfand038/image/upload/v1609668530/YelpCamp/ffkw7jyfuizznbpjakjd.jpg',
                    filename: 'YelpCamp/ffkw7jyfuizznbpjakjd'
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})





