# ⚡ EV Route Finder

A fully responsive web app to find the best EV charging routes with turn-by-turn navigation, real-time traffic info, and smart station discovery. Built with modern React libraries and integrated with TomTom API — all with no backend involved.

---

## 🔑 Key Features

- **Multi-Mode Authentication**  
  Sign in via **username**, **phone OTP**, or **email OTP**  
  Add and manage multiple emails and phone numbers

- **Live Location Tracking**  
  Real-time user location with **Leaflet.js**

- **3D Experience**  
  Stunning 3D EV visuals using **@react-three/fiber**

- **Interactive UI/UX**  
  Powered by **Framer Motion** for smooth animations

- **EV Station Discovery**  
  Nearby charging station recommendations using **TomTom API**

- **Smart Routing**  
  Shows traffic delay, route type (shortest/fastest), estimated charging cost, and live turn-by-turn directions

- **Fully Client-Side**  
  No backend—everything runs on the frontend

---

## 🧰 Tech Stack

- **Frontend**: React, JavaScript, Tailwind CSS  
- **Maps & Navigation**: Leaflet.js, TomTom Maps API  
- **3D Rendering**: @react-three/fiber  
- **Animations**: Framer Motion  
- **Authentication**: Custom OTP flows (client-side mock)

---

## ⚙️ Getting Started

1. **Clone the repository**
    ```bash
    git clone https://github.com/AYAZ2006/ev-route-finder.git
    cd ev-route-finder
    ```

2. **Set Up Environment Variables**
    Create a `.env` file in the root folder and add your TomTom key:
    ```env
    VITE_TOMTOM_API_KEY=your_tomtom_api_key
    ```

3. **Install Dependencies and Start App**
    ```bash
    npm install
    npm start
    ```

---

## 🚀 Future Improvements

- Backend support for persistent authentication and storage  
- Push notifications for route alerts and charge status  
- Integration with EV manufacturer APIs  
- Voice-guided navigation  
- Multilingual UI support  
- EV compatibility filtering for stations
