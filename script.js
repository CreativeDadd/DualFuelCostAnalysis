function calculateCosts() {
    const rating = document.getElementById('rating').value;
    const hours = document.getElementById('hours').value;
    const dieselPrice = document.getElementById('dieselPrice').value;
    const lpgPrice = document.getElementById('lpgPrice').value;
    const consumption = document.getElementById('consumption').value;
    const lpgPercentage = document.getElementById('lpgPercentage').value / 100;
    const dieselPercentage = document.getElementById('dieselPercentage').value / 100;
    const installationCost = document.getElementById('installationCost').value;

    const lpgToDieselFactor = 1.39;

    // Calculate hourly consumption if not provided
    let hourlyConsumption = consumption ? consumption : (rating * 0.2);

    // 100% Diesel costs
    const dieselHourlyCost = hourlyConsumption * dieselPrice;
    const dieselDailyCost = dieselHourlyCost * hours;
    const dieselWeeklyCost = dieselDailyCost * 7;
    const dieselMonthlyCost = dieselDailyCost * 30;

    // Dual fuel costs
    const dieselCost = hourlyConsumption * dieselPercentage * dieselPrice;
    const lpgLiters = hourlyConsumption * lpgPercentage;
    const lpgKg = lpgLiters / lpgToDieselFactor;
    const lpgCost = lpgKg * lpgPrice;
    const dualFuelHourlyCost = dieselCost + lpgCost;
    const dualFuelDailyCost = dualFuelHourlyCost * hours;
    const dualFuelWeeklyCost = dualFuelDailyCost * 7;
    const dualFuelMonthlyCost = dualFuelDailyCost * 30;

    // Savings
    const hourlySavings = dieselHourlyCost - dualFuelHourlyCost;
    const dailySavings = dieselDailyCost - dualFuelDailyCost;
    const weeklySavings = dieselWeeklyCost - dualFuelWeeklyCost;
    const monthlySavings = dieselMonthlyCost - dualFuelMonthlyCost;

    // Breakeven time
    const breakevenTimeHours = installationCost / hourlySavings;
    const breakevenTimeDays = breakevenTimeHours / hours;
    const breakevenTimeWeeks = breakevenTimeDays / 7;
    const breakevenTimeMonths = breakevenTimeDays / 30;

    // Format numbers with commas
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Display results
    document.getElementById('dieselHourlyCost').innerText = `Cost of using 100% Diesel hourly: ${formatNumber(dieselHourlyCost.toFixed(2))} NGN`;
    document.getElementById('dieselDailyCost').innerText = `Cost of using 100% Diesel daily: ${formatNumber(dieselDailyCost.toFixed(2))} NGN`;
    document.getElementById('dieselWeeklyCost').innerText = `Cost of using 100% Diesel weekly: ${formatNumber(dieselWeeklyCost.toFixed(2))} NGN`;
    document.getElementById('dieselMonthlyCost').innerText = `Cost of using 100% Diesel monthly: ${formatNumber(dieselMonthlyCost.toFixed(2))} NGN`;
    document.getElementById('dualFuelHourlyCost').innerText = `Cost of using LPG-Diesel Mixture hourly: ${formatNumber(dualFuelHourlyCost.toFixed(2))} NGN`;
    document.getElementById('dualFuelDailyCost').innerText = `Cost of using LPG-Diesel Mixture daily: ${formatNumber(dualFuelDailyCost.toFixed(2))} NGN`;
    document.getElementById('dualFuelWeeklyCost').innerText = `Cost of using LPG-Diesel Mixture weekly: ${formatNumber(dualFuelWeeklyCost.toFixed(2))} NGN`;
    document.getElementById('dualFuelMonthlyCost').innerText = `Cost of using LPG-Diesel Mixture monthly: ${formatNumber(dualFuelMonthlyCost.toFixed(2))} NGN`;
    document.getElementById('dualFuelHourlySavings').innerText = `Savings on Diesel by using dual fuel hourly: ${formatNumber(hourlySavings.toFixed(2))} NGN`;
    document.getElementById('dualFuelDailySavings').innerText = `Savings on Diesel by using dual fuel daily: ${formatNumber(dailySavings.toFixed(2))} NGN`;
    document.getElementById('dualFuelWeeklySavings').innerText = `Savings on Diesel by using dual fuel weekly: ${formatNumber(weeklySavings.toFixed(2))} NGN`;
    document.getElementById('dualFuelMonthlySavings').innerText = `Savings on Diesel by using dual fuel monthly: ${formatNumber(monthlySavings.toFixed(2))} NGN`;
    document.getElementById('breakevenTime').innerText = `Breakeven time: ${formatNumber(breakevenTimeDays.toFixed(2))} days`;
    document.getElementById('breakevenTimeWeeks').innerText = `Breakeven time: ${formatNumber(breakevenTimeWeeks.toFixed(2))} weeks`;
    document.getElementById('breakevenTimeMonths').innerText = `Breakeven time: ${formatNumber(breakevenTimeMonths.toFixed(2))} months`;
}

function resetForm() {
    document.getElementById('costForm').reset();
    document.getElementById('results').querySelectorAll('p').forEach(p => p.innerText = '');
}
