# GDSC Recruitment System
![image](https://github.com/user-attachments/assets/872a9aac-2d95-404e-a43e-50ad196802d8)

## Overview

The GDSC Recruitment System is a web application designed to streamline the recruitment process for the GDSC club. Built with Next.js and Supabase, this system allows for custom configuration of faculties and majors, tracks application statuses, and provides a seamless experience for both applicants and administrators.

## Features

- **Customizable Faculty and Major Fields**: Administrators can easily configure and update faculty and major options to match the current needs and offerings of the GDSC club.
- **Application Status Tracking**: Applicants and administrators can track the status of applications, including draft saves, submission statuses, and completion stages.
- **Auto-Save with localstorage**: The form automatically saves progress locally.
- **Dynamic Form Configuration**: Form fields and sections are dynamically generated based on configuration files, allowing for easy updates and customizations.
- **User Authentication**: Integrated with Supabase authentication to manage user access and ensure secure submission and tracking of applications.

## Tech Stack

- **Supabase**: Provides authentication, real-time database, and API services. Used for managing user data and application submissions.
- **Next.js**: A React framework used for building the web application. It supports server-side rendering and static site generation, enhancing performance and SEO.
- **Bootstrap**: Utilized for styling and responsive design, ensuring the application is visually appealing and accessible on various devices.

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/gdsc-recruitment-system.git
   cd gdsc-recruitment-system
   ```
2. **Install dependencies**
   ```bash
   pnpm instal
   ```
3. **Set Up Environment Variables Create a .env.local file in the root directory and add your Supabase credentials**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. **Run development Server**
   ```bash
   pnpm run dev
   ```
