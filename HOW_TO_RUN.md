# How to Run the Application in the Web Browser

This project is fully configured to run directly in your **Web Browser** without needing a mobile phone or emulator.

---

## 🌐 Quickest Way: Run in Web Browser

### Step 1: Open Your Terminal
Open PowerShell, Command Prompt, or VS Code terminal in the project folder:
```bash
cd D:\Studies\JavaScript\Native\Homework2411
```

### Step 2: Start the Web App
Run:
```bash
npm run web
```
*(Or run `npx expo start --web`)*

### Step 3: Open in Browser
Expo will start Metro and automatically open your default browser at:
👉 **`http://localhost:8081`**

---

## 🧭 How to Test the Homework Exercises in Browser

Once loaded in your browser:
1. You will see the **Mobile Form Exercises** main menu.
2. Click on any exercise card to test it:
   - **Exercise #1:** User Registration Form (inputs, switch for terms, inline error validation)
   - **Exercise #2:** Student Admission Form (selectable buttons for gender & program, academic score ≥ 50 challenge)
   - **Exercise #3:** Online Banking Transfer Form (numeric account, PIN, full confirmation screen)
   - **Exercise #4:** Hospital Appointment Form (department & doctor selection, date cannot be in the past)
   - **Exercise #5:** Job Application Form (position, experience, mock CV attachment, success challenge)
   - **Exercise #6:** E-Commerce Checkout Form (quantity > 0 check, payment and delivery selection, order summary)
   - **Exercise #7:** Event Registration Form (attendance type, 1–3 days restriction, structured summary card)
   - **Exercise #8:** Property Rental Application Form (property type, income ≥ 3x rent business rule)
3. To return to the main menu at any time, click the **`← Back to Exercises`** button at the top.

---

## 📱 (Optional) Other Ways to Run
If you ever want to run with other methods:
- **Expo Go (Phone):** Run `npm start` and scan the terminal QR code with the Expo Go app.
- **Android Emulator:** Run `npm run android` with Android Studio open.

---

## 🛑 How to Stop the Server
When you're done testing, go to the terminal and press:
```bash
Ctrl + C
```
and type `Y` to confirm.
