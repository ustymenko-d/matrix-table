# Matrix Table - Frontend React Test Task

This project implements a frontend using **React**, **TypeScript**, and **Vite**. The goal is to build a performant and well-structured interface for working with tabular data, with a focus on clean architecture and UX. The application allows you to:

- Generate a matrix of size M×N (M – rows, N – columns)
- Interact with cells (increment values, find nearest X cells)
- Display row sums and 60th percentile per column
- Remove and add rows dynamically
- Build a row heatmap when hovering over sums

**LIVE DEMO**: coming soon

## 🛠️ Technical requirements

- Use **TypeScript** + **React** + **React Context**
- **Do not use**: Redux, Redux Toolkit, styled-components, UI libraries, css-in-js
- Deploy production build.

<!-- ## 📁 Project Structure -->

## 📋 Features

1. **Matrix Generation**
   - M – number of rows (0–100)
   - N – number of columns (0–100)
   - X – number of nearest cells to highlight

2. **Table**
   - Each cell contains a random three-digit number (100–999)
   - Additional column for row sums
   - Additional row for 60th percentile values per column

3. **Interactivity**
   - Click on a cell → increase its value by `+1`, row sums and percentiles are recalculated
   - Hover on a cell → highlight X nearest values in the matrix
   - Hover on a row sum → replace values with percentages + show heatmap (based on max value in the row)

4. **Row Editing**
   - Add a new row at the bottom of the table
   - Remove any row
   - All values (sums, percentiles) update automatically
