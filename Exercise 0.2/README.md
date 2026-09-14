# COS30045 – Data Visualisation  
## Exercise 0.2 – Energy Website

Welcome to **Exercise 0.2** for COS30045 Data Visualisation.

In this exercise, you will build a simple **Energy Data Webpage** using **HTML, CSS, and JavaScript**. The purpose of this exercise is to familiarise you with the development workflow using **GitHub and VS Code**, while preparing the foundation for future data visualisation tasks.

---

# Objective

The objectives of this exercise are:

- Understand how to use **GitHub for version control**
- Practice **web development structure**
- Build a **basic website**
- Maintain **regular commits**
- Identify commits that include **GenAI-generated code**

---

# Step 1 – Fork the Repository

1. Open this repository.
2. Click **Fork** at the top right of the page.
3. This will create a copy of the repository in your GitHub account.

Example:

Original repository : "github.com/rishmaf/COS30045-Data-Visualization/energy-webpage"

Your forked repository : "github.com/yourusername/COS30045-Data-Visualization/energy-webpage"


---

# Step 2 – Clone the Repository

Clone your forked repository to your local machine using **VS Code** or the terminal.



# Step 3 – Project Structure


Your project must follow the structure below.

```bash
Exercise 0.2
│
├── assets
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── scripts.js
│   ├── images
│   │   └── PowerIcon.png
│   └── data
│
├── index.html
├── televisions.html
├── about.html
└── README.md


## Generative AI Reflection

In this section, briefly address:

Which tool(s) you used (if any)
Gemini

What you used GenAI for (e.g. structure, syntax, debugging)
To generate the boilerplate HTML structure, write the CSS styling for navigation and layout, and write the vanilla JavaScript for the FAQ accordion.

What you changed or adapted after generation
I organized the files into the correct folder structure and adjusted the page content and active navigation links for each specific HTML page.

What you learned from using GenAI
I learned how to link external CSS and JS files to HTML, and how JavaScript can manipulate CSS properties (like `display: none` to `display: block`) to create interactive elements.

Any limitations or issues you encountered
I realized that AI can generate the code, but I still had to manually ensure the file paths (like `images/PowerIcon.png` and `css/styles.css`) matched my exact folder structure, otherwise the website wouldn't load the styles or images.