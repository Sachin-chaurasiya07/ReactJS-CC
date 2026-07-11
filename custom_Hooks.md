# React Custom Hooks Notes

---

# What is a Custom Hook?

A **Custom Hook** is a **JavaScript function** that:

* Starts with the word **`use`**
* Uses one or more React hooks (`useState`, `useEffect`, `useCallback`, etc.)
* Returns **logic**, not UI (JSX)

It helps you **reuse stateful logic** across multiple components.

---

# Why Do We Need Custom Hooks?

Imagine you have three components:

* Login
* Profile
* Dashboard

Each one contains the same code:

```jsx
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);
```

Instead of copying this logic into every component, create a custom hook once and reuse it everywhere.

---

# Real-Life Analogy

Think of React as a smartphone.

Built-in apps:

* Camera
* Calculator
* Clock

These are like React's built-in hooks:

* `useState`
* `useEffect`
* `useRef`
* `useCallback`

Now you install your own app:

* Spotify
* WhatsApp
* Notion

Those are like **Custom Hooks**.

They aren't built into React—you create them yourself using React's hooks.

---

# Syntax

```jsx
function useCounter() {
  const [count, setCount] = useState(0);

  return {
    count,
    setCount
  };
}
```

Notice:

* Function name starts with `use`
* Uses `useState`
* Returns data/functions

---

# Using a Custom Hook

### Custom Hook

```jsx
function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);

  return {
    count,
    increment,
    decrement
  };
}
```

### Component

```jsx
function App() {
  const { count, increment, decrement } = useCounter(0);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={increment}>+</button>

      <button onClick={decrement}>-</button>
    </>
  );
}
```

---

# Without Custom Hooks

```jsx
function Login() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
}
```

```jsx
function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
}
```

```jsx
function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
}
```

Lots of repeated code.

---

# With Custom Hooks

```jsx
function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return {
    user,
    loading,
    setUser,
    setLoading
  };
}
```

Now every component simply does:

```jsx
const { user, loading } = useUser();
```

Cleaner and easier to maintain.

---

# Custom Hook vs Component

## Custom Hook

```jsx
function useTheme() {
  const [theme, setTheme] = useState("light");

  return {
    theme,
    setTheme
  };
}
```

Returns:

* State
* Functions
* Values

Not UI.

---

## Component

```jsx
function Theme() {
  return <h1>Dark Mode</h1>;
}
```

Returns:

* JSX (UI)

---

# Easy Trick to Identify Them

Ask yourself:

### Does it return JSX?

If **YES**

```jsx
function Profile() {
  return <h1>Hello</h1>;
}
```

➡️ It's a **Component**

---

If **NO**

```jsx
function useProfile() {
  const [user, setUser] = useState(null);

  return { user };
}
```

➡️ It's a **Custom Hook**

---

# Rules of Custom Hooks

## Rule 1

The function name **must start with `use`**.

✅

```jsx
useCounter()
```

❌

```jsx
counter()
```

---

## Rule 2

Custom hooks can use other React hooks.

```jsx
function useCounter() {
  const [count, setCount] = useState(0);
}
```

Perfectly valid.

---

## Rule 3

A custom hook should **not return JSX**.

❌ Wrong

```jsx
function useUser() {
  return <h1>Hello</h1>;
}
```

✅ Correct

```jsx
function useUser() {
  return {
    name: "Chiriya"
  };
}
```

---

# Components and Custom Hooks Work Together

```text
Component
      │
      ▼
Calls Custom Hook
      │
      ▼
Custom Hook
      │
      ▼
Uses React Hooks
(useState, useEffect, useCallback...)
      │
      ▼
Returns Logic
      │
      ▼
Component Uses Logic to Render UI
```

---

# Important Point

Custom Hooks **do not create shared state**.

Example:

```jsx
const counter1 = useCounter(0);
const counter2 = useCounter(10);
```

Initial output:

```
0      10
```

Click first button:

```
1      10
```

Click second button:

```
1      11
```

Each call to a custom hook creates its **own independent state**.

---

# Common Examples of Custom Hooks

### Counter Hook

```jsx
useCounter()
```

---

### Theme Hook

```jsx
useTheme()
```

---

### Fetch Data Hook

```jsx
useFetch()
```

---

### Local Storage Hook

```jsx
useLocalStorage()
```

---

### Password Generator Hook

```jsx
usePasswordGenerator()
```

---

# Advantages

* Reuse logic
* Reduce duplicate code
* Improve readability
* Easier maintenance
* Better code organization
* Easier testing

---

# Common Beginner Mistakes

### Returning JSX

❌

```jsx
function useUser() {
  return <h1>Hello</h1>;
}
```

---

### Forgetting the `use` prefix

❌

```jsx
function counter() {}
```

---

### Thinking Custom Hooks Share State

❌

```jsx
const user1 = useUser();
const user2 = useUser();
```

These do **not** share state.

Each call has its own separate state.

---

# Interview Questions

## What is a Custom Hook?

A custom hook is a reusable JavaScript function whose name starts with `use` and that can call other React hooks to share stateful logic between components.

---

## Why do we use Custom Hooks?

To avoid repeating the same logic in multiple components and make code more reusable and maintainable.

---

## Can a Custom Hook return JSX?

No.

A custom hook should return **logic** (state, values, functions), not UI.

---

## Do Custom Hooks share state?

No.

Every call to a custom hook creates a new, independent state.

---

# Revision

```
Custom Hook

↓

Starts with "use"

↓

Uses React Hooks

↓

Returns Logic

↓

Reusable

↓

No JSX
```

---

# One-Line Summary

> **A Custom Hook is a reusable JavaScript function that starts with `use`, uses React hooks internally, and returns reusable logic (state, values, or functions) instead of JSX.**
