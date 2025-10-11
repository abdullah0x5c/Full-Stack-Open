require('dotenv').config()

// Provide sane defaults for local development while still allowing
// production values from environment variables.
const PORT = process.env.PORT || 3001

// Default to a local MongoDB instance. If you intend to use a hosted
// MongoDB (Atlas etc.) set MONGODB_URI in your environment or in a .env file.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bloglist'

// SECRET should be set in production. For local development a default is provided
// but consider setting a secure value in .env or your hosting environment.
const SECRET = process.env.SECRET || 'dev-secret'

// Helpful warning if user hasn't set critical environment variables
if (!process.env.MONGODB_URI) {
	// Note: we still provide a default to keep local development easy,
	// but log a visible warning so the developer can configure production env.
	// eslint-disable-next-line no-console
	console.warn('Warning: MONGODB_URI not set — using default mongodb://localhost:27017/bloglist')
}

module.exports = {PORT, MONGODB_URI, SECRET}