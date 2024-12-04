# expo-booboo

A simple, bare-bones copy of a work-in-progress application that started surfacing a "No usable data found" error when scanning the QR code.

Pre-requisites:
1. iOS device
1. Expo Go installed (version 52)

**At the moment, we have only been able to confirm the issue on iOS, but it may also affect Android.** I have an active question for this exact
issue on Stack Overflow here:
* https://stackoverflow.com/questions/79246758/scanning-qr-code-on-ios-suddenly-results-in-no-usable-data-found-message

## Running the app

From the project root:
1. Run `yarn` to install dependencies
1. Run `yarn start` to run the application (uses `expo start --dev-client`)

## Replicating the issue

Continuing from the "Running the app" steps...
1. Attempt to scan the QR code in the iOS Camera application
1. Note the "No usable data found" error > the QR code does nothing when tapped

## Workaround

I've found a way to workaround the issue for now, which at least gets the app linked up to the dev tunnel in Expo Go.

Again, continuing from the "Running the app" steps...
1. Press `s` to switch from development mode to Go mode (or, start the app using `npx expo start --go`)
1. Scan the QR code using the iOS Camera application > tap it to open the link in your device's default browser
1. In the "How would you like to open this project?" prompt, select "Expo Go"
1. On my device, I get a prompt asking if I want to allow it to open Expo Go - after accepting, it seems to be linked up to the dev tunnel
