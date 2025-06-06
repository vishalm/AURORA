/* ========================================
   AURORA - Main JavaScript File
   Core functionality and application logic
======================================== */

class AuroraApp {
    constructor() {
        this.currentView = 'dashboard';
        this.isInitialized = false;
        this.performanceData = {};
        this.collaborationData = {};
        
        // Initialize app when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('🚀 AURORA Command Center - Initializing...');
        
        try {
            this.setupEventListeners();
            this.initializeCharts();
            this.startDataSimulation();
            this.handleResponsiveDesign();
            this.isInitialized = true;
            
            console.log('✅ AURORA Command Center - Ready!');
        } catch (error) {
            console.error('❌ AURORA Initialization Error:', error);
        }
    }

    /* ========================================
       Navigation & View Management
    ======================================== */
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.switchView(item.dataset.view);
            });
        });

        // Dashboard specific buttons
        const refreshBtn = document.getElementById('refresh-dashboard');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshDashboard();
            });
        }

        const configureBtn = document.getElementById('configure-dashboard');
        if (configureBtn) {
            configureBtn.addEventListener('click', () => {
                this.showConfiguration();
            });
        }

        // Agent page buttons
        const createAgentBtn = document.getElementById('create-new-agent');
        if (createAgentBtn) {
            createAgentBtn.addEventListener('click', () => {
                console.log('🤖 Creating new agent...');
                this.showNotification('Creating new agent...', 'info');
            });
        }

        const trainAllBtn = document.getElementById('train-all-agents');
        if (trainAllBtn) {
            trainAllBtn.addEventListener('click', () => {
                console.log('🎓 Training all agents...');
                this.showNotification('Training all agents...', 'info');
            });
        }

        // Workflow page buttons
        const createWorkflowBtn = document.getElementById('create-workflow-btn');
        if (createWorkflowBtn) {
            createWorkflowBtn.addEventListener('click', () => {
                console.log('⚡ Creating new workflow...');
                this.showNotification('Creating new workflow...', 'info');
            });
        }

        const workflowTemplatesBtn = document.getElementById('workflow-templates-btn');
        if (workflowTemplatesBtn) {
            workflowTemplatesBtn.addEventListener('click', () => {
                console.log('📋 Opening workflow templates...');
                this.showNotification('Opening workflow templates...', 'info');
            });
        }

        const workflowAnalyticsBtn = document.getElementById('workflow-analytics-btn');
        if (workflowAnalyticsBtn) {
            workflowAnalyticsBtn.addEventListener('click', () => {
                console.log('📊 Opening workflow analytics...');
                this.showNotification('Opening workflow analytics...', 'info');
            });
        }

        // Collapse/Expand functionality for agents
        this.setupAgentCollapseFunctionality();
        
        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResponsiveDesign();
        });

        // Simulation controls
        this.setupSimulationControls();
    }

    switchView(viewName) {
        if (!viewName) return;

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        const activeNav = document.querySelector(`[data-view="${viewName}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }

        // Hide all pages
        document.querySelectorAll('.page-container').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(`${viewName}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentView = viewName;
            
            // Load page-specific content
            this.loadPageContent(viewName);
        } else {
            console.warn(`Page not found: ${viewName}-page`);
        }
    }

    loadPageContent(viewName) {
        switch (viewName) {
            case 'dashboard':
                this.loadDashboardContent();
                break;
            case 'agents':
                this.loadAgentsContent();
                break;
            case 'workflows':
                this.loadWorkflowsContent();
                break;
            case 'analytics':
                this.loadAnalyticsContent();
                break;
            case 'monitoring':
                this.loadMonitoringContent();
                break;
            case 'settings':
                this.loadSettingsContent();
                break;
        }
    }

    /* ========================================
       Page Content Loaders
    ======================================== */

    loadDashboardContent() {
        this.updateKPICards();
        this.updateCollaborationMatrix();
        this.animateCharts();
        this.setupSimulationControls();
    }

    loadAgentsContent() {
        this.updateAgentCards();
        this.updateCollectiveIntelligence();
    }

    loadWorkflowsContent() {
        this.updateWorkflowStats();
        this.updateWorkflowGrid();
    }

    loadAnalyticsContent() {
        console.log('📊 Loading analytics content...');
    }

    loadMonitoringContent() {
        console.log('📡 Loading monitoring content...');
    }

    loadSettingsContent() {
        console.log('⚙️ Loading settings content...');
    }

    /* ========================================
       Agent Functionality
    ======================================== */

    setupAgentCollapseFunctionality() {
        // Individual collapse buttons
        document.querySelectorAll('.collapse-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const agentId = btn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                if (agentId) {
                    this.toggleAgentCard(agentId);
                }
            });
        });

        // Collapse/Expand all buttons
        const collapseAllBtn = document.getElementById('collapse-all-agents');
        if (collapseAllBtn) {
            collapseAllBtn.addEventListener('click', () => {
                this.collapseAllAgents();
            });
        }

        const expandAllBtn = document.getElementById('expand-all-agents');
        if (expandAllBtn) {
            expandAllBtn.addEventListener('click', () => {
                this.expandAllAgents();
            });
        }
    }

    toggleAgentCard(agentId) {
        const content = document.querySelector(`#${agentId}-card .agent-detail-content`);
        const button = document.querySelector(`#${agentId}-card .collapse-btn`);
        
        if (content && button) {
            content.classList.toggle('collapsed');
            button.classList.toggle('collapsed');
        }
    }

    collapseAllAgents() {
        document.querySelectorAll('.agent-detail-content').forEach(content => {
            content.classList.add('collapsed');
        });
        document.querySelectorAll('.collapse-btn').forEach(btn => {
            btn.classList.add('collapsed');
        });
        this.showNotification('All agent cards collapsed', 'success');
    }

    expandAllAgents() {
        document.querySelectorAll('.agent-detail-content').forEach(content => {
            content.classList.remove('collapsed');
        });
        document.querySelectorAll('.collapse-btn').forEach(btn => {
            btn.classList.remove('collapsed');
        });
        this.showNotification('All agent cards expanded', 'success');
    }

    /* ========================================
       Data Updates and Simulations
    ======================================== */

    updateKPICards() {
        const kpiData = {
            'total-spend': { value: '$2.3M', trend: '+12.5%', positive: true },
            'cost-savings': { value: '$847K', trend: '+18.3%', positive: true },
            'active-suppliers': { value: '1,247', trend: '+5.2%', positive: true },
            'ai-accuracy': { value: '97.8%', trend: '+2.1%', positive: true }
        };

        Object.entries(kpiData).forEach(([id, data]) => {
            const card = document.getElementById(id);
            if (card) {
                const valueEl = card.querySelector('.kpi-value');
                const trendEl = card.querySelector('.kpi-trend');
                
                if (valueEl) valueEl.textContent = data.value;
                if (trendEl) {
                    trendEl.textContent = data.trend;
                    trendEl.className = `kpi-trend ${data.positive ? 'positive' : 'negative'}`;
                }
            }
        });
    }

    updateCollaborationMatrix() {
        // Update collaboration percentages
        const collabData = {
            'aria-alex': 89,
            'alex-apollo': 94,
            'apollo-atlas': 87,
            'atlas-archer': 92,
            'archer-aria': 85
        };

        Object.entries(collabData).forEach(([id, percentage]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = `${percentage}%`;
            }
        });
    }

    updateAgentCards() {
        // Update agent metrics with real-time data
        const agentMetrics = {
            aria: { processed: 1847, accuracy: 94.7, savings: 2.1, response: 0.8 },
            alex: { processed: 2847, accuracy: 96.8, savings: 14.2, response: 1.4 },
            apollo: { processed: 3521, accuracy: 98.2, savings: 5.7, response: 1.2 },
            atlas: { processed: 1923, accuracy: 96.5, savings: 3.8, response: 2.1 },
            archer: { processed: 2156, accuracy: 99.1, savings: 8.3, response: 0.9 }
        };

        Object.entries(agentMetrics).forEach(([agent, metrics]) => {
            this.updateAgentMetrics(agent, metrics);
        });
    }

    updateAgentMetrics(agentId, metrics) {
        const card = document.querySelector(`#${agentId}-card`);
        if (!card) return;

        // Update metrics if they exist
        const metricCards = card.querySelectorAll('.metric-card');
        if (metricCards.length >= 4) {
            metricCards[0].querySelector('.metric-value').textContent = metrics.processed.toLocaleString();
            metricCards[1].querySelector('.metric-value').textContent = `${metrics.accuracy}%`;
            metricCards[2].querySelector('.metric-value').textContent = `$${metrics.savings}M`;
            metricCards[3].querySelector('.metric-value').textContent = `${metrics.response}s`;
        }
    }

    updateCollectiveIntelligence() {
        // Update neural network load indicators
        const loadData = {
            'aria-node': 78,
            'alex-node': 85,
            'apollo-node': 92,
            'atlas-node': 67,
            'archer-node': 73
        };

        Object.entries(loadData).forEach(([nodeId, load]) => {
            const node = document.getElementById(nodeId);
            if (node) {
                const loadBar = node.querySelector('.load-bar');
                if (loadBar) {
                    loadBar.style.width = `${load}%`;
                }
            }
        });
    }

    updateWorkflowStats() {
        // Update workflow statistics
        console.log('🔄 Updating workflow statistics...');
    }

    updateWorkflowGrid() {
        // Update workflow cards
        console.log('🔄 Updating workflow grid...');
    }

    /* ========================================
       Utility Functions
    ======================================== */

    startDataSimulation() {
        // Simulate real-time data updates
        setInterval(() => {
            if (this.currentView === 'dashboard') {
                this.updateKPICards();
                this.updateCollaborationMatrix();
            } else if (this.currentView === 'agents') {
                this.updateAgentCards();
                this.updateCollectiveIntelligence();
            }
        }, 30000); // Update every 30 seconds
    }

    initializeCharts() {
        // Initialize any chart libraries here
        console.log('📊 Initializing charts...');
    }

    animateCharts() {
        // Animate chart elements
        console.log('🎬 Animating charts...');
    }

    refreshDashboard() {
        console.log('🔄 Refreshing dashboard...');
        this.updateKPICards();
        this.updateCollaborationMatrix();
        this.showNotification('Dashboard refreshed successfully', 'success');
    }

    showConfiguration() {
        console.log('⚙️ Opening configuration...');
        this.showNotification('Configuration panel opened', 'info');
    }

    showNotification(message, type = 'info') {
        // Create and show notification
        console.log(`${type.toUpperCase()}: ${message}`);
        
        // You can enhance this to show actual toast notifications
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    /* ========================================
       Responsive Design
    ======================================== */

    handleResponsiveDesign() {
        const isMobile = this.isMobileDevice();
        const isTablet = this.isTabletDevice();
        
        if (isMobile) {
            this.optimizeForMobile();
        } else if (isTablet) {
            this.optimizeForTablet();
        } else {
            this.optimizeForDesktop();
        }
    }

    isMobileDevice() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    isTabletDevice() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }

    optimizeForMobile() {
        // Hide sidebar on mobile
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.style.display = 'none';
        
        console.log('📱 Optimized for mobile');
    }

    optimizeForTablet() {
        console.log('📱 Optimized for tablet');
    }

    optimizeForDesktop() {
        // Show sidebar on desktop
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.style.display = 'block';
        
        console.log('🖥️ Optimized for desktop');
    }

    setupSimulationControls() {
        // Only run if dashboard is active
        const isDashboard = document.getElementById('dashboard-page');
        if (!isDashboard) return;

        const workflowCanvas = document.getElementById('workflow-canvas');
        let simulationType = 'new-supplier'; // Default

        // Remove previous listeners by replacing buttons with clones
        const newSupplierBtn = document.getElementById('new-supplier-sim');
        const emergencyBtn = document.getElementById('emergency-procurement-sim');
        const startBtn = document.getElementById('start-simulation');
        if (newSupplierBtn) {
            const clone = newSupplierBtn.cloneNode(true);
            newSupplierBtn.parentNode.replaceChild(clone, newSupplierBtn);
        }
        if (emergencyBtn) {
            const clone = emergencyBtn.cloneNode(true);
            emergencyBtn.parentNode.replaceChild(clone, emergencyBtn);
        }
        if (startBtn) {
            const clone = startBtn.cloneNode(true);
            startBtn.parentNode.replaceChild(clone, startBtn);
        }
        // Re-select after replacement
        const newSupplierBtn2 = document.getElementById('new-supplier-sim');
        const emergencyBtn2 = document.getElementById('emergency-procurement-sim');
        const startBtn2 = document.getElementById('start-simulation');
        const scenarioBtns = [newSupplierBtn2, emergencyBtn2];

        // Scenario selection logic
        function selectScenario(scenario) {
            simulationType = scenario;
            scenarioBtns.forEach(btn => {
                if (btn) {
                    if (btn.getAttribute('data-scenario') === scenario) {
                        btn.classList.add('scenario-selected');
                    } else {
                        btn.classList.remove('scenario-selected');
                    }
                }
            });
            // Show only the relevant scenario
            document.querySelectorAll('.workflow-scenario').forEach(s => {
                if (s.getAttribute('data-scenario') === scenario) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        }

        if (newSupplierBtn2) {
            newSupplierBtn2.addEventListener('click', () => {
                selectScenario('new-supplier');
                this.showNotification('New Supplier Onboarding scenario selected', 'info');
            });
        }
        if (emergencyBtn2) {
            emergencyBtn2.addEventListener('click', () => {
                selectScenario('emergency');
                this.showNotification('Emergency Procurement scenario selected', 'info');
            });
        }
        // Default selection
        selectScenario(simulationType);

        if (startBtn2) {
            startBtn2.addEventListener('click', async () => {
                // If horizontal workflow is present, animate it
                const horizontalRow = document.querySelector('.workflow-horizontal-row');
                if (horizontalRow) {
                    let steps = Array.from(horizontalRow.querySelectorAll('.workflow-step'));
                    for (let i = 0; i < steps.length; i++) {
                        steps.forEach((s, idx) => {
                            s.classList.remove('active', 'completed');
                            // Reset timer display
                            const timing = s.querySelector('.step-timing div');
                            if (timing) {
                                const duration = parseFloat(s.getAttribute('data-timing')) || 0.7;
                                timing.textContent = duration.toFixed(1) + 's';
                            }
                        });
                        steps[i].classList.add('active');
                        // Animate timer
                        const timing = steps[i].querySelector('.step-timing div');
                        const duration = parseFloat(steps[i].getAttribute('data-timing')) || 0.7;
                        if (timing) {
                            await this.animateTiming(timing, duration);
                        } else {
                            await new Promise(res => setTimeout(res, duration * 1000));
                        }
                        steps[i].classList.remove('active');
                        steps[i].classList.add('completed');
                    }
                    this.showNotification('Workflow simulation completed!', 'success');
                    return;
                }
                // Fallback to old scenario logic
                const scenarioDiv = document.querySelector('.workflow-scenario.active');
                if (!scenarioDiv) return;
                let steps = Array.from(scenarioDiv.querySelectorAll('.workflow-step'));
                let arrows = Array.from(scenarioDiv.querySelectorAll('.workflow-arrow'));
                this.resetWorkflowSteps(steps, arrows);
                await this.runWorkflowSimulation(steps, arrows);
            });
        }
    }

    resetWorkflowSteps(steps, arrows) {
        steps.forEach(step => {
            step.classList.remove('active', 'completed');
            const timing = step.querySelector('.step-timing div');
            if (timing) timing.textContent = step.getAttribute('data-timing') + 's';
        });
        if (arrows) arrows.forEach(arrow => arrow.classList.remove('active'));
    }

    async runWorkflowSimulation(steps, arrows) {
        for (let i = 0; i < steps.length; i++) {
            steps[i].classList.add('active');
            // Animate timing count up
            const timing = steps[i].querySelector('.step-timing div');
            const duration = parseFloat(steps[i].getAttribute('data-timing')) || 1;
            if (timing) {
                await this.animateTiming(timing, duration);
            } else {
                await new Promise(res => setTimeout(res, duration * 1000));
            }
            steps[i].classList.add('completed');
            steps[i].classList.remove('active');
            if (arrows && arrows[i]) arrows[i].classList.add('active');
        }
        this.showNotification('Workflow simulation completed!', 'success');
    }

    async animateTiming(timingEl, duration) {
        let elapsed = 0;
        const interval = 30;
        return new Promise(res => {
            const timer = setInterval(() => {
                elapsed += interval;
                const sec = Math.min(duration, (elapsed / 1000)).toFixed(1);
                timingEl.textContent = sec + 's';
                if (elapsed >= duration * 1000) {
                    clearInterval(timer);
                    timingEl.textContent = duration + 's';
                    res();
                }
            }, interval);
        });
    }
}

/* ========================================
   Global Functions (for backward compatibility)
======================================== */

// Global functions that might be called from HTML
window.toggleAgentCard = function(agentId) {
    if (window.auroraApp) {
        window.auroraApp.toggleAgentCard(agentId);
    }
};

window.collapseAllAgents = function() {
    if (window.auroraApp) {
        window.auroraApp.collapseAllAgents();
    }
};

window.expandAllAgents = function() {
    if (window.auroraApp) {
        window.auroraApp.expandAllAgents();
    }
};

// Workflow functions
window.viewWorkflow = function(workflowId) {
    console.log(`👁️ Viewing workflow: ${workflowId}`);
};

window.editWorkflow = function(workflowId) {
    console.log(`✏️ Editing workflow: ${workflowId}`);
};

window.runWorkflow = function(workflowId) {
    console.log(`▶️ Running workflow: ${workflowId}`);
};

/* ========================================
   Application Initialization
======================================== */

// Initialize the application
window.auroraApp = new AuroraApp(); 