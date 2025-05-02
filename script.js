// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (currentPage === linkHref || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});
const scamFacts = [
    `🛑 UPI Alert: Never share your UPI PIN for receiving money! Legitimate transactions never require your PIN to receive funds.`,
    `⚠️ Fake Payment Screenshots: Scammers may send fake "payment successful" images. Always check your bank app directly.`,
    `📱 QR Code Scam: Never scan QR codes from unknown sources - they can automatically deduct money from your account!`,
    `📞 Fake Customer Care: 67% of UPI frauds start with fake customer care numbers found on Google Search. Always use official app numbers.`,
    `💸 Social Media Scams: "Double your money" schemes on WhatsApp/Telegram are always fake. Report them immediately!`,
    `📧 KYC Fraud: RBI never asks for KYC updates via links. 23,000+ KYC scams reported in 2023 alone.`,
    `👨💻 Screen Sharing Scams: NCCPS reported 12,000+ cases where victims installed AnyDesk/TeamViewer for "tech support".`
];

let currentFact = 0;

function showNewFact() {
    const factElement = document.getElementById('scamFact');
    factElement.innerHTML = scamFacts[currentFact];
    currentFact = (currentFact + 1) % scamFacts.length;
}

document.addEventListener('DOMContentLoaded', function() {
    // ... existing popup code ...

    // Modified showPopup function
    function showPopup() {
        if (!localStorage.getItem('popupDisabled')) {
            popupOverlay.style.display = 'flex';
            showNewFact();
        }
    }

    // Next Tip button
    document.getElementById('nextTip').addEventListener('click', showNewFact);

    // Reset facts on new page load
    currentFact = Math.floor(Math.random() * scamFacts.length);
});
document.addEventListener('DOMContentLoaded', function() {
    // Debugging check
    console.log('Script loaded - popup system initializing');

    const scamFacts = [
        "UPI Scam Alert: Never share your UPI PIN with anyone!",
        "Fake KYC Update: Banks never ask for KYC updates via SMS links.",
        "Fake Customer Care: Always verify phone numbers from official sources.",
        "QR Code Fraud: Never scan unknown QR codes for payments."
    ];

    const popupOverlay = document.getElementById('popupOverlay');
    
    if (!popupOverlay) {
        console.error('Popup element not found! Check HTML ID');
        return;
    }

    function showPopup() {
        console.log('Showing popup');
        popupOverlay.style.display = 'flex';
        const randomFact = scamFacts[Math.floor(Math.random() * scamFacts.length)];
        document.getElementById('scamFact').textContent = randomFact;
    }

    // First popup after 5 seconds (for testing)
    let popupTimer = setTimeout(showPopup, 5000); 

    // Close functionality
    popupOverlay.addEventListener('click', function(e) {
        if (e.target.classList.contains('popup-overlay') || 
            e.target.classList.contains('close-popup')) {
            popupOverlay.style.display = 'none';
        }
    });

    // Reset timer on user activity
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);

    function resetTimer() {
        console.log('Resetting timer');
        clearTimeout(popupTimer);
        popupTimer = setTimeout(showPopup, 30000); // 30 seconds
    }
});
// Security Tips Array - Customize with Indian-specific content
const securityTips = [
    "🚨 UPI FRAUD ALERT: Never share your UPI PIN with anyone! Legitimate transactions never require your PIN for receiving money.",
    "📱 FAKE KYC SCAM: Banks never ask for KYC updates via SMS links. Contact your branch directly for verification.",
    "⚠️ PHISING ALERT: Fake 'Gift Card' links on WhatsApp are scams. Never click suspicious links from unknown numbers.",
    "🔒 OTP SAFETY: Your bank will NEVER call to ask for OTPs. Hang up immediately if someone requests this.",
    "🛑 SIM SWAP FRAUD: If mobile network suddenly stops working, contact your provider immediately - could be SIM swap attempt!",
    "📧 FAKE JOB SCAMS: Never pay 'registration fees' for work-from-home jobs. Legitimate companies never ask for upfront payments.",
    "💸 SOCIAL MEDIA FRAUD: 'Double your money' schemes on Instagram/Telegram are ALWAYS fake. Block & report immediately."
];

// Popup Management
let popupTimer;

function showSecurityTip() {
    const popup = document.getElementById('securityPopup');
    const messageElement = document.getElementById('securityMessage');
    
    // Random tip selection
    const randomIndex = Math.floor(Math.random() * securityTips.length);
    messageElement.textContent = securityTips[randomIndex];
    
    // Show popup
    popup.style.display = 'flex';

    // Reset timer
    popupTimer = setTimeout(showSecurityTip, 30000); // 30 seconds
}

// Close functionality
document.querySelector('.close-popup').addEventListener('click', () => {
    document.getElementById('securityPopup').style.display = 'none';
    popupTimer = setTimeout(showSecurityTip, 30000);
});

// Initial trigger after 30 seconds
window.onload = () => {
    setTimeout(showSecurityTip, 30000);
    
    // Reset timer on user activity
    ['mousemove', 'keydown', 'scroll'].forEach(event => {
        window.addEventListener(event, () => {
            clearTimeout(popupTimer);
            popupTimer = setTimeout(showSecurityTip, 30000);
        });
    });
};


