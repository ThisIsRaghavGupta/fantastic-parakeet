# My React CleverTap App

This project is a React application that integrates CleverTap for user engagement and analytics. It provides a simple setup to track user events and manage user profiles.

## Project Structure

```
my-react-clevertap-app
├── public
│   └── index.html        # Main HTML file for the React application
├── src
│   ├── App.js           # Main component of the React application
│   ├── clevertap.js     # CleverTap configuration and initialization
│   └── index.js         # Entry point of the React application
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/my-react-clevertap-app.git
   cd my-react-clevertap-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add CleverTap SDK:**
   Make sure to include the CleverTap SDK in your `package.json` dependencies. You can install it using:
   ```bash
   npm install clevertap-react-native
   ```

4. **Configure CleverTap:**
   Update the `src/clevertap.js` file with your CleverTap account details.

## Usage

- Start the application:
  ```bash
  npm start
  ```

- Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Example Usage

In `src/App.js`, you can track events and user profiles using the functions exported from `src/clevertap.js`. For example:

```javascript
import { trackEvent, setUserProfile } from './clevertap';

// Track an event
trackEvent('Button Clicked', { buttonName: 'Sign Up' });

// Set user profile
setUserProfile({ Name: 'John Doe', Email: 'john.doe@example.com' });
```

## License

This project is licensed under the MIT License.