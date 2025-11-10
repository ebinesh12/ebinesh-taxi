# Taxi Booking Web Application

This project is a mini Taxi Booking web application designed for customer-facing booking flow and an admin panel to manage bookings and vehicles.


## Tech Stack

- **Frontend:** Next.js  
- **Backend:** Next.js API Routes  
- **Database:** Supabase  
- **Bonus:** Usage of TypeScript


## Features

### Customer-Facing Website

- **Landing Page**
  - Service categories: One-Way, Round Trip
  - Trip search form with Pickup, Drop, Date, and Time fields

- **Fare Estimation**
  - Distance calculation between Pickup and Drop locations (via API or custom logic)
  - Display list of available vehicles with:
    - Name
    - Image
    - Fare estimate
    - Additional info
    - Booking button

- **Booking Verification**
  - Display trip summary with selected vehicle details
  - Collect user details:
    - Name (required)
    - Mobile number (required)
    - Email (optional)

- **Booking Success**
  - Show success confirmation with booking reference ID
  - Store booking/enquiry details in the database

## Admin Panel

- **Access**
  - Admin login secured with basic authentication

- **Core Features**
  - Dashboard showing today’s enquiries and total enquiries
  - View and manage all enquiries/bookings
  - Add, Edit, and Delete vehicle information

- **Vehicles Management**
  - Fields:
    - Vehicle Name
    - Service Type
    - Rate per KM
    - Base Fare (Driver Bata)
    - Status (Active / Inactive)

## Getting Started

### Prerequisites

- Node.js and npm/yarn installed
- Supabase account and project set up

### Installation

1. Clone the repository  
2. Install dependencies  
3. Configure environment variables for Supabase and authentication  
4. Run the development server  

## Usage

- Access the customer booking flow via the main landing page  
- Admin access available via specified admin route with login required  
- Manage vehicles and bookings through the admin dashboard  

## License

This project is for technical screening purposes and does not carry a license.

## Author

Developed as a practical assessment project By <b>Ebinesh Rabin<b> .

