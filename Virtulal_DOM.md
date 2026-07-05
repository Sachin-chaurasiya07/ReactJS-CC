# Virtual DOM Notes

## What is the Virtual DOM?

The **Virtual DOM (VDOM)** is a lightweight JavaScript representation (copy) of the Real DOM.

It is **not** the actual webpage. Instead, it is a JavaScript object that describes what the UI should look like.

---

## Why was the Virtual DOM introduced?

Updating the **Real DOM** is expensive because every change requires the browser to:

* Recalculate layout
* Repaint elements
* Re-render parts of the page

Frequent DOM manipulations can slow down an application.

Instead of updating the Real DOM immediately, React:

1. Updates the Virtual DOM.
2. Compares it with the previous Virtual DOM.
3. Updates only the changed parts of the Real DOM.

This makes UI updates more efficient.

---

## Real DOM vs Virtual DOM

| Real DOM                        | Virtual DOM                           |
| ------------------------------- | ------------------------------------- |
| Actual webpage in the browser   | JavaScript object representing the UI |
| Slow to manipulate frequently   | Fast to create and compare            |
| Browser handles updates         | React handles updates                 |
| Direct changes can be expensive | Changes happen in memory first        |

---

## How React uses the Virtual DOM

Suppose you write:

```jsx
<h1>Hello Chiriya</h1>
```

React first creates a JavaScript object:

```javascript
{
    type: "h1",
    props: {},
    children: "Hello Chiriya"
}
```

This object is called a **React Element**.

Many React Elements together form the **Virtual DOM tree**.

---

## Virtual DOM Update Process

```
State Changes
      │
      ▼
React creates a New Virtual DOM
      │
      ▼
Compares it with the Previous Virtual DOM
      │
      ▼
Finds only the differences (Diffing)
      │
      ▼
Updates only those parts in the Real DOM
```

---

## Example

### Initial UI

```jsx
<h1>Hello Chiriya</h1>
```

Virtual DOM:

```javascript
{
    type: "h1",
    children: "Hello Chiriya"
}
```

---

### After State Change

```jsx
<h1>Hello Sachin</h1>
```

New Virtual DOM:

```javascript
{
    type: "h1",
    children: "Hello Sachin"
}
```

React compares:

```
Old:
Hello Chiriya

New:
Hello Sachin
```

Difference:

Only the text changed.

React updates only the text node in the Real DOM instead of recreating the entire `<h1>` element.

---

## What is Diffing?

**Diffing** is React's process of comparing the previous Virtual DOM with the new Virtual DOM to determine what has changed.

Instead of rebuilding everything, React identifies only the necessary updates.

---

## What is Reconciliation?

**Reconciliation** is the overall process React uses to:

* Create a new Virtual DOM
* Compare it with the previous Virtual DOM (Diffing)
* Update the Real DOM with the minimum required changes

Think of it as React's strategy for efficiently updating the UI.

---

## Relationship Between State and Virtual DOM

When state changes using:

```jsx
setCounter(counter + 1);
```

React:

1. Schedules a re-render.
2. Executes the component again.
3. Creates a new Virtual DOM.
4. Compares it with the previous Virtual DOM.
5. Updates only the changed parts of the Real DOM.

---

## Important Points

* The Virtual DOM is a JavaScript object.
* The Real DOM is the actual webpage.
* React never directly compares HTML.
* React compares Virtual DOM trees.
* React updates only what changed.
* This process makes UI updates efficient.

---

## Common Misconceptions

### ❌ Virtual DOM is the browser DOM.

Wrong.

The Virtual DOM exists only in JavaScript memory.

---

### ❌ React is fast because of the Virtual DOM.

Partially true.

React is fast because it:

* Uses the Virtual DOM.
* Uses an efficient diffing algorithm.
* Batches state updates.
* Minimizes expensive Real DOM operations.

The Virtual DOM is one part of React's performance strategy.

---

## Interview Definition

> The Virtual DOM is a lightweight JavaScript representation of the Real DOM. Whenever the application state changes, React creates a new Virtual DOM, compares it with the previous one using a process called diffing, and updates only the necessary parts of the Real DOM through reconciliation. This approach minimizes direct DOM manipulation and improves UI update performance.

---

## Revision Flow

```
JSX
   │
   ▼
React Element
   │
   ▼
Virtual DOM
   │
State Changes
   │
   ▼
New Virtual DOM
   │
   ▼
Diffing
   │
   ▼
Reconciliation
   │
   ▼
Real DOM Updated
```

---

## One-Line Summary

**React uses the Virtual DOM to compare UI changes in memory and update only the necessary parts of the Real DOM, making applications more efficient and easier to maintain.**
