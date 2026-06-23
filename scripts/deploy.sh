#!/bin/bash
set -e

echo "🔨 Building concert-tracker..."
npm run build

echo "📦 Deploying to GitHub Pages..."
cd dist
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git remote add origin https://${GITHUB_TOKEN}@github.com/ame-1121/concert-tracker.git
git push -f origin gh-pages
cd ..
rm -rf dist/.git

echo "✅ Deployed to: https://ame-1121.github.io/concert-tracker/"
echo "⏳ GitHub Pages may take 1-2 minutes to update."
