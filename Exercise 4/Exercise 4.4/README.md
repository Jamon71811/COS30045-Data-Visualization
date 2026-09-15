# Exercise 4.4: Loading Data from CSV

## Overview
In this exercise, I learned how to load local data files into my D3 script. I exported a dataset of TV brands from KNIME and saved it as `Exercise4.4_tvBrandCount.csv` in my project folder. I then used the `d3.csv()` function to read this file. Since CSV files store numbers as text, I used the `+d.count` syntax to convert the string data into actual numerical values. After that, I used the JavaScript `.sort()` method to arrange the data from highest to lowest. Finally, I used `console.log()` to print the data length, maximum value, and minimum value into the browser's developer console to confirm everything loaded correctly.

### Generative AI Reflection
* **Tool Used:** Gemini
* **Purpose:** To learn the syntax for parsing CSV data and sorting JavaScript arrays.
* **Adaptations:** I changed the file path to point to my specific `assets/data/` folder directory.
* **Learnings:** I learned how D3 uses promises (`.then()`) to wait for data to load before running the rest of the code.
* **Limitations:** The AI suggested absolute file paths, which I had to manually convert to relative paths so the project would work correctly on a local server.