# StudioSpace 🎬

### Find Your Space. Create Your Story.

StudioSpace is a peer-to-peer creative workspace and production studio sharing platform. It connects creators, photographers, filmmakers, podcasters, and other creative professionals with spaces that suit their needs.

Discover studios, explore their facilities, book your preferred time slot, and manage your bookings — all in one place.

---

## ✨ Features

### 🏠 Discover Creative Spaces
- Browse available creative studios.
- Explore studios by category.
- View detailed studio information, facilities, pricing, and availability.
- Search and filter studios to find the right space.

### 🔐 Authentication
- Email and password registration and login.
- Google authentication.
- Forgot password and password reset functionality.
- Secure session management with Better Auth.
- JWT-based HTTPOnly cookie authentication for protected server-side mutations.

### 🎨 Studio Management
- Add and publish your own studio listings.
- Update existing studio information.
- Delete your listings.
- Manage your studios from a dedicated page.

### 📅 Booking Management
- Book studios by selecting a date and time.
- View your booking history and status.
- Cancel pending bookings.
- Manage incoming booking requests as a studio owner.
- Confirm, cancel, and complete bookings.
- Prevent overlapping confirmed bookings.

### 🌙 User Experience
- Responsive design for different screen sizes.
- Light and dark themes.
- Loading states and friendly empty states.
- Toast notifications for user feedback.
- Clean and intuitive interface.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| Express.js | Backend API |
| MongoDB | Database |
| Better Auth | Authentication |
| JWT (Jose) | Token verification |
| Resend | Password reset emails |
| Sonner | Toast notifications |

---

## 📂 Project Structure

```text
StudioSpace/
│
├── studiospace/              # Next.js frontend
│   ├── app/                  # App Router pages and routes
│   ├── components/           # Reusable UI components
│   ├── lib/                  # Authentication and utilities
│   ├── public/               # Static assets
│   └── package.json
│
└── studiospace-server/       # Express backend
    ├── index.js              # API routes and server setup
    └── package.json
```

---

## 🚀 Getting Started

Follow these instructions to run StudioSpace locally.

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd StudioSpace
```

### 2. Set Up the Frontend

```bash
cd studiospace
npm install
```

Create a `.env.local` file in the frontend root directory:

```env
API_URL=http://localhost:5000

MONGO_URI=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_verified_sender_email
```

### 3. Set Up the Backend

Open another terminal:

```bash
cd studiospace-server
npm install
```

Create a `.env` file in the backend root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Run the Backend

```bash
npm run dev
```

The Express server will run at:

`http://localhost:5000`

### 5. Run the Frontend

In the frontend terminal:

```bash
npm run dev
```

Open your browser and visit:

`http://localhost:3000`

---

## 🔌 API Endpoints

### Studios

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/studios` | Get all studios |
| GET | `/api/studios/featured` | Get featured studios |
| GET | `/api/studios/:id` | Get studio details |
| POST | `/api/studios` | Create a studio |
| PUT | `/api/studios/:id` | Update a studio |
| DELETE | `/api/studios/:id` | Delete a studio |
| GET | `/api/my-listings` | Get owner's listings |

### Categories & Steps

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | Get studio categories |
| GET | `/api/steps` | Get how-it-works steps |

### Bookings

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/bookings` | Create a booking |
| GET | `/api/my-bookings` | Get customer bookings |
| GET | `/api/booking-requests` | Get owner's booking requests |
| PATCH | `/api/bookings/:id/status` | Update booking status |
| PATCH | `/api/bookings/:id/cancel` | Cancel a booking |

**Note:** The studio creation, deletion, and booking creation endpoints require authentication.

---

## 🔒 Booking Workflow

StudioSpace follows a simple booking workflow:

1. A customer selects a studio and submits a booking request.
2. The booking is initially marked as **Pending**.
3. The studio owner reviews the request.
4. The owner can confirm or cancel the request.
5. Confirmed bookings can later be marked as completed.

The backend checks for overlapping confirmed bookings to prevent double-booking.

---

## 👥 User Roles

**Customer**
- Explore creative studios.
- View studio details.
- Submit booking requests.
- Manage personal bookings.

**Studio Owner**
- Publish studio listings.
- Manage existing listings.
- Review incoming booking requests.
- Confirm, cancel, or complete bookings.

A registered user can act as both a customer and a studio owner.

---

## 🔑 Environment Variables

Make sure to configure your MongoDB connection, Better Auth credentials, Google OAuth credentials, and Resend API key before running the application.

Never commit `.env` or `.env.local` files to the repository.

---

## 💡 Project Purpose

StudioSpace aims to make creative spaces more accessible by connecting people who need professional workspaces with people who have them available.

Whether you're recording a podcast, shooting a product, producing a film, or working on your next creative project, StudioSpace helps you find the right environment.

---

<p align="center">

**StudioSpace — Find Your Space. Create Your Story.**

Made with ❤️ for creators.

</p>