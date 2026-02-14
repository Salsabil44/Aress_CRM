<div align="center">

# 🚀 Aress CRM

### Modern Sales Management Platform

A powerful, role-based CRM system built with React, TypeScript, and Supabase. Streamline your sales pipeline with beautiful UI, real-time updates, and comprehensive lead management.

[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-3fcf8e?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev)

[Demo](#-demo-credentials) • [Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-project-structure)

</div>

---

## ✨ Features

<table>
<tr>
<td>

### 📊 Lead Management
- Create, update, and delete leads
- Rich contact information
- Notes and tracking

</td>
<td>

### 🎯 Kanban Pipeline
- Drag-and-drop interface
- Visual status tracking
- Real-time updates

</td>
</tr>
<tr>
<td>

### 📈 Dashboard Analytics
- Lead evolution charts
- Status distribution
- Performance metrics

</td>
<td>

### 👥 Role-Based Access
- **Admin** - User management only
- **Manager** - View all team leads
- **Sales Rep** - Personal leads only

</td>
</tr>
<tr>
<td>

### 🌓 Dark Mode
- Complete dark theme
- System preference sync
- Smooth transitions

</td>
<td>

### 📝 Activity Tracking
- Complete action history
- Detailed audit logs
- User attribution

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

```
Frontend     → React 19 + TypeScript + Vite
Styling      → Tailwind CSS v4
Backend      → Supabase (PostgreSQL + Auth + RLS)
Charts       → Recharts
Icons        → Lucide React
```

---

## ⚡ Quick Start

### 1️⃣ Clone & Install

```bash
git clone <your-repo-url>
cd Aress_CRM/frontend
npm install
```

### 2️⃣ Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → **New query**
3. Copy and run the entire `supabase-schema.sql` file
4. Go to **Settings** → **API** and copy:
   - Project URL
   - `anon` public key

### 3️⃣ Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4️⃣ Launch

```bash
npm run dev
```

Visit **http://localhost:5173** 🎉

---

## 🎭 Demo Credentials

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| 👑 Admin | admin@gmail.com | admin123 | User Management |
| 👔 Manager | manager@example.com | manager123 | All Team Leads |
| 💼 Sales Rep | sales@example.com | sales123 | Own Leads Only |

> **Note:** Admin account (`admin@gmail.com`) has hardcoded privileges and always defaults to admin role.

---

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
│   └── ui/         # Button, Card, Input, Modal, etc.
├── contexts/       # React contexts (Theme)
├── features/       # Feature modules
│   ├── admin/      # User management
│   ├── auth/       # Authentication & login
│   ├── dashboard/  # Analytics & charts
│   ├── leads/      # Lead CRUD operations
│   ├── pipeline/   # Kanban board
│   └── settings/   # Profile settings
├── hooks/          # Custom React hooks
├── lib/            # Third-party configs
├── services/       # API & data layer
├── types/          # TypeScript definitions
└── utils/          # Helper functions
```

---

## 🔐 Permission Model

### Admin
- **Access:** User Management page only
- **Capabilities:** Create, update, delete users; assign roles
- **Restrictions:** No access to leads, pipeline, or dashboard

### Manager
- **Access:** Full CRM interface
- **Capabilities:** View ALL team leads, edit any lead, delete any lead
- **Features:** See lead ownership (who created each lead)
- **Dashboard:** Team-wide analytics

### Sales Rep
- **Access:** Full CRM interface
- **Capabilities:** View ONLY their own leads, edit own leads, delete own leads
- **Features:** Personal lead management
- **Dashboard:** Personal analytics only

---

## 🎨 Key Features in Detail

### Role-Based Lead Visibility
- Managers see **"Owner"** column showing who created each lead
- Sales reps only see leads they created
- Database-level security with Row Level Security (RLS)

### Real-Time Updates
- Instant synchronization across sessions
- Optimistic UI updates
- Automatic conflict resolution

### Dark Mode
- System preference detection
- Persistent user choice
- Smooth color transitions

---

## 📚 Additional Documentation

- **[QUICK_START.md](QUICK_START.md)** - Step-by-step setup guide
- **[CREATE_ADMIN_USER.md](CREATE_ADMIN_USER.md)** - Admin account creation
- **[supabase-schema.sql](supabase-schema.sql)** - Complete database schema
- **[cleanup-schema.sql](cleanup-schema.sql)** - Database reset script

---

## 🙏 Acknowledgments

Special thanks to **[@defaltastra](https://github.com/defaltastra)** for their invaluable contributions to the backend integration and database architecture.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Supabase**

[⬆ Back to Top](#-aress-crm)

</div>
