# Authentication System with Redux & Token Refresh

A authentication system built with Redux Toolkit, designed to handle token-based authentication seamlessly. This project features middleware for automatic token refresh, preventing race conditions via memoization, and automatic retries for failed requests. A demo page showcases real-time scenarios, including token expiration and refresh handling.

## Features

- Middleware to handle token refresh upon 401 errors.
- Memoized refresh request to prevent race conditions.
- Automatic logout if refresh token expires.
- Demo page for real-time request handling visualization.

## Installation

```bash
git clone https://github.com/mahdi1696/redux-refresh-token.git
cd redux-refresh-token
npm install
npm run dev
```
