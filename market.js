// Market items
const marketItems = [
    {
        id: 'ansem',
        name: 'Ansem',
        price: 100,
        emoji: '🐂',
        owned: false
    },
    {
        id: 'home',
        name: 'Home',
        price: 200,
        emoji: '🥞',
        owned: false
    },
    {
        id: 'safu',
        name: 'SAFU',
        price: 350,
        emoji: '🛡️',
        owned: false
    },
    {
        id: 'broccoli',
        name: 'Broccoli',
        price: 500,
        emoji: '🐕',
        owned: false
    },
    {
        id: 'four',
        name: '4',
        price: 750,
        emoji: '4️⃣',
        owned: false
    },
    {
        id: 'tcc',
        name: 'TCC',
        price: 1000,
        emoji: '🗡️',
        owned: false
    },
    {
        id: 'binance',
        name: 'Binance',
        price: 1500,
        emoji: '🔶',
        owned: false
    }
];

let selectedCharacter = null;

function showAlert(message) {
    const alertElement = document.createElement('div');
    alertElement.className = 'market-alert';
    alertElement.textContent = message;
    document.getElementById('gameContainer').appendChild(alertElement);

    setTimeout(() => {
        alertElement.classList.add('fade-out');
        setTimeout(() => alertElement.remove(), 500);
    }, 2000);
}

function toggleMarket() {
    const marketPanel = document.getElementById('marketPanel');
    marketPanel.style.display = marketPanel.style.display === 'none' ? 'block' : 'none';
}

function initializeMarket() {
    const container = document.querySelector('.market-items');
    container.innerHTML = '';

    marketItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = `market-item ${item.owned ? 'owned' : ''}`;
        itemElement.innerHTML = `
            <div class="market-item-emoji">${item.emoji}</div>
            <div class="market-item-name">${item.name}</div>
            <div class="market-item-price">${item.price}P</div>
        `;

        itemElement.onclick = () => purchaseItem(item);
        container.appendChild(itemElement);
    });
}

function purchaseItem(item) {
    const currentScore = parseInt(document.getElementById('score').textContent);
    
    if (item.owned) {
        selectedCharacter = item;
        updateSelectedCharacter();
        showAlert(`${item.name} selected!`);
        return;
    }

    if (currentScore >= item.price) {
        item.owned = true;
        selectedCharacter = item;
        updateSelectedCharacter();
        initializeMarket();
        showAlert(`${item.name} purchased!`);
    } else {
        showAlert(`Not enough points! Need ${item.price - currentScore}P more.`);
    }
}

function updateSelectedCharacter() {
    if (selectedCharacter) {
        window.updateGameCharacter(selectedCharacter);
    }
}

function resetMarket() {
    marketItems.forEach(item => item.owned = false);
    selectedCharacter = null;
    initializeMarket();
}

document.getElementById('marketBtn').addEventListener('click', toggleMarket);
document.querySelector('.close-market').addEventListener('click', toggleMarket);
document.addEventListener('DOMContentLoaded', initializeMarket);