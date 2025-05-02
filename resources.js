document.addEventListener('DOMContentLoaded', function() {
    // 1. Resource Category Filter
    const resBtns = document.querySelectorAll('.res-btn');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            resBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter resources
            const category = this.getAttribute('data-category');
            
            resourceCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-categories').includes(category)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 2. Expandable Resource Details
    const viewButtons = document.querySelectorAll('.view-numbers, .view-features');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const detailsContainer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            detailsContainer.classList.toggle('hidden');
            
            if (detailsContainer.classList.contains('hidden')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });

    // 3. Emergency Button Pulse Animation
    const emergencyBtns = document.querySelectorAll('.btn-emergency');
    
    emergencyBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        btn.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });

    // 4. Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        // Simulate form submission
        this.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <p>Thank you for subscribing! Check your email to confirm.</p>
            </div>
        `;
        
        // In real implementation, you would send this to your backend
        console.log('Subscribed email:', email);
    });

    // 5. App Store Badge Hover Effect
    const appBadges = document.querySelectorAll('.app-badges a');
    
    appBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});