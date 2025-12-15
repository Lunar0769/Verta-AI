// VERTA - AI Meeting Intelligence Platform
// Fixed Frontend JavaScript for Real Backend Integration

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars';
            } else {
                icon.className = 'fas fa-times';
            }
        });
    }
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = document.querySelector('#mobile-menu-btn i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            }
        });
    });
});

// Scroll to Demo Function
function scrollToDemo() {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        const offsetTop = demoSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// VERTA Backend Configuration - Using Render deployment
const BACKEND_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://verta-ai-rk8i.onrender.com';

// Backend Wake-up System for Render Auto-Sleep
async function wakeUpBackend() {
    console.log('🔄 Waking up VERTA backend server...');
    updateBackendStatus('connecting', 'Waking up server...');
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout for cold starts
        
        const response = await fetch(`${BACKEND_URL}/health`, {
            method: 'GET',
            mode: 'cors',
            signal: controller.signal,
            headers: {
                'User-Agent': 'VERTA-Frontend/1.0'
            }
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
            console.log('✅ Backend is awake and ready!');
            updateBackendStatus('connected', 'Server ready');
            return true;
        } else {
            console.log('⚠️ Backend responded but may not be fully ready');
            updateBackendStatus('warning', 'Server starting...');
            return false;
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('⏰ Backend wake-up timeout - server may still be starting');
            updateBackendStatus('warning', 'Server starting (may take up to 2 min)');
        } else {
            console.log('❌ Backend wake-up failed:', error.message);
            updateBackendStatus('error', 'Connection failed - will retry');
        }
        return false;
    }
}

// Update backend status indicator
function updateBackendStatus(status, message) {
    const statusElement = document.getElementById('backend-status');
    if (!statusElement) return;
    
    const dot = statusElement.querySelector('div');
    const text = statusElement.querySelector('span');
    
    if (!dot || !text) return;
    
    // Remove all status classes
    dot.className = 'w-2 h-2 rounded-full mr-2';
    
    switch (status) {
        case 'connecting':
            dot.classList.add('bg-yellow-500', 'animate-pulse');
            break;
        case 'connected':
            dot.classList.add('bg-green-500');
            break;
        case 'warning':
            dot.classList.add('bg-orange-500', 'animate-pulse');
            break;
        case 'error':
            dot.classList.add('bg-red-500');
            break;
    }
    
    text.textContent = message;
}

// Auto wake-up backend when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 VERTA: Initializing Render backend wake-up system...');
    
    // Wake up backend immediately when user visits the site
    setTimeout(() => {
        wakeUpBackend();
    }, 1000); // Small delay to let the page load
    
    // Also wake up when user interacts with upload area
    const uploadZone = document.getElementById('upload-zone');
    if (uploadZone) {
        uploadZone.addEventListener('click', function() {
            // Check if backend is ready, if not wake it up
            const statusElement = document.getElementById('backend-status');
            const statusText = statusElement?.querySelector('span')?.textContent;
            
            if (statusText && !statusText.includes('ready')) {
                wakeUpBackend();
            }
        });
    }
});

// File Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('file-input');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const fileSize = document.getElementById('file-size');
    const analyzeBtn = document.getElementById('analyze-btn');
    const progressSection = document.getElementById('progress-section');
    // Removed progressBar - using beautiful loader instead
    const progressText = document.getElementById('progress-text');
    const resultsSection = document.getElementById('demo-results');
    
    let selectedFile = null;
    
    // Upload zone click handler
    if (uploadZone && fileInput) {
        uploadZone.addEventListener('click', function() {
            fileInput.click();
        });
        
        // Drag and drop handlers
        uploadZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadZone.classList.add('border-purple-500', 'bg-purple-100');
        });
        
        uploadZone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadZone.classList.remove('border-purple-500', 'bg-purple-100');
        });
        
        uploadZone.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadZone.classList.remove('border-purple-500', 'bg-purple-100');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelect(files[0]);
            }
        });
        
        // File input change handler
        fileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
            }
        });
    }
    
    // Handle file selection
    function handleFileSelect(file) {
        selectedFile = file;
        
        // Validate file type
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['mp3', 'wav', 'mp4', 'mov', 'avi', 'webm'];
        
        if (!allowedExtensions.includes(fileExtension)) {
            showNotification('Please select a valid audio or video file', 'error');
            return;
        }
        
        // Check file size (200MB limit for longer videos)
        const maxSize = 200 * 1024 * 1024;
        if (file.size > maxSize) {
            showNotification('File too large. Please select a file under 200MB', 'error');
            return;
        }
        
        // Display file info
        if (fileName && fileSize && fileInfo && analyzeBtn) {
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size);
            fileInfo.classList.remove('hidden');
            analyzeBtn.classList.remove('hidden');
        }
        
        showNotification('File selected successfully!', 'success');
    }
    
    // Analyze button click handler
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            if (selectedFile) {
                startAnalysis();
            }
        });
    }
    
    // Start analysis with real backend integration
    async function startAnalysis() {
        console.log('🔮 VERTA: Starting analysis...');
        console.log('Backend URL:', BACKEND_URL);
        console.log('Selected file:', selectedFile.name, selectedFile.size, 'bytes');
        
        if (analyzeBtn && progressSection && resultsSection) {
            analyzeBtn.classList.add('hidden');
            progressSection.classList.remove('hidden');
            resultsSection.innerHTML = ''; // Clear previous results
            
            try {
                // Step 1: Ensure backend is awake (especially important for Render)
                updateProgress(5, 'Connecting to VERTA AI backend...');
                console.log('🔍 Ensuring backend is ready...');
                
                // Try to wake up backend if it's sleeping
                let backendReady = await wakeUpBackend();
                
                // If first attempt failed, try again with longer timeout for Render cold starts
                if (!backendReady) {
                    updateProgress(10, 'Backend starting up, please wait...');
                    console.log('🔄 Retrying backend connection for Render cold start...');
                    
                    // Wait a bit more for cold start
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    backendReady = await wakeUpBackend();
                }
                
                if (!backendReady) {
                    updateProgress(15, 'Backend may still be starting, attempting analysis...');
                    console.log('⚠️ Proceeding with analysis despite backend status');
                } else {
                    updateProgress(15, '✅ Connected to VERTA AI successfully');
                }
                
                // Step 2: Upload and analyze file
                updateProgress(25, '📤 Uploading your meeting file...');
                console.log('📤 Uploading file to backend...');
                
                const formData = new FormData();
                formData.append('file', selectedFile);
                
                const analyzeUrl = `${BACKEND_URL}/analyze`;
                console.log('Analyze URL:', analyzeUrl);
                console.log('FormData file:', selectedFile.name);
                
                const analyzeResponse = await fetch(analyzeUrl, {
                    method: 'POST',
                    mode: 'cors',
                    body: formData
                });
                
                console.log('Analyze response status:', analyzeResponse.status);
                console.log('Analyze response headers:', Object.fromEntries(analyzeResponse.headers.entries()));
                
                if (!analyzeResponse.ok) {
                    const errorText = await analyzeResponse.text();
                    console.error('❌ Analyze response error:', errorText);
                    throw new Error(`Analysis failed: ${analyzeResponse.status} - ${errorText}`);
                }
                
                updateProgress(60, '🧠 Gemini AI is analyzing your meeting...');
                
                const analysisResult = await analyzeResponse.json();
                console.log('✅ Full analysis result:', analysisResult);
                
                updateProgress(90, '✨ Preparing your insights...');
                
                // Step 3: Display real results
                setTimeout(() => {
                    updateProgress(100, '🎉 Analysis complete! Displaying results...');
                    setTimeout(() => {
                        displayRealAnalysisResults(analysisResult);
                        progressSection.classList.add('hidden');
                    }, 1000);
                }, 500);
                
            } catch (error) {
                console.error('❌ VERTA Analysis Error:', error);
                progressSection.classList.add('hidden');
                analyzeBtn.classList.remove('hidden');
                
                showAnalysisError(error.message);
            }
        }
    }
    
    // Display real analysis results from backend
    function displayRealAnalysisResults(data) {
        console.log('🎨 Displaying real analysis results:', data);
        
        if (!resultsSection) {
            console.error('Results section not found');
            return;
        }
        
        // Extract data from backend response
        const fileInfo = data.file_info || {};
        const segments = data.segments || [];
        const engagementScore = data.engagement_score || {};
        const meetingSummary = data.meeting_summary || {};
        const actionItems = data.action_items || [];
        const suggestions = data.improvement_suggestions || [];
        
        const resultsHTML = `
            <div class="space-y-8">
                <!-- Analysis Header -->
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold text-gradient mb-3">🔮 VERTA Analysis Complete</h2>
                    <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4">
                        <p class="text-gray-700 font-medium">Results for: <strong class="text-gray-900">${fileInfo.filename || 'Unknown file'}</strong></p>
                        <p class="text-sm text-gray-600 mt-1">Processed: ${new Date(fileInfo.processed_at || Date.now()).toLocaleString()}</p>
                        <div class="mt-3 inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                            ✅ ${fileInfo.analysis_type || 'AI Analysis'}
                        </div>
                    </div>
                </div>
                
                <!-- Analysis Results Accordion -->
                <div class="analysis-accordion w-full max-w-full">
                    ${createAnalysisAccordion(segments, engagementScore, meetingSummary, actionItems, suggestions)}
                </div>
            </div>
        `;
        
        resultsSection.innerHTML = resultsHTML;
        
        // Initialize accordion
        initializeAccordion();
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        showNotification('✅ Analysis complete! Real results from VERTA AI.', 'success');
    }
    
    // Show analysis error
    function showAnalysisError(errorMessage) {
        if (!resultsSection) return;
        
        resultsSection.innerHTML = `
            <div class="demo-card text-center py-8">
                <div class="text-4xl mb-3">❌</div>
                <h2 class="text-xl font-bold text-red-600 mb-3">Analysis Failed</h2>
                <p class="text-gray-600 mb-4">${errorMessage}</p>
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 class="font-semibold text-red-800 mb-2">Troubleshooting:</h3>
                    <ul class="text-sm text-red-700 text-left space-y-1">
                        <li>• Check your internet connection</li>
                        <li>• Try with a smaller file (under 50MB)</li>
                        <li>• Ensure file is MP3, WAV, MP4, MOV, AVI, or WebM</li>
                        <li>• Check browser console for detailed errors</li>
                    </ul>
                </div>
                <button onclick="location.reload()" class="mt-4 bg-red-600 text-white px-4 py-2 rounded-full">
                    Try Again
                </button>
            </div>
        `;
    }
    
    // Update progress text (no more progress bar, using beautiful loader)
    function updateProgress(percent, message) {
        if (progressText) {
            progressText.textContent = message;
        }
    }
    
    // Helper functions
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function getSentimentClass(sentiment) {
        switch (sentiment?.toLowerCase()) {
            case 'positive': return 'bg-green-100 text-green-800';
            case 'negative': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
    
    function getPriorityColor(priority) {
        switch (priority?.toLowerCase()) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    }
    
    function getPriorityBg(priority) {
        switch (priority?.toLowerCase()) {
            case 'high': return 'bg-red-50';
            case 'medium': return 'bg-yellow-50';
            case 'low': return 'bg-green-50';
            default: return 'bg-gray-50';
        }
    }
    
    // Create chronological transcript with proper speaker separation
    function createChronologicalTranscript(segments) {
        if (!segments || segments.length === 0) {
            return '<div class="text-center py-8 text-gray-500">No transcript available</div>';
        }
        
        let transcriptHTML = '';
        
        segments.forEach((segment, index) => {
            const timeRange = segment.time_range || `Segment ${index + 1}`;
            const speaker = segment.speaker || 'Unknown Speaker';
            const sentiment = segment.sentiment || 'Neutral';
            const topic = segment.topic || 'General Discussion';
            const transcript = segment.transcript || 'No content available';
            
            // Parse and format the transcript content
            const formattedContent = parseTranscriptContent(transcript, timeRange);
            
            transcriptHTML += `
                <div class="transcript-segment mb-6 last:mb-0">
                    <!-- Segment Header -->
                    <div class="segment-header flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                        <div class="flex items-center space-x-3">
                            <span class="time-badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                ${timeRange}
                            </span>
                            <span class="topic-badge bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                ${topic}
                            </span>
                        </div>
                        <span class="sentiment-badge px-3 py-1 text-xs rounded-full ${getSentimentClass(sentiment)}">
                            ${sentiment}
                        </span>
                    </div>
                    
                    <!-- Transcript Content -->
                    <div class="transcript-content">
                        ${formattedContent}
                    </div>
                </div>
            `;
        });
        
        return transcriptHTML;
    }
    
    // Parse transcript content and separate speakers chronologically
    function parseTranscriptContent(transcript, timeRange) {
        if (!transcript || transcript === 'No transcript available') {
            return '<div class="text-gray-500 italic">No content available for this segment</div>';
        }
        
        // Split by speaker changes and format chronologically
        const speakerBlocks = transcript.split(/(?=Speaker [A-Z]:)/);
        let contentHTML = '';
        
        speakerBlocks.forEach((block, index) => {
            if (block.trim()) {
                // Extract speaker and content
                const speakerMatch = block.match(/(Speaker [A-Z]):\s*"?([^"]*)"?/);
                if (speakerMatch) {
                    const [, speaker, content] = speakerMatch;
                    const cleanContent = content.replace(/\\n\\n/g, ' ').replace(/\\n/g, ' ').trim();
                    
                    if (cleanContent) {
                        contentHTML += `
                            <div class="speaker-block mb-4 last:mb-0">
                                <div class="speaker-info flex items-center mb-2">
                                    <div class="speaker-avatar w-8 h-8 rounded-full bg-gradient-to-r ${getSpeakerColor(speaker)} flex items-center justify-center text-white text-sm font-bold mr-3">
                                        ${speaker.slice(-1)}
                                    </div>
                                    <span class="speaker-name font-semibold text-gray-800">${speaker}</span>
                                </div>
                                <div class="speaker-content bg-white rounded-lg p-4 ml-11 shadow-sm border border-gray-100">
                                    <p class="text-gray-700 leading-relaxed">"${cleanContent}"</p>
                                </div>
                            </div>
                        `;
                    }
                } else {
                    // Handle content without clear speaker format
                    const cleanBlock = block.replace(/\\n\\n/g, ' ').replace(/\\n/g, ' ').trim();
                    if (cleanBlock) {
                        contentHTML += `
                            <div class="speaker-block mb-4 last:mb-0">
                                <div class="speaker-content bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100">
                                    <p class="text-gray-700 leading-relaxed">${cleanBlock}</p>
                                </div>
                            </div>
                        `;
                    }
                }
            }
        });
        
        return contentHTML || '<div class="text-gray-500 italic">No readable content in this segment</div>';
    }
    
    // Get speaker-specific color
    function getSpeakerColor(speaker) {
        const colors = {
            'Speaker A': 'from-blue-500 to-blue-600',
            'Speaker B': 'from-green-500 to-green-600', 
            'Speaker C': 'from-purple-500 to-purple-600',
            'Speaker D': 'from-orange-500 to-orange-600',
            'Speaker E': 'from-red-500 to-red-600',
            'Speaker F': 'from-indigo-500 to-indigo-600'
        };
        return colors[speaker] || 'from-gray-500 to-gray-600';
    }
    
    // Get unique speakers from segments
    function getUniqueSpeekers(segments) {
        const speakers = new Set();
        segments.forEach(segment => {
            if (segment.speaker) {
                // Extract individual speakers from combined speaker strings
                const speakerMatches = segment.speaker.match(/Speaker [A-Z]/g);
                if (speakerMatches) {
                    speakerMatches.forEach(speaker => speakers.add(speaker));
                } else {
                    speakers.add(segment.speaker);
                }
            }
        });
        return Array.from(speakers);
    }
    
    // Create Analysis Accordion
    function createAnalysisAccordion(segments, engagementScore, meetingSummary, actionItems, suggestions) {
        const accordionItems = [
            {
                id: 'transcript',
                number: '01',
                title: 'Meeting Transcript',
                icon: '🎤',
                content: `
                    <div class="transcript-container max-h-[500px] overflow-y-auto border rounded-lg bg-gray-50 p-6">
                        ${createChronologicalTranscript(segments)}
                    </div>
                `,
                badge: `${segments.length} segments`
            },
            {
                id: 'engagement',
                number: '02', 
                title: 'Engagement Score',
                icon: '📊',
                content: `
                    <div class="engagement-content">
                        <div class="flex items-center justify-between mb-6">
                            <span class="text-4xl font-bold text-gradient">${engagementScore.score || 0}/100</span>
                            <div class="flex-1 ml-6">
                                <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
                                    <div class="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-1000" 
                                         style="width: ${engagementScore.score || 0}%"></div>
                                </div>
                                <p class="text-sm text-gray-600">Meeting Effectiveness</p>
                            </div>
                        </div>
                        <p class="text-gray-700 leading-relaxed">${engagementScore.explanation || 'No explanation available'}</p>
                    </div>
                `,
                badge: `${engagementScore.score || 0}%`
            },
            {
                id: 'stats',
                number: '03',
                title: 'Meeting Stats', 
                icon: '📈',
                content: `
                    <div class="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="stat-card bg-blue-50 rounded-lg p-4 text-center">
                            <div class="text-2xl font-bold text-blue-600">${segments.length}</div>
                            <div class="text-sm text-gray-600">Segments</div>
                        </div>
                        <div class="stat-card bg-green-50 rounded-lg p-4 text-center">
                            <div class="text-2xl font-bold text-green-600">${getUniqueSpeekers(segments).length}</div>
                            <div class="text-sm text-gray-600">Speakers</div>
                        </div>
                        <div class="stat-card bg-purple-50 rounded-lg p-4 text-center">
                            <div class="text-2xl font-bold text-purple-600">${actionItems.length}</div>
                            <div class="text-sm text-gray-600">Action Items</div>
                        </div>
                        <div class="stat-card bg-orange-50 rounded-lg p-4 text-center">
                            <div class="text-2xl font-bold text-orange-600">${meetingSummary.decisions?.length || 0}</div>
                            <div class="text-sm text-gray-600">Decisions</div>
                        </div>
                    </div>
                `,
                badge: `${getUniqueSpeekers(segments).length} speakers`
            },
            {
                id: 'summary',
                number: '04',
                title: 'Meeting Summary',
                icon: '📋',
                content: `
                    <div class="summary-content space-y-6">
                        ${meetingSummary.key_points && meetingSummary.key_points.length > 0 ? `
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
                                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    Key Points
                                </h4>
                                <ul class="space-y-2">
                                    ${meetingSummary.key_points.map(point => `
                                        <li class="flex items-start text-sm text-gray-700">
                                            <span class="text-blue-500 mr-2 mt-1">•</span>
                                            ${point}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${meetingSummary.decisions && meetingSummary.decisions.length > 0 ? `
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Decisions Made
                                </h4>
                                <ul class="space-y-2">
                                    ${meetingSummary.decisions.map(decision => `
                                        <li class="flex items-start text-sm text-gray-700">
                                            <span class="text-green-500 mr-2 mt-1">✓</span>
                                            ${decision}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${meetingSummary.open_questions && meetingSummary.open_questions.length > 0 ? `
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
                                    <span class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                    Open Questions
                                </h4>
                                <ul class="space-y-2">
                                    ${meetingSummary.open_questions.map(question => `
                                        <li class="flex items-start text-sm text-gray-700">
                                            <span class="text-yellow-500 mr-2 mt-1">?</span>
                                            ${question}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${meetingSummary.risks_or_concerns && meetingSummary.risks_or_concerns.length > 0 ? `
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
                                    <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                    Risks & Concerns
                                </h4>
                                <ul class="space-y-2">
                                    ${meetingSummary.risks_or_concerns.map(risk => `
                                        <li class="flex items-start text-sm text-gray-700">
                                            <span class="text-red-500 mr-2 mt-1">⚠</span>
                                            ${risk}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                `,
                badge: `${(meetingSummary.key_points?.length || 0) + (meetingSummary.decisions?.length || 0)} items`
            },
            {
                id: 'actions',
                number: '05',
                title: 'Action Items',
                icon: '✅',
                content: actionItems.length > 0 ? `
                    <div class="actions-content space-y-4">
                        ${actionItems.map(item => `
                            <div class="action-item flex items-center justify-between p-4 rounded-lg ${getPriorityBg(item.priority)} border border-gray-200">
                                <div class="flex-1">
                                    <p class="font-medium text-gray-800 mb-1">${item.description || 'No description'}</p>
                                    <p class="text-sm text-gray-600">Owner: ${item.owner || 'Unassigned'}</p>
                                </div>
                                <span class="px-3 py-1 text-white rounded-full text-sm font-medium ${getPriorityColor(item.priority)}">
                                    ${item.priority || 'Medium'}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                ` : '<div class="text-center py-8 text-gray-500">No action items identified</div>',
                badge: `${actionItems.length} items`
            },
            {
                id: 'suggestions',
                number: '06',
                title: 'Improvement Suggestions',
                icon: '💡',
                content: suggestions.length > 0 ? `
                    <div class="suggestions-content space-y-4">
                        ${suggestions.map((suggestion, index) => `
                            <div class="suggestion-item flex items-start p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <span class="text-yellow-500 mr-3 mt-1 text-lg">💡</span>
                                <div class="flex-1">
                                    <p class="text-sm text-gray-700 leading-relaxed">${suggestion}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<div class="text-center py-8 text-gray-500">No improvement suggestions available</div>',
                badge: `${suggestions.length} tips`
            }
        ];
        
        return `
            <div class="verta-accordion space-y-0">
                ${accordionItems.map((item, index) => `
                    <div class="accordion-item border-b border-gray-200 last:border-b-0" data-accordion-item="${item.id}">
                        <button class="accordion-header w-full group relative py-6 px-4 text-left hover:bg-gray-50 transition-all duration-200" 
                                onclick="toggleAccordionItem('${item.id}')" 
                                data-accordion-button="${item.id}">
                            <div class="flex items-center gap-6">
                                <!-- Number Circle -->
                                <div class="accordion-number flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-all duration-200">
                                    <span class="text-sm font-bold text-gray-600 group-hover:text-blue-600">${item.number}</span>
                                </div>
                                
                                <!-- Icon & Title -->
                                <div class="flex items-center gap-3 flex-1">
                                    <span class="text-2xl">${item.icon}</span>
                                    <h3 class="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                                        ${item.title}
                                    </h3>
                                </div>
                                
                                <!-- Badge -->
                                <div class="accordion-badge bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                                    ${item.badge}
                                </div>
                                
                                <!-- Chevron -->
                                <div class="accordion-chevron transform transition-transform duration-200">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="text-gray-400">
                                        <path d="M6 8L10 12L14 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </button>
                        
                        <div class="accordion-content overflow-hidden transition-all duration-300 ease-in-out" 
                             data-accordion-content="${item.id}" 
                             style="max-height: 0;">
                            <div class="accordion-content-inner px-4 pb-6 pl-20">
                                ${item.content}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    function formatVertaTranscript(transcript) {
        if (!transcript || transcript === 'No transcript available') {
            return '<em class="text-gray-500">No transcript available</em>';
        }
        
        // Apply VERTA professional formatting
        return transcript
            .split('\\n\\n') // Split by speaker blocks
            .map(block => {
                if (block.trim()) {
                    // Check if block starts with timestamp
                    const timestampMatch = block.match(/^\[(\d{2}:\d{2})\]\s*(.+)/);
                    if (timestampMatch) {
                        const [, timestamp, content] = timestampMatch;
                        return `<div class="mb-3">
                            <span class="text-gray-400 text-xs font-mono">[${timestamp}]</span>
                            <div class="mt-1">${formatSpeakerContent(content)}</div>
                        </div>`;
                    } else {
                        return `<div class="mb-3">${formatSpeakerContent(block)}</div>`;
                    }
                }
                return '';
            })
            .join('');
    }
    
    function formatSpeakerContent(content) {
        // Format speaker names in bold and content in quotes
        return content.replace(
            /(Speaker [A-Z]):\s*"([^"]+)"/g,
            '<strong class="text-gray-800">$1:</strong> <span class="text-gray-700">"$2"</span>'
        );
    }

    function showNotification(message, type) {
        console.log(`${type.toUpperCase()}: ${message}`);
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
});

// Accordion functionality
function toggleAccordionItem(itemId) {
    const content = document.querySelector(`[data-accordion-content="${itemId}"]`);
    const button = document.querySelector(`[data-accordion-button="${itemId}"]`);
    const chevron = button.querySelector('.accordion-chevron');
    const number = button.querySelector('.accordion-number');
    
    if (!content) return;
    
    const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
    
    // Close all other accordion items
    document.querySelectorAll('[data-accordion-content]').forEach(otherContent => {
        if (otherContent !== content) {
            otherContent.style.maxHeight = '0px';
            const otherButton = document.querySelector(`[data-accordion-button="${otherContent.dataset.accordionContent}"]`);
            const otherChevron = otherButton?.querySelector('.accordion-chevron');
            const otherNumber = otherButton?.querySelector('.accordion-number');
            
            if (otherChevron) {
                otherChevron.style.transform = 'rotate(0deg)';
            }
            if (otherNumber) {
                otherNumber.classList.remove('bg-blue-500', 'text-white');
                otherNumber.classList.add('bg-gray-100', 'text-gray-600');
            }
        }
    });
    
    // Toggle current item
    if (isOpen) {
        content.style.maxHeight = '0px';
        chevron.style.transform = 'rotate(0deg)';
        number.classList.remove('bg-blue-500', 'text-white');
        number.classList.add('bg-gray-100', 'text-gray-600');
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        chevron.style.transform = 'rotate(180deg)';
        number.classList.remove('bg-gray-100', 'text-gray-600');
        number.classList.add('bg-blue-500', 'text-white');
    }
}

// Auto-open first accordion item when results are displayed
function initializeAccordion() {
    setTimeout(() => {
        const firstItem = document.querySelector('[data-accordion-item="transcript"]');
        if (firstItem) {
            toggleAccordionItem('transcript');
        }
    }, 500);
}