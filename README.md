# NewsApp

A cross-platform mobile news application built with **React Native** and **Expo**. The app delivers a clean, modern reading experience for news across Android, iOS, and Web from a single codebase.

![Expo](https://img.shields.io/badge/Expo-54.0-black?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Building for Production](#-building-for-production)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About the Project

**NewsApp** is a mobile-first news reader built as a learning project to explore modern cross-platform development with Expo and React Native. It demonstrates navigation, theming, and component-based architecture using industry-standard tools.

The app is designed with a clean separation between navigation, screens, and reusable UI components, making it easy to extend with a real news API later.

---

## ✨ Features

- 📰 **Multi-screen navigation** — Built with Expo Router for file-based routing
- 🎨 **Material Design UI** — Using React Native Paper components
- 🌗 **Dark/Light mode** — Automatically follows system theme
- 📱 **Cross-platform** — Runs on Android, iOS, and Web from one codebase
- ⚡ **Fast refresh** — Instant reload during development
- 🔤 **Custom fonts** — Loaded via Expo Font
- 🎯 **TypeScript** — Fully typed for safety and autocomplete
- 🧭 **Tab & Stack navigation** — React Navigation under the hood

---

## 🛠 Tech Stack

### Core
| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo** | Development platform and tooling |
| **TypeScript** | Type-safe JavaScript |
| **Expo Router** | File-based navigation |

### UI & Navigation
| Technology | Purpose |
|------------|---------|
| **React Native Paper** | Material Design components |
| **React Navigation** | Tab and stack navigation |
| **Expo Vector Icons** | Icon library |
| **React Native Reanimated** | Smooth animations |
| **React Native Gesture Handler** | Touch gestures |

### Development Tools
| Tool | Purpose |
|------|---------|
| **ESLint** | Code quality and consistency |
| **Expo CLI** | Build and run commands |

---

## 📁 Project Structure
NewsApp/
│
├── app/ # Expo Router screens (file-based routing)
│ ├── (tabs)/ # Tab navigation group
│ ├── _layout.tsx # Root layout
│ └── ...
│
├── assets/ # Images, fonts, icons
│ ├── images/
│ └── fonts/
│
├── components/ # Reusable UI components
│
├── constants/ # Colors, config, theme
│
├── hooks/ # Custom React hooks
│
├── scripts/ # Helper scripts (e.g. reset-project)
│
├── app.json # Expo configuration
├── package.json
├── tsconfig.json
├── eslint.config.js
├── expo-env.d.ts
└── README.md

text

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app on your phone **(optional, for quick testing)**
- [Android Studio](https://developer.android.com/studio) *(optional, for Android emulator)*
- [Xcode](https://developer.apple.com/xcode/) *(optional, for iOS simulator — macOS only)*

### 1. Clone the repository

```bash
git clone https://github.com/AshaJama-lab/NewsApp.git
cd NewsApp