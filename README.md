# React Native Form Exercises (Beginner Codebase)

This codebase contains all **8 Homework Form Exercises** implemented using React Native and Expo. It is designed specifically for beginners with clean, readable, and well-commented code that is easy to understand, demonstrate, and submit for grading.

---

## 🚀 How to Run the App

### Step 1: Open Terminal in the Project Directory
Make sure your terminal is inside this folder:
```bash
cd D:\Studies\JavaScript\Native\Homework2411
```

### Step 2: Start the Expo Development Server
Run:
```bash
npm start
```
*(or `npx expo start`)*

### Step 3: View & Test the App
Once the server starts, you will see a QR code and interactive options in your terminal:
- **On Your Mobile Phone (Recommended):**
  1. Install the free **Expo Go** app from Google Play Store or Apple App Store.
  2. Open Expo Go and scan the QR code displayed in the terminal (on iPhone, scan with Camera).
- **In Web Browser:**
  - Press `w` in your terminal to open in your web browser.
- **On Android Emulator:**
  - Press `a` in your terminal (if Android Studio is installed and emulator is running).

---

## 📁 Project Structure

```
Homework2411/
├── App.js                               # Main Navigator Menu with access to all 8 exercises
├── package.json                         # Dependencies & run scripts
├── README.md                            # Documentation and submission guide
└── src/
    └── exercises/
        ├── Exercise1_Registration.js         # Exercise #1: User Registration Form
        ├── Exercise2_StudentAdmission.js     # Exercise #2: Student Admission Form
        ├── Exercise3_BankingTransfer.js      # Exercise #3: Online Banking Transfer Form
        ├── Exercise4_HospitalAppointment.js  # Exercise #4: Hospital Appointment Form
        ├── Exercise5_JobApplication.js       # Exercise #5: Job Application Form
        ├── Exercise6_EcommerceCheckout.js    # Exercise #6: E-Commerce Checkout Form
        ├── Exercise7_EventRegistration.js    # Exercise #7: Event Registration Form
        └── Exercise8_PropertyRental.js       # Exercise #8: Property Rental Application
```

---

## 📋 Overview of All 8 Exercises

### Exercise #1: User Registration Form
* **Scenario:** User registration for creating a new account.
* **Fields:** Full Name (min 3 chars), Email (valid email format), Password (min 8 chars), Confirm Password (must match), Phone Number (valid format), Terms and Conditions (Switch control).
* **Key Features:** Error messages appear in red below each invalid field; blocks submission if invalid; shows success box upon valid submission.

### Exercise #2: Student Admission Form
* **Scenario:** Admission application for prospective students.
* **Fields:** Student Name, Date of Birth, Gender (selectable buttons), Nationality, Email, Phone, Previous School, Program (selectable cards), Academic Score (0–100).
* **Challenge Included:** Rejection rule if academic score is below **50**.

### Exercise #3: Online Banking Transfer Form
* **Scenario:** Mobile banking / money transfer form.
* **Fields:** Recipient Account Name, Account Number (numbers only), Amount (> 0), Currency (USD, EUR, GBP, RWF), Description (max 100 chars), PIN (exactly 4 digits, hidden).
* **Key Features:** Blocks submission on invalid values; shows a full **Transfer Confirmation Screen** before final completion.

### Exercise #4: Hospital Appointment Form
* **Scenario:** Patient consultation booking system.
* **Fields:** Patient Name, Phone Number, Email (optional but validated), Department & Doctor selection, Appointment Date, Appointment Time, Reason for Visit (min 10 characters).
* **Challenge Included:** Validates that the appointment date **cannot be in the past**.

### Exercise #5: Job Application Form
* **Scenario:** Candidate job application form.
* **Fields:** Full Name, Email, Phone, Position selection, Education Level, Years of Experience (≥ 0), Cover Letter (minimum 50 chars), CV attachment button.
* **Challenge Included:** Displays **"Application submitted successfully"** only when all validation checks pass.

### Exercise #6: E-Commerce Checkout Form
* **Scenario:** Online shopping checkout.
* **Fields:** Customer Name, Phone, Email, Delivery Address, City, Product Quantity, Payment Method (MOMO, Card, Cash), Delivery Option.
* **Challenge Included:** Displays **"Quantity must be greater than 0"** when 0 or negative quantities are given; generates complete order summary with computed totals.

### Exercise #7: Event Registration Form
* **Scenario:** Tech conference participant registration.
* **Fields:** Full Name, Email, Phone, Organization, Job Title, Attendance Type (Physical, Virtual, Hybrid), Number of Days (restricted between 1 and 3), Dietary requirements.
* **Challenge Included:** Displays structured registration summary:
  ```
  Registration Successful
  Name: [Name]
  Organization: [Org]
  Attendance: [Type]
  Days: [Days]
  ```

### Exercise #8: Property Rental Application Form
* **Scenario:** Tenant rental property application.
* **Fields:** Applicant Name, Phone, Email, Property Type, Number of Bedrooms (> 0), Property Monthly Rent, Monthly Income (> 0), Preferred Location, Move-in Date, Employment Status, Additional Information (max 250 characters).
* **Challenge Included:** Business rule enforcing that **Monthly Income must be at least 3 times the monthly rent**.

---

## 💡 Beginner Programming Concepts Used

1. **`useState` Hook:** Tracks each form field's text, selection, and error messages.
2. **Controlled Inputs:** `value={state}` and `onChangeText={setState}` on each `TextInput`.
3. **Form Validation Logic:** Clean `if-else` validation checks that set specific error messages in an `errors` object.
4. **Conditional Error Rendering:** `{errors.field && <Text style={styles.errorText}>{errors.field}</Text>}` renders red error labels underneath each field.
5. **Interactive Controls:** `Switch` for terms, selectable `TouchableOpacity` chips for gender, programs, and payment options.
