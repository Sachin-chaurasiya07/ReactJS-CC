# React Fiber & Reconciliation Notes

---

# 1. React Fiber

## What is Fiber?

**React Fiber is React's rendering engine**, introduced in React 16.

It is responsible for deciding:

* What should be updated?
* When should it be updated?
* In what order should it be updated?
* Which updates are more important?

Think of Fiber as React's **scheduler and work manager**.

---

## Why was Fiber introduced?

Before React 16, React rendered the entire component tree synchronously.

If a large application needed rendering, React would continue working until it finished.

Problems:

* Slow typing
* Laggy scrolling
* Frozen animations
* Unresponsive UI

React couldn't pause its work.

---

## Fiber's Solution

Instead of rendering everything at once,

Fiber breaks rendering into **small units of work**.

```text
Without Fiber

█████████████████████

Browser waits until React finishes.
```

With Fiber:

```text
██
Pause

██
Pause

██
Pause

██
Pause
```

Between each chunk, the browser can:

* Respond to clicks
* Handle keyboard input
* Paint animations
* Scroll smoothly

---

## What Can Fiber Do?

Fiber allows React to:

* Pause rendering
* Resume rendering later
* Prioritize updates
* Cancel unnecessary work
* Keep applications responsive

---

## Example

Imagine:

* User is typing in a search box.
* App needs to render 10,000 products.

Fiber gives higher priority to:

```text
Typing ✅
```

and lower priority to:

```text
Rendering 10,000 cards
```

The user experiences a smooth interface.

---

## Fiber Responsibilities

Fiber decides:

* Which updates are urgent.
* Which updates can wait.
* When rendering should pause.
* When rendering should continue.
* When changes should be committed to the Real DOM.

---

## Fiber is NOT

❌ Virtual DOM

❌ Real DOM

❌ JSX

Fiber is simply React's rendering engine.

---

## Interview Definition

> React Fiber is the rendering engine introduced in React 16. It breaks rendering work into small units, allowing React to prioritize, pause, resume, and schedule UI updates efficiently while keeping applications responsive.

---

# 2. Reconciliation

## What is Reconciliation?

**Reconciliation is React's complete process of updating the UI whenever state or props change.**

Instead of rebuilding the whole webpage, React calculates the smallest possible update.


## Why is Reconciliation Needed?

Suppose a webpage contains:

* Navbar
* Sidebar
* Footer
* 500 Posts

Only one post receives a new like.

React asks:

> "Why update all 500 posts if only one changed?"

Reconciliation ensures that only the changed part is updated.

---

## When Does Reconciliation Start?

Whenever:

* State changes (`useState`)
* Props change
* Parent component re-renders

Example:

```jsx
setCount(count + 1);
```

React immediately starts reconciliation.

---

## Reconciliation Process

```text
State / Props Change
        │
        ▼
Component Re-renders
        │
        ▼
New Virtual DOM Created
        │
        ▼
Diffing
        │
        ▼
Fiber Schedules Updates
        │
        ▼
Commit Changes to Real DOM
```

---

## Step 1 — Re-render

React executes the component function again.

```jsx
function App() {
    return <h1>Hello</h1>;
}
```

The component returns a new UI description.

---

## Step 2 — Create New Virtual DOM

JSX becomes React Elements.

React builds a new Virtual DOM tree.

---

## Step 3 — Diffing

React compares:

Previous Virtual DOM

↓

New Virtual DOM

It finds exactly what changed.

Example:

Old

```jsx
<h1>Hello</h1>
```

New

```jsx
<h1>Hello Chiriya</h1>
```

Difference:

Only the text changed.

---

## Step 4 — Fiber

Fiber schedules:

* High priority updates
* Low priority updates
* Pausing
* Resuming

---

## Step 5 — Commit

React updates only the necessary Real DOM nodes.

Instead of rebuilding:

```html
<h1>Hello</h1>
```

It changes only:

```text
Hello
```

↓

```text
Hello Chiriya
```

---

# React's Reconciliation Rules

## Rule 1

Different element types.

Old:

```jsx
<h1>Hello</h1>
```

New:

```jsx
<p>Hello</p>
```

React destroys the old node and creates a new one.

---

## Rule 2

Same element.

Different props.

Old:

```jsx
<button className="red">
```

New:

```jsx
<button className="blue">
```

Only the class attribute changes.

---

## Rule 3

Same element.

Different text.

Old:

```text
Hello
```

New:

```text
Hello Chiriya
```

Only the text node changes.

---

# Diffing vs Reconciliation

## Diffing

Purpose:

Find differences between two Virtual DOM trees.

Only compares.

---

## Reconciliation

Entire UI update process.

Includes:

* Rendering
* Virtual DOM creation
* Diffing
* Fiber Scheduling
* Commit Phase

**Remember:**

> Diffing is one step inside Reconciliation.

---

# Fiber vs Reconciliation

| Fiber                     | Reconciliation                               |
| ------------------------- | -------------------------------------------- |
| Rendering engine          | Complete UI update process                   |
| Schedules rendering work  | Updates the UI efficiently                   |
| Prioritizes tasks         | Uses Virtual DOM, Diffing, Fiber, and Commit |
| Can pause and resume work | Starts after state or props change           |

---

# Virtual DOM vs Fiber vs Reconciliation

| Virtual DOM                     | Fiber                     | Reconciliation                    |
| ------------------------------- | ------------------------- | --------------------------------- |
| JavaScript representation of UI | Rendering engine          | UI update process                 |
| Stores UI tree                  | Schedules rendering work  | Uses diffing and updates Real DOM |
| Exists in memory                | Decides when work happens | Runs after state or props change  |

---

# Complete React Rendering Flow

```text
JSX
      │
      ▼
React Elements
      │
      ▼
Virtual DOM
      │
      ▼
State / Props Change
      │
      ▼
Component Re-renders
      │
      ▼
New Virtual DOM
      │
      ▼
Diffing
      │
      ▼
Fiber Scheduling
      │
      ▼
Commit Phase
      │
      ▼
Real DOM Updated
```

---

# Common Interview Questions

### What is Fiber?

React Fiber is React's rendering engine that schedules rendering work, prioritizes updates, pauses and resumes rendering, and keeps applications responsive.

---

### What is Reconciliation?

Reconciliation is React's complete process of updating the UI by creating a new Virtual DOM, comparing it with the previous one using diffing, scheduling work through Fiber, and committing only the necessary changes to the Real DOM.

---

### Is Diffing the same as Reconciliation?

No.

Diffing only compares two Virtual DOM trees.

Reconciliation is the entire UI update process.

---

### Does Fiber replace the Virtual DOM?

No.

Fiber works **with** the Virtual DOM.

The Virtual DOM stores the UI representation, while Fiber schedules and manages how updates are processed.

---

# Quick Revision

## Fiber

**Think:** *How and when should React perform updates?*

* Rendering engine
* Scheduler
* Prioritization
* Pause
* Resume
* Commit

---

## Reconciliation

**Think:** *How can React update the UI with the least amount of work?*

* Re-render
* New Virtual DOM
* Diffing
* Fiber Scheduling
* Commit

---

# One-Line Summary

**Fiber** decides **when and how** React performs rendering work.

**Reconciliation** is the **entire process** React follows to efficiently update the UI after state or props change.
