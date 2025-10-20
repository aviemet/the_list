# Supabase Migrations Guide

## Local Development Workflow

### Initial Setup

1. **Link your local project to remote Supabase project:**

   ```bash
   yarn supabase:link
   ```

   You'll need your Supabase project ref (found in your project's dashboard URL).

2. **Start local Supabase:**

  ```bash
  yarn supabase
  ```

### Creating Migrations

1. **Create a new migration:**

   ```bash
   yarn supabase:migration:new <migration_name>
   ```

   This creates a new SQL file in `supabase/migrations/`.

2. **Edit the migration file:**
   Add your SQL statements to modify the database schema.

3. **Apply migrations locally:**

   ```bash
   yarn supabase:reset
   ```

   This resets your local database and applies all migrations plus seed data.

### Syncing with Remote

1. **Pull remote schema to local:**

   ```bash
   yarn supabase:pull
   ```

   Generates migration files based on remote database changes.

2. **Push migrations to production:**
   Migrations are automatically applied when you push to the `main` branch via GitHub Actions.

## Production Deployment

### GitHub Actions Setup

The project uses GitHub Actions to automatically apply migrations when changes are pushed to `main`.

**Required GitHub Secrets:**

1. **SUPABASE_ACCESS_TOKEN:**
   - Generate by running `supabase login` locally
   - Copy the access token
   - Add as repository secret in GitHub Settings > Secrets and variables > Actions

2. **SUPABASE_PROJECT_REF:**
   - Found in your Supabase dashboard URL: `https://supabase.com/dashboard/project/<project-ref>`
   - Add as repository secret in GitHub Settings > Secrets and variables > Actions

### Workflow Behavior

- Triggers only when migration files change in `supabase/migrations/`
- Automatically applies migrations to production
- `seed.sql` is NOT applied in production (local development only)

## Best Practices

1. **Always test migrations locally first:**

   ```bash
   yarn supabase:reset
   ```

2. **Use descriptive migration names:**

   ```bash
   yarn supabase:migration:new create_users_table
   ```

3. **Keep migrations small and focused:**
   One logical change per migration.

4. **Never edit existing migrations:**
   Create a new migration to modify previous changes.

5. **Seed data is for local development only:**
   Edit `supabase/seed.sql` for test data that won't affect production.

## Troubleshooting

- **Local reset fails:** Check `supabase/logs/` for errors
- **Migration syntax errors:** Validate SQL before committing
- **Production deployment fails:** Check GitHub Actions logs for details
