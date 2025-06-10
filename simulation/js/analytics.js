// Analytics Charts Implementation
class AnalyticsCharts {
    constructor() {
        this.charts = {};
        this.initialized = false;
        this.colors = {
            primary: '#60a5fa',
            success: '#22c55e',
            warning: '#f59e0b',
            danger: '#ef4444',
            purple: '#8b5cf6',
            indigo: '#6366f1',
            pink: '#ec4899',
            teal: '#14b8a6'
        };
    }

    init() {
        if (this.initialized) return;
        
        // Initialize all charts when analytics page is loaded
        setTimeout(() => {
            this.initSpendAnalysisChart();
            this.initCategoryPieChart();
            this.initSavingsTrendsChart();
            this.initContractTimelineChart();
            this.initKPITrendCharts();
            this.initialized = true;
        }, 300);
    }

    // Spend Analysis Overview Chart
    initSpendAnalysisChart() {
        const ctx = document.getElementById('spend-analysis-chart');
        if (!ctx) return;

        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'IT Hardware',
                    data: [12.5, 15.2, 18.7, 22.1, 19.8, 24.3],
                    backgroundColor: 'rgba(96, 165, 250, 0.8)',
                    borderColor: '#60a5fa',
                    borderWidth: 2
                },
                {
                    label: 'Software',
                    data: [8.3, 9.1, 11.4, 13.2, 12.7, 15.8],
                    backgroundColor: 'rgba(34, 197, 94, 0.8)',
                    borderColor: '#22c55e',
                    borderWidth: 2
                },
                {
                    label: 'Professional Services',
                    data: [6.2, 7.8, 8.9, 9.5, 10.2, 11.7],
                    backgroundColor: 'rgba(139, 92, 246, 0.8)',
                    borderColor: '#8b5cf6',
                    borderWidth: 2
                },
                {
                    label: 'Facilities',
                    data: [4.1, 4.5, 5.2, 5.8, 6.1, 6.9],
                    backgroundColor: 'rgba(245, 158, 11, 0.8)',
                    borderColor: '#f59e0b',
                    borderWidth: 2
                }
            ]
        };

        this.charts.spendAnalysis = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#f1f5f9',
                            font: { size: 12 }
                        }
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(148, 163, 184, 0.1)' }
                    },
                    y: {
                        ticks: { 
                            color: '#94a3b8',
                            callback: function(value) {
                                return '$' + value + 'M';
                            }
                        },
                        grid: { color: 'rgba(148, 163, 184, 0.1)' }
                    }
                },
                animation: {
                    duration: 2000
                }
            }
        });

        // Hide placeholder
        const placeholder = ctx.nextElementSibling;
        if (placeholder && placeholder.classList.contains('chart-placeholder')) {
            placeholder.style.display = 'none';
        }
    }

    // Category Pie Chart
    initCategoryPieChart() {
        const ctx = document.getElementById('category-pie-chart');
        if (!ctx) return;

        const data = {
            labels: ['IT Hardware', 'Software', 'Professional Services', 'Facilities', 'Office Supplies'],
            datasets: [{
                data: [34.2, 28.7, 18.5, 12.4, 6.2],
                backgroundColor: [
                    '#60a5fa',
                    '#22c55e',
                    '#8b5cf6',
                    '#f59e0b',
                    '#ef4444'
                ],
                borderColor: '#1e293b',
                borderWidth: 2
            }]
        };

        this.charts.categoryPie = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#f1f5f9',
                            font: { size: 11 },
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': $' + context.parsed + 'M (' + 
                                       Math.round(context.parsed / 100 * 100) + '%)';
                            }
                        }
                    }
                },
                cutout: '60%',
                animation: { duration: 2000 }
            }
        });

        // Hide placeholder
        const placeholder = ctx.nextElementSibling;
        if (placeholder && placeholder.classList.contains('chart-placeholder')) {
            placeholder.style.display = 'none';
        }
    }

    // Cost Savings Trends Chart
    initSavingsTrendsChart() {
        const ctx = document.getElementById('savings-trends-chart');
        if (!ctx) return;

        const data = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Savings Achieved',
                    data: [2.1, 3.8, 5.2, 4.7],
                    fill: true,
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    borderColor: '#22c55e',
                    borderWidth: 3,
                    tension: 0.4,
                    pointBackgroundColor: '#22c55e',
                    pointBorderColor: '#1e293b',
                    pointBorderWidth: 2,
                    pointRadius: 6
                },
                {
                    label: 'Target Savings',
                    data: [2.5, 3.0, 4.5, 5.0],
                    fill: false,
                    borderColor: '#94a3b8',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointBackgroundColor: '#94a3b8',
                    pointBorderColor: '#1e293b',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }
            ]
        };

        this.charts.savingsTrends = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#f1f5f9',
                            font: { size: 12 },
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(148, 163, 184, 0.1)' }
                    },
                    y: {
                        ticks: { 
                            color: '#94a3b8',
                            callback: function(value) {
                                return '$' + value + 'M';
                            }
                        },
                        grid: { color: 'rgba(148, 163, 184, 0.1)' }
                    }
                },
                animation: { duration: 2000 }
            }
        });

        // Hide placeholder
        const placeholder = ctx.nextElementSibling;
        if (placeholder && placeholder.classList.contains('chart-placeholder')) {
            placeholder.style.display = 'none';
        }
    }

    // Contract Timeline Chart
    initContractTimelineChart() {
        const ctx = document.getElementById('contract-timeline-chart');
        if (!ctx) return;

        const data = {
            labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
            datasets: [
                {
                    label: 'New Contracts',
                    data: [89, 156, 134, 112, 98, 187],
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: '#3b82f6',
                    borderWidth: 1
                },
                {
                    label: 'Renewed Contracts',
                    data: [45, 89, 67, 78, 56, 123],
                    backgroundColor: 'rgba(34, 197, 94, 0.8)',
                    borderColor: '#22c55e',
                    borderWidth: 1
                },
                {
                    label: 'Expired Contracts',
                    data: [23, 34, 29, 31, 28, 42],
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    borderColor: '#ef4444',
                    borderWidth: 1
                }
            ]
        };

        this.charts.contractTimeline = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#f1f5f9',
                            font: { size: 11 }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(148, 163, 184, 0.1)' }
                    },
                    y: {
                        stacked: true,
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(148, 163, 184, 0.1)' }
                    }
                },
                animation: { duration: 2000 }
            }
        });

        // Hide placeholder
        const placeholder = ctx.nextElementSibling;
        if (placeholder && placeholder.classList.contains('chart-placeholder')) {
            placeholder.style.display = 'none';
        }
    }

    // KPI Trend Charts (Small charts in cards)
    initKPITrendCharts() {
        this.initMiniChart('savings-trend-chart', [2.1, 2.8, 3.2, 3.9, 4.7], '#22c55e');
        this.initMiniChart('spend-trend-chart', [45.2, 47.8, 51.3, 49.7, 52.4], '#3b82f6');
        this.initMiniChart('suppliers-trend-chart', [2234, 2387, 2456, 2723, 2847], '#8b5cf6');
        this.initMiniChart('cycle-trend-chart', [7.2, 5.8, 4.1, 3.2, 2.3], '#f59e0b');
    }

    initMiniChart(canvasId, data, color) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const chartData = {
            labels: ['', '', '', '', ''],
            datasets: [{
                data: data,
                borderColor: color,
                backgroundColor: color + '20',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4
            }]
        };

        new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                elements: {
                    point: { radius: 0 }
                },
                animation: { duration: 1500 }
            }
        });
    }

    // Update charts with new data (for dynamic updates)
    updateCharts() {
        // This method can be called to update charts with new data
        // Implementation would depend on your data source
    }

    // Destroy all charts (cleanup)
    destroyCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }
}

// Initialize analytics when the page loads
window.analyticsCharts = new AnalyticsCharts();

// Auto-initialize when analytics page becomes active
document.addEventListener('DOMContentLoaded', function() {
    // Observer to detect when analytics page becomes visible
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const analyticsPage = document.getElementById('analytics-page');
                if (analyticsPage && analyticsPage.parentElement.classList.contains('active')) {
                    setTimeout(() => {
                        window.analyticsCharts.init();
                    }, 200);
                }
            }
        });
    });

    // Start observing
    const analyticsContainer = document.getElementById('analytics-page');
    if (analyticsContainer) {
        observer.observe(analyticsContainer.parentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
});

// Utility functions for analytics interactions
function drillDown(category) {
    console.log(`Drilling down into ${category} analytics...`);
    // Implementation for drill-down functionality
}

function viewContractDetails() {
    console.log('Viewing contract details...');
    // Implementation for contract details view
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsCharts;
} 