Internal CRM for Lead Management
Project Overview

We are building a platform that connects companies with independent sales professionals. This internal CRM is designed to track leads, manage their conversion cycle, and visualize performance metrics.

The project evaluates:

Code quality

Database structure

Business logic implementation

UX/UI thinking

Product reasoning

Goals

Lead Management – Users should be able to:

Add, edit, delete, and view leads

Each lead contains:

Name, Email, Phone Number

Company Source (LinkedIn, Referral, Cold call, etc.)

Status (New, Contacted, Interested, Negotiation, Won, Lost)

Creation Date, Notes

Visual Pipeline (Kanban) – The platform should:

Display leads grouped by status

Allow moving leads from one status to another (drag & drop if possible)

Automatically update the database after changes

Dashboard – Display key metrics:

Total number of leads

Number of leads per status

Conversion rate

Simple chart showing monthly lead evolution

Technologies Used

Frontend: React / Next.js
Backend: Node.js / Supabase / Firebase
Database: PostgreSQL / Firestore

Technical choices should be justified in documentation.

Optional Features (Bonus)

Basic authentication

Multi-user support

Action history tracking

Unit testing

Documented API

Setup Instructions

Clone the repository:

git clone <repository-url>
cd <project-folder>


Install dependencies:

npm install

Run the project:

npm start
