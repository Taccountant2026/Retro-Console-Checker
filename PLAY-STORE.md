# Retro Console Checker — Google Play Release

## Android identity
- App name: Retro Console Checker
- Package ID: `uk.retroreplay.consolechecker`
- Version: 1.0.0 (1)
- Target SDK: 36
- Minimum SDK: 23
- Web origin: `https://taccountant2026.github.io/Retro-Console-Checker/`
- Delivery architecture: Trusted Web Activity / PWA

## Build
1. Install a current JDK, Android SDK and Bubblewrap CLI.
2. Initialise the Android project from the production web manifest / `android/twa-manifest.json`.
3. Generate the release signing key and keep it private. Never commit a keystore or passwords.
4. Build and test the release bundle.
5. Upload the Android App Bundle to Play Console internal testing.
6. Enable Play App Signing.

## Domain verification
After Play Console provides the **App signing key certificate SHA-256 fingerprint**:
1. Copy `.well-known/assetlinks.json.template` to `.well-known/assetlinks.json`.
2. Replace the placeholder with the Play app-signing SHA-256 fingerprint.
3. Deploy it and confirm it is available over HTTPS without a redirect.
4. Test Android domain verification / App Links.

Do not invent the fingerprint or use an unrelated debug certificate for production.

## Store listing draft
**App name:** Retro Console Checker

**Short description:** Identify, compare and save retro console hardware models.

**Full description:**
Retro Console Checker is a retro hardware identification and reference app from RetroReplay UK. Search model numbers, browse console families, compare hardware revisions and save consoles to your personal collection on your device.

The database is UK/PAL-first and includes hardware from PlayStation, Nintendo, Xbox, Sega and Atari. Model pages highlight identifying details, media formats, connections and practical used-hardware checks.

Features include model-code search, console-family browsing, side-by-side comparison, My Collection, shareable model links and offline access to cached app data. No account is required for the core experience.

Always confirm hardware using the physical manufacturer model label. Regional specifications and internal revisions can differ.

## Data Safety baseline
Current core application design:
- no account required
- My Collection stored locally on device/browser
- no location permission
- no contacts permission
- no microphone permission
- no SMS/call-log permission
- no advertising SDK intentionally included
- no analytics intentionally included

Re-check the final Android package and every third-party dependency before answering Play Console Data Safety questions.

## Listing assets still required
- production app icon (512 × 512)
- adaptive/maskable launcher artwork
- feature graphic (1024 × 500)
- phone screenshots from the final Android build
- optional tablet screenshots

## Release gates
- PWA installs and works offline
- no JavaScript errors in primary flows
- search, browse, collection, compare and sharing tested
- privacy URL publicly accessible
- assetlinks verification passes
- release AAB signed / Play App Signing configured
- internal-test build tested on real Android device
- store listing accurately represents the app
- content rating and Data Safety completed from actual final build
