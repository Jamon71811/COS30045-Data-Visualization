// Select all elements with the class "accordion"
const accordions = document.querySelectorAll(".accordion");

// Loop through each accordion button to add a click event listener
accordions.forEach(function(btn) {
    btn.addEventListener("click", function() {
        // Find the panel element immediately following the clicked button
        let panel = this.nextElementSibling;
        
        // Toggle the display property between block (visible) and none (hidden)
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
});