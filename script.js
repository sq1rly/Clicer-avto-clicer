let points = 0;
let clickPower = 1;
let passiveIncome = 0;

let clickUpgradeCost = 5;
let autoUpgradeCost = 20;

let totalClicks = 0;
let totalEarned = 0;
let totalUpgrades = 0;
let timePlayed = 0;

// Игровые элементы
const clickTarget = document.getElementById('click-target');
const scoreDisplay = document.getElementById('score-val');
const cpsDisplay = document.getElementById('cps-val');

// Элементы апгрейдов
const upgradesDropdown = document.getElementById('upgrades-dropdown');
const upgradesNavBtn = document.getElementById('upgrades-nav-btn');
const buyClickBtn = document.getElementById('buy-click-upgrade');
const buyAutoBtn = document.getElementById('buy-auto-upgrade');
const clickCostDisplay = document.getElementById('click-cost');
const autoCostDisplay = document.getElementById('auto-cost');

// Элементы статистики
const statsNavBtn = document.getElementById('stats-nav-btn');
const statsModal = document.getElementById('stats-modal');
const closeStatsBtn = document.getElementById('close-stats-btn');
const statTotalClicks = document.getElementById('stat-total-clicks');
const statTotalEarned = document.getElementById('stat-total-earned');
const statTotalUpgrades = document.getElementById('stat-total-upgrades');
const statTimePlayed = document.getElementById('stat-time-played');

// Элементы наград
const rewardsNavBtn = document.getElementById('rewards-nav-btn');
const rewardsModal = document.getElementById('rewards-modal');
const closeRewardsBtn = document.getElementById('close-rewards-btn');

// Клик по главной кнопке (Звезде)
clickTarget.addEventListener('click', () => {
    points += clickPower;
    totalClicks++;
    totalEarned += clickPower;
    updateUI();
    checkButtonsStatus();
    checkRewards(); // Проверяем награды при клике
});

// Открытие/закрытие выпадающего меню апгрейдов
upgradesNavBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    upgradesDropdown.classList.toggle('show');
    checkButtonsStatus();
});

// Открытие модального окна статистики
statsNavBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    statsModal.classList.add('show-modal');
});

// Закрытие модального окна статистики через крестик
closeStatsBtn.addEventListener('click', () => {
    statsModal.classList.remove('show-modal');
});

// Открытие модального окна наград
rewardsNavBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    rewardsModal.classList.add('show-modal');
});

// Закрытие модального окна наград через крестик
closeRewardsBtn.addEventListener('click', () => {
    rewardsModal.classList.remove('show-modal');
});

// Закрытие окон при клике по пустой области экрана
document.addEventListener('click', (e) => {
    if (!upgradesDropdown.contains(e.target) && !upgradesNavBtn.contains(e.target)) {
        upgradesDropdown.classList.remove('show');
    }
    if (e.target === statsModal) {
        statsModal.classList.remove('show-modal');
    }
    if (e.target === rewardsModal) {
        rewardsModal.classList.remove('show-modal');
    }
});

// Покупка силы клика
buyClickBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (points >= clickUpgradeCost) {
        points -= clickUpgradeCost;
        clickPower += 1;
        clickUpgradeCost = Math.round(clickUpgradeCost * 1.2);
        totalUpgrades++;
        updateUI();
        checkButtonsStatus();
        checkRewards(); // Проверяем награды при покупке
    }
});

// Покупка автокликера
buyAutoBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (points >= autoUpgradeCost) {
        points -= autoUpgradeCost;
        passiveIncome += 1;
        autoUpgradeCost = Math.round(autoUpgradeCost * 1.2);
        totalUpgrades++;
        updateUI();
        checkButtonsStatus();
        checkRewards(); // Проверяем награды при покупке
    }
});

// Функция обновления текста интерфейса
function updateUI() {
    scoreDisplay.textContent = points;
    cpsDisplay.textContent = passiveIncome;
    clickCostDisplay.textContent = clickUpgradeCost;
    autoCostDisplay.textContent = autoUpgradeCost;
    
    if (statTotalClicks) statTotalClicks.textContent = totalClicks;
    if (statTotalEarned) statTotalEarned.textContent = totalEarned;
    if (statTotalUpgrades) statTotalUpgrades.textContent = totalUpgrades;
}

// Функция блокировки кнопок, если не хватает очков
function checkButtonsStatus() {
    buyClickBtn.disabled = points < clickUpgradeCost;
    buyAutoBtn.disabled = points < autoUpgradeCost;
}

// Функция динамической проверки и открытия наград
function checkRewards() {
    // 1. Награда за клики (50 кликов)
    const rewardClicksEl = document.getElementById('reward-clicks');
    if (rewardClicksEl && totalClicks >= 50) {
        rewardClicksEl.classList.remove('locked');
        rewardClicksEl.classList.add('unlocked');
    }

    // 2. Награда за очки (500 очков всего)
    const rewardPointsEl = document.getElementById('reward-points');
    if (rewardPointsEl && totalEarned >= 500) {
        rewardPointsEl.classList.remove('locked');
        rewardPointsEl.classList.add('unlocked');
    }

    // 3. Награда за апгрейды (10 штук)
    const rewardUpgradesEl = document.getElementById('reward-upgrades');
    if (rewardUpgradesEl && totalUpgrades >= 10) {
        rewardUpgradesEl.classList.remove('locked');
        rewardUpgradesEl.classList.add('unlocked');
    }

    // 4. Награда за время в игре (60 секунд)
    const rewardTimeNode = document.getElementById('reward-time');
    if (rewardTimeNode && timePlayed >= 60) {
        rewardTimeNode.classList.remove('locked');
        rewardTimeNode.classList.add('unlocked');
    }
}

// Ежесекундный игровой цикл (таймер и автокликер)
setInterval(() => {
    timePlayed++;
    if (statTimePlayed) statTimePlayed.textContent = timePlayed + ' сек.';

    if (passiveIncome > 0) {
        points += passiveIncome;
        totalEarned += passiveIncome;
        updateUI();
    }
    checkButtonsStatus();
    checkRewards(); // Проверяем награды каждую секунду (для таймера и пассивного дохода)
}, 1000);

// Инициализация интерфейса при первой загрузке страницы
updateUI();
checkButtonsStatus();
checkRewards();
