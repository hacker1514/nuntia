# Nuntia — Modern WhatsApp-Style Cellular SMS Messenger

[![Flutter](https://img.shields.io/badge/Flutter-3.47.2-02569B?logo=flutter)](https://flutter.dev)
[![Dart](https://img.shields.io/badge/Dart-3.13.2-0175C2?logo=dart)](https://dart.dev)
[![Kotlin](https://img.shields.io/badge/Kotlin-Android%20Native-7F52FF?logo=kotlin)](https://kotlinlang.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Android%205.0%2B-3DDC84?logo=android)](https://developer.android.com)

**Nuntia** is a modern, privacy-focused, local-first Android text messaging application built with **Flutter/Dart** and a native **Kotlin SMS bridge**. Styled after the high-class WhatsApp interface, Nuntia uses carrier cellular SMS as its transport medium without requiring internet connections, cloud backends, user registration, or tracking.

Developed by **Niranjan Kumar K**.

---

## 🌟 Key Features

- 📱 **WhatsApp Aesthetic**: Emerald Teal (`#075E54` / `#25D366`) & Dark (`#111B21`) themes, chat wallpaper, double checkmark indicators, and floating green `+` action buttons.
- 📶 **100% Offline Transport**: Operates entirely over phone carrier cellular SMS signals. No Wi-Fi or mobile data required.
- 🔒 **Local-First & Private**: Messages and contacts stored exclusively on device using indexed SQLite tables (`sqflite`). Zero cloud sync or analytics.
- ⚡ **Single-Tap Onboarding**: Single-card onboarding with a unified **"Grant"** button to set Nuntia as the system Default SMS App.
- 👥 **Contact Management**: Create new chats with Name & Phone Number, edit existing contact names, and manage threads effortlessly.
- 💬 **Multi-Part SMS**: Seamlessly sends and receives long text messages via Android native `SmsManager.sendMultipartTextMessage`.
- 🔔 **Heads-Up Notifications**: Background `SmsReceiver.kt` reassembles incoming messages and triggers native Android notifications.
- 🚀 **Zero-Glitch Dashboard**: Optimized Flutter state repositories eliminate screen flashes when navigating between chats and the conversation list.

---

## 📱 Screenshots & UI

| Conversation Dashboard | Chat Experience | Default SMS Grant |
| :---: | :---: | :---: |
| WhatsApp style list tiles with last message timestamp & unread count | Bubble thread layout with status checkmarks & clear/delete options | Single-tap default app role permission setup |

---

## 🏗️ Architecture & Technology Stack

- **Frontend & State**: Flutter 3.47.2 / Dart 3.13.2 (Material 3, `ValueNotifier`, `InheritedWidget` state repository)
- **Local Storage**: SQLite via `sqflite` (Indexed `conversations` & `messages` tables)
- **Native Android Bridge**:
  - `MainActivity.kt` — MethodChannel for sending SMS & checking/requesting Default SMS Role
  - `SmsReceiver.kt` — BroadcastReceiver for incoming cellular SMS reassembly & notifications
  - `HeadlessSmsSendService.kt` — System default SMS handler registration

---

## 📥 Download & Live Demo Website

The publishing landing page and APK file are available in the repository's `web_page/` directory:

- **Web Landing Page**: [`View`](https://hacker1514.github.io/nuntia)
- **Android APK**: [`APK Direct Link`](https://github.com/hacker1514/nuntia/releases/download/v1.0.0/nuntia.apk)
- **GitHub Repository**: [REPO](https://github.com/hacker1514/nuntia)

---

## 🛠️ Building & Running Locally

### Prerequisites
- [Flutter SDK](https://flutter.dev/docs/get-started/install) 3.47.2 or higher
- Android SDK 34+ (Target SDK)
- An Android device or emulator running Android 5.0 (API level 21) or higher

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hacker1514/nuntia.git
   cd nuntia
   ```

2. **Install Flutter dependencies**:
   ```bash
   flutter pub get
   ```

3. **Run on a connected Android device**:
   ```bash
   flutter run -d <device_id>
   ```

4. **Build APK**:
   ```bash
   flutter build apk --debug
   ```

---

## 🔑 Required Android Permissions

- `android.permission.SEND_SMS`
- `android.permission.RECEIVE_SMS`
- `android.permission.READ_SMS`
- `android.permission.POST_NOTIFICATIONS`
- `android.permission.READ_CONTACTS`

---

## 📄 License & Credits

Created with ❤️ by **Niranjan Kumar K**.
Released under the [MIT License](LICENSE).
