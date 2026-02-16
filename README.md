# UPMRC Admin Operations & Ticketing Dashboard

A robust, responsive web-based administrative interface developed during my internship at **Uttar Pradesh Metro Rail Corporation (UPMRC)**. This dashboard is designed to streamline internal operations, track equipment maintenance, and manage service tickets across various departments.

## 📋 Project Overview
This project serves as a centralized "Super Admin" hub for UPMRC staff to monitor work statuses, manage user/admin roles, and track technical issues through a structured ticketing system. It features a clean, professional UI with dark mode support and real-time data visualization.

## ✨ Key Features
* **Operational Overview**: Dynamic cards showing counts for Pending, Program, Closed, and Resolved tickets.
* **Work Status Analytics**: Integrated **Chart.js** pie charts for visual representation of task distribution.
* **Ticketing System**: Separate modules for raising, tracking, and managing the lifecycle of technical issues.
* **User & Asset Management**: Dedicated interfaces for "All Users," "All Admin," and detailed "Equipment/Asset" tracking (including serial numbers and ownership status).
* **Responsive Design**: Fully mobile-responsive sidebar and navigation built with CSS Grid and Flexbox.
* **Personalized Profile**: Secure Account Info section displaying Employee ID, Role, and Department details.

## 🛠️ Tech Stack
* **Frontend**: HTML5, CSS3 (Custom Variables, Flexbox, Grid)
* **Interactivity**: Vanilla JavaScript (ES6+)
* **Data Visualization**: Chart.js
* **Icons**: FontAwesome 6.4, Boxicons 2.0.9
* **Fonts**: Google Fonts (Poppins & Lato)

## 📂 File Structure
* `index.html` - Main Dashboard & Status Overview
* `all_users.html` / `all_admin.html` - Management tables for personnel
* `equipment-details.html` - Asset tracking interface
* `ticket-raising.html` - Form for submitting new service requests
* `script.js` - Handles sidebar toggles, theme switching, and Chart.js logic
* `style.css` - Custom styling with support for Dark Mode
