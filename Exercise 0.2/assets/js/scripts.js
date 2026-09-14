// Locate all interactive accordion trigger buttons across the document
const accordions = document.querySelectorAll(".accordion");

// Attach an event listener to each accordion button to manage toggle behavior
accordions.forEach(function(btn) {
    btn.addEventListener("click", function() {
        // Target the panel element placed directly below the clicked button
        let panel = this.nextElementSibling;
        
        // Check current display state and toggle between hidden and visible
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
});