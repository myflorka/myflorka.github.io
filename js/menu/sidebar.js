// script.js
export function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const isActive = sidebar.classList.toggle('active');
    overlay.classList.toggle('active', isActive); // Toggle overlay visibility
}

export function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.remove('active'); // Hide sidebar
    overlay.classList.remove('active'); // Hide overlay
}
