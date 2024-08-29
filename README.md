GDSC Recruitment System
Welcome to the GDSC Recruitment System! This application is designed to streamline the recruitment process for the GDSC@TU Technical Core Team and other GDSC Core teams. It allows candidates to apply, complete forms, and track their application status.

Features
Customizable Faculty and Major Fields: Administrators can easily configure and update faculty and major options to match the current needs and offerings of the GDSC club.
Application Status Tracking: Applicants and administrators can track the status of applications, including draft saves, submission statuses, and completion stages.
Auto-Save and Debounced Submission: The form automatically saves progress locally and periodically syncs with the Supabase database to ensure data is not lost.
Dynamic Form Configuration: Form fields and sections are dynamically generated based on configuration files, allowing for easy updates and customizations.
User Authentication: Integrated with Supabase authentication to manage user access and ensure secure submission and tracking of applications.
Tech Stack
Supabase: Provides authentication, real-time database, and API services. Used for managing user data and application submissions.
Next.js: A React framework used for building the web application. It supports server-side rendering and static site generation, enhancing performance and SEO.
Bootstrap: Utilized for styling and responsive design, ensuring the application is visually appealing and accessible on various devices.
Getting Started
Clone the Repository

git clone https://github.com/your-repo/gdsc-recruitment-system.git
cd gdsc-recruitment-system
Install Dependencies

npm install
Set Up Environment Variables Create a .env.local file in the root directory and add your Supabase credentials:

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
Run the Development Server

npm run dev
Access the Application Open your browser and navigate to http://localhost:3000 to start using the application.


