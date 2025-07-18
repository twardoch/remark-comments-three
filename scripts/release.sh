#!/bin/bash
# this_file: scripts/release.sh

set -e

# Check if we're on a git tag
if ! git describe --exact-match --tags HEAD >/dev/null 2>&1; then
    echo "❌ Not on a git tag. Releases can only be created from tags."
    echo "💡 Create a tag first: git tag v1.0.0 && git push origin v1.0.0"
    exit 1
fi

# Get the current tag
TAG=$(git describe --exact-match --tags HEAD)
echo "🏷️  Creating release for tag: $TAG"

# Run full build process
echo "🔧 Running full build process..."
./scripts/build.sh

# Check if this is a pre-release
if [[ $TAG =~ -alpha|-beta|-rc ]]; then
    PRERELEASE="--prerelease"
    echo "🚀 This is a pre-release"
else
    PRERELEASE=""
    echo "🚀 This is a stable release"
fi

# Create GitHub release (if gh CLI is available)
if command -v gh &> /dev/null; then
    echo "📄 Creating GitHub release..."
    
    # Extract version from tag (remove 'v' prefix if present)
    VERSION=${TAG#v}
    
    # Create release notes from changelog
    if [ -f "CHANGELOG.md" ]; then
        echo "📋 Extracting release notes from CHANGELOG.md..."
        # Try to extract the section for this version
        RELEASE_NOTES=$(awk "/^## \[${VERSION}\]/ {flag=1; next} /^## \[/ && flag {flag=0} flag" CHANGELOG.md)
        
        if [ -z "$RELEASE_NOTES" ]; then
            RELEASE_NOTES="Release $VERSION"
        fi
    else
        RELEASE_NOTES="Release $VERSION"
    fi
    
    # Create the release
    echo "$RELEASE_NOTES" | gh release create "$TAG" \
        --title "Release $VERSION" \
        --notes-file - \
        $PRERELEASE \
        dist/* \
        package.json \
        README.md \
        LICENSE
    
    echo "🎉 GitHub release created successfully!"
else
    echo "⚠️  GitHub CLI not found. Please install 'gh' to create releases automatically."
    echo "📦 Build artifacts are ready in the dist/ directory"
fi

echo "✅ Release process completed!"