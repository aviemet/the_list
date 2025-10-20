# Development Setup

## Offline Database Development

This project is configured for offline Supabase development. All database operations (migrations, seeding, testing) happen locally.

### Quick Start

1. **Setup Supabase locally:**

   ```bash
   yarn db:setup
   ```

2. **Start development:**

   ```bash
   yarn dev
   ```

### Available Commands

- `yarn db:setup` - Initial setup and start Supabase
- `yarn db:stop` - Stop Supabase services
- `yarn db:reset` - Reset database with migrations and seeds
- `yarn db:studio` - Open Supabase Studio (web interface)
- `yarn db:migration:new <name>` - Create new migration
- `yarn db:migration:up` - Apply migrations to remote
- `yarn supabase` - Start Supabase services
- `yarn dev` - Start both Supabase and Expo concurrently

### Local URLs

- **API**: <http://127.0.0.1:54321>
- **Studio**: <http://127.0.0.1:54323>
- **Emails**: <http://127.0.0.1:54324> (Inbucket)

### Environment Variables

Update your `.env` file with local Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=<get from `supabase status`>
```

### Database Schema

- **Migrations**: `supabase/migrations/` - Database schema changes
- **Seeds**: `supabase/seed.sql` - Test data for development
- **Config**: `supabase/config.toml` - Local Supabase configuration

### Development Workflow

1. **Create migrations** for schema changes:

   ```bash
   yarn supabase:migration:new add_user_preferences
   ```

2. **Reset database** to apply all migrations and seeds:

   ```bash
   yarn supabase:reset
   ```

3. **View data** in Supabase Studio:

   ```bash
   yarn supabase:studio
   ```

### Auth Testing

- Sign up new users through your app (emails go to Inbucket)
- View auth users in Supabase Studio → Authentication
- Test with different user roles and permissions

### Production Deployment

- Migrations are applied automatically via GitHub Actions
- Seeds are **NOT** run in production
- Use `yarn db:migration:up` to apply migrations to remote
