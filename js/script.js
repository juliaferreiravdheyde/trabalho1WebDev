
const modal = document.getElementById("modal");
const forgotPasswordLink = document.getElementById("forgot-password");
const closeButton = document.querySelector(".close-button");

forgotPasswordLink.onclick = function(event) {
    event.preventDefault(); 
    modal.style.display = "block"; 
}

closeButton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none"; 
    }
}
