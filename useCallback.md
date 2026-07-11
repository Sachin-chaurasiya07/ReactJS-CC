# React `useCallback` Notes

---

# What is `useCallback`?

`useCallback` is a **built-in React Hook** that **remembers (memoizes) a function** between renders.

Instead of creating a **new function** on every render, React reuses the existing function **until one of its dependencies changes**.

---

# Why Do We Need `useCallback`?

In JavaScript, every time a function runs, **new functions are created**.

Example:

```jsx
function App() {
  const hello = () => {
    console.log("Hello");
  };
}
```

Whenever `App` re-renders:

```text
Render 1

↓

hello → Function #1

--------------------

Render 2

↓

hello → Function #2

--------------------

Render 3

↓

hello → Function #3
```

Although the code is the same, JavaScript creates a **new function object** every render.

---

# The Problem

Imagine you pass the function to a child component.

```jsx
<Child hello={hello} />
```

Every render:

```text
Old Function ≠ New Function
```

React thinks:

> "The prop changed."

If the child is optimized with `React.memo`, it will still re-render because the function reference changed.

---

# `useCallback` Solution

```jsx
const hello = useCallback(() => {
  console.log("Hello");
}, []);
```

Now React stores the function.

Instead of:

```text
Render 1

↓

Function #1

↓

Render 2

↓

Function #2

↓

Render 3

↓

Function #3
```

It becomes:

```text
Render 1

↓

Function #1

↓

Render 2

↓

Reuse Function #1

↓

Render 3

↓

Reuse Function #1
```

The function reference stays the same.

---

# Syntax

```jsx
const memoizedFunction = useCallback(() => {

    // Function Body

}, [dependencies]);
```

---

# Understanding the Dependency Array

```jsx
const hello = useCallback(() => {

    console.log(count);

}, [count]);
```

If `count` changes,

React creates a **new function**.

If `count` stays the same,

React reuses the old function.

---

# Real-Life Analogy

Imagine you made a toy.

Without `useCallback`:

```text
Every Day

↓

Throw Toy Away

↓

Make New Toy
```

Even though nothing changed.

---

With `useCallback`:

```text
Need Toy?

↓

Already Have One?

↓

YES

↓

Reuse Same Toy
```

---

# Example Without `useCallback`

```jsx
function App() {

    const [count, setCount] = useState(0);

    const hello = () => {

        console.log("Hello");

    };

    return (
        <>
            <button
                onClick={() => setCount(count + 1)}
            >
                {count}
            </button>

            <Child hello={hello} />
        </>
    );
}
```

Clicking the button:

```text
App Re-renders

↓

New hello Function Created

↓

Child Receives New Prop

↓

Child Re-renders
```

---

# Example With `useCallback`

```jsx
function App() {

    const [count, setCount] = useState(0);

    const hello = useCallback(() => {

        console.log("Hello");

    }, []);

    return (
        <>
            <button
                onClick={() => setCount(count + 1)}
            >
                {count}
            </button>

            <Child hello={hello} />
        </>
    );
}
```

Now:

```text
App Re-renders

↓

Same hello Function

↓

Child Receives Same Prop

↓

React.memo Can Skip Re-render
```

---

# Why Does JavaScript Create New Functions?

A React component is just a normal JavaScript function.

```jsx
function App() {

    const hello = () => {
        console.log("Hello");
    };

}
```

Whenever `App()` runs again,

JavaScript recreates:

* Variables
* Arrays
* Objects
* Functions

unless React is told to preserve them.

---

# Relationship with `React.memo`

Without `React.memo`

```text
Parent Re-renders

↓

Child Re-renders
```

Even if `useCallback` is used.

---

With `React.memo`

```text
Parent Re-renders

↓

React Compares Props

↓

Same Function Reference

↓

Skip Child Re-render
```

This is where `useCallback` becomes useful.

---

# Important Point

`useCallback` **does NOT stop components from re-rendering.**

It only keeps the **same function reference**.

Whether a child skips rendering depends on optimizations like `React.memo`.

---

# When Should We Use `useCallback`?

✅ Passing callback functions to child components wrapped with `React.memo`

✅ Preventing unnecessary re-renders

✅ Optimizing large component trees

---

# When NOT to Use `useCallback`

If the function is only used inside the same component,

```jsx
const increment = () => {
    setCount(count + 1);
};
```

Using `useCallback` usually provides little or no benefit.

Don't wrap every function with `useCallback`.

---

# `useCallback` vs `useMemo`

| `useCallback`                  | `useMemo`                       |
| ------------------------------ | ------------------------------- |
| Remembers a function           | Remembers a computed value      |
| Returns a function             | Returns a value                 |
| Used for callback optimization | Used for expensive calculations |

Example:

```jsx
const hello = useCallback(() => {
    console.log("Hello");
}, []);
```

Returns:

```text
Function
```

Example:

```jsx
const total = useMemo(() => {
    return price * quantity;
}, [price, quantity]);
```

Returns:

```text
Computed Value
```

---

# Complete Flow

```text
Parent Component Re-renders

↓

Normally

↓

JavaScript Creates New Function

↓

Child Receives New Function

↓

React.memo Detects Prop Change

↓

Child Re-renders

--------------------------------

With useCallback

↓

Parent Re-renders

↓

React Reuses Same Function

↓

Child Receives Same Function

↓

React.memo Sees No Prop Change

↓

Child Render Skipped
```

---

# Common Beginner Mistakes

## Thinking `useCallback` Stops Re-renders

❌ Wrong

It only preserves the function reference.

---

## Using `useCallback` Everywhere

❌ Wrong

Only use it when function identity matters.

---

## Forgetting Dependencies

```jsx
const hello = useCallback(() => {

    console.log(count);

}, []);
```

This will always log the initial value of `count` because the callback never updates.

Correct:

```jsx
const hello = useCallback(() => {

    console.log(count);

}, [count]);
```

---

# Interview Questions

## What is `useCallback`?

`useCallback` is a React Hook that memoizes a function and returns the same function reference between renders unless one of its dependencies changes.

---

## Why do we use `useCallback`?

To avoid creating new function references on every render and to help optimize child components, especially when using `React.memo`.

---

## Does `useCallback` prevent re-renders?

No.

It preserves the function reference.

Skipping re-renders requires components to be optimized (for example, with `React.memo`).

---

## What happens when dependencies change?

React creates a new function and stores it for future renders.

---

## Is `useCallback` always necessary?

No.

Only use it when preserving the function reference provides a real performance benefit.

---

# Quick Revision

```text
Component Re-renders

↓

Normally

↓

New Function Created

↓

useCallback

↓

Same Function Reused

↓

Child Receives Same Function

↓

React.memo Can Skip Re-render
```

---

# Remember This

```text
useState

↓

Stores State

--------------------

useEffect

↓

Runs Side Effects

--------------------

useCallback

↓

Remembers Functions

--------------------

useMemo

↓

Remembers Values
```

---

# One-Line Summary

> **`useCallback` is a built-in React Hook that remembers a function between renders and returns the same function reference until one of its dependencies changes, helping optimize components by preventing unnecessary function recreation.**
