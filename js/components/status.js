export function showStatus() {
    document.querySelector('.status__block').style.display = 'flex';
    document.body.classList.add('status__active');
}

export function hideStatus() {
    document.querySelector('.status__block').style.display = 'none';
    document.body.classList.remove('status__active');
}