# React `useState` Notes

---

# What is `useState`?

`useState` is a **built-in React Hook** used to create and manage **state** inside a functional component.

State is data that can change over time, and when it changes, React automatically updates the UI.

---

# What is State?

**State** is a variable whose value can change, and React keeps track of it.

Unlike a normal JavaScript variable, changing state causes the component to **re-render**.

Example:

```jsx
const [count, setCount] = useState(0);
```

Here,

* `count` → Current state value
* `setCount` → Function to update the state
* `0` → Initial value

---

# Why Do We Need `useState`?

Suppose we use a normal variable:

```jsx
function App() {
  let count = 0;

  function increase() {
    count++;
    console.log(count);
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={increase}>+</button>
    </>
  );
}
```

### Problem

Clicking the button increases the variable:

```text
1
2
3
```

But the UI still shows:

```text
0
```

Why?

Because React **doesn't know** that `count` changed.

---

# Using `useState`

```jsx
function App() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={increase}>+</button>
    </>
  );
}
```

Now React knows the state changed and updates the UI automatically.

---

# Syntax

```jsx
const [state, setState] = useState(initialValue);
```

Example:

```jsx
const [name, setName] = useState("Chiriya");
```

---

# Understanding the Syntax

```jsx
const [count, setCount] = useState(0);
```

### `count`

Current value of the state.

---

### `setCount`

Function used to update the state.

---

### `0`

Initial value of the state.

When the component renders for the first time:

```text
count = 0
```

---

# How State Updates Work

Example:

```jsx
setCount(count + 1);
```

React performs these steps:

```text
Button Click
      │
      ▼
setCount()
      │
      ▼
State Changes
      │
      ▼
React Re-renders Component
      │
      ▼
UI Updates
```

---

# Why Doesn't React Update Immediately?

Consider:

```jsx
setCount(count + 1);
console.log(count);
```

Output:

```text
0
```

Many beginners expect:

```text
1
```

But React schedules the update.

Current render:

```text
count = 0
```

Next render:

```text
count = 1
```

The `console.log` runs before React finishes the re-render.

---

# Wrong Way to Update State

```jsx
count = count + 1;
```

or

```jsx
count++;
```

React won't know the state changed.

Always use:

```jsx
setCount(count + 1);
```

---

# Functional Update

Instead of:

```jsx
setCount(count + 1);
```

You can write:

```jsx
setCount(previous => previous + 1);
```

This is useful when the new value depends on the previous value.

---

# Why Functional Updates Matter

Wrong:

```jsx
setCount(count + 1);
setCount(count + 1);
```

Suppose:

```text
count = 0
```

Both calls become:

```jsx
setCount(1);
setCount(1);
```

Final value:

```text
1
```

---

Correct:

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

Flow:

```text
0

↓

1

↓

2
```

Final value:

```text
2
```

---

# State Can Store Any Data Type

## Number

```jsx
const [count, setCount] = useState(0);
```

---

## String

```jsx
const [name, setName] = useState("Chiriya");
```

---

## Boolean

```jsx
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

---

## Array

```jsx
const [items, setItems] = useState([]);
```

---

## Object

```jsx
const [user, setUser] = useState({
  name: "Chiriya",
  age: 21
});
```

---

# Updating an Object

Wrong:

```jsx
user.name = "Sachin";
```

Correct:

```jsx
setUser({
  ...user,
  name: "Sachin"
});
```

---

# Updating an Array

Wrong:

```jsx
items.push("Apple");
```

Correct:

```jsx
setItems([...items, "Apple"]);
```

---

# State Causes Re-render

```jsx
const [color, setColor] = useState("red");
```

Click:

```jsx
setColor("blue");
```

React performs:

```text
State Changed

↓

Component Re-renders

↓

UI Changes to Blue
```

---

# Common Beginner Mistakes

## Forgetting to Use the Setter

❌

```jsx
count++;
```

---

## Expecting Immediate Updates

❌

```jsx
setCount(count + 1);

console.log(count);
```

---

## Changing State Directly

❌

```jsx
count = 10;
```

Always use the setter function.

---

# `useState` Flow

```text
Component Renders
        │
        ▼
useState Creates State
        │
        ▼
User Interaction
(Button Click)
        │
        ▼
setState()
        │
        ▼
State Updates
        │
        ▼
Component Re-renders
        │
        ▼
Updated UI
```

---

# Interview Questions

## What is `useState`?

`useState` is a React Hook that allows functional components to store and update state. Updating the state causes React to re-render the component.

---

## Why do we use `useState`?

Because normal variables don't trigger UI updates, while state changes tell React to re-render the component.

---

## Does `setState` update immediately?

No.

React schedules the update and applies it during the next render.

---

## Can `useState` store objects and arrays?

Yes.

It can store numbers, strings, booleans, arrays, objects, and even functions.

---

## Can we modify state directly?

No.

Always use the setter function returned by `useState`.

---

# Quick Revision

```text
useState

↓

Stores State

↓

Returns

[state, setState]

↓

setState()

↓

State Changes

↓

Component Re-renders

↓

UI Updates
```

---

# One-Line Summary

> **`useState` is a built-in React Hook that lets functional components store state and update the UI automatically whenever that state changes.**
