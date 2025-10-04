# Plate Generator App

A responsive React application for generating and managing plate configurations with real-time canvas visualization.

## 🚀 Features

- **Interactive Plate Management**: Add, remove, and configure multiple plates
- **Real-time Visualization**: Live canvas preview with motif image rendering
- **Mobile Responsive**: Touch-friendly interface with smooth scrolling
- **Local Storage**: Persist configurations between sessions
- **Input Validation**: Comprehensive number parsing and validation
- **German Language Support**: Localized interface elements

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

## 📦 Project Structure

````
plate-generator/
├── src/
│   ├── components/
│   │   ├── PlateCanvas.tsx      # Canvas visualization component
│   │   ├── PlateControls.tsx    # Control panel component
│   │   └── PlateInput.tsx       # Individual plate input component
│   ├── hooks/
│   │   └── usePlates.js         # Custom hook for plate management
│   ├── utils/
│   │   └── localization.js      # Number parsing utilities
│   ├── constants.js             # Application constants
│   └── App.tsx                  # Main application component
├── public/
├── package.json
└── README.md

### PlateCanvas

- Renders plate visualization with motif image
- Automatically mirrors images for wider configurations
- Responsive scaling based on container size
- Touch-friendly horizontal scrolling on mobile

### PlateControls

- Manages plate addition/removal
- Displays input forms for each plate
- Provides validation feedback

### PlateInput

- Individual plate configuration
- Real-time validation
- Mobile-optimized input controls

All application constraints are defined in `src/constants.js`:

```javascript
export const MIN_WIDTH_CM = 20;
export const MAX_WIDTH_CM = 300;
export const MIN_HEIGHT_CM = 30;
export const MAX_HEIGHT_CM = 126;
export const MAX_PLATES = 10;
````

### Local Storage

Configurations are automatically saved to localStorage under key: `plateGeneratorConfig`

## 📱 Mobile Optimization

- Touch-friendly button sizes (44px minimum)
- Smooth scrolling with `-webkit-overflow-scrolling`
- Prevented zoom on input focus
- Optimized touch feedback

## 🧪 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

**Build fails:**

- Clear node_modules and reinstall dependencies
- Ensure Node.js version is 16+

**Images not loading:**

- Check MOTIF_URL in constants.js
- Verify CORS settings for external images

**Local storage not working:**

- Ensure browser supports localStorage
- Check for storage quotas

This README provides comprehensive documentation for developers, users, and deployment teams, following industry best practices.
