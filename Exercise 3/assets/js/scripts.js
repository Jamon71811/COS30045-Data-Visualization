// Step 1: Tell JavaScript to find all HTML buttons that have the class "accordion"
const accordions = document.querySelectorAll(".accordion");

// Step 2: Loop through that list of buttons to apply a function to every single one
accordions.forEach(function(btn) {
    
    // Step 3: Add an Event Listener so JavaScript knows to wait for a "click" action
    btn.addEventListener("click", function() {
        
        // Step 4: Find the exact panel div that is directly under the button the user just clicked
        let panel = this.nextElementSibling;
        
        // Step 5: Conditional logic (If/Else) to toggle visibility
        // If the panel is currently showing (block), hide it (none)
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            // Otherwise, if it is hidden, change the style to show it (block)
            panel.style.display = "block";
        }
    });
});