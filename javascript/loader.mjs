// Define a function to show the loading spinner
export function showLoadingSpinner() {
    var spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = 'block';
    }
}

// Define a function to hide the loading spinner
export function hideLoadingSpinner() {
    var spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}