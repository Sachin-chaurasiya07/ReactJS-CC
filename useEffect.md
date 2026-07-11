# React `useEffect` Notes

---

# What is `useEffect`?

`useEffect` is a **built-in React Hook** that lets you perform **side effects** in a functional component.

A side effect is anything that happens **outside of rendering the UI**.

Examples:

* Fetching data from an API
* Calling a database
* Using `setTimeout`
* Using `setInterval`
* Accessing the DOM
* Adding event listeners
* Updating the document title
* Saving data to Local Storage

---

# Why Do We Need `useEffect`?

React components should mainly focus on:

* Receiving data
* Returning JSX (UI)

Sometimes we need to do extra work after React finishes rendering.

That's where `useEffect` comes in.

Think of it as:

> **"Run this code after React updates the UI."**

---

# Real-Life Analogy

Imagine you're baking a cake.

Step 1

Bake the cake.

↓

Step 2

Decorate it.

The decoration happens **after** the cake is ready.

Similarly:

```text
React Renders UI

↓

useEffect Runs
```

---

# Syntax

```jsx
useEffect(() => {

    // Side Effect

}, []);
```

---

# Basic Example

```jsx
import { useEffect } from "react";

function App() {

    useEffect(() => {

        console.log("Component Rendered");

    }, []);

    return <h1>Hello</h1>;
}
```

Output

```text
Component Rendered
```

---

# What Does the Second Parameter Mean?

```jsx
useEffect(() => {

}, []);
```

The second parameter is called the **Dependency Array**.

It tells React **when** to run the effect.

---

# Case 1 — No Dependency Array

```jsx
useEffect(() => {

    console.log("Hello");

});
```

Runs:

```text
Initial Render ✅

Second Render ✅

Third Render ✅

Every Render ✅
```

---

# Case 2 — Empty Dependency Array

```jsx
useEffect(() => {

    console.log("Hello");

}, []);
```

Runs:

```text
Only Once

↓

After the First Render
```

This is commonly used for:

* API calls
* Initial setup
* Loading data

---

# Case 3 — Dependencies

```jsx
useEffect(() => {

    console.log("Count Changed");

}, [count]);
```

Runs:

```text
First Render ✅

Whenever count Changes ✅
```

If another state changes:

```jsx
setName("Sachin");
```

This effect **does not run** because `name` is not in the dependency array.

---

# Example

```jsx
const [count, setCount] = useState(0);

useEffect(() => {

    console.log("Count Changed");

}, [count]);
```

Click button:

```jsx
setCount(count + 1);
```

Flow

```text
State Changed

↓

Component Re-renders

↓

UI Updates

↓

useEffect Executes
```

---

# Why is it Called "Effect"?

Because it performs an **effect** after rendering.

Example:

```jsx
document.title = `Count: ${count}`;
```

The UI is already rendered.

Now React performs this extra work.

---

# Common Uses

## API Calls

```jsx
useEffect(() => {

    fetch("https://example.com/users")
        .then(res => res.json())
        .then(data => console.log(data));

}, []);
```

Runs only once.

---

## Updating Document Title

```jsx
useEffect(() => {

    document.title = `Count ${count}`;

}, [count]);
```

Every time `count` changes,

Browser title updates.

---

## Timer

```jsx
useEffect(() => {

    const timer = setInterval(() => {

        console.log("Running");

    }, 1000);

}, []);
```

---

# Cleanup Function

Sometimes we create things that must be removed.

Example:

* Timers
* Event listeners
* WebSockets

React allows cleanup.

```jsx
useEffect(() => {

    const timer = setInterval(() => {

        console.log("Running");

    }, 1000);

    return () => {

        clearInterval(timer);

    };

}, []);
```

---

# Why Cleanup?

Without cleanup:

```text
Component Removed

↓

Timer Still Running ❌
```

With cleanup:

```text
Component Removed

↓

Cleanup Executes

↓

Timer Stops ✅
```

---

# Flow of Cleanup

```text
Component Mounts

↓

Effect Runs

↓

Component Updates or Unmounts

↓

Cleanup Runs

↓

Effect Runs Again (if needed)
```

---

# Example with Event Listener

```jsx
useEffect(() => {

    window.addEventListener("resize", handleResize);

    return () => {

        window.removeEventListener("resize", handleResize);

    };

}, []);
```

Without cleanup,

multiple listeners would keep getting added.

---

# `useEffect` and Dependency Array

| Dependency      | Runs When                                         |
| --------------- | ------------------------------------------------- |
| No array        | Every render                                      |
| `[]`            | Only after first render                           |
| `[count]`       | First render + whenever `count` changes           |
| `[count, name]` | First render + whenever `count` or `name` changes |

---

# Mental Model

```text
Component Renders

↓

React Paints UI

↓

useEffect Runs
```

Always remember:

**Rendering happens first.**

Then the effect runs.

---

# Common Beginner Mistakes

## Forgetting Dependencies

```jsx
useEffect(() => {

    console.log(count);

}, []);
```

If `count` changes,

this effect won't run again.

---

## Putting Everything in `useEffect`

Not every piece of code belongs in `useEffect`.

Simple calculations should stay inside the component.

---

## Forgetting Cleanup

Timers

Event listeners

Subscriptions

should usually be cleaned up.

---

# `useState` vs `useEffect`

| `useState`       | `useEffect`                 |
| ---------------- | --------------------------- |
| Stores state     | Performs side effects       |
| Causes re-render | Runs after render           |
| Updates UI       | Does work outside rendering |

---

# Complete Flow

```text
User Clicks Button

↓

setState()

↓

State Changes

↓

Component Re-renders

↓

React Updates UI

↓

useEffect Executes
```

---

# Interview Questions

## What is `useEffect`?

`useEffect` is a React Hook used to perform side effects after a component renders.

---

## What are Side Effects?

Operations outside rendering, such as:

* API calls
* Timers
* Event listeners
* DOM manipulation
* Local Storage

---

## What does `[]` mean?

Run the effect only once after the initial render.

---

## What happens if there is no dependency array?

The effect runs after every render.

---

## Why do we need Cleanup?

To remove timers, listeners, subscriptions, and other resources when the component updates or unmounts.

---

# Quick Revision

```text
Component Renders

↓

UI Updates

↓

useEffect Runs

↓

Performs Side Effect
```

---

# Remember This Table

```text
useEffect(fn)

↓

Runs Every Render

--------------------

useEffect(fn, [])

↓

Runs Once

--------------------

useEffect(fn, [count])

↓

Runs on Mount

+

Runs Whenever count Changes
```

---

# One-Line Summary

> **`useEffect` is a built-in React Hook that runs side-effect code after React renders the UI. The dependency array controls when the effect should execute, and the cleanup function prevents memory leaks by removing resources when they are no longer needed.**
