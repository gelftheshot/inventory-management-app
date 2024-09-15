# Inventory Management App

![Robot Classifier](/public/robot.jpg)

This is a modern inventory management application built with Next.js, Firebase, and Material-UI. It allows users to efficiently manage their inventory, including features like photo-based item entry and automatic categorization.

## Features

- Photo-based item entry with automatic categorization
- Real-time inventory management
- Category-based item organization
- Intuitive user interface with Material-UI components
- Firebase integration for data storage and retrieval

## Tech Stack

- Frontend: Next.js, React
- UI Library: Material-UI
- Backend: Firebase (Firestore)
- Image Analysis: Google's Generative AI (Gemini)

## Key Components

### Dashboard
![Home Page](/public/inventory1.png)

The main component that renders the inventory list and manages the overall layout.

### Inventory List

Displays the list of inventory items with options to edit, delete, and adjust quantities.

### Add/Edit Item Dialog
![Adding Item Page](/public/inventory2.png)

A dialog component for adding new items or editing existing ones.

### Upload Photo Button

Allows users to upload photos for automatic item detection and categorization.

### Sidebar

## API Integration

The app uses Google's Generative AI (Gemini) for image analysis:

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up a Firebase project and update the configuration in `app/firebase.js`
4. Set up a Google Cloud project and obtain an API key for the Gemini API
5. Create a `.env.local` file and add your Firebase and Gemini API keys
6. Run the development server: `npm run dev`
7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
