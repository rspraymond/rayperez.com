import React from 'react'
import BlogPost from '../../components/BlogPost'
import { List, ListItem, ListItemText, Paper, Typography, Link } from '@mui/material'
import LazySyntaxHighlighter from '../../components/LazySyntaxHighlighter'

const WhyInertia = (): React.ReactElement => {
  return (
    <BlogPost
      title='Why I Choose Inertia.js'
      author='Raymond Perez'
      date='2025-05-08'
      children={
        <React.Fragment>
          <Typography variant='h3' gutterBottom>
            Key Takeaways
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary='Pragmatic Frontend Integration for Backend Developers'
                secondary="Inertia.js provides a bridge between Laravel's backend and modern frontend frameworks like React, without requiring a complete API layer or deep frontend expertise."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Simplified Mental Model'
                secondary="Maintain your traditional server-side routing and controllers while gaining all the benefits of client-side rendering. Controllers simply return 'pages' instead of JSON responses."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Balanced Learning Approach'
                secondary='Inertia offers a gentler learning curve for backend developers entering the frontend world, while still encouraging gradual adoption of frontend fundamentals.'
              />
            </ListItem>
          </List>

          <Typography variant='h4' gutterBottom>
            Background
          </Typography>

          <Typography variant='body1' paragraph>
            As primarily a backend developer comfortable in the Laravel ecosystem, I've always been
            fascinated by modern, reactive user interfaces. Yet the path to becoming proficient in
            Single Page Applications (SPAs) seemed daunting—requiring deep knowledge of frontend
            frameworks, state management, routing libraries, and RESTful or GraphQL API design
            patterns. I wanted the best of both worlds: Laravel's elegant backend with React's
            reactive frontend, without becoming a complete frontend specialist.
          </Typography>

          <Typography variant='body1' paragraph>
            That's when I discovered Inertia.js, and it changed my approach to building full-stack
            applications. Let me explain why.
          </Typography>

          <Typography variant='h4' gutterBottom>
            What Is Inertia.js?
          </Typography>

          <Typography variant='body1' paragraph>
            Inertia.js isn't a framework per se—it's more of a glue layer between your backend
            (Laravel in my case) and your frontend framework of choice (React, Vue, or Svelte). It
            provides a new approach to building classic server-driven web apps with modern,
            single-page app feel.
          </Typography>

          <Typography variant='body1' paragraph>
            At its core, Inertia allows:
          </Typography>

          <List>
            <ListItem>
              <ListItemText primary='Your backend to control routing (Laravel routes)' />
            </ListItem>
            <ListItem>
              <ListItemText primary='Your frontend to handle the UI (React components)' />
            </ListItem>
            <ListItem>
              <ListItemText primary='Elimination of the need to build and maintain a complete API for most interactions' />
            </ListItem>
          </List>

          <Typography variant='body1' paragraph>
            Setup involves installing Inertia's server-side adapter for Laravel and client-side
            adapter for your frontend framework. Here's how a basic installation would look:
          </Typography>

          <Paper elevation={3} style={{ marginBottom: '16px' }}>
            <LazySyntaxHighlighter language='bash'>
              {`# Server-side installation
composer require inertiajs/inertia-laravel

# Client-side installation (for React)
npm install @inertiajs/react`}
            </LazySyntaxHighlighter>
          </Paper>

          <Typography variant='h4' gutterBottom>
            Why It Resonates (Personally)
          </Typography>

          <Typography variant='body1' paragraph>
            The appeal of Inertia.js for me is multifaceted, but it primarily comes down to how it
            lowered the learning curve to full-stack development. Here's why it clicks for me:
          </Typography>

          <Typography variant='h6' gutterBottom>
            Familiar Mental Model
          </Typography>

          <Typography variant='body1' paragraph>
            With Inertia, I didn't have to completely shift my mental model of web development. I
            could continue thinking in terms of controllers returning "views" (now React components)
            rather than having to build a separate API and client-side router. This code sample
            illustrates the simplicity:
          </Typography>

          <Paper elevation={3} style={{ marginBottom: '16px' }}>
            <LazySyntaxHighlighter language='php'>
              {`// A typical Laravel controller using Inertia
class UserController extends Controller
{
    public function index()
    {
        // Just return an Inertia page with props
        return Inertia::render('Users/Index', [
            'users' => User::all()
        ]);
    }
}`}
            </LazySyntaxHighlighter>
          </Paper>

          <Typography variant='h6' gutterBottom>
            Gradual Learning Curve
          </Typography>

          <Typography variant='body1' paragraph>
            Inertia gave me an on-ramp to React without requiring me to learn everything at once. I
            could start by creating simple components and gradually explore more complex React
            patterns as I became comfortable. This incremental approach to learning meant I could be
            productive from day one while continuously improving my skills.
          </Typography>

          <Typography variant='h4' gutterBottom>
            How It Changes Development
          </Typography>

          <Typography variant='body1' paragraph>
            Using Inertia.js fundamentally changes how you approach web development. Here's what it
            looks like in practice:
          </Typography>

          <Typography variant='h6' gutterBottom>
            Building Pages, Not APIs
          </Typography>

          <Typography variant='body1' paragraph>
            With Inertia, you build pages similar to classic MVC, but with added client-side
            interactivity. Here's how a simple React component might look when working with Inertia:
          </Typography>

          <Paper elevation={3} style={{ marginBottom: '16px' }}>
            <LazySyntaxHighlighter language='tsx'>
              {`// resources/js/Pages/Users/Index.tsx
import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../../Layouts/MainLayout';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  users: User[];
}

export default function Index({ users }: Props) {
  return (
    <>
      <Head title="Users" />
      <Layout>
        <h1>Users</h1>
        <div className="user-list">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}`}
            </LazySyntaxHighlighter>
          </Paper>

          <Typography variant='h6' gutterBottom>
            Server-Side Advantages
          </Typography>

          <Typography variant='body1' paragraph>
            With Inertia, you get to leverage all the server-side features you're familiar with in
            Laravel:
          </Typography>

          <List>
            <ListItem>
              <ListItemText primary="Form validation using Laravel's robust validation system" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Authentication and authorization via Laravel's built-in features" />
            </ListItem>
            <ListItem>
              <ListItemText primary='Database queries using Eloquent without building a separate API layer' />
            </ListItem>
          </List>

          <Typography variant='h6' gutterBottom>
            Client-Side Navigation
          </Typography>

          <Typography variant='body1' paragraph>
            Forms and links are automatically enhanced with client-side navigation. Here's how you'd
            handle a form submission:
          </Typography>

          <Paper elevation={3} style={{ marginBottom: '16px' }}>
            <LazySyntaxHighlighter language='tsx'>
              {`import React from 'react';
import { useForm } from '@inertiajs/react';

interface FormData {
  name: string;
  email: string;
}

export default function CreateUser() {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    name: '',
    email: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post('/users');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input 
          id="name"
          value={data.name}
          onChange={e => setData('name', e.target.value)} 
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email"
          value={data.email}
          onChange={e => setData('email', e.target.value)} 
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      
      <button type="submit" disabled={processing}>Create User</button>
    </form>
  );
}`}
            </LazySyntaxHighlighter>
          </Paper>

          <Typography variant='h4' gutterBottom>
            Possible Drawbacks
          </Typography>

          <Typography variant='body1' paragraph>
            Inertia isn't without its limitations, and it's important to be aware of them:
          </Typography>

          <Typography variant='h6' gutterBottom>
            Abstraction Concerns
          </Typography>

          <Typography variant='body1' paragraph>
            Inertia can abstract away some important client/server boundaries. While this makes
            development more straightforward, it might lead to:
          </Typography>

          <List>
            <ListItem>
              <ListItemText primary="Potentially larger initial page loads if you're not careful with your data" />
            </ListItem>
            <ListItem>
              <ListItemText primary='Blurred lines between what should be server-side vs. client-side logic' />
            </ListItem>
          </List>

          <Typography variant='body1' paragraph>
            For example, you might be tempted to pass large datasets through Inertia props rather
            than implementing proper pagination or lazy loading:
          </Typography>

          <Paper elevation={3} style={{ marginBottom: '16px' }}>
            <LazySyntaxHighlighter language='php'>
              {`// Not ideal: sending too much data at once
return Inertia::render('Dashboard', [
    'allUsers' => User::with('posts', 'comments', 'likes')->get() // Could be huge!
]);

// Better: paginate and be selective about relations
return Inertia::render('Dashboard', [
    'users' => User::select('id', 'name', 'email')
        ->withCount('posts')
        ->paginate(10)
]);`}
            </LazySyntaxHighlighter>
          </Paper>

          <Typography variant='h6' gutterBottom>
            Frontend Fundamentals
          </Typography>

          <Typography variant='body1' paragraph>
            While Inertia makes it easier to use React (or Vue/Svelte), it doesn't absolve you from
            learning frontend fundamentals. If you rely too heavily on Inertia without understanding
            the underlying principles, you might:
          </Typography>

          <List>
            <ListItem>
              <ListItemText primary='Miss opportunities to optimize your frontend code' />
            </ListItem>
            <ListItem>
              <ListItemText primary='Have difficulty debugging complex frontend issues' />
            </ListItem>
            <ListItem>
              <ListItemText primary='Create unnecessarily complex server-side solutions for frontend problems' />
            </ListItem>
          </List>

          <Typography variant='h4' gutterBottom>
            Community Perspectives
          </Typography>

          <Typography variant='body1' paragraph>
            The developer community has mixed but generally positive views on Inertia.js:
          </Typography>

          <Typography variant='h6' gutterBottom>
            The Criticism
          </Typography>

          <Typography variant='body1' paragraph>
            Some developers argue that Inertia can create knowledge gaps in frontend architecture.
            By abstracting away certain aspects of SPA development, it might prevent developers from
            truly understanding what's happening under the hood. This is a valid concern—relying too
            heavily on Inertia without learning the underlying principles could lead to skill
            deficiencies.
          </Typography>

          <Typography variant='h6' gutterBottom>
            The Praise
          </Typography>

          <Typography variant='body1' paragraph>
            Others view Inertia as an approachable bridge—a "gateway drug" to frontend development
            for backend developers. It allows you to build modern UIs without completely abandoning
            your backend expertise. Many Laravel developers appreciate how Inertia lets them
            leverage their existing skills while gradually learning new ones.
          </Typography>

          <Typography variant='h4' gutterBottom>
            Practical Differences vs. "Vanilla" React
          </Typography>

          <Typography variant='body1' paragraph>
            To understand Inertia's value proposition, it helps to compare it with a traditional
            React SPA approach:
          </Typography>

          <Typography variant='h6' gutterBottom>
            Traditional SPA with React
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary='Architecture'
                secondary='Complete separation: React frontend talks to Laravel via API endpoints'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Routing'
                secondary='Client-side routing with React Router or similar'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Data Flow'
                secondary='API requests (fetch/axios) → JSON responses → State management (Redux, Context)'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Authentication'
                secondary='Token-based (JWT, OAuth) with custom frontend implementation'
              />
            </ListItem>
          </List>

          <Typography variant='h6' gutterBottom>
            Inertia.js Approach
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary='Architecture'
                secondary='Hybrid: Laravel handles routing and data, React renders the UI'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Routing'
                secondary='Server-side routing with Laravel, client-side navigation via Inertia'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Data Flow'
                secondary='Controller → Inertia::render() → Component props → React state'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Authentication'
                secondary='Standard Laravel authentication with automatic Inertia integration'
              />
            </ListItem>
          </List>

          <Typography variant='body1' paragraph>
            Here's a visual comparison in code:
          </Typography>

          <Paper elevation={3} style={{ marginBottom: '16px' }}>
            <LazySyntaxHighlighter language='php'>
              {`// Traditional API Controller
class UserApiController extends Controller
{
    public function index()
    {
        return response()->json([
            'users' => User::paginate(10)
        ]);
    }
}

// Inertia Controller
class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::paginate(10)
        ]);
    }
}`}
            </LazySyntaxHighlighter>
          </Paper>

          <Paper elevation={3} style={{ marginBottom: '16px' }}>
            <LazySyntaxHighlighter language='tsx'>
              {`// Traditional React SPA Component with API fetch
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data.users.data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>Users</h1>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}

// Inertia.js Component - data comes as props
import React from 'react';

interface User {
  id: number;
  name: string;
}

interface Props {
  users: {
    data: User[];
  };
}

export default function Users({ users }: Props) {
  return (
    <div>
      <h1>Users</h1>
      {users.data.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}`}
            </LazySyntaxHighlighter>
          </Paper>

          <Typography variant='h4' gutterBottom>
            Takeaways
          </Typography>

          <Typography variant='body1' paragraph>
            After working with Inertia.js on multiple projects, here are my key takeaways:
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="Inertia is a pragmatic tool if you're more comfortable on the backend but want richer UIs"
                secondary='It meets you where you are and grows with you'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='It significantly reduces the time-to-market for full-stack applications'
                secondary='Less boilerplate code means faster development cycles'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="It's still important to gradually learn frontend essentials"
                secondary='Even with Inertia, understanding React fundamentals will make you more effective'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Inertia works best when you own both frontend and backend'
                secondary='For projects with separate frontend and backend teams, a traditional API approach might be more suitable'
              />
            </ListItem>
          </List>

          <Typography variant='h4' gutterBottom>
            Questions to Consider
          </Typography>

          <Typography variant='body1' paragraph>
            Before adopting Inertia.js for your next project, consider these questions:
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary='What are your project needs?'
                secondary='Do you need a full SPA with complex client-side state management, or is a hybrid approach sufficient?'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Are you trying to learn or just deliver?'
                secondary='If immediate productivity is your goal, Inertia offers a faster path. If deep learning is your aim, building a traditional SPA might be more educational.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Will your team need to grow into deeper frontend skills later?'
                secondary='Consider whether Inertia is a stepping stone or a long-term architecture choice for your team'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Do you need to expose APIs for other clients?'
                secondary="If you're building for multiple platforms (web, mobile, etc.), you might still need traditional APIs alongside Inertia"
              />
            </ListItem>
          </List>

          <Typography variant='body1' paragraph>
            Inertia.js has been a game-changer for how I approach web development, bridging the gap
            between my Laravel expertise and modern frontend development. It's not the right choice
            for every project, but when the conditions are right, it offers an elegant and
            productive way to build full-stack applications.
          </Typography>

          <Typography variant='h3' gutterBottom>
            Frequently Asked Questions
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary='What is Inertia.js?'
                secondary='Inertia.js is a glue layer between your backend framework (like Laravel) and your frontend framework (like React), allowing server-side routing with client-side rendering without requiring a complete API.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Does Inertia.js replace REST APIs completely?'
                secondary='Not completely. While Inertia reduces the need for APIs for many page interactions, you might still want traditional APIs for third-party integrations, mobile apps, or public data access.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Is Inertia.js only for Laravel?'
                secondary='No, Inertia has adapters for multiple backend frameworks including Laravel, Rails, and others. On the frontend, it supports React, Vue, and Svelte.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='How does Inertia.js handle SEO?'
                secondary="Inertia supports server-side rendering (SSR) which can help with SEO. Without SSR, you can use the Head component to set meta tags, but it doesn't have the same benefits as full server rendering for search engines."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Is there a performance overhead with Inertia.js?'
                secondary='There can be a slight overhead in terms of payload size (Inertia includes some metadata with each request), but this is generally negligible. The bigger concern is properly managing what data you send with each page to avoid unnecessarily large payloads.'
              />
            </ListItem>
          </List>

          <Typography variant='h3' gutterBottom>
            References and Resources
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary='Official Inertia.js Documentation'
                secondary='The comprehensive guide to all things Inertia, including setup, configuration, and advanced features.'
              />
              <Link href='https://inertiajs.com' target='_blank' color='primary' underline='hover'>
                Visit Official Documentation
              </Link>
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Laravel Adapter for Inertia.js'
                secondary='Documentation for the Laravel server-side adapter, including installation, forms, and authentication.'
              />
              <Link
                href='https://github.com/inertiajs/inertia-laravel'
                target='_blank'
                color='primary'
                underline='hover'
              >
                View Laravel Adapter
              </Link>
            </ListItem>
            <ListItem>
              <ListItemText
                primary='React Adapter for Inertia.js'
                secondary='Documentation for using Inertia with React, including forms, links, and lifecycle hooks.'
              />
              <Link
                href='https://inertiajs.com/client-side-setup#react'
                target='_blank'
                color='primary'
                underline='hover'
              >
                View React Adapter
              </Link>
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Ping CRM Demo'
                secondary='A demo application that showcases Inertia.js in action with Laravel and various frontend frameworks.'
              />
              <Link
                href='https://github.com/inertiajs/pingcrm'
                target='_blank'
                color='primary'
                underline='hover'
              >
                Explore Demo Application
              </Link>
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Server-Side Rendering'
                secondary='Learn how to implement server-side rendering with Inertia.js for better SEO and initial page loads.'
              />
              <Link
                href='https://inertiajs.com/server-side-rendering'
                target='_blank'
                color='primary'
                underline='hover'
              >
                Read SSR Guide
              </Link>
            </ListItem>
          </List>
        </React.Fragment>
      }
    />
  )
}

export default WhyInertia
