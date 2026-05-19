const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const openPriceForm = document.getElementById('openPriceForm');
const closePriceForm = document.getElementById('closePriceForm');
const priceSheet = document.getElementById('priceSheet');
const sheetOverlay = document.getElementById('sheetOverlay');
const priceForm = document.getElementById('priceForm');
const submitPriceForm = document.getElementById('submitPriceForm');
const submitText = submitPriceForm ? submitPriceForm.querySelector('.submit-text') : null;
const finalLeadForm = document.getElementById('finalLeadForm');
const finalLeadSubmit = finalLeadForm ? finalLeadForm.querySelector('.final-submit-button') : null;
const finalLeadSubmitText = finalLeadSubmit ? finalLeadSubmit.querySelector('.submit-text') : null;
const openPrivatePricing = document.getElementById('openPrivatePricing');
const closePrivatePricing = document.getElementById('closePrivatePricing');
const privatePricingPopup = document.getElementById('privatePricingPopup');
const privatePricingForm = document.getElementById('privatePricingForm');
const privatePricingSubmit = privatePricingForm ? privatePricingForm.querySelector('.private-popup-submit') : null;
const privatePricingSubmitText = privatePricingSubmit ? privatePricingSubmit.querySelector('.submit-text') : null;
const openExactLocation = document.getElementById('openExactLocation');
const closeExactLocation = document.getElementById('closeExactLocation');
const exactLocationPopup = document.getElementById('exactLocationPopup');
const pricingAccessPopup = document.getElementById('pricingAccessPopup');
const closePricingAccess = document.getElementById('closePricingAccess');
const pricingUserName = document.getElementById('pricingUserName');
const privateAccessOverlay = document.getElementById('privateAccessOverlay');
const mobileSlides = document.querySelectorAll('.mobile-slide');
const mobileDots = document.querySelectorAll('.mobile-dot');
const mobileOpenPriceForm = document.getElementById('mobileOpenPriceForm');
const openExperiencePopup = document.getElementById('openExperiencePopup');
const closeExperiencePopup = document.getElementById('closeExperiencePopup');
const experiencePopup = document.getElementById('experiencePopup');
const experienceOverlay = document.getElementById('experienceOverlay');
const plansHoverCostSheet = document.getElementById('plansHoverCostSheet');
const differenceCards = document.querySelectorAll('.difference-card');
const lifestyleCards = document.querySelectorAll('.lifestyle-card');
const lifestyleDots = document.querySelectorAll('.lifestyle-dot');
const lifestyleSwipeButton = document.querySelector('.lifestyle-swipe-button');
const openLifestylePopup = document.getElementById('openLifestylePopup');
const revealSections = document.querySelectorAll('main > section:not(.hero-section):not(.mobile-hero-section)');
const revealItems = document.querySelectorAll('.visit-card, .difference-card, .signature-feature, .signature-card, .construction-summary article, .bank-grid article, .download-preview-card, .download-options-panel, .download-option, .final-lead-form, .corridor-card, .private-price-card, .pricing-access-grid article');
const signatureSurface = document.querySelector('.signature-interiors-inner');
const constructionSection = document.querySelector('.construction-progress-section');
const constructionCounters = document.querySelectorAll('.construction-count');
const downloadOptions = document.querySelectorAll('.download-option');
const downloadPreviewImages = document.querySelectorAll('.download-preview-image');
const corridorImages = document.querySelectorAll('.corridor-image');

let activeSlide = 0;
let activeMobileSlide = 0;
let activeLifestyleSlide = 0;
let activeCorridorSlide = 0;
let sliderTimer;
let mobileSliderTimer;
let lifestyleSliderTimer;
let corridorSliderTimer;
let closeTimer;
let successTimer;
let finalLeadSuccessTimer;
let lifestyleTouchStartX = 0;
let lifestyleSwipeMoved = false;
let privatePricingSuccessTimer;
let constructionAnimated = false;
const slideDuration = 3200;

const hasSlider = slides.length > 0 && dots.length > 0;
const hasMobileSlider = mobileSlides.length > 0 && mobileDots.length > 0;
const hasLifestyleSlider = lifestyleCards.length > 0 && lifestyleDots.length > 0;
const hasCorridorSlider = corridorImages.length > 1;
const hasForm = openPriceForm && closePriceForm && priceSheet && sheetOverlay && priceForm && submitPriceForm && submitText;
const hasFinalLeadForm = finalLeadForm && finalLeadSubmit && finalLeadSubmitText;
const hasPrivatePricingPopup = openPrivatePricing && closePrivatePricing && privatePricingPopup && privatePricingForm && privatePricingSubmit && privatePricingSubmitText && privateAccessOverlay;
const hasExactLocationPopup = openExactLocation && closeExactLocation && exactLocationPopup && privateAccessOverlay;
const hasPricingAccessPopup = pricingAccessPopup && closePricingAccess && pricingUserName && privateAccessOverlay;
const hasExperiencePopup = openExperiencePopup && closeExperiencePopup && experiencePopup && experienceOverlay;

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

function showMobileSlide(index) {
    if (!hasMobileSlider) {
        return;
    }

    activeMobileSlide = (index + mobileSlides.length) % mobileSlides.length;

    mobileSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === activeMobileSlide);
    });

    mobileDots.forEach((dot) => {
        dot.classList.remove('active');
    });

    if (mobileDots[activeMobileSlide]) {
        mobileDots[activeMobileSlide].offsetHeight;
        mobileDots[activeMobileSlide].classList.add('active');
    }
}

function startMobileSlider() {
    if (!hasMobileSlider) {
        return;
    }

    clearInterval(mobileSliderTimer);
    mobileSliderTimer = setInterval(() => {
        showMobileSlide(activeMobileSlide + 1);
    }, slideDuration);
}

function resetMobileSlider() {
    clearInterval(mobileSliderTimer);
    startMobileSlider();
}

function showLifestyleSlide(index) {
    if (!hasLifestyleSlider) {
        return;
    }

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const slideCount = isMobile ? Math.min(3, lifestyleCards.length) : lifestyleCards.length;

    activeLifestyleSlide = isMobile
        ? Math.max(0, Math.min(index, slideCount - 1))
        : (index + slideCount) % slideCount;

    lifestyleCards.forEach((card, cardIndex) => {
        card.classList.toggle('active', cardIndex === activeLifestyleSlide);
        card.classList.toggle('is-before', isMobile && cardIndex < activeLifestyleSlide);
        card.classList.toggle('is-after', isMobile && cardIndex > activeLifestyleSlide);
    });

    lifestyleDots.forEach((dot) => {
        dot.classList.remove('active');
    });

    if (lifestyleDots[activeLifestyleSlide]) {
        lifestyleDots[activeLifestyleSlide].offsetHeight;
        lifestyleDots[activeLifestyleSlide].classList.add('active');
    }
}

function startLifestyleSlider() {
    if (!hasLifestyleSlider) {
        return;
    }

    if (window.matchMedia('(max-width: 767px)').matches) {
        clearInterval(lifestyleSliderTimer);
        return;
    }

    clearInterval(lifestyleSliderTimer);
    lifestyleSliderTimer = setInterval(() => {
        showLifestyleSlide(activeLifestyleSlide + 1);
    }, 3600);
}

function resetLifestyleSlider() {
    clearInterval(lifestyleSliderTimer);
    startLifestyleSlider();
}

function handleLifestyleSwipe(direction) {
    if (!hasLifestyleSlider || !window.matchMedia('(max-width: 767px)').matches) {
        return;
    }

    const slideCount = Math.min(3, lifestyleCards.length);
    const nextSlide = Math.max(0, Math.min(activeLifestyleSlide + direction, slideCount - 1));

    if (nextSlide === activeLifestyleSlide) {
        return;
    }

    lifestyleSwipeMoved = true;
    showLifestyleSlide(nextSlide);

    window.setTimeout(() => {
        lifestyleSwipeMoved = false;
    }, 350);
}

function showCorridorSlide(index) {
    if (!hasCorridorSlider) {
        return;
    }

    activeCorridorSlide = (index + corridorImages.length) % corridorImages.length;

    corridorImages.forEach((image, imageIndex) => {
        image.classList.toggle('active', imageIndex === activeCorridorSlide);
    });
}

function startCorridorSlider() {
    if (!hasCorridorSlider) {
        return;
    }

    clearInterval(corridorSliderTimer);
    corridorSliderTimer = setInterval(() => {
        showCorridorSlide(activeCorridorSlide + 1);
    }, 3400);
}

function setupSectionReveal() {
    if (!revealSections.length && !revealItems.length) {
        return;
    }

    revealSections.forEach((section, index) => {
        section.classList.add('section-reveal');
        section.classList.add(index % 2 === 0 ? 'reveal-from-left' : 'reveal-from-right');
        section.style.transitionDelay = `${Math.min(index * 90, 260)}ms`;
    });

    revealItems.forEach((item, index) => {
        item.classList.add('reveal-item');
        item.style.transitionDelay = `${Math.min(index % 6 * 70, 280)}ms`;
    });

    if (!('IntersectionObserver' in window)) {
        revealSections.forEach((section) => {
            section.classList.add('is-visible');
        });
        revealItems.forEach((item) => {
            item.classList.add('is-visible');
        });
        return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px'
    });

    revealSections.forEach((section) => {
        revealObserver.observe(section);
    });

    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                itemObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -6% 0px'
    });

    revealItems.forEach((item) => {
        itemObserver.observe(item);
    });
}

function setupSignatureCursorGlow() {
    if (!signatureSurface) {
        return;
    }

    signatureSurface.addEventListener('pointermove', (event) => {
        const rect = signatureSurface.getBoundingClientRect();

        signatureSurface.style.setProperty('--signature-x', `${event.clientX - rect.left}px`);
        signatureSurface.style.setProperty('--signature-y', `${event.clientY - rect.top}px`);
        signatureSurface.classList.add('is-glowing');
    });

    signatureSurface.addEventListener('pointerleave', () => {
        signatureSurface.classList.remove('is-glowing');
    });
}

function animateConstructionProgress() {
    if (!constructionSection || constructionAnimated) {
        return;
    }

    constructionAnimated = true;
    constructionSection.classList.add('is-active');

    const target = 35;
    const duration = 1350;
    const start = performance.now();

    function updateCounter(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);

        constructionCounters.forEach((counter) => {
            counter.textContent = value;
        });

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

function setupConstructionProgress() {
    if (!constructionSection) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        animateConstructionProgress();
        return;
    }

    const constructionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateConstructionProgress();
                constructionObserver.disconnect();
            }
        });
    }, {
        threshold: 0.28
    });

    constructionObserver.observe(constructionSection);
}

function setupDownloadPreview() {
    if (!downloadOptions.length || !downloadPreviewImages.length) {
        return;
    }

    function setDownloadPreview(index) {
        downloadOptions.forEach((option, optionIndex) => {
            option.classList.toggle('active', optionIndex === index);
        });

        downloadPreviewImages.forEach((image, imageIndex) => {
            image.classList.toggle('active', imageIndex === index);
        });
    }

    downloadOptions.forEach((option, index) => {
        option.addEventListener('mouseenter', () => {
            setDownloadPreview(index);
        });

        option.addEventListener('focusin', () => {
            setDownloadPreview(index);
        });

        option.addEventListener('click', () => {
            setDownloadPreview(index);
        });
    });
}

function setupMobileDifferenceReveal() {
    if (!differenceCards.length || !('IntersectionObserver' in window)) {
        return;
    }

    const differenceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('is-active', entry.isIntersecting);
        });
    }, {
        threshold: 0.48,
        rootMargin: '-14% 0px -18% 0px'
    });

    differenceCards.forEach((card) => {
        differenceObserver.observe(card);
    });
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

mobileDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showMobileSlide(index);
        resetMobileSlider();
    });
});

lifestyleDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showLifestyleSlide(index);
        resetLifestyleSlider();
    });
});

if (lifestyleSwipeButton) {
    lifestyleSwipeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        handleLifestyleSwipe(1);
    });
}

lifestyleCards.forEach((card) => {
    card.addEventListener('touchstart', (event) => {
        lifestyleTouchStartX = event.touches[0].clientX;
    }, { passive: true });

    card.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const deltaX = touchEndX - lifestyleTouchStartX;

        if (Math.abs(deltaX) < 40) {
            return;
        }

        handleLifestyleSwipe(deltaX < 0 ? 1 : -1);
    }, { passive: true });
});

window.addEventListener('resize', () => {
    startLifestyleSlider();
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

function openExperience() {
    if (!hasExperiencePopup) {
        return;
    }

    experienceOverlay.classList.remove('hidden');
    requestAnimationFrame(() => {
        experienceOverlay.classList.add('open');
        experiencePopup.classList.add('open');
        experiencePopup.setAttribute('aria-hidden', 'false');
    });
}

function closeExperience() {
    if (!hasExperiencePopup) {
        return;
    }

    experienceOverlay.classList.remove('open');
    experiencePopup.classList.remove('open');
    experiencePopup.setAttribute('aria-hidden', 'true');

    setTimeout(() => {
        experienceOverlay.classList.add('hidden');
    }, 300);
}

function openPrivateAccessPopup(popup) {
    if (!privateAccessOverlay || !popup) {
        return;
    }

    privateAccessOverlay.classList.remove('hidden');
    requestAnimationFrame(() => {
        privateAccessOverlay.classList.add('open');
        popup.classList.add('open');
        popup.setAttribute('aria-hidden', 'false');
    });
}

function closePrivateAccessPopups() {
    if (!privateAccessOverlay) {
        return;
    }

    privateAccessOverlay.classList.remove('open');

    [privatePricingPopup, exactLocationPopup, pricingAccessPopup].forEach((popup) => {
        if (popup) {
            popup.classList.remove('open');
            popup.setAttribute('aria-hidden', 'true');
        }
    });

    setTimeout(() => {
        privateAccessOverlay.classList.add('hidden');
    }, 300);
}

function openPrivatePricingPopup() {
    if (!hasPrivatePricingPopup) {
        return;
    }

    [exactLocationPopup, pricingAccessPopup].forEach((popup) => {
        if (popup) {
            popup.classList.remove('open');
            popup.setAttribute('aria-hidden', 'true');
        }
    });

    privatePricingPopup.classList.remove('is-granted');

    openPrivateAccessPopup(privatePricingPopup);
}

function openExactLocationPopup() {
    if (!hasExactLocationPopup) {
        return;
    }

    [privatePricingPopup, pricingAccessPopup].forEach((popup) => {
        if (popup) {
            popup.classList.remove('open');
            popup.setAttribute('aria-hidden', 'true');
        }
    });

    openPrivateAccessPopup(exactLocationPopup);
}

function openPricingAccessPopup(name) {
    if (!hasPricingAccessPopup) {
        return;
    }

    if (pricingUserName) {
        pricingUserName.textContent = name || 'Guest';
    }

    [privatePricingPopup, exactLocationPopup].forEach((popup) => {
        if (popup) {
            popup.classList.remove('open');
            popup.setAttribute('aria-hidden', 'true');
        }
    });

    openPrivateAccessPopup(pricingAccessPopup);
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

function validateLeadForm(form) {
    const inputs = form.querySelectorAll('.form-input');
    let isValid = true;

    inputs.forEach((input) => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validatePrivatePricingForm() {
    if (!hasPrivatePricingPopup) {
        return false;
    }

    const isLeadValid = validateLeadForm(privatePricingForm);
    const selectedBudget = privatePricingForm.querySelector('input[name="budget"]:checked');
    const budgetError = privatePricingForm.querySelector('.budget-error');

    if (budgetError) {
        budgetError.textContent = selectedBudget ? '' : 'Select your budget range';
    }

    return isLeadValid && Boolean(selectedBudget);
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
    if (mobileOpenPriceForm) {
        mobileOpenPriceForm.addEventListener('click', openSheet);
    }
    if (openLifestylePopup) {
        openLifestylePopup.addEventListener('click', openSheet);
    }
    lifestyleCards.forEach((card) => {
        card.addEventListener('click', (event) => {
            if (lifestyleSwipeMoved) {
                event.preventDefault();
                return;
            }

            openSheet();
        });
    });
    closePriceForm.addEventListener('click', closeSheet);
    sheetOverlay.addEventListener('click', closeSheet);
}

differenceCards.forEach((card) => {
    card.addEventListener('click', (event) => {
        event.stopPropagation();

        differenceCards.forEach((item) => {
            if (item !== card) {
                item.classList.remove('is-active');
            }
        });

        card.classList.toggle('is-active');
    });
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.difference-card')) {
        differenceCards.forEach((card) => {
            card.classList.remove('is-active');
        });
    }
});

if (hasExperiencePopup) {
    openExperiencePopup.addEventListener('click', openExperience);
    closeExperiencePopup.addEventListener('click', closeExperience);
    experienceOverlay.addEventListener('click', closeExperience);
}

if (plansHoverCostSheet) {
    plansHoverCostSheet.addEventListener('click', openSheet);
}


if (hasPrivatePricingPopup) {
    openPrivatePricing.addEventListener('click', openPrivatePricingPopup);
    closePrivatePricing.addEventListener('click', closePrivateAccessPopups);

    privatePricingForm.addEventListener('input', (event) => {
        if (event.target.classList.contains('form-input')) {
            validateInput(event.target);
        }

        if (event.target.name === 'budget') {
            const budgetError = privatePricingForm.querySelector('.budget-error');

            if (budgetError) {
                budgetError.textContent = '';
            }
        }
    });

    privatePricingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validatePrivatePricingForm()) {
            return;
        }

        const leadName = privatePricingForm.elements.name.value.trim();

        clearTimeout(privatePricingSuccessTimer);
        privatePricingSubmit.disabled = true;
        privatePricingSubmitText.textContent = 'Sending...';

        privatePricingSuccessTimer = setTimeout(() => {
            privatePricingPopup.classList.add('is-granted');

            setTimeout(() => {
                privatePricingForm.reset();
                privatePricingSubmit.disabled = false;
                privatePricingSubmitText.textContent = 'View Private Pricing';

                privatePricingForm.querySelectorAll('.form-input').forEach((input) => {
                    setError(input, '');
                });

                const budgetError = privatePricingForm.querySelector('.budget-error');

                if (budgetError) {
                    budgetError.textContent = '';
                }

                privatePricingPopup.classList.remove('is-granted');
                openPricingAccessPopup(leadName);
            }, 950);
        }, 900);
    });
}

if (hasExactLocationPopup) {
    openExactLocation.addEventListener('click', openExactLocationPopup);
    closeExactLocation.addEventListener('click', closePrivateAccessPopups);
}

if (hasPricingAccessPopup) {
    closePricingAccess.addEventListener('click', closePrivateAccessPopups);
}

if (privateAccessOverlay) {
    privateAccessOverlay.addEventListener('click', closePrivateAccessPopups);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeSheet();
        closeExperience();
        closePrivateAccessPopups();
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

if (hasFinalLeadForm) {
    finalLeadForm.addEventListener('input', (event) => {
        if (event.target.classList.contains('form-input')) {
            validateInput(event.target);
        }
    });

    finalLeadForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validateLeadForm(finalLeadForm)) {
            return;
        }

        clearTimeout(finalLeadSuccessTimer);
        finalLeadSubmit.disabled = true;
        finalLeadSubmitText.textContent = 'Sending...';

        finalLeadSuccessTimer = setTimeout(() => {
            finalLeadSubmitText.textContent = 'Details Sent';

            setTimeout(() => {
                finalLeadForm.reset();
                finalLeadSubmit.disabled = false;
                finalLeadSubmitText.textContent = 'Get Full Details';

                finalLeadForm.querySelectorAll('.form-input').forEach((input) => {
                    setError(input, '');
                });
            }, 1100);
        }, 900);
    });
}

startSlider();
startMobileSlider();
startLifestyleSlider();
startCorridorSlider();
setupSectionReveal();
setupSignatureCursorGlow();
setupConstructionProgress();
setupDownloadPreview();
setupMobileDifferenceReveal();



/* MOBILE FULL MENU */

const openMobileMenu = document.getElementById("openMobileMenu");
const closeMobileMenu = document.getElementById("closeMobileMenu");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");

if (openMobileMenu && closeMobileMenu && mobileMenuOverlay) {
    openMobileMenu.addEventListener("click", () => {
        mobileMenuOverlay.classList.remove("hidden");
        mobileMenuOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });

    const closeMenu = () => {
        mobileMenuOverlay.classList.add("hidden");
        mobileMenuOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto";
    };

    closeMobileMenu.addEventListener("click", closeMenu);

    mobileMenuOverlay.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}
