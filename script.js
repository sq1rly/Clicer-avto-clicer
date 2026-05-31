let points = 0;
let clickPower = 1;
let passiveIncome = 0;

let clickUpgradeCost = 5;
let autoUpgradeCost = 20;

const clickTarget = document.getElementById('click-target');
const scoreDisplay = document.getElementById('score-val');
const cpsDisplay = document.getElementById('cps-val');

const upgradesDropdown = document.getElementById('upgrades-dropdown');
const upgradesNavBtn = document.getElementById('upgrades-nav-btn');

const buyClickBtn = document.getElementById('buy-click-upgrade');
const buyAutoBtn = document.getElementById('buy-auto-upgrade');
const clickCostDisplay = document.getElementById('click-cost');
const autoCostDisplay = document.getElementById('auto-cost');

clickTarget.addEventListener('click', () => {
    points += clickPower;
    updateUI();
});

upgradesNavBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    upgradesDropdown.classList.toggle('show');
    checkButtonsStatus();
});

document.addEventListener('click', (e) => {
    if (!upgradesDropdown.contains(e.target) && e.target !== upgradesNavBtn) {
        upgradesDropdown.classList.remove('show');
    }
});

buyClickBtn.addEventListener('click', () => {
    if (points >= clickUpgradeCost) {
        points -= clickUpgradeCost;
        clickPower += 1;
        clickUpgradeCost = Math.round(clickUpgradeCost * 1.2);
        updateUI();
        checkButtonsStatus();
    }
});

buyAutoBtn.addEventListener('click', () => {
    if (points >= autoUpgradeCost) {
        points -= autoUpgradeCost;
        passiveIncome += 1;
        autoUpgradeCost = Math.round(autoUpgradeCost * 1.2);
        updateUI();
        checkButtonsStatus();
    }
});

function updateUI() {
    scoreDisplay.textContent = points;
    cpsDisplay.textContent = passiveIncome;
    clickCostDisplay.textContent = clickUpgradeCost;
    autoCostDisplay.textContent = autoUpgradeCost;
}

function checkButtonsStatus() {
    buyClickBtn.disabled = points < clickUpgradeCost;
    buyAutoBtn.disabled = points < autoUpgradeCost;
}

setInterval(() => {
    if (passiveIncome > 0) {
        points += passiveIncome;
        updateUI();
        if (upgradesDropdown.classList.contains('show')) {
            checkButtonsStatus();
        }
    }
}, 1000);
