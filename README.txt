Sanad Crypto Tracker - Navigation Stage 1

1. Copy App.tsx to the root of your project.
2. Copy the src folder and allow replacement of the current placeholder files.
3. Open package.json and change:
   "main": "expo-router/entry"
   to:
   "main": "expo/AppEntry"
4. Stop Expo with Ctrl + C.
5. Start again with:
   npx expo start --clear

This first stage adds:
- Native Stack Navigation
- Bottom Tab Navigation
- Drawer Navigation
- Seven simple placeholder screens
