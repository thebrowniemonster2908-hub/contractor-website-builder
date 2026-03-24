# Dev Servers Configuration

Your project has the following dev servers configured in `.claude/launch.json`:

## 🚀 Available Dev Servers

### 1. Contractor Website Builder (Frontend)
- **Name**: contractor-builder-dev
- **Command**: `npm run dev`
- **Port**: 5173
- **URL**: http://localhost:5173
- **What it does**: Runs Vite dev server with hot module reload
- **Status**: ✅ Ready to start

### 2. Leadox Expo Web (React Native Web)
- **Name**: leadox-expo-web
- **Command**: `npm run web`
- **Port**: 19000
- **What it does**: Runs Expo web development server
- **Status**: ✅ Can start if needed

### 3. Server Daemon (Backend)
- **Name**: server-daemon
- **Command**: `node daemon.js`
- **Port**: 3000
- **What it does**: Runs a Node.js daemon process
- **Status**: ✅ Can start if needed

## 📋 Quick Reference

To start a server, use:
```bash
npm run dev  # Start contractor-builder-dev
```

Or use the preview_start tool to launch by name.

## 🎯 For This Project

We recommend starting:
1. **contractor-builder-dev** - Essential (frontend development)
2. Others as needed for additional projects

The Contractor Website Builder is a complete SPA and doesn't require the other servers for basic functionality.
