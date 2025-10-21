# Supabase Edge Functions

## Setup

### 1. Install Supabase CLI

If you haven't already:

```bash
brew install supabase/tap/supabase
```

### 2. Set Up API Keys as Secrets

API keys are stored securely in Supabase secrets (NOT in environment files).

#### For Local Development

Create a `.env` file in `supabase/functions/.env`:

```bash
OMDB_API_KEY=ce78399d
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

**Note:** The `supabase/functions/.env` file should be in `.gitignore` and never committed.

#### For Production

Set secrets using the Supabase CLI:

```bash
supabase secrets set OMDB_API_KEY=ce78399d
supabase secrets set GOOGLE_BOOKS_API_KEY=your_google_books_api_key
supabase secrets set SPOTIFY_CLIENT_ID=your_spotify_client_id
supabase secrets set SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

Or via the Supabase Dashboard:

1. Go to your project settings
2. Navigate to Edge Functions → Secrets
3. Add each secret

### 3. Deploy the Function

Deploy to production:

```bash
supabase functions deploy search-media
```

Test locally:

```bash
supabase functions serve search-media
```

### 4. Test the Function

```bash
curl -X POST 'http://localhost:54321/functions/v1/search-media' \
  -H 'Content-Type: application/json' \
  -d '{"query": "inception", "mediaTypes": ["movie"], "limit": 10}'
```

## Available Functions

### search-media

Searches across multiple media sources (OMDB, Google Books, Spotify) and returns unified results.

**Request:**

```typescript
{
  query: string
  mediaTypes?: ("movie" | "tv" | "book" | "music")[]
  limit?: number
}
```

**Response:**

```typescript
Array<{
  id: string
  title: string
  subtitle?: string
  year?: string
  posterUrl?: string
  description?: string
  mediaType: "movie" | "tv" | "book" | "music"
  externalId: string
  externalSource: string
}>
```

## API Keys Needed

- **OMDB**: <http://www.omdbapi.com/apikey.aspx> (Free tier: 1,000 requests/day)
- **Google Books**: <https://console.cloud.google.com/apis/credentials>
- **Spotify**: <https://developer.spotify.com/dashboard> (Create an app)
