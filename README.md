# Road Safety AI System

AI-powered road accident prediction and prevention platform designed to create a future where road accidents become predictable and preventable events through comprehensive AI-powered safety ecosystem.

## Product Vision

Create a future where road accidents become predictable and preventable events through comprehensive AI-powered safety ecosystem that protects every road user globally.

## Target Audience

- Transportation authorities
- Traffic safety engineers
- Urban planners
- Insurance companies
- Emergency services seeking data-driven road safety solutions

## Core Features

- **Incident Management**: Complete CRUD operations for road safety incidents
- **Real-time Tracking**: Monitor and track road safety incidents with location data
- **Severity Classification**: Categorize incidents by severity levels (low, medium, high, critical)
- **Status Management**: Track incident lifecycle from reported to resolved

## Technology Stack

- **Backend**: FastAPI (Python)
- **Database**: SQLAlchemy ORM with SQLite (easily switchable to PostgreSQL/MySQL)
- **API**: RESTful API with automatic OpenAPI documentation
- **Validation**: Pydantic for data validation

## Architecture

Modular Monolith architecture with clear separation of concerns:
- `backend/main.py` - Application entry point
- `backend/models.py` - Database models
- `backend/schemas.py` - Pydantic schemas for validation
- `backend/routers/` - API route handlers
- `backend/config.py` - Configuration management
- `backend/database.py` - Database connection and session management

## Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r backend/requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env file with your configuration
```

## Running Locally

1. Activate virtual environment (if not already activated):
```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Start the development server:
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

3. Access the application:
- API: http://localhost:8000
- Interactive API Documentation: http://localhost:8000/docs
- Alternative API Documentation: http://localhost:8000/redoc

## API Endpoints

### Health Check
- `GET /` - Root endpoint with service status
- `GET /health` - Detailed health check

### Incidents
- `POST /api/v1/incidents` - Create a new incident
- `GET /api/v1/incidents` - List all incidents (with pagination)
- `GET /api/v1/incidents/{incident_id}` - Get specific incident
- `PUT /api/v1/incidents/{incident_id}` - Update an incident
- `DELETE /api/v1/incidents/{incident_id}` - Delete an incident

### Example Request

Create an incident:
```bash
curl -X POST "http://localhost:8000/api/v1/incidents" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Traffic Accident on Highway 101",
    "description": "Multi-vehicle collision during rush hour",
    "location": "Highway 101, Mile Marker 45",
    "latitude": 37.7749,
    "longitude": -122.4194,
    "severity": "high",
    "incident_type": "collision",
    "reported_by": "Traffic Control Center"
  }'
```

## Environment Variables

Key environment variables (see `.env.example` for full list):

- `DATABASE_URL` - Database connection string
- `SECRET_KEY` - Secret key for JWT tokens (change in production!)
- `ALLOWED_ORIGINS` - CORS allowed origins
- `DEBUG` - Enable/disable debug mode

## Database

The application uses SQLite by default for easy setup. To use PostgreSQL or MySQL:

1. Update `DATABASE_URL` in `.env`:
```
# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost/road_safety

# MySQL
DATABASE_URL=mysql://user:password@localhost/road_safety
```

2. Install appropriate database driver:
```bash
pip install psycopg2-binary  # For PostgreSQL
# or
pip install pymysql  # For MySQL
```

## Development

### Project Structure
```
.
├── backend/
│   ├── __init__.py
│   ├── main.py              # Application entry point
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database setup
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── requirements.txt     # Python dependencies
│   └── routers/
│       ├── __init__.py
│       └── incidents.py     # Incident endpoints
├── .env.example             # Environment variables template
└── README.md               # This file
```

### Code Quality

The codebase follows:
- PEP 8 style guidelines
- Type hints for better code clarity
- Comprehensive error handling
- Input validation using Pydantic
- Proper logging for debugging

## Security

- Environment variables for sensitive data
- Input validation on all endpoints
- CORS configuration for API security
- SQL injection prevention through ORM
- Password hashing ready (for future authentication)

## Future Enhancements

- User authentication and authorization
- AI-powered accident prediction models
- Real-time data analytics dashboard
- Integration with traffic management systems
- Mobile application support
- Advanced geospatial analysis

## License

[Your License Here]

## Support

For issues and questions, please contact the development team or create an issue in the repository.
