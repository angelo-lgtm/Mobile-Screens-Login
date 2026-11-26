# React Native Form Exercises (Beginner Codebase)

This codebase contains all **8 Homework Form Exercises** implemented using React Native and Expo Router. Each exercise has its own route and URL, with beginner-friendly, readable code.

---

## 🚀 How to Run in Web Browser

```bash
cd D:\Studies\JavaScript\Native\Homework2411
npm run web
```

Then open any exercise URL in your browser (see [HOW_TO_RUN.md](./HOW_TO_RUN.md) for the full URL list):
- http://localhost:8081/exercise1 — Exercise #1: User Registration Form
- http://localhost:8081/exercise2 — Exercise #2: Student Admission Form
- http://localhost:8081/exercise3 — Exercise #3: Online Banking Transfer Form
- http://localhost:8081/exercise4 — Exercise #4: Hospital Appointment Form
- http://localhost:8081/exercise5 — Exercise #5: Job Application Form
- http://localhost:8081/exercise6 — Exercise #6: E-Commerce Checkout Form
- http://localhost:8081/exercise7 — Exercise #7: Event Registration Form
- http://localhost:8081/exercise8 — Exercise #8: Property Rental Application

---

## 📁 Project Structure

```
Homework2411/
├── app.json                                  # Expo configuration (with expo-router plugin)
├── package.json                              # Dependencies & scripts (main: expo-router/entry)
├── HOW_TO_RUN.md                             # Step-by-step run guide & page URLs
├── README.md                                 # Project overview
└── src/
    ├── app/                                  # Expo Router screens (1 file = 1 URL route)
    │   ├── _layout.js                        # Stack navigator layout
    │   ├── index.js                          # Redirects "/" to "/exercise1"
    │   ├── exercise1.js                      # Route: /exercise1
    │   ├── exercise2.js                      # Route: /exercise2
    │   ├── exercise3.js                      # Route: /exercise3
    │   ├── exercise4.js                      # Route: /exercise4
    │   ├── exercise5.js                      # Route: /exercise5
    │   ├── exercise6.js                      # Route: /exercise6
    │   ├── exercise7.js                      # Route: /exercise7
    │   └── exercise8.js                      # Route: /exercise8
    ├── components/
    │   └── ExerciseNav.js                    # Simple page links bar
    └── exercises/
        ├── Exercise1_Registration.js         # Exercise #1 form & validation
        ├── Exercise2_StudentAdmission.js     # Exercise #2 form & validation
        ├── Exercise3_BankingTransfer.js      # Exercise #3 form & validation
        ├── Exercise4_HospitalAppointment.js  # Exercise #4 form & validation
        ├── Exercise5_JobApplication.js       # Exercise #5 form & validation
        ├── Exercise6_EcommerceCheckout.js    # Exercise #6 form & validation
        ├── Exercise7_EventRegistration.js    # Exercise #7 form & validation
        └── Exercise8_PropertyRental.js       # Exercise #8 form & validation
```
