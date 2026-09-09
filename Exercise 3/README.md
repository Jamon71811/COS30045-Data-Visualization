# Exercise 3: TV Energy Consumption Data Story

## Data Story

### Target Audiences & User Stories
* **User Story 1 (The Practical Homeowner):** As a budget-conscious consumer buying a new TV, I want to compare the average annual electricity consumption across small, medium, and large screens, so that I can understand how much more it costs to run a bigger TV.
* **User Story 2 (The Eco-Minded Tech Consumer):** As an eco-minded tech enthusiast, I want to see how different display technologies (LCD, LED, OLED) compare in energy usage within each size category, so that I can choose the most energy-efficient panel type for my desired TV size.

### Story Overview
This visualisation explores patterns in TV energy consumption. The narrative develops across two stages:
1. **The Size Baseline:** Establishing that physical screen dimensions serve as the primary driver of total annual kWh consumption.
2. **The Panel Dimension:** Revealing how display technologies (LCD, LCD LED, OLED) introduce variations in energy demand within those size categories.

---

## About the Data

### Data Source
The data is derived from the official product energy testing dataset (`tv_2026_02_15.csv`), capturing screen dimensions, panel technology classification, and labelled annual power consumption (kWh/year).

### Data Processing
* Filtered out unlabelled and incomplete energy consumption entries.
* Derived `screensize_category` (small, medium, large) using rule expressions.
* Grouped and aggregated data using KNIME to produce the mean annual consumption by size tier, and a secondary pivot by screen technology.

### Privacy
The dataset does not contain any personal or sensitive information. It focuses solely on public product specifications and energy consumption data.

### Accuracy and Limitations
While the dataset provides useful information, energy consumption may vary depending on real-world usage conditions (like HDR brightness or gaming). Legacy screen samples may also shift class averages compared to the latest high-efficiency backlights.

### Ethics
All vertical axes maintain a fixed zero origin baseline, preventing visual inflation of differences and allowing honest consumer comparisons.

---

## AI Declaration
Generative AI tools (ChatGPT/Gemini) were used to assist with drafting the HTML narrative structure, refining the User Stories, and formatting this README documentation. All AI-generated assistance was reviewed, modified, and integrated responsibly.