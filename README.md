# Solidal Web Development Agency Platform

A full-stack web application for a web development agency that allows clients to manage their websites and view analytics through a personalized dashboard.

## Features

- **Public Agency Website**: Showcase services, portfolio, and contact information
- **Client Dashboard**: Allows clients to:
  - View website analytics
  - Update website content
  - Contact support
  - Manage account settings
- **Authentication**: Secure login and signup for clients
- **Analytics**: Track website visitors, page views, and performance
- **Responsive Design**: Works on all devices

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- Context API for state management

### Backend
- Django with Django REST Framework
- SQLite database (can be upgraded to PostgreSQL for production)
- Token-based authentication
- JSON for data exchange

## Project Structure

```
project/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Context providers
│   │   ├── hooks/       # Custom hooks
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service functions
│   │   ├── types/       # TypeScript type definitions
│   │   └── config/      # Configuration files
│   └── ...
│
└── server/              # Django backend
    ├── accounts/        # User authentication and profiles
    ├── api/             # Main API endpoints
    ├── websites/        # Website management
    ├── analytics/       # Analytics tracking
    └── ...
```

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.x and pip
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/solidal-web-agency.git
   cd solidal-web-agency
   ```

2. Set up the backend:
   ```bash
   cd server
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py makemigrations
   python manage.py migrate
   python manage.py createsuperuser  # Create admin user
   python manage.py runserver
   ```

3. Set up the frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. Open the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api/
   - Admin Interface: http://localhost:8000/admin/

## Development Workflow

1. Create a website for a client through the Django admin interface
2. Add website sections that the client can edit
3. Create a client user account and assign them to the website
4. Client can log in and manage their website through the dashboard

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Login
- `POST /api/auth/signup/` - Signup
- `POST /api/auth/logout/` - Logout
- `GET /api/auth/user/` - Get current user
- `GET/PUT /api/auth/user/settings/` - Get/update user settings

### Websites
- `GET /api/websites/` - List client's websites
- `GET /api/websites/:id/` - Get website details
- `GET /api/websites/:id/sections/` - List website sections
- `GET/PUT /api/websites/:id/sections/:id/` - Get/update website section

### Analytics
- `GET /api/analytics/data/` - Get website analytics
- `GET /api/dashboard/summary/` - Get dashboard summary

## Deployment

1. Update the Django settings for production
2. Build the React frontend:
   ```bash
   cd client
   npm run build
   ```
3. Configure your web server (Nginx, Apache, etc.)
4. Set up a production-ready database (PostgreSQL recommended)
5. Configure environment variables for sensitive information

## License

This project is licensed under the MIT License - see the LICENSE file for details.