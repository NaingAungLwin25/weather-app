# Weather App

A simple weather application built with React, TypeScript, and Vite. This app fetches weather data from the WeatherAPI and displays it to users. To get started, sign up for an API key at [Weather API](https://www.weatherapi.com/).

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Testing the App](#testing-the-app)

## Features

- Fetch weather data based on user input.
- Display current weather and forecast.
- Built with modern web technologies for a responsive experience.

## Technologies

- **React** - JavaScript library for building user interfaces
- **TypeScript** - A superset of JavaScript that adds static types
- **Vite** - A fast development environment and build tool

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create an environment file:**

    ```bash
    cp .env.example .env
    ```

3. **Add your WeatherAPI key:**

    ```bash
    VITE_WEATHER_API_KEY=your_api_key_here
    ```

## Running the App

  ```bash
  npm run dev
  ```

## Testing the App
  ```bash
  npx cypress run
  npx cypress open
  ```





