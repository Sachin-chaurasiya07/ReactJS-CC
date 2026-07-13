# React Router `loader` Notes

---

# What is a Loader?

A **loader** is a function in React Router that runs **before a route is rendered**.

Its job is to:

* Fetch data
* Return data
* Make that data available to the route component

Think of it as:

> **"Prepare everything the page needs before showing it."**

---

# Why Do We Need a Loader?

Imagine opening a GitHub profile page.

Route:

```text
/profile/chiriya
```

The page needs:

* Name
* Followers
* Bio
* Avatar

Without this data, the page cannot display meaningful information.

Instead of rendering an empty page and fetching data later, React Router fetches the data **first**.

---

# Without Loader

Using `useEffect`

```jsx
function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        fetch("https://api.github.com/users/chiriya")
            .then(res => res.json())
            .then(data => setUser(data));

    }, []);

    if (!user)
        return <h1>Loading...</h1>;

    return <h1>{user.name}</h1>;

}
```

Flow

```text
User Opens Profile

↓

Component Renders

↓

useEffect Runs

↓

API Request Starts

↓

Loading...

↓

API Responds

↓

State Updates

↓

Component Re-renders

↓

Profile Appears
```

---

# With Loader

```text
User Opens Profile

↓

React Router

↓

Runs Loader

↓

Fetches Data

↓

Data Ready

↓

Component Renders

↓

Profile Appears
```

The component receives ready-to-use data.

---

# Syntax

## Step 1 — Create Loader

```jsx
export async function userLoader() {

    const response = await fetch(
        "https://api.github.com/users/octocat"
    );

    return response.json();

}
```

---

## Step 2 — Attach Loader to Route

```jsx
import {
    createBrowserRouter
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/profile",
        element: <Profile />,
        loader: userLoader
    }
]);
```

---

## Step 3 — Read Loader Data

```jsx
import { useLoaderData } from "react-router-dom";

function Profile() {

    const user = useLoaderData();

    return <h1>{user.name}</h1>;

}
```

Notice:

No

```jsx
useState()
```

No

```jsx
useEffect()
```

No

```jsx
fetch()
```

inside the component.

---

# What is `useLoaderData()`?

`useLoaderData()` is a React Router Hook used to access the data returned by a route's loader.

Example

Loader returns

```js
{
    name: "Sachin",
    followers: 150
}
```

Component

```jsx
const user = useLoaderData();

console.log(user.name);
```

Output

```text
Sachin
```

---

# Real-Life Analogy

Imagine a hotel.

### Without Loader

```text
Guest Enters Room

↓

Orders Food

↓

Chef Starts Cooking

↓

Guest Waits

↓

Food Arrives
```

---

### With Loader

```text
Food Prepared

↓

Guest Enters Room

↓

Food Already Waiting
```

The preparation happens before the guest enters.

---

# Why is Loader Better?

### Without Loader

```text
Render Component

↓

Fetch Data

↓

Loading State

↓

Render Again
```

---

### With Loader

```text
Fetch Data

↓

Data Ready

↓

Render Component Once
```

Cleaner code and often a smoother initial route experience.

---

# Dynamic Route Example

Suppose

```text
/products/25
```

Route

```jsx
{
    path: "/products/:id",
    element: <Product />,
    loader: productLoader
}
```

Loader

```jsx
export async function productLoader({ params }) {

    const response = await fetch(

        `https://api.example.com/products/${params.id}`

    );

    return response.json();

}
```

Component

```jsx
function Product() {

    const product = useLoaderData();

    return <h1>{product.title}</h1>;

}
```

React Router automatically passes route parameters to the loader.

---

# Loader Flow

```text
User Visits Route

↓

React Router Finds Matching Route

↓

Runs Loader

↓

Fetch API

↓

Receives Data

↓

Stores Data

↓

Renders Component

↓

useLoaderData() Reads Data
```

---

# Loader vs `useEffect`

| Loader                                      | `useEffect`                                            |
| ------------------------------------------- | ------------------------------------------------------ |
| Runs before route renders                   | Runs after component renders                           |
| Best for route data                         | Best for side effects                                  |
| Fetches essential page data                 | Handles timers, listeners, subscriptions, browser APIs |
| Data available immediately to the component | Component usually renders first, then fetches data     |

---

# When Should You Use a Loader?

Use a loader when the page **cannot work properly without the data**.

Examples

* Product Details
* User Profile
* GitHub Profile
* Blog Post
* Course Details
* Order Details

---

# When Should You Use `useEffect` Instead?

Use `useEffect` for work that happens **after** the page is already displayed.

Examples

* Notifications
* Chat messages
* Live scores
* Timers
* Event listeners
* Browser APIs
* Updating the page title

---

# Easy Rule to Remember

Ask yourself:

> **"Can this page exist without this data?"**

If **NO**

```text
Use Loader
```

If **YES**

```text
Use useEffect
```

---

# Common Beginner Mistakes

## Using `useEffect` for every API call

Not every API request belongs in `useEffect`.

If the data is required before showing the page, a loader is often a better fit.

---

## Forgetting `useLoaderData()`

The loader fetches the data.

Your component still needs to read it using:

```jsx
const data = useLoaderData();
```

---

## Thinking a Loader Replaces `useEffect`

It doesn't.

A loader prepares data for a route.

`useEffect` is still needed for side effects like timers, subscriptions, and browser interactions.

---

# Interview Questions

## What is a Loader?

A loader is an asynchronous function that React Router executes before rendering a route. It fetches and returns the data required by that route.

---

## Why use a Loader instead of `useEffect`?

A loader prepares essential route data before rendering, reducing component complexity and avoiding an initial render that immediately has to fetch required data.

---

## What does `useLoaderData()` do?

It returns the data that was returned by the route's loader.

---

## Can a Loader replace `useEffect`?

No.

Loaders are for route data.

`useEffect` is for side effects after rendering.

---

# Quick Revision

```text
User Opens Route

↓

React Router

↓

Runs Loader

↓

Fetch Data

↓

Data Ready

↓

Render Component

↓

useLoaderData()

↓

Display Data
```

---

# One-Line Summary

> **A React Router loader is an asynchronous function that fetches the data a route needs before the component renders, and that data is accessed inside the component using `useLoaderData()`.**
