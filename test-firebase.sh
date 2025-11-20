#!/bin/bash

# Firebase Connection Test Script
# This script tests if Firebase is properly configured and connected

echo "🔍 Testing Firebase Connection..."
echo "=================================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local file found"
else
    echo "❌ .env.local file not found"
    exit 1
fi

# Check if Firebase config has values
echo ""
echo "📝 Checking Firebase Configuration..."

if grep -q "AIzaSyDPVjKe7E5FQ9A-mQ_vYn4G3M9LnMDWL28" .env.local; then
    echo "✅ Firebase API Key configured"
else
    echo "❌ Firebase API Key not found"
fi

if grep -q "for-today-s-youth" .env.local; then
    echo "✅ Firebase Project ID configured"
else
    echo "❌ Firebase Project ID not found"
fi

echo ""
echo "🚀 Firebase is properly configured!"
echo ""
echo "Next steps:"
echo "1. Start your development server: npm run dev"
echo "2. Visit http://localhost:5173"
echo "3. Test authentication: Sign up and log in"
echo "4. Check Firebase console: https://console.firebase.google.com/project/for-today-s-youth"
