import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;
const apiKey = '36182b7d6678cb2c4bb982f2b5c508a6';

app.use(cors())

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const weatherData = await response.json();
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.get('/weather/multiple', async (req, res) => {
    const cities = req.query.cities.split(',');

    try {
        const requests = cities.map(city => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`));
        const responses = await Promise.all(requests);
        const weatherData = await Promise.all(responses.map(response => response.json()));
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
