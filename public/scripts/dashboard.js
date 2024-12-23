document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inputForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Collect user input in the correct order
        const userInput = [
            parseFloat(document.getElementById('reading_speed').value),
            parseFloat(document.getElementById('task_difficulty').value),
            parseFloat(document.getElementById('reading_comprehension').value),
            parseFloat(document.getElementById('engagement_level').value),
            parseFloat(document.getElementById('error_rate').value),
            parseFloat(document.getElementById('task_completion_time').value),
            parseFloat(document.getElementById('mood_engagement_score').value),
            parseFloat(document.getElementById('success_rate').value),
        ];

        console.log('User Input:', userInput);

        // Validate all inputs
        if (userInput.some(isNaN)) {
            alert('Please fill out all fields with valid numbers.');
            return;
        }

        // Fetch predictions
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ features: userInput }), // Send as an array
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Response Data:', data);
                if (data.error) {
                    alert(`Error: ${data.error}`);
                    return;
                }
                renderPerformanceChart(data.probabilities[0]);
            })
            .catch((error) => console.error('Error fetching predictions:', error));
    });
});

function renderPerformanceChart(probabilities) {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    // Render the bar chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Class 1 (Dyslexic)', 'Class 2 (Non-Dyslexic)'], // Add meaningful labels
            datasets: [{
                label: 'Class Probabilities',
                data: probabilities,
                backgroundColor: ['#6366f1', '#f97316'], // Customize colors
            }],
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true },
            },
        },
    });

    // Add description below the chart
    const descriptionContainer = document.getElementById('chart-description');
    descriptionContainer.innerHTML = `
        <p><strong>Class 1:</strong> Dyslexic - ${Math.round(probabilities[0] * 100)}%</p>
        <p><strong>Class 2:</strong> Non-Dyslexic - ${Math.round(probabilities[1] * 100)}%</p>
    `;
}
