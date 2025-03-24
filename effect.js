document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("darkModeToggle");
    
    if (toggleButton) {  // Null check
        const body = document.body;
        const savedTheme = localStorage.getItem("theme") || "light";
        body.classList.toggle("dark", savedTheme === "dark");
        toggleButton.textContent = savedTheme === "dark" ? "☀️" : "🌙";

        toggleButton.addEventListener("click", () => {
            const isDark = body.classList.toggle("dark");
            toggleButton.textContent = isDark ? "☀️" : "🌙";
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }
});

// 🎯 Button Click Handlers with Existence Check
const exploreButton = document.querySelector('a[href="javascript:void(0);"]');
const resumeButton = document.querySelector('a[href="RISHABH CV.pdf"]');

if (exploreButton) {
    exploreButton.addEventListener("click", () => {
        alert("Explore My Work button clicked!");
    });
}

if (resumeButton) {
    resumeButton.addEventListener("click", () => {
        console.log("Resume button clicked!");
    });
}

