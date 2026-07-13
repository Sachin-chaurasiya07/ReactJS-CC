# React Router Notes

---

# What is React Router?

**React Router** is a library used for **navigation** in React applications.

It allows users to move between different pages **without refreshing the browser**.

Example:

```
Home

↓

About

↓

Contact

↓

Profile
```

All of this happens inside a **Single Page Application (SPA).**

---

# Why Do We Need React Router?

Imagine a website without React Router.

Every time you click a link:

```
Home

↓

Browser Requests New HTML

↓

Server Sends New Page

↓

Entire Website Reloads
```

This is how traditional websites work.

---

With React Router:

```
Home

↓

URL Changes

↓

React Changes Component

↓

No Page Reload
```

Only the required component changes.

This makes the website:

* Faster
* Smoother
* More responsive

---

# Install

```bash
npm install react-router-dom
```

---

# Basic Idea

Suppose your website has:

```
Home
About
Contact
Profile
```

Instead of creating four HTML pages,

React creates four components.

```
Home.jsx

About.jsx

Contact.jsx

Profile.jsx
```

React Router decides **which component should be displayed** depending on the URL.

---

# Basic Structure

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>

    </BrowserRouter>
  );
}
```

---

# BrowserRouter

```jsx
<BrowserRouter>

</BrowserRouter>
```

It enables routing in your application.

Think of it as:

> "Turn on navigation."

Without it,

React Router cannot work.

---

# Routes

```jsx
<Routes>

</Routes>
```

Acts like a traffic controller.

It checks:

```
Current URL

↓

Which Route Matches?

↓

Render That Component
```

---

# Route

```jsx
<Route
    path="/about"
    element={<About />}
/>
```

Meaning:

```
If URL = /about

↓

Show About Component
```

---

# Path

```jsx
path="/"
```

Home page.

---

```jsx
path="/about"
```

About page.

---

```jsx
path="/contact"
```

Contact page.

---

# Element

```jsx
element={<Home />}
```

The component that React should display.

---

# Example

```
URL

/about

↓

Route Matches

↓

About Component

↓

Screen Displays About Page
```

---

# Navigation

Instead of HTML

```html
<a href="/about">
About
</a>
```

Use React Router's Link.

```jsx
import { Link } from "react-router-dom";

<Link to="/about">
    About
</Link>
```

---

# Why Not `<a>`?

Using

```html
<a>
```

causes:

```
Entire Page Reload
```

Using

```jsx
<Link>
```

causes:

```
Component Changes

↓

No Refresh
```

---

# Example

```jsx
<Link to="/">
Home
</Link>

<Link to="/about">
About
</Link>

<Link to="/contact">
Contact
</Link>
```

---

# Flow

```
User Clicks Link

↓

URL Changes

↓

React Router Finds Route

↓

Correct Component Renders

↓

No Page Refresh
```

---

# Nested Routes

Suppose:

```
Dashboard

├── Profile

├── Settings

└── Analytics
```

Instead of

```
/profile

/settings
```

We can have

```
/dashboard/profile

/dashboard/settings
```

Example:

```jsx
<Route path="/dashboard" element={<Dashboard />}>

    <Route path="profile" element={<Profile />} />

    <Route path="settings" element={<Settings />} />

</Route>
```

---

# Outlet

Inside Dashboard:

```jsx
import { Outlet } from "react-router-dom";

function Dashboard() {

    return (

        <>
            <h1>Dashboard</h1>

            <Outlet />

        </>

    );

}
```

`<Outlet />` means:

> "Render child routes here."

---

# Dynamic Routes

Suppose user profiles:

```
/user/101

/user/102

/user/103
```

Instead of creating hundreds of routes,

React Router allows parameters.

```jsx
<Route
    path="/user/:id"
    element={<Profile />}
/>
```

---

# Reading Parameters

```jsx
import { useParams } from "react-router-dom";

function Profile() {

    const { id } = useParams();

}
```

If URL is

```
/user/101
```

Then

```jsx
id = "101"
```

---

# Programmatic Navigation

Sometimes we navigate using JavaScript.

Example:

After Login.

```jsx
const navigate = useNavigate();

navigate("/dashboard");
```

Flow

```
Login Successful

↓

Navigate

↓

Dashboard Opens
```

---

# Not Found Page

```jsx
<Route
    path="*"
    element={<NotFound />}
/>
```

If no route matches,

React shows:

```
404 Page
```

---

# Common Hooks

## useNavigate()

Move to another page.

```jsx
const navigate = useNavigate();

navigate("/home");
```

---

## useParams()

Read URL parameters.

```jsx
const { id } = useParams();
```

---

## useLocation()

Current URL information.

```jsx
const location = useLocation();

console.log(location.pathname);
```

---

# React Router Components

| Component     | Purpose                  |
| ------------- | ------------------------ |
| BrowserRouter | Enables routing          |
| Routes        | Groups all routes        |
| Route         | Maps URL to component    |
| Link          | Navigate without refresh |
| Outlet        | Display child routes     |

---

# React Router Hooks

| Hook        | Purpose                   |
| ----------- | ------------------------- |
| useNavigate | Navigate using JavaScript |
| useParams   | Read URL parameters       |
| useLocation | Current URL information   |

---

# Common Folder Structure

```
src/

components/

pages/

Home.jsx

About.jsx

Contact.jsx

Profile.jsx

App.jsx

main.jsx
```

---

# Complete Flow

```
User Clicks Link

↓

Browser URL Changes

↓

BrowserRouter Detects Change

↓

Routes Checks Path

↓

Matching Route Found

↓

Component Rendered

↓

No Page Reload
```

---

# Traditional Website vs React Router

## Traditional Website

```
Click Link

↓

Request Server

↓

New HTML

↓

Full Refresh
```

---

## React Router

```
Click Link

↓

URL Changes

↓

React Finds Route

↓

Component Changes

↓

No Refresh
```

---

# Common Beginner Mistakes

### Using `<a>` Instead of `<Link>`

❌

```html
<a href="/about">
About
</a>
```

---

✅

```jsx
<Link to="/about">
About
</Link>
```

---

### Forgetting BrowserRouter

Without

```jsx
<BrowserRouter>
```

routing won't work.

---

### Forgetting Outlet in Nested Routes

Without

```jsx
<Outlet />
```

child routes won't appear.

---

# Interview Questions

## What is React Router?

React Router is a library that enables client-side routing in React applications without reloading the page.

---

## Why do we use React Router?

To navigate between different components efficiently while keeping the application as a Single Page Application (SPA).

---

## Difference Between `<a>` and `<Link>`?

`<a>`

* Reloads the page.

`<Link>`

* Changes the URL without refreshing the page.

---

## What does BrowserRouter do?

It enables routing by listening to URL changes and allowing React Router to manage navigation.

---

## What is `useNavigate()`?

A hook used to navigate to another route programmatically.

---

## What is `useParams()`?

A hook used to access dynamic values from the URL.

---

## Quick Revision

```
BrowserRouter

↓

Routes

↓

Route

↓

Component

----------------------

Link

↓

Navigate

↓

No Refresh

----------------------

useNavigate()

↓

Navigate by Code

----------------------

useParams()

↓

Read URL

----------------------

Outlet

↓

Render Nested Routes
```

---

# One-Line Summary

> **React Router is a library that enables client-side navigation in React applications by mapping URLs to components, allowing users to switch pages without refreshing the browser.**
