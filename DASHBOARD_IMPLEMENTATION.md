# Dashboard Page - Courses Grid Implementation

## Overview

This document explains the Dashboard page implementation that displays courses in a grid layout with modal popups for course details.

---

## Features

✅ **Grid Layout**: Responsive 1 column (mobile), 2 columns (tablet), 3 columns (desktop)  
✅ **Course Cards**: Display course image, name, description preview, duration, level  
✅ **Modal Popup**: Click "Learn More" to see detailed course information  
✅ **Firestore Integration**: Fetch courses from Firestore Courses collection  
✅ **Image Mapping**: Automatically map course names to images from assets  
✅ **Animations**: Smooth entrance animations, hover effects, scale transitions  
✅ **Loading State**: Display loading spinner while fetching data  
✅ **Error Handling**: Toast notifications for errors  

---

## Firebase Structure

### Collection: "Courses"

**Document ID**: Course Name (used as unique identifier)

**Document Structure**:
```javascript
{
  courseDetail: {
    description: string,           // Course description
    duration: string,              // e.g., "12 weeks", "6 months"
    level: string,                 // e.g., "beginner", "intermediate", "advanced"
    prerequisites: string | string[], // Skills needed
    whatYouWillLearn: string | string[], // Learning outcomes
    instructor: string,            // Instructor name
    price: number,                 // Course price (optional)
    rating: number,                // Course rating (optional)
    students: number               // Enrolled students (optional)
  }
}
```

### Example Firestore Documents

```javascript
// Document ID: "Web"
{
  courseDetail: {
    description: "Learn modern web development with React, Node.js, and MongoDB",
    duration: "12 weeks",
    level: "beginner",
    prerequisites: ["HTML basics", "CSS knowledge", "JavaScript fundamentals"],
    whatYouWillLearn: ["React.js", "Node.js", "Express", "MongoDB", "REST APIs"],
    instructor: "John Doe",
    price: 4999,
    rating: 4.8,
    students: 1250
  }
}

// Document ID: "AI"
{
  courseDetail: {
    description: "Master artificial intelligence and machine learning concepts",
    duration: "16 weeks",
    level: "intermediate",
    prerequisites: ["Python", "Statistics", "Linear Algebra"],
    whatYouWillLearn: ["Machine Learning", "Deep Learning", "TensorFlow", "Neural Networks"],
    instructor: "Jane Smith",
    price: 5999,
    rating: 4.9,
    students: 950
  }
}

// Document ID: "App"
{
  courseDetail: {
    description: "Build native mobile applications for iOS and Android",
    duration: "14 weeks",
    level: "intermediate",
    prerequisites: ["Java/Swift knowledge", "Mobile development basics"],
    whatYouWillLearn: ["React Native", "iOS Development", "Android Development"],
    instructor: "Mike Johnson",
    price: 5499,
    rating: 4.7,
    students: 850
  }
}
```

---

## File Structure

```
src/
├── pages/
│   ├── DashboardPage.jsx          ← Dashboard with course grid
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   └── SignUpPage.jsx
├── services/
│   ├── courseService.js           ← Course data fetching functions
│   ├── authService.js
│   └── userService.js
├── assets/
│   └── images/
│       ├── AI.jpg
│       ├── App.jpg
│       ├── Web.jpg
│       ├── Competative.jpg
│       ├── Digital Marketing & Social Media Strategy.jpg
│       └── Entrepreneurship & New Venture Creation.jpg
└── App.jsx                        ← Updated with Dashboard route
```

---

## DashboardPage Component

### Location
`src/pages/DashboardPage.jsx`

### Main Features

#### 1. Image Mapping
Maps course names to imported images:
```javascript
const courseImageMap = {
  'AI': AIImage,
  'Web': WebImage,
  'App': AppImage,
  'Competative': CompetativeImage,
  'Digital Marketing & Social Media Strategy': DigitalMarketingImage,
  'Entrepreneurship & New Venture Creation': EntrepreneurshipImage,
};
```

#### 2. State Management
```javascript
const [courses, setCourses] = useState([]);        // All courses
const [loading, setLoading] = useState(true);      // Loading state
const [selectedCourse, setSelectedCourse] = useState(null); // Selected course
const [showModal, setShowModal] = useState(false); // Modal visibility
```

#### 3. Data Fetching
```javascript
useEffect(() => {
  const fetchCourses = async () => {
    const coursesCollection = collection(db, 'Courses');
    const coursesSnapshot = await getDocs(coursesCollection);
    
    const coursesList = coursesSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.id,           // Document ID = Course Name
      ...doc.data(),          // All fields including courseDetail
    }));
    
    setCourses(coursesList);
  };
  
  fetchCourses();
}, []);
```

#### 4. Course Card Component
Each course displays:
- Course image from assets
- Course name
- Description preview (2 lines)
- Duration icon and text
- Level icon and text
- "Learn More" button

```jsx
<div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105">
  {/* Course Image */}
  <img src={getCourseImage(course.name)} alt={course.name} />
  
  {/* Course Info */}
  <div className="p-6">
    <h3>{course.name}</h3>
    <p>{course.courseDetail?.description}</p>
    
    {/* Stats */}
    <div className="flex gap-4">
      <span>📝 {course.courseDetail?.duration}</span>
      <span>📊 {course.courseDetail?.level}</span>
    </div>
    
    {/* Button */}
    <button onClick={() => handleLearnMore(course)}>
      Learn More
    </button>
  </div>
</div>
```

#### 5. Modal Popup
Displays full course details:
- Full course image
- Description
- Duration & Level (side by side)
- Prerequisites (list with checkmarks)
- What You'll Learn (list with arrow icons)
- Instructor information
- "Enroll Now" button

```jsx
{showModal && selectedCourse && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Modal Content */}
    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-sky-900 p-6">
        <h2>{selectedCourse.name}</h2>
        <button onClick={handleCloseModal}>✕</button>
      </div>
      
      {/* Content */}
      <div className="p-8">
        <img src={getCourseImage(selectedCourse.name)} />
        
        {/* Description */}
        <div>
          <h3>About This Course</h3>
          <p>{selectedCourse.courseDetail?.description}</p>
        </div>
        
        {/* Duration & Level */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-cyan-50 p-4 rounded-lg">
            <p>Duration</p>
            <p className="font-bold">{selectedCourse.courseDetail?.duration}</p>
          </div>
          <div className="bg-cyan-50 p-4 rounded-lg">
            <p>Level</p>
            <p className="font-bold">{selectedCourse.courseDetail?.level}</p>
          </div>
        </div>
        
        {/* Prerequisites */}
        <div>
          <h4>Prerequisites</h4>
          <ul>
            {selectedCourse.courseDetail?.prerequisites.map(prereq => (
              <li key={prereq}>✓ {prereq}</li>
            ))}
          </ul>
        </div>
        
        {/* What You'll Learn */}
        <div>
          <h4>What You'll Learn</h4>
          <ul>
            {selectedCourse.courseDetail?.whatYouWillLearn.map(item => (
              <li key={item}>→ {item}</li>
            ))}
          </ul>
        </div>
        
        {/* Instructor */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold">Instructor</p>
          <p className="font-bold">{selectedCourse.courseDetail?.instructor}</p>
        </div>
        
        {/* Enroll Button */}
        <button className="w-full py-3 bg-gradient-to-r from-cyan-400 to-sky-400">
          Enroll Now
        </button>
      </div>
    </div>
  </div>
)}
```

---

## Service: courseService.js

### Location
`src/services/courseService.js`

### Functions

#### 1. fetchAllCourses()
Fetches all courses from Firestore

**Signature**:
```javascript
fetchAllCourses()
```

**Return**:
```javascript
{
  success: boolean,
  data: [{
    id: string,
    name: string,
    courseDetail: { ... }
  }],
  error?: string
}
```

**Example**:
```javascript
const result = await fetchAllCourses();
if (result.success) {
  console.log('Courses:', result.data);
}
```

#### 2. fetchCourseByName(courseName)
Fetches a specific course by name

**Signature**:
```javascript
fetchCourseByName(courseName: string)
```

**Parameters**:
- `courseName` (string): The course name/document ID (e.g., "Web", "AI")

**Return**:
```javascript
{
  success: boolean,
  data: {
    id: string,
    name: string,
    courseDetail: { ... }
  },
  error?: string
}
```

**Example**:
```javascript
const result = await fetchCourseByName("Web");
if (result.success) {
  console.log('Web course:', result.data);
}
```

---

## Routing

### Updated App.jsx

```jsx
import { DashboardPage } from './pages/DashboardPage';

// In Routes:
<Route path="/dashboard" element={<DashboardPage />} />
```

### Access Dashboard
Navigate to: `http://localhost:5173/dashboard`

---

## Styling Features

### Animations
- **Entrance**: `fadeInUp` for cards with stagger delays
- **Header**: `slideInDown` animation
- **Modal**: `scaleIn` animation
- **Hover**: Scale-105 on course cards
- **Image**: Scale-110 on image hover

### Responsive Design
```javascript
// Grid responsive:
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3 columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
```

### Color Scheme
```javascript
// Gradient backgrounds
from-blue-50 via-cyan-50 to-sky-50      // Page background

// Text colors
text-blue-900                            // Headings
text-blue-700                            // Body text
text-cyan-600                            // Accent text

// Buttons
from-cyan-400 to-sky-400                // Button gradient
hover:from-cyan-300 hover:to-sky-300    // Hover state
```

---

## User Interactions

### 1. View Course List
- User navigates to `/dashboard`
- Page fetches courses from Firestore
- Courses display in responsive grid with images

### 2. Click "Learn More"
- User clicks "Learn More" button on any course card
- Modal popup appears with full course details
- Modal slides in with scale animation

### 3. View Course Details
Modal shows:
- Course image
- Full description
- Duration and level
- Prerequisites with checkmarks
- Learning outcomes with arrow icons
- Instructor information
- "Enroll Now" button

### 4. Close Modal
- Click close button (✕) in top right
- Click outside modal (backdrop)
- Modal fades out

### 5. Enroll in Course
- Click "Enroll Now" button
- (Future: Redirect to payment or course enrollment page)

---

## Image Asset Mapping

Your assets folder contains:

```
AI.jpg                                          → "AI" course
App.jpg                                         → "App" course
Web.jpg                                         → "Web" course
Competative.jpg                                 → "Competative" course
Digital Marketing & Social Media Strategy.jpg   → "Digital Marketing & Social Media Strategy" course
Entrepreneurship & New Venture Creation.jpg     → "Entrepreneurship & New Venture Creation" course
```

### Adding More Courses

To add a new course:

1. **Add image to assets**:
   ```
   src/assets/images/YourCourseName.jpg
   ```

2. **Import image in DashboardPage.jsx**:
   ```javascript
   import YourCourseImage from '../assets/images/YourCourseName.jpg';
   ```

3. **Add to courseImageMap**:
   ```javascript
   const courseImageMap = {
     // ... existing mappings
     'YourCourseName': YourCourseImage,
   };
   ```

4. **Create Firestore document**:
   - Collection: `Courses`
   - Document ID: `YourCourseName`
   - Fields: `courseDetail` object with course information

---

## Error Handling

### No Courses Available
Displays message: "No Courses Available - Please check back later"

### Loading State
Shows loading spinner while fetching courses

### Firebase Errors
Toast notification displays with error message

### Missing Images
Falls back to placeholder icon if image not found

---

## Data Flow

```
User navigates to /dashboard
         ↓
DashboardPage component mounts
         ↓
useEffect triggers fetchAllCourses()
         ↓
Firebase getDocs(collection(db, 'Courses'))
         ↓
Maps documents to coursesList array
         ↓
setCourses(coursesList)
         ↓
Grid renders with course cards
         ↓
User clicks "Learn More"
         ↓
setSelectedCourse(course)
         ↓
setShowModal(true)
         ↓
Modal popup displays with course details
         ↓
User clicks "Close" or backdrop
         ↓
setShowModal(false)
         ↓
Modal closes
```

---

## Performance Optimization

- **Lazy Loading**: Images load on demand
- **Stagger Animations**: Delays prevent all animations firing simultaneously
- **Responsive Grid**: Adapts to screen size automatically
- **Modal Only When Needed**: Modal only renders when showModal is true
- **Efficient Updates**: State updates only trigger necessary re-renders

---

## Next Steps

### Enhancements to Implement

1. **Search & Filter**
   - Add search box to filter courses by name
   - Add filter by level (beginner, intermediate, advanced)
   - Add sort options (price, rating, duration)

2. **Favorites**
   - Add heart icon to save favorite courses
   - Store in user profile
   - Display favorites on profile page

3. **User Reviews**
   - Display rating and review count
   - Allow users to leave reviews
   - Show recent reviews in modal

4. **Enrollment Tracking**
   - Track which courses user is enrolled in
   - Show "Continue Learning" for enrolled courses
   - Display progress percentage

5. **Recommendations**
   - Recommend courses based on user skills/interests
   - Show "Recommended for you" section
   - Suggest related courses

6. **Advanced Filtering**
   - Filter by price range
   - Filter by duration
   - Filter by instructor
   - Filter by topic/category

---

## Testing Checklist

- [ ] Dashboard page loads without errors
- [ ] Courses fetch from Firestore successfully
- [ ] Course images display correctly
- [ ] Grid is responsive on mobile, tablet, desktop
- [ ] "Learn More" button opens modal
- [ ] Modal displays all course details
- [ ] Prerequisites display as list
- [ ] Learning outcomes display as list
- [ ] Modal closes on close button click
- [ ] Modal closes on backdrop click
- [ ] Hover animations work smoothly
- [ ] Loading spinner shows while fetching
- [ ] Error message shows if fetch fails
- [ ] Empty state shows if no courses

---

## Firebase Configuration Used

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

For questions or support, refer to:
- Firebase Documentation: https://firebase.google.com/docs
- React Documentation: https://react.dev
- Tailwind CSS: https://tailwindcss.com
