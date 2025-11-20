import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { jobsData, skillsData, coursesData } from './utils/sampleData.js';
import { generateUserRecommendations } from './utils/recommendationEngine.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// Jobs endpoints
app.get('/api/jobs', (req, res) => {
  res.json({
    success: true,
    data: jobsData,
    total: jobsData.length,
  });
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobsData.find((j) => j.id === parseInt(req.params.id));
  if (!job) {
    return res.status(404).json({ success: false, message: 'Job not found' });
  }
  res.json({ success: true, data: job });
});

// Skills endpoints
app.get('/api/skills', (req, res) => {
  res.json({
    success: true,
    data: skillsData,
    total: skillsData.length,
  });
});

app.get('/api/skills/:id', (req, res) => {
  const skill = skillsData.find((s) => s.id === parseInt(req.params.id));
  if (!skill) {
    return res.status(404).json({ success: false, message: 'Skill not found' });
  }
  res.json({ success: true, data: skill });
});

// Courses endpoints
app.get('/api/courses', (req, res) => {
  res.json({
    success: true,
    data: coursesData,
    total: coursesData.length,
  });
});

app.get('/api/courses/by-skill/:skill', (req, res) => {
  const courses = coursesData.filter(
    (c) => c.skillTaught.toLowerCase() === req.params.skill.toLowerCase()
  );
  res.json({
    success: true,
    data: courses,
    total: courses.length,
  });
});

// Recommendations endpoint
app.post('/api/recommendations/generate', async (req, res) => {
  try {
    const { userProfile } = req.body;

    if (!userProfile) {
      return res.status(400).json({
        success: false,
        message: 'User profile is required',
      });
    }

    const recommendations = await generateUserRecommendations(
      userProfile,
      jobsData,
      skillsData,
      coursesData
    );

    res.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating recommendations',
      error: error.message,
    });
  }
});

// Search jobs
app.post('/api/jobs/search', (req, res) => {
  try {
    const { query, minSalary, location } = req.body;

    let filtered = jobsData;

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q)
      );
    }

    if (location) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    res.json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching jobs',
      error: error.message,
    });
  }
});

// Search courses
app.post('/api/courses/search', (req, res) => {
  try {
    const { query, level, provider } = req.body;

    let filtered = coursesData;

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(q) ||
          course.skillTaught.toLowerCase().includes(q)
      );
    }

    if (level) {
      filtered = filtered.filter(
        (course) => course.level.toLowerCase() === level.toLowerCase()
      );
    }

    if (provider) {
      filtered = filtered.filter(
        (course) => course.provider.toLowerCase() === provider.toLowerCase()
      );
    }

    res.json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching courses',
      error: error.message,
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 API health check: http://localhost:${PORT}/api/health`);
});
