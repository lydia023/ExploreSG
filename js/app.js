// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize weather widget
    initWeatherWidget();
    
    // Initialize map
    initMap();
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.fade-in').forEach((element) => {
        observer.observe(element);
    });
}

// Weather Widget
async function initWeatherWidget() {
    const weatherSection = document.querySelector('.weather-section');
    // Weather API integration will be added here
    // Using Singapore coordinates: 1.3521° N, 103.8198° E
}

// Interactive Map
function initMap() {
    const mapSection = document.querySelector('.map-section');
    // Map integration will be added here (Google Maps or Mapbox)
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Performance Optimizations
document.addEventListener('scroll', debounce(handleScroll, 16));

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function handleScroll() {
    // Scroll-based animations and updates
}

// Chatbot Widget Integration
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotPanel = document.getElementById('chatbot-panel');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

if (chatbotToggle && chatbotPanel && chatbotClose && chatbotForm && chatbotInput && chatbotMessages) {
    chatbotToggle.addEventListener('click', () => {
        chatbotPanel.classList.toggle('active');
        chatbotInput.focus();
    });
    chatbotClose.addEventListener('click', () => {
        chatbotPanel.classList.remove('active');
    });
    chatbotForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMsg = chatbotInput.value.trim();
        if (!userMsg) return;
        appendMessage('user', userMsg);
        chatbotInput.value = '';
        chatbotInput.disabled = true;
        await sendChatbotMessage(userMsg);
        chatbotInput.disabled = false;
        chatbotInput.focus();
    });
}

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chatbot-message ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    msgDiv.appendChild(bubble);
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

async function sendChatbotMessage(message) {
    appendMessage('bot', '...'); // Loading indicator
    try {
        const response = await fetch('https://lyyds-flowise.hf.space/api/v1/prediction/52150eb9-b86a-4977-9ab2-61c79902d6f1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: message })
        });
        // Log status and headers for debugging
        console.log('API status:', response.status);
        console.log('API headers:', response.headers);
        const data = await response.json();
        console.log('API response:', data);
        // Remove loading indicator
        const loadingMsg = chatbotMessages.querySelector('.chatbot-message.bot .bubble');
        if (loadingMsg && loadingMsg.textContent === '...') {
            loadingMsg.parentElement.remove();
        }
        if (data && (data.output || data.result || data.message)) {
            // Try different possible response keys
            appendMessage('bot', data.output || data.result || data.message);
        } else {
            appendMessage('bot', 'Sorry, I could not understand.');
        }
    } catch (err) {
        // Remove loading indicator
        const loadingMsg = chatbotMessages.querySelector('.chatbot-message.bot .bubble');
        if (loadingMsg && loadingMsg.textContent === '...') {
            loadingMsg.parentElement.remove();
        }
        console.error('Chatbot error:', err);
        appendMessage('bot', 'Network or CORS error. See browser console for details.');
    }
}
