document.addEventListener('DOMContentLoaded', () => {
    // Points Distribution Chart
    const distributionCtx = document.getElementById('distributionChart').getContext('2d');
    new Chart(distributionCtx, {
        type: 'pie',
        data: {
            labels: ['Points Gained', 'Levels Gained', 'Awards'],
            datasets: [{
                data: [817, 10, 4], // Example data
                backgroundColor: ['#6366f1', '#f97316', '#10b981'],
            }],
        },
        options: {
            responsive: true,
        },
    });

    // Progress Over Time Chart
    const progressCtx = document.getElementById('progressChart').getContext('2d');
    new Chart(progressCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [{
                label: 'Progress Over Time',
                data: [50, 100, 200, 400, 817], // Example data
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                fill: true,
            }],
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true },
            },
        },
    });
});
