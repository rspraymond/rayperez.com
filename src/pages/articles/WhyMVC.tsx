import React from 'react'
import BlogPost from '../../components/BlogPost'
import { Divider, List, ListItem, ListItemText, Typography, Box } from '@mui/material'
import LazySyntaxHighlighter from '../../components/LazySyntaxHighlighter'

const WhyMVC = (): React.ReactElement => {
  return (
    <BlogPost
      title='Why I Use MVC Pattern'
      author='Raymond Perez'
      date='2024-10-05'
      children={
        <React.Fragment>
          <Typography variant='h3' gutterBottom>
            Key Takeaways
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary='Separation of Concerns'
                secondary='MVC separates logic (models), presentation (views), and handling input (controllers), making codebases easier to reason about.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Better Organization'
                secondary='The pattern helps maintain large codebases and enables multiple developers to work in parallel with fewer conflicts.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Improved Testability'
                secondary='Each layer can be unit tested independently, leading to more robust applications.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Appropriate Use'
                secondary='MVC shines in larger projects with long lifecycles, but may be overkill for simple applications.'
              />
            </ListItem>
          </List>

          <Divider sx={{ marginY: 2 }} />

          <Typography paragraph>
            The Model-View-Controller (MVC) pattern has been a cornerstone of web development for
            decades. As applications grow in complexity, having a structured approach to organizing
            code becomes increasingly important. MVC provides a clear separation of responsibilities
            that helps manage this complexity. In this article, I'll explore why I continue to use
            MVC in many of my projects, when it's most beneficial, and when you might want to
            consider alternatives.
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant='h5' gutterBottom>
            What is MVC?
          </Typography>
          <Typography paragraph>
            MVC divides an application into three interconnected components:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary='Model'
                secondary='Handles data logic and business rules. Models interact with databases, validate data, and contain the core functionality.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='View'
                secondary='Responsible for presentation and rendering. Views display data to users and send user actions to the controller.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Controller'
                secondary='Acts as an intermediary between Model and View. Controllers process incoming requests, manipulate data using Models, and determine which View to render.'
              />
            </ListItem>
          </List>

          <Typography paragraph>
            This pattern is common in many web frameworks, from Express.js to Ruby on Rails to
            Laravel. Let's look at a simple Express.js implementation:
          </Typography>

          <Typography variant='h6' gutterBottom>
            Controller Example
          </Typography>
          <LazySyntaxHighlighter language='javascript'>
            {`// userController.js
const User = require('../models/User');

// Controller methods handle HTTP requests
exports.getAllUsers = async (req, res) => {
  try {
    // Uses the model to fetch data
    const users = await User.findAll();
    
    // Sends response to the view
    res.render('users/index', { users });
  } catch (error) {
    res.status(500).render('error', { message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).render('error', { message: 'User not found' });
    }
    res.render('users/show', { user });
  } catch (error) {
    res.status(500).render('error', { message: error.message });
  }
};`}
          </LazySyntaxHighlighter>

          <Typography variant='h6' gutterBottom>
            Model Example
          </Typography>
          <LazySyntaxHighlighter language='javascript'>
            {`// User.js (Model)
const db = require('../database');

class User {
  // The model handles data logic and business rules
  static async findAll() {
    const query = 'SELECT * FROM users ORDER BY created_at DESC';
    const result = await db.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async create(userData) {
    // Data validation would happen here
    if (!userData.email || !userData.name) {
      throw new Error('Email and name are required');
    }

    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
    const result = await db.query(query, [userData.name, userData.email]);
    return result.rows[0];
  }
}

module.exports = User;`}
          </LazySyntaxHighlighter>

          <Typography variant='h6' gutterBottom>
            View Example (using EJS template)
          </Typography>
          <LazySyntaxHighlighter language='html'>
            {`<!-- users/index.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title>All Users</title>
</head>
<body>
  <h1>Users</h1>
  <ul>
    <% users.forEach(user => { %>
      <li>
        <a href="/users/<%= user.id %>"><%= user.name %></a>
        (<%= user.email %>)
      </li>
    <% }); %>
  </ul>
</body>
</html>`}
          </LazySyntaxHighlighter>

          <Typography paragraph>
            The router would connect HTTP routes to the controller methods:
          </Typography>

          <LazySyntaxHighlighter language='javascript'>
            {`// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);

module.exports = router;`}
          </LazySyntaxHighlighter>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant='h5' gutterBottom>
            Core Benefits of MVC
          </Typography>

          <Typography variant='h6' gutterBottom>
            Separation of Concerns
          </Typography>
          <Typography paragraph>
            By dividing application logic into distinct components, MVC makes it easier to
            understand and modify code. Each part has a specific responsibility:
          </Typography>
          <Box component='ul' sx={{ pl: 4 }}>
            <li>Models focus on data handling and business logic</li>
            <li>Views focus on presenting information to users</li>
            <li>
              Controllers focus on handling user inputs and coordinating between models and views
            </li>
          </Box>
          <Typography paragraph>
            This separation means you can work on one aspect without needing to understand or modify
            the others.
          </Typography>

          <Typography variant='h6' gutterBottom>
            Code Organization
          </Typography>
          <Typography paragraph>
            As applications grow, having a consistent organizational structure becomes critical. MVC
            provides a familiar pattern that developers can easily navigate:
          </Typography>

          <LazySyntaxHighlighter language='text'>
            {`my-application/
├── controllers/     # Request handlers
│   ├── userController.js
│   └── productController.js
├── models/          # Data and business logic
│   ├── User.js
│   └── Product.js
├── views/           # UI templates
│   ├── users/
│   │   ├── index.ejs
│   │   └── show.ejs
│   └── products/
│       ├── index.ejs
│       └── show.ejs
├── routes/          # URL routing
│   ├── userRoutes.js
│   └── productRoutes.js
└── app.js           # Main application file`}
          </LazySyntaxHighlighter>

          <Typography paragraph>
            This structure makes it easy for new team members to quickly understand where specific
            functionality lives and how different parts of the application interact.
          </Typography>

          <Typography variant='h6' gutterBottom>
            Testability
          </Typography>
          <Typography paragraph>
            With clear boundaries between components, testing becomes more straightforward. You can
            unit test models without worrying about controllers or views:
          </Typography>

          <LazySyntaxHighlighter language='javascript'>
            {`// user.test.js
const User = require('../models/User');
const db = require('../database');

// Mock the database
jest.mock('../database');

describe('User Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('findAll returns all users', async () => {
    // Mock the database response
    db.query.mockResolvedValue({
      rows: [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
      ]
    });

    const users = await User.findAll();
    
    expect(users.length).toBe(2);
    expect(db.query).toHaveBeenCalledWith(
      'SELECT * FROM users ORDER BY created_at DESC'
    );
  });

  test('create validates required fields', async () => {
    await expect(User.create({})).rejects.toThrow('Email and name are required');
    expect(db.query).not.toHaveBeenCalled();
  });
});`}
          </LazySyntaxHighlighter>

          <Typography paragraph>
            Similarly, controllers can be tested with mocked models, and views can be tested
            separately for proper rendering. This isolation leads to more reliable tests and greater
            confidence in your code.
          </Typography>

          <Typography variant='h6' gutterBottom>
            DRY Principle (Don't Repeat Yourself)
          </Typography>
          <Typography paragraph>
            MVC encourages code reuse by centralizing common logic in models and reusable
            presentation components in views. For example, validation logic stays in models,
            ensuring it's applied consistently throughout the application:
          </Typography>

          <LazySyntaxHighlighter language='javascript'>
            {`// Centralized validation in the model
class User {
  static validateUserData(userData) {
    const errors = {};
    
    if (!userData.email) {
      errors.email = 'Email is required';
    } else if (!/^\\S+@\\S+\\.\\S+$/.test(userData.email)) {
      errors.email = 'Email format is invalid';
    }
    
    if (!userData.name) {
      errors.name = 'Name is required';
    } else if (userData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    return Object.keys(errors).length > 0 ? errors : null;
  }
  
  static async create(userData) {
    const errors = this.validateUserData(userData);
    if (errors) {
      throw new Error(JSON.stringify(errors));
    }
    
    // Proceed with creating the user...
  }
  
  static async update(id, userData) {
    const errors = this.validateUserData(userData);
    if (errors) {
      throw new Error(JSON.stringify(errors));
    }
    
    // Proceed with updating the user...
  }
}`}
          </LazySyntaxHighlighter>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant='h5' gutterBottom>
            When MVC Helps Most
          </Typography>
          <Typography paragraph>
            MVC isn't always the right choice, but it shines in certain scenarios:
          </Typography>

          <Typography variant='h6' gutterBottom>
            Larger Projects with Long Lifecycles
          </Typography>
          <Typography paragraph>
            As projects grow in size and complexity, the structured approach of MVC becomes
            increasingly valuable. Applications that will be maintained for years benefit from clear
            organization patterns that remain consistent even as team members change.
          </Typography>

          <Typography variant='h6' gutterBottom>
            Team Development
          </Typography>
          <Typography paragraph>
            When multiple developers work on the same codebase, MVC provides natural boundaries that
            reduce conflicts. Frontend developers can focus on views while backend developers work
            on models and controllers, minimizing merge conflicts and stepping on each other's toes.
          </Typography>

          <Typography variant='h6' gutterBottom>
            Applications with Changing Requirements
          </Typography>
          <Typography paragraph>
            MVC's separation of concerns makes it easier to adapt to changing requirements. For
            example, if you need to change how data is displayed, you can modify views without
            touching models or controllers. If business logic changes, you can update models without
            worrying about the presentation layer.
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant='h5' gutterBottom>
            When MVC Might Be Overkill
          </Typography>
          <Typography paragraph>
            Despite its benefits, MVC isn't the right solution for every project:
          </Typography>

          <Typography variant='h6' gutterBottom>
            Static Site Generators and Jamstack Applications
          </Typography>
          <Typography paragraph>
            For content-focused sites like blogs, documentation, or marketing sites using static
            site generators (Gatsby, Hugo, Eleventy, etc.), the MVC pattern often doesn't apply
            well. These sites typically:
          </Typography>
          <Box component='ul' sx={{ pl: 4 }}>
            <li>Generate static HTML at build time rather than handling dynamic requests</li>
            <li>
              Use content (often in Markdown) as the data source instead of a traditional database
            </li>
            <li>Separate concerns through components and data loading hooks rather than MVC</li>
          </Box>

          <Typography paragraph>
            Here's an example of a site built with Eleventy, a simpler static site generator, where
            the traditional MVC pattern doesn't fit:
          </Typography>

          <LazySyntaxHighlighter language='javascript'>
            {`// .eleventy.js configuration file
module.exports = function(eleventyConfig) {
  // Process markdown files
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Add a custom filter
  eleventyConfig.addFilter("dateFormat", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};

// A blog post template (src/_layouts/post.njk)
---
layout: base.njk
---
<article class="post">
  <header>
    <h1>{{ title }}</h1>
    <time datetime="{{ date | dateISO }}">{{ date | dateFormat }}</time>
  </header>
  
  <div class="content">
    {{ content | safe }}
  </div>
</article>

// Markdown content file (src/posts/example-post.md)
---
title: My First Post
date: 2023-01-15
layout: post.njk
---

This is the content of my first blog post.

It will be converted to HTML at build time.`}
          </LazySyntaxHighlighter>

          <Typography paragraph>
            In this approach, there's no traditional MVC structure. The content files (Markdown)
            contain both data and some presentation logic (frontmatter), templates handle the view,
            and the build process transforms everything into static HTML. The separation happens
            between content, templates, and configuration, rather than models, views, and
            controllers.
          </Typography>

          <Typography variant='h6' gutterBottom>
            Serverless Functions and Microservices
          </Typography>
          <Typography paragraph>
            Small, focused serverless functions and microservices often work better with a more
            direct approach. These might handle a single responsibility like image processing,
            authentication, or data transformation:
          </Typography>

          <LazySyntaxHighlighter language='javascript'>
            {`// AWS Lambda function for image resizing
const AWS = require('aws-sdk');
const sharp = require('sharp');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  // Get the source image from the event
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\\+/g, ' '));
  
  try {
    // Download the image
    const s3Object = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    
    // Process the image - resize to thumbnail
    const resized = await sharp(s3Object.Body)
      .resize(200, 200, { fit: 'inside' })
      .toBuffer();
    
    // Upload the thumbnail with a new name
    const thumbnailKey = \`thumbnails/\${key.split('/').pop()}\`;
    await s3.putObject({
      Bucket: bucket,
      Key: thumbnailKey,
      Body: resized,
      ContentType: 'image/jpeg'
    }).promise();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Thumbnail created', key: thumbnailKey })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing image' })
    };
  }
};`}
          </LazySyntaxHighlighter>

          <Typography paragraph>
            This serverless function has a single responsibility and a direct input-process-output
            flow. Adding MVC architecture to something this focused would introduce unnecessary
            complexity.
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant='h5' gutterBottom>
            How MVC Reduces Development Headaches
          </Typography>

          <Typography variant='h6' gutterBottom>
            Fewer Merge Conflicts
          </Typography>
          <Typography paragraph>
            With clear separation between components, developers working on different parts of the
            application are less likely to edit the same files simultaneously, reducing merge
            conflicts.
          </Typography>

          <Typography variant='h6' gutterBottom>
            Technology Swapping
          </Typography>
          <Typography paragraph>
            MVC allows you to swap out components without affecting the entire application. For
            example, you can change database technologies by updating just the model layer:
          </Typography>

          <LazySyntaxHighlighter language='javascript'>
            {`// Original User model using PostgreSQL
class User {
  static async findAll() {
    const query = 'SELECT * FROM users';
    const result = await postgresDb.query(query);
    return result.rows;
  }
}

// Updated User model using MongoDB
class User {
  static async findAll() {
    return await mongoDb.collection('users').find().toArray();
  }
}

// The controller doesn't need to change!
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('users/index', { users });
  } catch (error) {
    res.status(500).render('error', { message: error.message });
  }
};`}
          </LazySyntaxHighlighter>

          <Typography variant='h6' gutterBottom>
            Easier Debugging and Maintenance
          </Typography>
          <Typography paragraph>
            When bugs occur, MVC's structure makes it easier to isolate where the problem is
            occurring. If data is incorrect, look at the model. If it's not displaying correctly,
            check the view. If user actions aren't being processed properly, examine the controller.
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant='h5' gutterBottom>
            Common Variations and Alternatives
          </Typography>
          <Typography paragraph>
            MVC isn't the only architectural pattern available, and it's often adapted to fit
            specific needs:
          </Typography>

          <Typography variant='h6' gutterBottom>
            Service Layer
          </Typography>
          <Typography paragraph>
            Many applications add a service layer between controllers and models to handle complex
            business logic:
          </Typography>

          <LazySyntaxHighlighter language='javascript'>
            {`// userService.js
const User = require('../models/User');
const EmailService = require('./emailService');

class UserService {
  static async registerUser(userData) {
    // Validate data
    const errors = User.validateUserData(userData);
    if (errors) {
      throw new Error(JSON.stringify(errors));
    }
    
    // Create user
    const user = await User.create(userData);
    
    // Send welcome email
    await EmailService.sendWelcomeEmail(user.email, user.name);
    
    // Update analytics
    await this.trackRegistration(user);
    
    return user;
  }
  
  static async trackRegistration(user) {
    // Track registration in analytics system
    // ...
  }
}

// userController.js
const UserService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const user = await UserService.registerUser(req.body);
    res.redirect('/users/' + user.id);
  } catch (error) {
    // Handle errors
    res.render('users/register', { 
      errors: JSON.parse(error.message),
      formData: req.body
    });
  }
};`}
          </LazySyntaxHighlighter>

          <Typography variant='h6' gutterBottom>
            MVVM (Model-View-ViewModel)
          </Typography>
          <Typography paragraph>
            Popular in frontend frameworks, MVVM replaces the controller with a ViewModel that
            manages view state:
          </Typography>

          <LazySyntaxHighlighter language='typescript'>
            {`// In a React/TypeScript application using hooks
import React, { useState, useEffect } from 'react';
import { UserModel } from '../models/UserModel';

// The ViewModel
const useUserViewModel = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await UserModel.fetchAll();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refreshUsers: fetchUsers };
};

// The View
const UserListView: React.FC = () => {
  const { users, loading, error, refreshUsers } = useUserViewModel();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Users</h1>
      <button onClick={refreshUsers}>Refresh</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};`}
          </LazySyntaxHighlighter>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant='h5' gutterBottom>
            Practical Tips for Using MVC
          </Typography>

          <Typography paragraph>
            If you decide to use MVC, here are some practical tips to get the most out of it:
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary='Start simple and add complexity only when needed'
                secondary='Begin with basic models, views, and controllers, then refactor as your understanding of the domain grows.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Keep controllers thin'
                secondary='Controllers should primarily coordinate between models and views, with minimal business logic.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Consider adding service layers for complex logic'
                secondary='When business logic gets complex, extract it into service classes that sit between controllers and models.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Document your structure'
                secondary="Make sure new team members understand your approach to MVC and any variations you've adopted."
              />
            </ListItem>
          </List>

          <LazySyntaxHighlighter language='javascript'>
            {`// Example of a thin controller
exports.createUser = async (req, res) => {
  try {
    // Validation and business logic in UserService
    const user = await UserService.createUser(req.body);
    
    // Response handling
    res.status(201).json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};`}
          </LazySyntaxHighlighter>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant='h5' gutterBottom>
            Conclusion
          </Typography>
          <Typography paragraph>
            MVC is a powerful architectural pattern that provides structure and organization to web
            applications. Its separation of concerns makes codebases more maintainable, testable,
            and adaptable to change. While it's not the right choice for every project, it shines in
            team environments and larger applications with long lifecycles.
          </Typography>
          <Typography paragraph>
            The key is to use MVC pragmatically—apply it when it adds value, adapt it to your
            specific needs, and don't be afraid to use simpler approaches for simpler problems. Like
            any tool, MVC is most effective when used with an understanding of both its strengths
            and limitations.
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant='h3' gutterBottom>
            Frequently Asked Questions
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary='Does using MVC make my application slower?'
                secondary="Generally, no. While there's a small overhead from the additional structure, the performance impact is negligible in most web applications. The benefits in maintainability typically far outweigh any minor performance considerations."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Can I use MVC with modern frontend frameworks like React or Vue?'
                secondary='Yes, but they often use variations like MVVM or Flux/Redux patterns. The core principle of separation of concerns remains, but the implementation differs to better suit these frameworks.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="How do I know if my project is 'big enough' for MVC?"
                secondary='Consider using MVC if your application has multiple data types with complex relationships, requires a team of developers, or will be maintained long-term. For a weekend project or simple CRUD app, a simpler structure might be more appropriate.'
              />
            </ListItem>
          </List>
        </React.Fragment>
      }
    />
  )
}

export default WhyMVC
