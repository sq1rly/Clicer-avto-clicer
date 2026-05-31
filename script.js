let points = 0;
let clickPower = 1;
let passiveIncome = 0;

let clickUpgradeCost = 5;
let autoUpgradeCost = 20;


let totalClicks = 0;
let totalEarned = 0;
let totalUpgrades = 0;
let timePlayed = 0;


const clickTarget = document.getElementById('click-target');
const scoreDisplay = document.getElementById('score-val');
const cpsDisplay = document.getElementById('cps-val');


const upgradesDropdown = document.getElementById('upgrades-dropdown');
const upgradesNavBtn = document.getElementById('upgrades-nav-btn');
const buyClickBtn = document.getElementById('buy-click-upgrade');
const buyAutoBtn = document.getElementById('buy-auto-upgrade');
const clickCostDisplay = document.getElementById('click-cost');
const autoCostDisplay = document.getElementById('auto-cost');


const statsNavBtn = document.getElementById('stats-nav-btn');
const statsModal = document.getElementById('stats-modal');
const closeStatsBtn = document.getElementById('close-stats-btn');
const statTotalClicks = document.getElementById('stat-total-clicks');
const statTotalEarned = document.getElementById('stat-total-earned');
const statTotalUpgrades = document.getElementById('stat-total-upgrades');
const statTimePlayed = document.getElementById('stat-time-played');


clickTarget.addEventListener('click', () => {
    points += clickPower;
    totalClicks++;
    totalEarned += clickPower;
    updateUI();
});


upgradesNavBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    upgradesDropdown.classList.toggle('show');
    checkButtonsStatus();
});


statsNavBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    statsModal.style.display = 'flex';
});


closeStatsBtn.addEventListener('click', () => {
    statsModal.style.display = 'none';
});


document.addEventListener('click', (e) => {
    
    if (!upgradesDropdown.contains(e.target) && !upgradesNavBtn.contains(e.target)) {
        upgradesDropdown.classList.remove('show');
    }
    
    if (e.target === statsModal) {
        statsModal.style.display = 'none';
    }
});


buyClickBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (points >= clickUpgradeCost) {
        points -= clickUpgradeCost;
        clickPower += 1;
        clickUpgradeCost = Math.round(clickUpgradeCost * 1.2);
        totalUpgrades++;
        updateUI();
        checkButtonsStatus();
    }
});


buyAutoBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (points >= autoUpgradeCost) {
        points -= autoUpgradeCost;
        passiveIncome += 1;
        autoUpgradeCost = Math.round(autoUpgradeCost * 1.2);
        totalUpgrades++;
        updateUI();
        checkButtonsStatus();
    }
});


function updateUI() {
    scoreDisplay.textContent = points;
    cpsDisplay.textContent = passiveIncome;
    clickCostDisplay.textContent = clickUpgradeCost;
    autoCostDisplay.textContent = autoUpgradeCost;
    
    
    if (statTotalClicks) statTotalClicks.textContent = totalClicks;
    if (statTotalEarned) statTotalEarned.textContent = totalEarned;
    if (statTotalUpgrades) statTotalUpgrades.textContent = totalUpgrades;
}


function checkButtonsStatus() {
    buyClickBtn.disabled = points < clickUpgradeCost;
    buyAutoBtn.disabled = points < autoUpgradeCost;
}


setInterval(() => {
    timePlayed++;
    if (statTimePlayed) statTimePlayed.textContent = timePlayed + ' сек.';

    if (passiveIncome > 0) {
        points += passiveIncome;
        totalEarned += passiveIncome;
        updateUI();
        if (upgradesDropdown.classList.contains('show')) {
            checkButtonsStatus();
        }
    }
}, 1000);
