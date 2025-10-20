# The List

A cross-platform mobile application for creating, managing, and sharing lists of media recommendations and interests.

## Overview

The List helps you track movies, TV shows, books, comics, songs, and albums you want to watch, read, or listen to. Create curated lists, share them with friends, and discover where to find each item across streaming and retail platforms.

## Features

- **Multi-media Support**: Create lists for movies, TV shows, books, comics, songs, and albums
- **List Sharing**: Share your curated lists with friends and family
- **Direct Links**: Items link directly to platforms where they can be accessed
- **Cross-platform**: Works on iOS, Android, and web

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase PostgreSQL
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: TanStack Query (React Query)

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn
- Expo CLI

### Developer Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd the_list
   ```

2. Install dependencies

   ```bash
   yarn install
   ```

3. Set up environment variables (see `.env.example`)

4. Start the development server

   ```bash
   yarn start
   ```

5. Run on your platform of choice
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## Database

This project uses Supabase for backend services. Database migrations are managed in the `supabase/migrations` directory. See `supabase/MIGRATIONS.md` for details on running and creating migrations.

## Project Structure

- `/app` - Main application screens using Expo Router file-based routing
- `/components` - Reusable UI components
- `/features` - Feature-specific components and logic
- `/lib` - Shared utilities and configurations
- `/queries` - React Query hooks for data fetching
- `/supabase` - Database migrations and configuration
