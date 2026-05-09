const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const openPriceForm = document.getElementById('openPriceForm');
const closePriceForm = document.getElementById('closePriceForm');
const priceSheet = document.getElementById('priceSheet');
const sheetOverlay = document.getElementById('sheetOverlay');
const priceForm = document.getElementById('priceForm');
const submitPriceForm = document.getElementById('submitPriceForm');
const submitText = submitPriceForm.querySelector('.submit-text');

let activeSlide = 0;
let sliderTimer;
let closeTimer;
let successTimer;
const slideDuration = 3200;

const hasSlider = slides.length > 0 && dots.length > 0;
const hasForm = openPriceForm && closePriceForm && priceSheet && sheetOverlay && priceForm && submitPriceForm && submitText;

function showSlide(index) {
    if (!hasSlider) {
        return;
    }

    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === activeSlide);
    });

    dots.forEach((dot) => {
        dot.classList.remove('active');
    });

    if (dots[activeSlide]) {
        dots[activeSlide].offsetHeight;
        dots[activeSlide].classList.add('active');
    }
}

function startSlider() {
    if (!hasSlider) {
        return;
    }

    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => {
        showSlide(activeSlide + 1);
    }, slideDuration);
}

function resetSlider() {
    clearInterval(sliderTimer);
    startSlider();
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        resetSlider();
    });
});

function openSheet() {
    if (!hasForm) {
        return;
    }

    clearTimeout(closeTimer);
    clearTimeout(successTimer);
    sheetOverlay.classList.remove('hidden');
    requestAnimationFrame(() => {
        sheetOverlay.classList.add('open');
        priceSheet.classList.add('open');
    });
}

function closeSheet() {
    if (!hasForm) {
        return;
    }

    sheetOverlay.classList.remove('open');
    priceSheet.classList.remove('open');

    closeTimer = setTimeout(() => {
        sheetOverlay.classList.add('hidden');
        resetFormState();
    }, 300);
}

function setError(input, message) {
    const error = input.parentElement.querySelector('.form-error');

    input.classList.toggle('error', Boolean(message));
    error.textContent = message;
}

function validateInput(input) {
    const value = input.value.trim();
    const label = input.dataset.label;

    if (!value) {
        setError(input, `${label} is required`);
        return false;
    }

    if (input.name === 'phone' && !/^[6-9]\d{9}$/.test(value.replace(/\D/g, '').slice(-10))) {
        setError(input, 'Enter a valid 10 digit mobile number');
        return false;
    }

    if (input.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setError(input, 'Enter a valid email address');
        return false;
    }

    setError(input, '');
    return true;
}

function validateForm() {
    if (!hasForm) {
        return false;
    }

    const inputs = priceForm.querySelectorAll('.form-input');
    let isValid = true;

    inputs.forEach((input) => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function resetSubmitButton() {
    submitPriceForm.disabled = false;
    submitText.textContent = 'Submit Now';
}

function resetFormState() {
    priceForm.reset();
    resetSubmitButton();

    priceForm.querySelectorAll('.form-input').forEach((input) => {
        setError(input, '');
    });
}

if (hasForm) {
    openPriceForm.addEventListener('click', openSheet);
    closePriceForm.addEventListener('click', closeSheet);
    sheetOverlay.addEventListener('click', closeSheet);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeSheet();
    }
});

if (hasForm) {
    priceForm.addEventListener('input', (event) => {
        if (event.target.classList.contains('form-input')) {
            validateInput(event.target);
        }
    });

    priceForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        submitPriceForm.disabled = true;
        submitText.textContent = 'Loading...';

        successTimer = setTimeout(() => {
            submitText.textContent = 'Details Sent';

            closeTimer = setTimeout(() => {
                closeSheet();
            }, 900);
        }, 1200);
    });
}

startSlider();
