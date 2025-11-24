# Firebase Users Collection Implementation

## Overview

This document explains the Firebase Firestore implementation for the "For Today's Youth" platform, specifically the Users collection structure and signup functionality.

---

## Database Structure

### Firebase Authentication
- **Provider**: Email & Password
- **Fields stored in Firebase Auth**:
  - Email Address
  - Password (encrypted)

### Firestore Collection: "Users"
- **Document ID**: Email Address (used as the unique identifier)
- **Location**: `Users/{emailAddress}`

### Firestore Document Fields

Each user document in the "Users" collection contains:

```javascript
{
  uid: string,                              // Firebase Authentication UID
  email: string,                            // User's email address
  fullName: string,                         // Full Name
  educationLevel: string,                   // Current Education Level (12th, Diploma, Bachelor's, Master's, PhD)
  careerInterests: string,                  // Career Interests
  skills: string[],                         // Array of skills (comma-separated)
  languages: string[],                      // Array of languages (comma-separated)
  programmingLanguages: string[],           // Array of programming languages
  workExperience: string,                   // Work experience description
  extracurricularActivities: string[],      // Array of extracurricular activities
  qualifications: object,                   // Object for qualifications
  interests: string[],                      // Array of interests
  profileComplete: boolean,                 // Flag indicating if profile is complete
  createdAt: timestamp,                     // Account creation timestamp
  updatedAt: timestamp                      // Last update timestamp
}
```

---

## Implementation Functions

### 1. Registration Function: `registerUser()`

**Location**: `src/services/authService.js`

**Purpose**: Creates a new Firebase Authentication user and stores their profile in Firestore.

**Signature**:
```javascript
registerUser(email, password, profileData)
```

**Parameters**:
- `email` (string): User's email address
- `password` (string): User's password (minimum 6 characters)
- `profileData` (object): Profile information containing:
  - fullName
  - educationLevel
  - careerInterests
  - skills (array)
  - languages (array)
  - programmingLanguages (array)
  - workExperience
  - extracurricularActivities (array)
  - etc.

**Return**:
```javascript
{
  success: boolean,
  user: {
    uid: string,
    email: string,
    displayName: string
  },
  message: string
}
```

**Flow**:
1. Creates Firebase Authentication user with email & password
2. Updates Firebase Auth user's display name
3. Creates Firestore document in "Users" collection with **email as document ID**
4. Stores all profile fields in the document
5. Returns success/error response

**Example Usage**:
```javascript
const profileData = {
  fullName: "John Doe",
  educationLevel: "bachelor",
  careerInterests: "Web Development",
  skills: ["JavaScript", "React", "Node.js"],
  languages: ["English", "Hindi"],
  programmingLanguages: ["JavaScript", "Python"],
  workExperience: "2 years as Frontend Developer",
  extracurricularActivities: ["Coding", "Robotics"]
};

const result = await registerUser(
  "john@example.com",
  "securePassword123",
  profileData
);

if (result.success) {
  console.log("User registered:", result.user);
} else {
  console.log("Error:", result.message);
}
```

---

### 2. Create Profile with Email ID: `createUserProfileWithEmailId()`

**Location**: `src/services/authService.js`

**Purpose**: Creates a Firestore document in the "Users" collection using email as the document ID.

**Signature**:
```javascript
createUserProfileWithEmailId(email, userData)
```

**Parameters**:
- `email` (string): User's email address (used as document ID)
- `userData` (object): All user profile data

**Return**:
```javascript
{
  success: boolean,
  error?: string
}
```

**Example**:
```javascript
await createUserProfileWithEmailId("john@example.com", {
  uid: "firebase-uid-123",
  email: "john@example.com",
  fullName: "John Doe",
  educationLevel: "bachelor",
  // ... other fields
});
```

---

### 3. Get Profile by Email: `getUserProfileByEmail()`

**Location**: `src/services/authService.js`

**Purpose**: Retrieves a user's profile from Firestore using their email address.

**Signature**:
```javascript
getUserProfileByEmail(email)
```

**Parameters**:
- `email` (string): User's email address

**Return**:
```javascript
{
  success: boolean,
  data?: object,        // User profile data
  message?: string      // Error message if failed
}
```

**Example**:
```javascript
const result = await getUserProfileByEmail("john@example.com");

if (result.success) {
  console.log("User profile:", result.data);
  console.log("Skills:", result.data.skills);
  console.log("Education:", result.data.educationLevel);
}
```

---

### 4. Update Profile by Email: `updateUserProfileByEmail()`

**Location**: `src/services/authService.js`

**Purpose**: Updates a user's profile in Firestore using their email address.

**Signature**:
```javascript
updateUserProfileByEmail(email, userData)
```

**Parameters**:
- `email` (string): User's email address
- `userData` (object): Fields to update

**Return**:
```javascript
{
  success: boolean,
  error?: string
}
```

**Example**:
```javascript
const result = await updateUserProfileByEmail("john@example.com", {
  skills: ["JavaScript", "React", "Node.js", "MongoDB"],
  profileComplete: true,
  careerInterests: "Full Stack Development"
});

if (result.success) {
  console.log("Profile updated successfully");
}
```

---

## SignUp Page Implementation

### File: `src/pages/SignUpPage.jsx`

### Form Fields Collected

1. **Full Name** * (required)
2. **Email Address** * (required)
3. **Password** * (required, min 6 chars)
4. **Confirm Password** * (required)
5. **Current Education Level** (select)
6. **Career Interests** (text)
7. **Skills** (comma-separated)
8. **Languages** (comma-separated)
9. **Programming Languages** (comma-separated)
10. **Work Experience** (text area)
11. **Extracurricular Activities** (comma-separated)

### Form Validation

```javascript
// Validates:
- Full Name: Required, minimum 3 characters
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Confirm Password: Required, must match password
```

### Form Submission Flow

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Validate form
  if (!validateForm()) return;

  setLoading(true);

  try {
    // 2. Prepare profile data
    const profileData = {
      fullName: formData.fullName,
      email: formData.email,
      educationLevel: formData.educationLevel,
      careerInterests: formData.careerInterests,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      languages: formData.languages.split(',').map(l => l.trim()).filter(l => l),
      programmingLanguages: formData.programmingLanguages.split(',').map(p => p.trim()).filter(p => p),
      workExperience: formData.workExperience,
      extracurricularActivities: formData.extracurricularActivities.split(',').map(a => a.trim()).filter(a => a),
      qualifications: {},
      interests: [],
      profileComplete: false,
    };

    // 3. Call registerUser function
    const authResult = await registerUser(
      formData.email,
      formData.password,
      profileData
    );

    // 4. Handle result
    if (authResult.success) {
      toast.success('Account created successfully!');
      navigate('/profile');
    } else {
      toast.error(authResult.message);
    }
  } catch (error) {
    toast.error('An error occurred. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

---

## Data Flow Diagram

```
SignUpPage (User enters data)
         ↓
validateForm() (Frontend validation)
         ↓
handleSubmit() - Prepares profileData
         ↓
registerUser(email, password, profileData)
         ↓
Creates Firebase Auth User (email + password only)
         ↓
Updates Auth Display Name (fullName)
         ↓
createUserProfileWithEmailId(email, userData)
         ↓
Creates/Updates Firestore Document
    Users/{email}
         ↓
Stores all fields (fullName, skills, education, etc.)
         ↓
Returns success response
         ↓
Redirects to Profile page
```

---

## Firebase Firestore Security Rules

### Recommended Rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - email as document ID
    match /Users/{email} {
      // Allow read/write only to authenticated users
      allow read: if request.auth != null && request.auth.token.email == email;
      allow write: if request.auth != null && request.auth.token.email == email;
      allow create: if request.auth != null;
    }
  }
}
```

---

## Example: Complete Signup Process

### 1. User Fills Form
```
Full Name: John Doe
Email: john@example.com
Password: SecurePass123
Education: Bachelor's Degree
Skills: JavaScript, React, Node.js
Languages: English, Hindi
Programming Languages: JavaScript, Python
Work Experience: 2 years as Frontend Developer
Extracurricular: Coding, Robotics
```

### 2. Form Submitted

```javascript
handleSubmit() is called
→ Validates all fields
→ Prepares profileData object
→ Calls registerUser()
```

### 3. Firebase Auth Created

```
Email: john@example.com
Password: (encrypted by Firebase)
```

### 4. Firestore Document Created

**Path**: `Users/john@example.com`

```javascript
{
  uid: "abc123xyz789",
  email: "john@example.com",
  fullName: "John Doe",
  educationLevel: "bachelor",
  careerInterests: "",
  skills: ["JavaScript", "React", "Node.js"],
  languages: ["English", "Hindi"],
  programmingLanguages: ["JavaScript", "Python"],
  workExperience: "2 years as Frontend Developer",
  extracurricularActivities: ["Coding", "Robotics"],
  qualifications: {},
  interests: [],
  profileComplete: false,
  createdAt: "2025-11-25T10:30:00Z",
  updatedAt: "2025-11-25T10:30:00Z"
}
```

### 5. User Redirected

```
✓ Account created successfully!
→ Redirects to Profile page
```

---

## Key Points

✅ **Email as Document ID**: Makes it easy to look up profiles by email  
✅ **Separation of Auth & Profile**: Authentication handled separately from profile data  
✅ **Password Security**: Only email & password stored in Firebase Auth  
✅ **Auto-fill Ready**: Profile data stored in Firestore, ready to populate forms  
✅ **Timestamps**: Creation and update timestamps tracked automatically  
✅ **Profile Completion Flag**: Indicates if profile is fully completed

---

## Error Handling

### Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `auth/email-already-in-use` | Email already registered | Show user message to login or use different email |
| `auth/weak-password` | Password < 6 chars | Require minimum 6 character password |
| `auth/invalid-email` | Invalid email format | Validate email format before submission |
| `Firestore permission denied` | User not authenticated | Ensure user is logged in |
| `Document not found` | Email doesn't exist in Users collection | Check if registration completed |

---

## Next Steps

### Profile Management Page
Fetch and display user profile data from Firestore:
```javascript
const result = await getUserProfileByEmail(userEmail);
// Display profile fields from result.data
```

### Profile Update
Allow users to update their profile:
```javascript
await updateUserProfileByEmail(userEmail, updatedData);
```

### Dashboard
Display recommendations based on user's:
- Skills
- Languages
- Programming Languages
- Career Interests
- Education Level

---

## Firebase Configuration

The following Firebase configuration is used:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDPVjKe7E5FQ9A-mQ_vYn4G3M9LnMDWL28",
  authDomain: "for-today-s-youth.firebaseapp.com",
  projectId: "for-today-s-youth",
  storageBucket: "for-today-s-youth.firebasestorage.app",
  messagingSenderId: "576427712056",
  appId: "1:576427712056:web:d5b157a3b5cd2894fd50cd",
  measurementId: "G-1G6ZV745MZ"
};
```

---

## Files Modified

1. **`src/services/authService.js`**
   - Updated `registerUser()` to accept profileData
   - Added `createUserProfileWithEmailId()`
   - Added `getUserProfileByEmail()`
   - Added `updateUserProfileByEmail()`

2. **`src/pages/SignUpPage.jsx`**
   - Updated `handleSubmit()` to prepare profileData
   - Removed unnecessary profile creation call
   - Enhanced form validation

---

## Testing Checklist

- [ ] User can signup with all required fields
- [ ] Firestore document created with email as ID
- [ ] Profile fields auto-populate on profile page
- [ ] Email validation works
- [ ] Password validation works (min 6 chars)
- [ ] Duplicate email prevention works
- [ ] User redirects to profile after signup
- [ ] Profile update works
- [ ] Profile retrieval by email works

---

For questions or updates, refer to the Firebase documentation:
- https://firebase.google.com/docs/auth
- https://firebase.google.com/docs/firestore

