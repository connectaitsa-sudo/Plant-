// API Configuration
const API_URL = window.location.origin;

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const removeImageBtn = document.getElementById('removeImageBtn');
const detectionResult = document.getElementById('detectionResult');
const loadingSpinner = document.getElementById('loadingSpinner');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const voiceBtn = document.getElementById('voiceBtn');
const quickButtons = document.querySelectorAll('.quick-btn');

// Current detection context
let currentDetectionContext = null;

// Voice recognition
let recognition = null;
let isListening = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initVoiceRecognition();
});

function setupEventListeners() {
    // Upload button click
    uploadBtn.addEventListener('click', () => imageInput.click());
    
    // File input change
    imageInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('click', (e) => {
        if (e.target === uploadArea || e.target.closest('.upload-content')) {
            imageInput.click();
        }
    });
    
    // Remove image
    removeImageBtn.addEventListener('click', resetUpload);
    
    // Chat
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Voice input
    if (voiceBtn) {
        voiceBtn.addEventListener('click', toggleVoiceInput);
    }
    
    // Quick action buttons
    quickButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            chatInput.value = question;
            sendMessage();
        });
    });
}

function initVoiceRecognition() {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US'; // Can be changed based on user preference
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            stopVoiceInput();
            // Auto-send after voice input
            setTimeout(() => sendMessage(), 500);
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopVoiceInput();
            if (event.error === 'no-speech') {
                addBotMessage('No speech detected. Please try again.');
            }
        };
        
        recognition.onend = () => {
            stopVoiceInput();
        };
    } else {
        // Hide voice button if not supported
        if (voiceBtn) {
            voiceBtn.style.display = 'none';
        }
    }
}

function toggleVoiceInput() {
    if (isListening) {
        stopVoiceInput();
    } else {
        startVoiceInput();
    }
}

function startVoiceInput() {
    if (!recognition) return;
    
    try {
        recognition.start();
        isListening = true;
        voiceBtn.classList.add('listening');
        voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
        chatInput.placeholder = 'Listening... speak now 🎤';
    } catch (e) {
        console.error('Error starting recognition:', e);
    }
}

function stopVoiceInput() {
    if (!recognition) return;
    
    try {
        recognition.stop();
        isListening = false;
        voiceBtn.classList.remove('listening');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        chatInput.placeholder = 'Ask me anything... or use voice 🎤';
    } catch (e) {
        console.error('Error stopping recognition:', e);
    }
}

// File Upload Handlers
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) processFile(file);
}

function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        processFile(file);
    } else {
        showError('Please upload an image file (PNG, JPG, JPEG)');
    }
}

function processFile(file) {
    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImg.src = e.target.result;
        uploadArea.classList.add('hidden');
        imagePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
    
    // Upload and detect
    uploadAndDetect(file);
}

async function uploadAndDetect(file) {
    // Show loading
    detectionResult.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    
    try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch(`${API_URL}/api/detect`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Store context for chatbot
        currentDetectionContext = {
            disease: data.disease,
            confidence: data.confidence
        };
        
        // Display results
        displayDetectionResult(data);
        
        // Add bot message about detection
        addBotMessage(`I've analyzed your plant image and detected: **${data.disease_info.name}** (${Math.round(data.confidence * 100)}% confidence). Ask me anything about this disease or its treatment!`);
        
    } catch (error) {
        showError(error.message);
        resetUpload();
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

function displayDetectionResult(data) {
    const { disease, confidence, disease_info } = data;
    
    // Update confidence badge
    const confidenceBadge = document.getElementById('confidenceBadge');
    confidenceBadge.textContent = `${Math.round(confidence * 100)}%`;
    
    // Update disease name
    const diseaseName = document.getElementById('diseaseName');
    diseaseName.textContent = disease_info.name;
    
    // Update severity badge
    const severityBadge = document.getElementById('severityBadge');
    severityBadge.textContent = disease_info.severity;
    severityBadge.className = 'severity-badge ' + getSeverityClass(disease_info.severity);
    
    // Update description
    const diseaseDescription = document.getElementById('diseaseDescription');
    diseaseDescription.textContent = disease_info.description;
    
    // Update symptoms
    const symptomsList = document.getElementById('symptomsList');
    symptomsList.innerHTML = disease_info.symptoms
        .map(symptom => `<li>${symptom}</li>`)
        .join('');
    
    // Update treatment
    const treatmentList = document.getElementById('treatmentList');
    treatmentList.innerHTML = disease_info.treatment
        .map(treatment => `<li>${treatment}</li>`)
        .join('');
    
    // Update prevention
    const preventionList = document.getElementById('preventionList');
    preventionList.innerHTML = disease_info.prevention
        .map(prevention => `<li>${prevention}</li>`)
        .join('');
    
    // Add treatment videos with embedded player
    if (data.treatment_videos && data.treatment_videos.length > 0) {
        const videoPlayerSection = document.getElementById('videoPlayerSection');
        const videoPlayerContainer = document.getElementById('videoPlayerContainer');
        const moreVideosContainer = document.getElementById('moreVideosContainer');
        
        // Extract YouTube video ID from first video
        const firstVideo = data.treatment_videos[0];
        const videoId = extractYouTubeId(firstVideo.url);
        
        if (videoId) {
            // Create video player with thumbnail and direct YouTube link
            videoPlayerContainer.innerHTML = `
                <div class="video-player-wrapper">
                    <a href="${firstVideo.url}" target="_blank" class="video-link">
                        <div class="video-placeholder">
                            <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" 
                                 onerror="this.src='https://img.youtube.com/vi/${videoId}/mqdefault.jpg'" 
                                 alt="${firstVideo.title}">
                            <div class="play-button-overlay">
                                <i class="fas fa-play-circle"></i>
                            </div>
                            <div class="video-overlay-text">Click to Watch</div>
                        </div>
                    </a>
                    <div class="video-player-info">
                        <h5>${firstVideo.title}</h5>
                        <p>📺 ${firstVideo.channel} • ⏱️ ${firstVideo.duration}</p>
                        <a href="${firstVideo.url}" target="_blank" class="watch-youtube-btn">
                            <i class="fab fa-youtube"></i> Open in YouTube
                        </a>
                    </div>
                </div>
            `;
            
            // Show additional videos if available
            if (data.treatment_videos.length > 1) {
                let moreHTML = '<div class="more-videos"><h5>More Treatment Videos:</h5><div class="videos-grid-small">';
                
                    data.treatment_videos.slice(1).forEach(video => {
                        const vid = extractYouTubeId(video.url);
                        if (vid) {
                            moreHTML += `
                                <a href="${video.url}" target="_blank" class="video-card-small">
                                    <div class="video-thumbnail">
                                        <img src="https://img.youtube.com/vi/${vid}/mqdefault.jpg" 
                                             onerror="this.src='https://img.youtube.com/vi/${vid}/default.jpg'"
                                             alt="${video.title}">
                                        <div class="play-icon-small">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="video-info-small">
                                        <div class="video-title-small">${video.title}</div>
                                        <div class="video-meta-small">📺 ${video.channel} • ${video.duration}</div>
                                    </div>
                                </a>
                            `;
                        }
                    });
                
                moreHTML += '</div></div>';
                moreVideosContainer.innerHTML = moreHTML;
            }
            
            videoPlayerSection.style.display = 'block';
        }
    }
    
    // Show result
    detectionResult.classList.remove('hidden');
    
    // Scroll to result
    detectionResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function getSeverityClass(severity) {
    const severityLower = severity.toLowerCase();
    if (severityLower.includes('none')) return 'none';
    if (severityLower.includes('low')) return 'low';
    if (severityLower.includes('moderate')) return 'moderate';
    if (severityLower.includes('severe')) return 'severe';
    return 'moderate';
}

function resetUpload() {
    imageInput.value = '';
    uploadArea.classList.remove('hidden');
    imagePreview.classList.add('hidden');
    detectionResult.classList.add('hidden');
    currentDetectionContext = null;
}

// Chat Handlers
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    chatInput.value = '';
    
    // Show typing indicator
    const typingId = addTypingIndicator();
    
    try {
        const response = await fetch(`${API_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                context: currentDetectionContext,
                voice_output: false // Can be enabled for voice responses
            })
        });
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Remove typing indicator
        removeTypingIndicator(typingId);
        
        // Add bot response (handle both text and dict responses)
        const responseText = data.text || data.response || data;
        addBotMessage(responseText);
        
        // Play audio if available
        if (data.audio) {
            playAudioResponse(data.audio);
        }
        
    } catch (error) {
        removeTypingIndicator(typingId);
        addBotMessage(`❌ Sorry, I encountered an error: ${error.message}`);
    }
}

function playAudioResponse(audioBase64) {
    try {
        const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
        audio.play();
    } catch (e) {
        console.error('Audio playback error:', e);
    }
}

function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">
            <p>${escapeHtml(text)}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    // Convert markdown-style bold to HTML
    const formattedText = formatBotMessage(text);
    
    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            ${formattedText}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function formatBotMessage(text) {
    // Convert **text** to bold
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert lines starting with • to list items
    const lines = text.split('\n');
    let html = '';
    let inList = false;
    
    for (let line of lines) {
        line = line.trim();
        
        if (line.startsWith('•')) {
            if (!inList) {
                html += '<ul>';
                inList = true;
            }
            html += `<li>${line.substring(1).trim()}</li>`;
        } else if (line.match(/^\d+\./)) {
            if (!inList) {
                html += '<ol>';
                inList = true;
            }
            html += `<li>${line.replace(/^\d+\./, '').trim()}</li>`;
        } else {
            if (inList) {
                html += '</ul></ol>';
                inList = false;
            }
            if (line) {
                html += `<p>${line}</p>`;
            }
        }
    }
    
    if (inList) {
        html += '</ul></ol>';
    }
    
    return html;
}

function addTypingIndicator() {
    const id = 'typing-' + Date.now();
    const messageDiv = document.createElement('div');
    messageDiv.id = id;
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <p><em>Typing...</em></p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    return id;
}

function removeTypingIndicator(id) {
    const element = document.getElementById(id);
    if (element) element.remove();
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(message) {
    addBotMessage(`❌ Error: ${message}`);
}

function extractYouTubeId(url) {
    // Extract YouTube video ID from URL
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Videos now open directly in YouTube - no need for complex embed logic
// This ensures 100% reliability
