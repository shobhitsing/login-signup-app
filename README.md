# PNR Status Checker

A modern, responsive web application for checking train and flight PNR (Passenger Name Record) status. Built with React.js, TypeScript, and modern CSS.

## ✨ Features

- **PNR Status Check**: Enter PNR number to check ticket status
- **Transport Type Selection**: Switch between train and flight modes
- **Passenger Details**: View detailed passenger information and booking status
- **Journey Information**: Complete journey details including route, timing, and class
- **Chart Status**: Real-time chart preparation status
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with glassmorphism effects

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-login-signup-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── PNRChecker.tsx      # Main PNR checking component
│   ├── PNRChecker.css      # PNR checker styles
│   ├── Header.tsx          # Header navigation component
│   └── Header.css          # Header styles
├── App.tsx                 # Main application component
├── App.css                 # Global application styles
└── main.tsx               # Application entry point
```

## 🔌 API Integration

The application currently uses mock data for demonstration purposes. To integrate with real APIs:

### Railway PNR API Integration

Replace the `checkPNRStatus` function in `PNRChecker.tsx` with actual API calls:

```typescript
const checkPNRStatus = async (pnrNumber: string) => {
  setLoading(true);
  setError('');
  
  try {
    // Example using Railway PNR API
    const response = await fetch(`https://api.railway.gov.in/pnr/${pnrNumber}`);
    const data = await response.json();
    
    if (response.ok) {
      setPnrData(data);
    } else {
      throw new Error(data.message || 'Failed to fetch PNR status');
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to fetch PNR status');
    setPnrData(null);
  } finally {
    setLoading(false);
  }
};
```

### Aviation API Integration

For flight PNR checking, you can integrate with aviation APIs like:

- **Amadeus API**: Flight booking and PNR status
- **Skyscanner API**: Flight information and status
- **IATA API**: International air transport data

Example integration:

```typescript
const checkFlightPNR = async (pnrNumber: string) => {
  try {
    const response = await fetch(`https://api.amadeus.com/v1/travelers/${pnrNumber}`, {
      headers: {
        'Authorization': `Bearer ${AMADEUS_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
  } catch (error) {
  }
};
```

## 🎨 Customization

### Styling

The application uses CSS custom properties and modern CSS features. You can customize:

- **Color Scheme**: Modify the gradient colors in `App.css`
- **Layout**: Adjust container widths and spacing
- **Components**: Customize individual component styles

### Adding New Features

1. **New Transport Types**: Add more transport options in the selector
2. **Additional PNR Fields**: Extend the PNR response interface
3. **Real-time Updates**: Implement WebSocket connections for live status updates
4. **Offline Support**: Add service worker for offline functionality

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

## 📦 Building for Production

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🌐 Deployment

Deploy to various platforms:

- **Vercel**: `npm run build && vercel --prod`
- **Netlify**: `npm run build && netlify deploy --prod`
- **GitHub Pages**: Configure in `vite.config.ts`

## 🔒 Environment Variables

Create a `.env` file for API keys:

```env
VITE_RAILWAY_API_KEY=your_railway_api_key
VITE_AMADEUS_API_KEY=your_amadeus_api_key
VITE_AMADEUS_API_SECRET=your_amadeus_secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- [ ] Real-time PNR status updates
- [ ] Multiple language support
- [ ] Dark/Light theme toggle
- [ ] PNR history and favorites
- [ ] Push notifications for status changes
- [ ] Offline mode support
- [ ] Advanced filtering and search
- [ ] Export PNR details to PDF

---

**Note**: This application is for demonstration purposes. For production use, ensure proper API authentication, error handling, and security measures are implemented.



