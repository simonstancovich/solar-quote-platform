## Overview

The application consists of two clear sections:

- **Quote page**  
  - *Savings calculator* (Section 1): Users input their average monthly energy bill and instantly view a savings preview (calculated as `bill × 0.3`).  
  - *Lead capture form* (Section 2): Users submit their contact info and bill to request a personalized quote.  
- **Quote dashboard**  
  - An internal view listing all submitted quotes with fields: created time, name, email, address, phone (optional), bill and calculated savings.

---

## Tech Stack

**Frontend**  
- React + TypeScript  
- React Router v6 for navigation  
- Custom hook (`useQuoteForm`) for form logic  
- Validation helper (`validateQuoteForm`) for clean rules  
- Axios API layer (`api/quotes.ts`) to decouple HTTP calls  
- Minimal inline styling to keep focus on structure and logic

**Backend**  
- NestJS + TypeScript  
- Module / Controller / Service architecture  
- DTOs and `class-validator` for input validation  
- In-memory store for quotes (sufficient for this assessment), easily swappable for a database  
- CORS enabled and Swagger docs (`/api/docs`) included

---

## 🚀 Setup & Running Locally

### **Backend**

```bash
cd backend
npm install
npm run start:dev
```

Runs at:
➡ http://localhost:3000

Swagger docs:
➡ http://localhost:3000/api/docs

### **Frontend**

```bash
cd frontend
npm install
npm run dev
```

Runs at:
➡ http://localhost:5173

Make sure your frontend has:

VITE_API_URL=http://localhost:3000


