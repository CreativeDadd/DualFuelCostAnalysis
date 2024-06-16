document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('costForm').addEventListener('submit', function (event) {
        event.preventDefault();
        calculateCosts();
    });
});

function login() {
    const password = document.getElementById('password').value;
    if (password === 'keslogbinX-45') {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('appForm').style.display = 'block';
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function calculateCosts() {
    const rating = parseFloat(document.getElementById('rating').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const dieselPrice = parseFloat(document.getElementById('dieselPrice').value);
    const lpgPrice = parseFloat(document.getElementById('lpgPrice').value);
    const consumption = parseFloat(document.getElementById('consumption').value) || rating * 0.2;
    const lpgPercentage = parseFloat(document.getElementById('lpgPercentage').value) / 100;
    const dieselPercentage = parseFloat(document.getElementById('dieselPercentage').value) / 100;
    const installationCost = parseFloat(document.getElementById('installationCost').value);

    // Diesel only costs
    const dieselHourlyCost = consumption * dieselPrice;
    const dieselDailyCost = dieselHourlyCost * hours;
    const dieselWeeklyCost = dieselDailyCost * 7;
    const dieselMonthlyCost = dieselDailyCost * 30;

    // Dual fuel costs
    const dualFuelHourlyCost = (consumption * lpgPercentage * lpgPrice) + (consumption * dieselPercentage * dieselPrice);
    const dualFuelDailyCost = dualFuelHourlyCost * hours;
    const dualFuelWeeklyCost = dualFuelDailyCost * 7;
    const dualFuelMonthlyCost = dualFuelDailyCost * 30;

    // Savings
    const dualFuelHourlySavings = dieselHourlyCost - dualFuelHourlyCost;
    const dualFuelDailySavings = dieselDailyCost - dualFuelDailyCost;
    const dualFuelWeeklySavings = dieselWeeklyCost - dualFuelWeeklyCost;
    const dualFuelMonthlySavings = dieselMonthlyCost - dualFuelMonthlyCost;

    // Breakeven time
    const breakevenTime = installationCost / dualFuelMonthlySavings;
    const breakevenTimeWeeks = breakevenTime * 4.345;  // Approximate weeks in a month

    // Update results
    document.getElementById('dieselHourlyCost').innerText = `Diesel Hourly Cost: ₦${dieselHourlyCost.toLocaleString()}`;
    document.getElementById('dualFuelHourlyCost').innerText = `Dual Fuel Hourly Cost: ₦${dualFuelHourlyCost.toLocaleString()}`;
    document.getElementById('dualFuelHourlySavings').innerText = `Hourly Savings: ₦${dualFuelHourlySavings.toLocaleString()}`;

    document.getElementById('dieselDailyCost').innerText = `Diesel Daily Cost: ₦${dieselDailyCost.toLocaleString()}`;
    document.getElementById('dualFuelDailyCost').innerText = `Dual Fuel Daily Cost: ₦${dualFuelDailyCost.toLocaleString()}`;
    document.getElementById('dualFuelDailySavings').innerText = `Daily Savings: ₦${dualFuelDailySavings.toLocaleString()}`;

    document.getElementById('dieselWeeklyCost').innerText = `Diesel Weekly Cost: ₦${dieselWeeklyCost.toLocaleString()}`;
    document.getElementById('dualFuelWeeklyCost').innerText = `Dual Fuel Weekly Cost: ₦${dualFuelWeeklyCost.toLocaleString()}`;
    document.getElementById('dualFuelWeeklySavings').innerText = `Weekly Savings: ₦${dualFuelWeeklySavings.toLocaleString()}`;

    document.getElementById('dieselMonthlyCost').innerText = `Diesel Monthly Cost: ₦${dieselMonthlyCost.toLocaleString()}`;
    document.getElementById('dualFuelMonthlyCost').innerText = `Dual Fuel Monthly Cost: ₦${dualFuelMonthlyCost.toLocaleString()}`;
    document.getElementById('dualFuelMonthlySavings').innerText = `Monthly Savings: ₦${dualFuelMonthlySavings.toLocaleString()}`;

    document.getElementById('breakevenTime').innerText = `Breakeven Time: ${breakevenTime.toFixed(2)} months`;
    document.getElementById('breakevenTimeWeeks').innerText = `Breakeven Time in Weeks: ${breakevenTimeWeeks.toFixed(2)} weeks`;
}

function resetForm() {
    document.getElementById('costForm').reset();
    const results = document.getElementById('results');
    results.querySelectorAll('p').forEach(p => p.innerText = '');
}
