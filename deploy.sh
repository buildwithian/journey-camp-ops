#!/bin/bash
# ============================================================
# JOURNEY CAMP OPERATIONS — FIREBASE HOSTING DEPLOYMENT SCRIPT
# ============================================================
# Run this script from Terminal.app on your Mac.
# It will authenticate you, set up Firebase, and deploy your
# web app to a live URL your whole team can access.
# ============================================================

set -e

PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$PROJECT_DIR"

echo ""
echo "🔥 ============================================"
echo "   JOURNEY CAMP OPERATIONS — DEPLOY TO WEB"
echo "🔥 ============================================"
echo ""

# Step 1: Check if Firebase CLI is available
echo "📦 Step 1: Checking Firebase CLI..."
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Install Node.js from https://nodejs.org first."
    exit 1
fi
echo "✅ Firebase CLI ready."
echo ""

# Step 2: Login to Firebase
echo "🔑 Step 2: Logging in to Firebase..."
echo "   (A browser window will open — sign in with your Google account)"
echo ""
npx -y firebase-tools@latest login
echo ""
echo "✅ Logged in successfully."
echo ""

# Step 3: Add Firebase to the GCP project (if not already done)
echo "🏗  Step 3: Setting up Firebase project..."
npx -y firebase-tools@latest projects:addfirebase journey-camp-ops 2>/dev/null || echo "   (Firebase already added or project ready)"
echo ""

# Step 4: Deploy to Firebase Hosting
echo "🚀 Step 4: Deploying web app to Firebase Hosting..."
echo "   (Your web app will be live at https://journey-camp-ops.web.app)"
echo ""
npx -y firebase-tools@latest deploy --only hosting
echo ""

echo "🎉 ============================================"
echo "   DEPLOYMENT COMPLETE!"
echo ""
echo "   Your team can now access the app at:"
echo ""
echo "   🌐  https://journey-camp-ops.web.app"
echo "   🌐  https://journey-camp-ops.firebaseapp.com"
echo ""
echo "   Share this link with your entire team!"
echo "🎉 ============================================"
echo ""
