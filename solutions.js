document.addEventListener('DOMContentLoaded', function() {
    // Category Filter
    const categoryBtns = document.querySelectorAll('.cat-btn');
    const solutionCards = document.querySelectorAll('.solution-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            solutionCards.forEach(card => {
                card.style.display = category === 'all' || 
                    card.dataset.categories.includes(category) ? 'flex' : 'none';
            });
        });
    });

    // Tool Navigation
    const toolButtons = document.querySelectorAll('.try-tool');
    const toolContainers = document.querySelectorAll('.tool-container');
    
    toolButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const toolId = e.target.dataset.tool + '-tool';
            toolContainers.forEach(t => t.classList.add('hidden'));
            document.getElementById(toolId).classList.remove('hidden');
            resetAllTools();
        });
    });

    // 1. Fraud Scenario Simulator
    const scenarios = {
        'bank-call':[ {
            message: "🔔 Phone rings... Caller ID shows 'Bank Manager': 'Your account needs KYC update. Share OTP!'",
            options: [
                {text: "Share OTP", result: "❌ Lost ₹15,000!", correct: false},
                {text: "Hang up", result: "✅ Verified via official number", correct: true},
                {text: "Ask ID proof", result: "❌ Scammers fake IDs", correct: false}
            ]
        },
        {
            message: "📞 You receive a call: 'Your card will be blocked today unless you verify your PIN now.'",
            options: [
                {text: "Tell PIN quickly", result: "❌ Card misused!", correct: false},
                {text: "Refuse and call in your bank", result: "✅ Smart move!", correct: true},
                {text: "Ask them to resend PIN via SMS", result: "❌ Scammer tricks!", correct: false}
            ]
        },
        {
            message: "📞 'We detected suspicious activity. To secure, please install our Bank Safety App now.'",
            options: [
                {text: "Install the app immediately", result: "❌ Malware installed!", correct: false},
                {text: "Say you’ll visit bank personally", result: "✅ Best action!", correct: true},
                {text: "Give them remote access", result: "❌ Device hacked!", correct: false}
            ]
        }
    ],
        'job-offer': [{
            message: "📧 Email: 'Pay ₹1999 registration fee to start job'",
            options: [
                {text: "Pay", result: "❌ Lost money!", correct: false},
                {text: "Verify", result: "✅ Fake listing found", correct: true},
                {text: "Request details", result: "❌ Phishing links sent", correct: false}
            ]
        },
        {
            message: "📩 Ananya gets WhatsApp message: 'HR here! Immediate joining if you pay ₹500 security deposit.'",
            options: [
                {text: "Send deposit", result: "❌ Lost money!", correct: false},
                {text: "Ask for company website and verify", result: "✅ Scam caught!", correct: true},
                {text: "Share Aadhaar details", result: "❌ Identity stolen!", correct: false}
            ]
        },
        {
            message: "📧 Offer Letter email received: 'Click here to download your appointment letter (from unknown sender)'.",
            options: [
                {text: "Click and download", result: "❌ Virus installed!", correct: false},
                {text: "Check sender's email ID", result: "✅ Realized fake domain", correct: true},
                {text: "Forward to friends", result: "❌ Spread malware!", correct: false}
            ]
        }
    ],
        'delivery-otp':[ {
            message: "📱 SMS: 'Share OTP for delivery'. Sender: AMAZON-URGENT",
            options: [
                {text: "Share OTP", result: "❌ Money deducted!", correct: false},
                {text: "Check app", result: "✅ No delivery found", correct: true},
                {text: "Call SMS number", result: "❌ Connected to scammer", correct: false}
            ]
        },
        {
            message: "🚚 Delivery guy calls: 'Sir, please share the OTP you received to confirm your address.'",
            options: [
                {text: "Share OTP over call", result: "❌ Money stolen!", correct: false},
                {text: "Confirm order via app only", result: "✅ Safe method!", correct: true},
                {text: "Ask them to resend OTP", result: "❌ New fake OTP sent", correct: false}
            ]
        },
        {
            message: "📦 You get SMS: 'Delivery failed. Click link to reschedule and enter OTP.'",
            options: [
                {text: "Click link and enter OTP", result: "❌ Credentials stolen!", correct: false},
                {text: "Open official app to check", result: "✅ Order not found, safe!", correct: true},
                {text: "Call number in SMS", result: "❌ Connected to scammer", correct: false}
            ]
        }
    ],
        // 'phising-email': {
        //     message: "You receive an email from your bank asking you to verify your account by clicking a link. What should you do?",
        //     options: [
        //         {text: "Click the link and enter your details.", result: "❌ they can access your data", correct: false},
        //         {text: "Reply to the email asking if it's genuine.", result: "❌ not helpful for you ", correct: false},
        //         {text: "Ignore the email and call the bank using their official number.", result: "✅ safe result", correct: true}
        //     ]
        // },
        'urgent-bank-sms': [{
            message: "You get an SMS saying your ATM card will be blocked unless you call a number. What should you do?",
            options: [
                {text: "Call the number immediately.", result: "❌ may you loose data", correct: false},
                {text: "Ignore the SMS and contact your bank directly.", result: "✅ you will get right information,now", correct: true},
                {text: "Click the link provided.", result: "❌ may you loose data", correct: false}
            ]
        },
        {
            message: "📩 Message: 'Your online banking suspended. Enter details via link to restore access.'",
            options: [
                {text: "Enter details quickly", result: "❌ Account compromised!", correct: false},
                {text: "Contact bank using official website", result: "✅ Smart decision!", correct: true},
                {text: "Forward message to friends", result: "❌ Spread scam!", correct: false}
            ]
        },
        {
            message: "📩 SMS says: 'Transaction of ₹90,000 debited. Call helpline if not done by you.'",
            options: [
                {text: "Call given number", result: "❌ Fell into trap!", correct: false},
                {text: "Check via official banking app", result: "✅ Safe move!", correct: true},
                {text: "Reply to SMS", result: "❌ No use, riskier!", correct: false}
            ]
        }
    ]
    };

    document.getElementById('start-simulation').addEventListener('click', () => {
        const scenarioType = document.getElementById('scenario-type').value;
        if (!scenarioType) return alert('Please select a scenario');
        
        let scenario = scenarios[scenarioType];
        // If it's an array (like bank-call), pick one randomly
        if (Array.isArray(scenario)) {
            scenario = scenario[Math.floor(Math.random() * scenario.length)];
        }

        // const scenario = scenarios[scenarioType];
        document.getElementById('sim-message').innerHTML = scenario.message;
        document.getElementById('sim-options').innerHTML = scenario.options.map(opt => `
            <button class="sim-option" data-correct="${opt.correct}">${opt.text}</button>
        `).join('');
        
        document.querySelector('.simulation-area').classList.remove('hidden');
        
        document.querySelectorAll('.sim-option').forEach(btn => {
            btn.addEventListener('click', function() {
                // const index = this.dataset.index;
                // const selectedOption = scenario.options[index];
                // const isCorrect = this.dataset.correct === 'true';
                // const result = this.dataset.result;

                document.getElementById('sim-feedback').classList.remove('hidden');
                document.getElementById('feedback-text').textContent = 
                    // selectedOption.correct ? 
                    // `✅ Correct! ${selectedOption.result}` : 
                    // `❌ Wrong! ${selectedOption.result}`;
                    // (isCorrect ? "✅ Correct! " : "❌ Wrong! ") + result;

                    this.dataset.correct === 'true' ? 
                    `✅ Correct! ${scenario.options.find(o => o.text === this.textContent).result}` : 
                    `❌ Wrong! ${scenario.options.find(o => o.text === this.textContent).result}`;
            });
        });
    });

    // 2. Caller Verification
    const scamNumbers = ['+911234567890', '08888888888', '07000012345'];
    document.getElementById('check-caller').addEventListener('click', () => {
        const number = document.getElementById('caller-number').value;
        const result = scamNumbers.includes(number) ? 
            `⚠️ Reported scam number (23 reports)` : `✅ No reports found`;
        document.getElementById('caller-result-text').innerHTML = result;
        document.getElementById('caller-result').classList.remove('hidden');
    });

    // 3. UPI Safety Quiz
    const quizData = [
        {
            question: "Share UPI PIN to receive money?",
            options: ["Yes", "No", "Sometimes"],
            correct: 1,
            explanation: "Never share UPI PIN to receive funds"
        },
        {
            question: "Verify payment request?",
            options: ["Call provided number", "Check UPI ID", "Trust display name"],
            correct: 1,
            explanation: "Always verify through official channels"
        },
        {
            question: "Received extra money by mistake?",
            options: ["Refund", "Check bank", "Contact sender"],
            correct: 1,
            explanation: "Verify in bank app first"
        },
        {
            question: "What would you do if you accidentlly clicked a phishing link? ",
            options: ["Immediately change my passwords", "Ignore, nothing bad will happen", "Complain on Instagram"],
            correct: 0,
            explanation: "It will block scammers from stealing"
        },
        {
            question: "What is the safest option when someone asks for your OTP over a phone call? ",
            options: ["Hang up", "Share it, but carefully", "Ask them to send an email"],
            correct: 0,
            explanation: "OTP is your bank key, NEVER share it with anyone"
        }
    ];
    

    let quizState = {
        currentQuestion: 0,
        score: 0,
        userAnswers: [],
    };

    function loadQuestion() {
        const q = quizData[quizState.currentQuestion];
        document.getElementById('current-q').textContent = quizState.currentQuestion + 1;
        document.getElementById('quiz-question').textContent = q.question;
        
        const optionsDiv = document.getElementById('quiz-options');
        optionsDiv.innerHTML = q.options.map((opt, i) => `
            <label class="quiz-option">
                <input type="radio" name="quiz" value="${i}">
                ${opt}
            </label>
        `).join('');
        
        // Update button text for last question
        const nextBtn = document.getElementById('next-question');
        nextBtn.textContent = quizState.currentQuestion === quizData.length - 1 ? 
            'View Result' : 'Next Question';
        nextBtn.classList.remove('hidden');
    }

    document.getElementById('next-question').addEventListener('click', () => {
        const selected = document.querySelector('input[name="quiz"]:checked');
        if (!selected) return alert('Please select an answer');

        quizState.userAnswers[quizState.currentQuestion] = parseInt(selected.value);
        if (parseInt(selected.value) === quizData[quizState.currentQuestion].correct) {
            quizState.score++;
        }

        quizState.currentQuestion++;
        
        if (quizState.currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showQuizResult();
        }
    });

    function showQuizResult() {
        document.getElementById('quiz-score').textContent = `${quizState.score}/${quizData.length}`;
       
        document.getElementById('quiz-feedback').innerHTML = quizData.map((q, i) => `
            <div class="question-result">
                <h5>Question ${i+1}: ${q.question}</h5>
                <p class="${quizState.userAnswers[i] === q.correct ? 'correct' : 'incorrect'}">
                    Your answer: ${q.options[quizState.userAnswers[i]]}<br>
                    Correct answer: ${q.options[q.correct]}<br>
                    ${q.explanation}
                </p>
            </div>
        `).join('');
        document.getElementById('quiz-result').classList.remove('hidden');
    }

    document.getElementById('retake-quiz').addEventListener('click', () => {
        quizState = { currentQuestion: 0, score: 0, userAnswers: []};
        loadQuestion();
        document.getElementById('quiz-result').classList.add('hidden');
    });

    loadQuestion();

    // 4. Email Analyzer
    document.querySelector('[data-tool="email-check"]').addEventListener('click', () => {
        const email = prompt("Paste suspicious email:");
        const phishingSigns = {
            'Generic greeting': /dear (user|customer)/i,
            'Urgent language': /urgent|immediately/i,
            'Suspicious links': /<a href="http:\/\/phishing/i
        };
        const results = Object.entries(phishingSigns)
            .filter(([_, regex]) => email.match(regex))
            .map(([sign]) => sign);
        alert(results.length ? `⚠️ Detected: ${results.join(', ')}` : "✅ No threats found");
    });

    // 5. OTP Safety Guide
    document.querySelector('[data-tool="otp-guide"]').addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center">
                <div style="background:white;padding:20px;border-radius:10px">
                    <h3>🔒 OTP Safety Rules</h3>
                    <ul>
                        <li>Never share OTP with anyone</li>
                        <li>Banks never ask for OTP</li>
                        <li>If shared, block card immediately</li>
                    </ul>
                    <button onclick="this.parentElement.parentElement.remove()">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    });

    // 6. Scam Buster AI
    document.querySelector('[data-tool="scam-bot"]').addEventListener('click', () => {
        const chatWindow = document.createElement('div');
        chatWindow.innerHTML = `
            <div style="position:fixed;bottom:20px;right:20px;width:300px;background:white;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.2)">
                <div style="background:#007bff;color:white;padding:10px;border-radius:10px 10px 0 0">
                    Scam Buster AI 🔐
                    <button style="float:right;background:none;border:none;color:white" onclick="this.parentElement.parentElement.remove()">×</button>
                </div>
                <div id="chat-messages" style="height:200px;overflow-y:auto;padding:10px"></div>
                <input type="text" placeholder="Type your response..." style="width:100%;padding:10px;border:none;border-top:1px solid #ddd">
            </div>
        `;
        
        const input = chatWindow.querySelector('input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const messages = chatWindow.querySelector('#chat-messages');
                messages.innerHTML += `<div style="text-align:right;margin:5px">${input.value}</div>`;
                
                // Add bot response
                setTimeout(() => {
                    const response = generateBotResponse(input.value);
                    messages.innerHTML += `<div style="margin:5px">${response}</div>`;
                    messages.scrollTop = messages.scrollHeight;
                }, 500);
                
                input.value = '';
            }
        });
        document.body.appendChild(chatWindow);
    });

    function generateBotResponse(message) {
        const responses = {
            'account': "Your account is compromised! Share OTP to secure it.",
            'kyc': "Urgent KYC update needed! Click link to avoid suspension.",
            'default': "Your account is at risk. Share personal details."
        };
        return responses[Object.keys(responses).find(key => message.toLowerCase().includes(key))] || responses.default;
    }

    // Reset all tools
    function resetAllTools() {
        // Reset simulation
        document.querySelector('.simulation-area').classList.add('hidden');
        document.getElementById('sim-feedback').classList.add('hidden');
        
        // Reset caller check
        document.getElementById('caller-number').value = '';
        document.getElementById('caller-result').classList.add('hidden');
        
        // Reset quiz
        quizState = { currentQuestion: 0, score: 0, userAnswers: [] };
        loadQuestion();
        document.getElementById('quiz-result').classList.add('hidden');
    }
});
// Did You Know Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Security facts array (Indian context)
    const securityFacts = [
        "⚠️ UPI Scam Alert: Never share your UPI PIN to receive money. Legitimate transactions never require your PIN for receiving funds!",
        "🔐 OTP Safety: Your bank will NEVER call to ask for OTPs. If someone does, it's definitely a scam!",
        "📱 Fake KYC Update: Banks never ask for KYC updates via SMS links. Over 23,000 KYC scams were reported in 2023 alone!",
        "💳 QR Code Warning: Scanning unknown QR codes can automatically deduct money from your account!",
        "📞 Vishing Alert: 67% of UPI frauds start with fake customer care numbers found on Google Search!",
        "🛑 Social Media Scams: 'Double your money' schemes on WhatsApp/Telegram are ALWAYS fake!",
        "📧 Job Scam: Fake job offers asking for 'registration fees' are common. Legitimate companies never ask for money!",
        "🚨 SIM Swap Fraud: If your mobile network suddenly stops working, contact your provider immediately - it could be a SIM swap attempt!"
    ];

    // DOM Elements
    const dykPopup = document.getElementById('dykPopup');
    const dykText = document.getElementById('dykText');
    const dykClose = document.querySelector('.dyk-close');
    const dykMuteCheckbox = document.getElementById('dykMute');
    let popupInterval;

    // Show random security fact
    function showRandomFact() {
        // Check if user has muted the popups
        const mutedUntil = localStorage.getItem('dykMutedUntil');
        if (mutedUntil && new Date().getTime() < parseInt(mutedUntil)) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * securityFacts.length);
        dykText.textContent = securityFacts[randomIndex];
        dykPopup.style.display = 'flex';
    }

    // Close popup and handle mute preference
    function closePopup() {
        dykPopup.style.display = 'none';
        
        if (dykMuteCheckbox.checked) {
            // Mute for 24 hours (86400000 milliseconds)
            const muteUntil = new Date().getTime() + 86400000;
            localStorage.setItem('dykMutedUntil', muteUntil);
        }
    }

    // Event Listeners
    dykClose.addEventListener('click', closePopup);

    // Close when clicking outside the popup content
    dykPopup.addEventListener('click', function(e) {
        if (e.target === dykPopup) {
            closePopup();
        }
    });

    // Initialize the popup system
    function initPopupSystem() {
        // Show first popup after 30 seconds
        setTimeout(showRandomFact, 30000);
        
        // Then show every 60 seconds (adjust timing as needed)
        popupInterval = setInterval(showRandomFact, 60000);
    }

    // Start the popup system
    initPopupSystem();

    // Reset mute status after 24 hours
    function checkMuteStatus() {
        const mutedUntil = localStorage.getItem('dykMutedUntil');
        if (mutedUntil && new Date().getTime() > parseInt(mutedUntil)) {
            localStorage.removeItem('dykMutedUntil');
            dykMuteCheckbox.checked = false;
        }
    }

    // Check mute status every hour
    setInterval(checkMuteStatus, 3600000);
    checkMuteStatus(); // Initial check
});