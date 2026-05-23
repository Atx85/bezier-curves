# Bezier Curves Visualizer

A small browser-based demo for drawing and interacting with a Bezier-style curve on an HTML canvas.

## What It Does

- Renders control points on a canvas.
- Draws a curve by sampling Bernstein polynomial values.
- Lets you drag control points with the mouse to update the curve shape in real time.

## Project Files

- `index.html`: App entry point and script loading.
- `main.js`: Canvas setup, mouse interaction, and curve rendering loop.
- `helperClasses.js`: Math helpers (`factorialize`, `nCi`) and drawable classes (`Point`, `Line`).
- `victor.js`: Vector utility library used by helper classes.

## Run Locally

No build step is required.

1. Clone or download this repository.
2. Open `index.html` in a browser.

If your browser blocks local script access, run a simple static server from the project folder instead (example):

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes

- The canvas size is currently fixed in `main.js` (`1000 x 1000`).
- Control points are initialized in `init()` and can be adjusted there.
