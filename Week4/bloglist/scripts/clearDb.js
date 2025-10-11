#!/usr/bin/env node
/**
 * scripts/clearDb.js
 *
 * Connects to the same DB as the app and removes all documents from the
 * `blogs` and `users` collections. THIS IS DESTRUCTIVE. The script asks
 * for a confirmation before proceeding.
 *
 * Usage:
 *  node scripts/clearDb.js
 * or from project root:
 *  npm run clear-db
 */

require('dotenv').config()
const readline = require('readline')
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bloglist'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const confirm = (question) => new Promise((resolve) => {
  rl.question(question, (answer) => {
    resolve(answer.trim().toLowerCase())
  })
})

;(async function main(){
  try {
    const answer = await confirm(`This will DELETE ALL documents in DB at ${MONGODB_URI}. Type 'yes' to continue: `)
    if (answer !== 'yes') {
      console.log('Aborted. No changes made.')
      process.exit(0)
    }

    console.log('Connecting to', MONGODB_URI)
    await mongoose.connect(MONGODB_URI)

    const blogResult = await mongoose.connection.db.collection('blogs').deleteMany({})
    const userResult = await mongoose.connection.db.collection('users').deleteMany({})

    console.log(`Deleted ${blogResult.deletedCount} documents from 'blogs'`)
    console.log(`Deleted ${userResult.deletedCount} documents from 'users'`)

    await mongoose.disconnect()
    console.log('Done.')
    rl.close()
    process.exit(0)
  } catch (err) {
    console.error('Error while clearing DB:', err)
    rl.close()
    process.exit(1)
  }
})()
