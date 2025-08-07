// ===================================================================================
// C: Pet-opoly Game Logic
// ===================================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------------------------------------------------
    // I. GAME STATE & CONSTANTS
    // ---------------------------------------------------------------------------

    let selectedPlayerCount = 4;
    let playerConfigs = [];
    let players = [];
    let currentPlayer = 0;
    let ownedSpaces = {};
    let turnCounter = 1;
    let isWaitingForAction = false;
    let isGameOver = false;

    // Audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Data for all 40 board spaces
    const boardSpaces = [
        { type: "go", name: "START", text: "🏠 Collect $200 Pet Allowance" },
        { type: "pet", name: "Goldfish Bowl", emoji: "🐠", price: 60, rent: 10 },
        { type: "special", name: "Pet Lottery", text: "🎰 Lucky! Get $150", amount: 150 },
        { type: "pet", name: "Hamster Cage", emoji: "🐹", price: 60, rent: 12 },
        { type: "special", name: "Vet Bill", text: "🧾 Pay $75", amount: -75 },
        { type: "pet", name: "Rabbit Hutch", emoji: "🐰", price: 200, rent: 25 },
        { type: "pet", name: "Cat Tower", emoji: "🐱", price: 100, rent: 15 },
        { type: "special", name: "Pet Treats", text: "🦴 Lucky! Get $100", amount: 100 },
        { type: "pet", name: "Dog House", emoji: "🐶", price: 120, rent: 18 },
        { type: "pet", name: "Bird Perch", emoji: "🦜", price: 140, rent: 20 },
        { type: "jail", name: "VET VISIT", text: "🏥 Just Visiting" },
        { type: "pet", name: "Horse Stable", emoji: "🐴", price: 140, rent: 22 },
        { type: "special", name: "Pet Sponsorship", text: "💝 Get $180!", amount: 180 },
        { type: "pet", name: "Pig Pen", emoji: "🐷", price: 160, rent: 24 },
        { type: "pet", name: "Cow Pasture", emoji: "🐄", price: 180, rent: 26 },
        { type: "special", name: "Grooming Fee", text: "✂️ Pay $50", amount: -50 },
        { type: "pet", name: "Turtle Tank", emoji: "🐢", price: 180, rent: 26 },
        { type: "special", name: "Pet Show", text: "🏆 Win $200!", amount: 200 },
        { type: "pet", name: "Frog Pond", emoji: "🐸", price: 200, rent: 30 },
        { type: "pet", name: "Snake Terrarium", emoji: "🐍", price: 220, rent: 32 },
        { type: "free-parking", name: "PET PARK", text: "🌳 Free Parking" },
        { type: "pet", name: "Monkey Jungle", emoji: "🐵", price: 220, rent: 34 },
        { type: "special", name: "Pet Jackpot", text: "💰 Lucky! Get $250", amount: 250 },
        { type: "pet", name: "Elephant Sanctuary", emoji: "🐘", price: 240, rent: 36 },
        { type: "pet", name: "Lion Den", emoji: "🦁", price: 260, rent: 38 },
        { type: "special", name: "Food Bill", text: "🥕 Pay $100", amount: -100 },
        { type: "pet", name: "Bear Cave", emoji: "🐻", price: 300, rent: 42 },
        { type: "pet", name: "Panda Bamboo", emoji: "🐼", price: 300, rent: 44 },
        { type: "special", name: "Pet Charity", text: "🌟 Get $200!", amount: 200 },
        { type: "pet", name: "Penguin Ice", emoji: "🐧", price: 320, rent: 46 },
        { type: "go-to-jail", name: "LOST PET", text: "🚨 Go to Vet!" },
        { type: "pet", name: "Unicorn Magic", emoji: "🦄", price: 350, rent: 55 },
        { type: "pet", name: "Dragon Lair", emoji: "🐉", price: 400, rent: 60 },
        { type: "special", name: "Pet Treasure", text: "💰 Lucky! Get $350", amount: 350 },
        { type: "pet", name: "Phoenix Nest", emoji: "🔥", price: 400, rent: 65 },
        { type: "special", name: "Luxury Pet Tax", text: "💎 Pay $150", amount: -150 },
        { type: "pet", name: "Octopus Tank", emoji: "🐙", price: 375, rent: 58 },
        { type: "special", name: "Pet Windfall", text: "🌟 Get $400!", amount: 400 },
        { type: "pet", name: "Royal Pets", emoji: "👑", price: 400, rent: 70 }
    ];
    const availableColors = [
        { name: 'Red', class: 'color-red', value: '#ff6b6b' }, { name: 'Blue', class: 'color-blue', value: '#4ecdc4' },
        { name: 'Yellow', class: 'color-yellow', value: '#ffe66d' }, { name: 'Green', class: 'color-green', value: '#a8e6cf' },
        { name: 'Purple', class: 'color-purple', value: '#b19cd9' }, { name: 'Orange', class: 'color-orange', value: '#ffb347' },
        { name: 'Pink', class: 'color-pink', value: '#ffb3ba' }, { name: 'Teal', class: 'color-teal', value: '#77dd77' }
    ];

    // ---------------------------------------------------------------------------
    // II. DOM ELEMENT REFERENCES
    // ---------------------------------------------------------------------------

    const setupScreen = document.getElementById('setupScreen');
    const gameScreen = document.getElementById('gameScreen');
    const playerCountButtons = document.querySelector('.player-count-buttons');
    const playerSetupContainer = document.getElementById('playerSetup');
    const startBtn = document.getElementById('startBtn');
    const boardElement = document.getElementById('board');
    const rollBtn = document.getElementById('rollBtn');
    const dice1Element = document.getElementById('dice1');
    const dice2Element = document.getElementById('dice2');
    const playerInfoContainer = document.getElementById('playerInfo');
    const messageElement = document.getElementById('message');
    const turnCounterElement = document.getElementById('turnCounter');
    const activePlayersElement = document.getElementById('activePlayers');
    const totalMoneyElement = document.getElementById('totalMoney');
    const viewPetsBtn = document.getElementById('viewPetsBtn');
    const leaderboardBtn = document.getElementById('leaderboardBtn');
    const newGameBtn = document.getElementById('newGameBtn');
    const modalOverlay = document.getElementById('genericModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter');
    const gameOverModal = document.getElementById('gameOverModal');
    const winnerNameElement = document.getElementById('winnerName');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const confettiContainer = document.getElementById('confettiContainer');

    // ---------------------------------------------------------------------------
    // III. SETUP LOGIC
    // ---------------------------------------------------------------------------

    /**
     * Handles selection of player count.
     * @param {Event} e - The click event.
     */
    function selectPlayerCount(e) {
        if (e.target.classList.contains('count-btn')) {
            selectedPlayerCount = parseInt(e.target.dataset.count);
            document.querySelectorAll('.count-btn').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
            generatePlayerSetup();
        }
    }

    /**
     * Generates the UI for player name and color configuration.
     */
    function generatePlayerSetup() {
        playerSetupContainer.innerHTML = '';
        playerConfigs = [];
        for (let i = 0; i < selectedPlayerCount; i++) {
            const playerConfig = document.createElement('div');
            playerConfig.className = 'player-config';
            const defaultColor = availableColors[i % availableColors.length];
            playerConfigs.push({ name: `Player ${i + 1}`, color: defaultColor });
            playerConfig.innerHTML = `
                <h4>Player ${i + 1}</h4>
                <input type="text" class="player-name-input" value="Player ${i + 1}" data-player-index="${i}">
                <div class="color-options" data-player-index="${i}">
                    ${availableColors.map((c, ci) => `<div class="color-option ${c.class} ${ci === i ? 'selected' : ''}" data-color-index="${ci}"></div>`).join('')}
                </div>`;
            playerSetupContainer.appendChild(playerConfig);
        }
        updateStartButton();
    }

    /**
     * Updates a player's name in the config.
     * @param {Event} e - The input event.
     */
    function updatePlayerName(e) {
        if (e.target.classList.contains('player-name-input')) {
            const playerIndex = parseInt(e.target.dataset.playerIndex);
            playerConfigs[playerIndex].name = e.target.value || `Player ${playerIndex + 1}`;
            updateStartButton();
        }
    }

    /**
     * Handles selection of a player's color.
     * @param {Event} e - The click event.
     */
    function selectPlayerColor(e) {
        if (e.target.classList.contains('color-option')) {
            const playerIndex = parseInt(e.target.parentElement.dataset.playerIndex);
            const colorIndex = parseInt(e.target.dataset.colorIndex);
            const selectedColor = availableColors[colorIndex];

            if (playerConfigs.some((c, i) => i !== playerIndex && c.color.class === selectedColor.class)) {
                playSound('error');
                showModal('Color Taken!', 'This color is already taken! Please choose another.', [{ text: 'OK', class: 'primary' }]);
                return;
            }
            playerConfigs[playerIndex].color = selectedColor;
            const playerConfigElement = e.target.closest('.player-config');
            playerConfigElement.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
            e.target.classList.add('selected');
            updateStartButton();
        }
    }

    /**
     * Enables or disables the start button based on valid configuration.
     */
    function updateStartButton() {
        const allNamesValid = playerConfigs.every(c => c.name.trim().length > 0);
        const allColorsUnique = new Set(playerConfigs.map(c => c.color.class)).size === playerConfigs.length;
        startBtn.disabled = !allNamesValid || !allColorsUnique;
    }

    /**
     * Initializes the game state and transitions from setup to game screen.
     */
    function startGame() {
        initAudio();
        players = playerConfigs.map((config, index) => ({
            id: index, name: config.name, money: 1500, position: 0,
            pets: [], color: config.color.value, isBankrupt: false, marker: null
        }));
        setupScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        initializeBoard();
        showMessage(`${players[0].name}'s turn to roll!`);
    }

    // ---------------------------------------------------------------------------
    // IV. GAME INITIALIZATION
    // ---------------------------------------------------------------------------

    /**
     * Creates the game board and player tokens in the DOM.
     */
    function initializeBoard() {
        boardElement.innerHTML = '';
        for (let i = 0; i < 40; i++) {
            const space = document.createElement('div');
            space.className = 'space';
            space.id = `space-${i}`;
            const sd = boardSpaces[i];
            if (['go', 'jail', 'free-parking', 'go-to-jail'].includes(sd.type)) space.classList.add('corner', sd.type);
            else if (sd.type === 'pet') space.classList.add('pet-space');
            else space.classList.add('special-space');

            if (i <= 10) { space.style.gridRow = '11'; space.style.gridColumn = `${11 - i}`; } 
            else if (i <= 20) { space.style.gridColumn = '1'; space.style.gridRow = `${11 - (i - 10)}`; } 
            else if (i <= 30) { space.style.gridRow = '1'; space.style.gridColumn = `${i - 20 + 1}`; } 
            else { space.style.gridColumn = '11'; space.style.gridRow = `${i - 30 + 1}`; }
            
            space.innerHTML = sd.emoji ? `<div class="pet-emoji">${sd.emoji}</div><div>${sd.name}</div><div class="price">$${sd.price}</div>`
                                        : `<div style="font-weight: bold;">${sd.name}</div><div style="font-size: 0.6rem;">${sd.text}</div>`;
            space.addEventListener('click', () => showSpaceInfo(i));
            boardElement.appendChild(space);
        }
        const center = document.createElement('div');
        center.className = 'center';
        center.innerHTML = `<div>🐾 PET-OPOLY 🐾</div><div style="font-size: 1rem; margin-top: 10px;">Adopt • Care • Love</div>`;
        boardElement.appendChild(center);
        
        players.forEach((player, index) => {
            const marker = document.createElement('div');
            marker.className = 'player';
            marker.style.backgroundColor = player.color;
            marker.style.zIndex = 10 + index;
            boardElement.appendChild(marker);
            player.marker = marker;
        });

        teleportAllPlayersToPosition();
        updatePlayerInfo();
    }

    // ---------------------------------------------------------------------------
    // V. CORE GAMEPLAY LOOP
    // ---------------------------------------------------------------------------

    /**
     * Handles the dice roll action.
     */
    function rollDice() {
        if (isWaitingForAction || isGameOver) return;
        initAudio(); 
        playSound('diceRoll');
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        dice1Element.textContent = dice1;
        dice2Element.textContent = dice2;
        rollBtn.disabled = true;
        movePlayer(dice1 + dice2);
    }

    /**
     * Initiates the player movement animation.
     * @param {number} spaces - The total number of spaces to move.
     */
    function movePlayer(spaces) {
        const player = players[currentPlayer];
        const oldPosition = player.position;
        animatePlayerMovement(spaces, () => {
            if (player.position < oldPosition && !player.isBankrupt) {
                player.money += 200;
                showMessage(`${player.name} passed START and collected $200! 🏠`);
            }
            playSound('landing');
            handleSpaceLanding();
        });
    }

    /**
     * Animates a player token one space at a time.
     * @param {number} spacesToMove - The remaining spaces to move.
     * @param {function} onComplete - Callback function when movement is finished.
     */
    function animatePlayerMovement(spacesToMove, onComplete) {
        if (spacesToMove === 0) {
            onComplete();
            return;
        }
        const player = players[currentPlayer];
        player.position = (player.position + 1) % 40;
        const targetSpace = document.getElementById(`space-${player.position}`);
        const boardRect = boardElement.getBoundingClientRect();
        const spaceRect = targetSpace.getBoundingClientRect();
        const top = spaceRect.top - boardRect.top + 5 + (player.id % 2 * 20);
        const left = spaceRect.left - boardRect.left + 5 + (Math.floor(player.id / 2) * 20);
        player.marker.style.top = `${top}px`;
        player.marker.style.left = `${left}px`;
        playSound('step');
        setTimeout(() => animatePlayerMovement(spacesToMove - 1, onComplete), 210);
    }

    /**
     * Handles the logic for the space the player landed on.
     */
    function handleSpaceLanding() {
        if (isGameOver) return;
        const player = players[currentPlayer];
        const space = boardSpaces[player.position];
        let continueTurn = true;
        let timeout = 3000;

        if (space.type === 'pet') {
            const ownerIndex = ownedSpaces[player.position];
            if (ownerIndex !== undefined) {
                if (ownerIndex !== currentPlayer) {
                    showMessage(`${player.name} must pay $${space.rent} rent to ${players[ownerIndex].name}!`);
                    if (!handlePayment(currentPlayer, space.rent, ownerIndex)) continueTurn = false;
                }
            } else {
                if (player.money >= space.price) {
                    showPurchaseDialog(space, player.position);
                    return; // Wait for player action
                } else {
                    showMessage(`${player.name} can't afford to adopt ${space.name}.`);
                }
            }
        } else if (space.type === 'special') {
            const amount = space.amount;
            if (amount < 0) {
                showMessage(`${player.name} landed on ${space.name} and must pay $${-amount}.`);
                if (!handlePayment(currentPlayer, -amount)) continueTurn = false;
            } else {
                player.money += amount;
                showMessage(`Lucky! ${player.name} ${space.text}`);
            }
        } else if (space.type === 'go-to-jail') {
            player.position = 10;
            teleportPlayerToPosition(player);
            showMessage(`${player.name}'s pet got lost! Go to the vet! 🏥`);
        } else {
            showMessage(`${player.name} landed on ${space.name}.`);
        }
        
        if (continueTurn) {
            updatePlayerInfo();
            setTimeout(nextPlayerTurn, timeout);
        } else {
            setTimeout(nextPlayerTurn, timeout);
        }
    }

    /**
     * Advances to the next active player's turn.
     */
    function nextPlayerTurn() {
        if (isGameOver) return;
        const activePlayerCount = players.filter(p => !p.isBankrupt).length;
        if (activePlayerCount <= 1) return;

        do {
            currentPlayer = (currentPlayer + 1) % players.length;
        } while (players[currentPlayer].isBankrupt);

        if (players.filter(p => !p.isBankrupt).every(p => p.id === currentPlayer)) {
            turnCounter++;
        }
        updatePlayerInfo();
        rollBtn.disabled = false;
        isWaitingForAction = false;
        showMessage(`${players[currentPlayer].name}'s turn! Roll the dice! 🎲`);
    }

    // ---------------------------------------------------------------------------
    // VI. ACTION & DECISION LOGIC
    // ---------------------------------------------------------------------------

    /**
     * Processes a payment from one player to another or to the bank.
     * @param {number} payerIndex - The index of the player paying.
     * @param {number} amount - The amount to pay.
     * @param {number} [recipientIndex=-1] - The index of the recipient. -1 for the bank.
     * @returns {boolean} - True if payment was successful, false if bankrupt.
     */
    function handlePayment(payerIndex, amount, recipientIndex = -1) {
        const payer = players[payerIndex];
        if (payer.money >= amount) {
            payer.money -= amount;
            if (recipientIndex !== -1) {
                players[recipientIndex].money += amount;
                animateMoneyTransfer(payerIndex, recipientIndex);
            }
            playSound('payment');
            updatePlayerInfo();
            return true;
        } else {
            handleBankruptcy(payerIndex);
            return false;
        }
    }

    /**
     * Handles a player's bankruptcy.
     * @param {number} playerIndex - The index of the bankrupt player.
     */
    function handleBankruptcy(playerIndex) {
        const player = players[playerIndex];
        if (player.isBankrupt) return;
        player.isBankrupt = true;
        player.money = 0;
        player.marker.style.display = 'none';
        playSound('error');
        showMessage(`Oh no! ${player.name} has gone bankrupt! 💸`);
        for (const spaceId in ownedSpaces) {
            if (ownedSpaces[spaceId] === playerIndex) {
                delete ownedSpaces[spaceId];
                const spaceElement = document.getElementById(`space-${spaceId}`);
                spaceElement.style.borderColor = '#333';
                spaceElement.style.borderWidth = '2px';
            }
        }
        player.pets = [];
        updatePlayerInfo();
        checkForWinner();
    }

    /**
     * Checks if there is a winner and ends the game if so.
     */
    function checkForWinner() {
        const activePlayers = players.filter(p => !p.isBankrupt);
        if (activePlayers.length === 1 && !isGameOver) {
            isGameOver = true;
            setTimeout(() => triggerGameOver(activePlayers[0]), 2000);
        }
    }

    /**
     * Displays the purchase dialog in the message bar.
     * @param {object} space - The space data object.
     * @param {number} position - The board position index.
     */
    function showPurchaseDialog(space, position) {
        isWaitingForAction = true;
        rollBtn.disabled = true;
        messageElement.innerHTML = `
            <div>
                <div style="margin-bottom: 10px;">${space.emoji} <strong>Adopt ${space.name} for $${space.price}?</strong></div>
                <div class="action-buttons">
                    <button class="action-btn success" id="buyBtn">✅ Adopt!</button>
                    <button class="action-btn danger" id="skipBtn">❌ Skip</button>
                </div>
            </div>`;
        document.getElementById('buyBtn').onclick = () => buyPet(position);
        document.getElementById('skipBtn').onclick = skipPurchase;
    }

    /**
     * Handles the logic for buying a pet.
     * @param {number} position - The board position index.
     */
    function buyPet(position) {
        isWaitingForAction = false;
        const player = players[currentPlayer];
        const space = boardSpaces[position];
        player.money -= space.price;
        player.pets.push(space.name);
        ownedSpaces[position] = currentPlayer;
        const el = document.getElementById(`space-${position}`);
        el.style.borderColor = player.color;
        el.style.borderWidth = '3px';
        el.classList.add('pulse-highlight');
        setTimeout(() => el.classList.remove('pulse-highlight'), 1000);
        playSound('purchase');
        showMessage(`🎉 ${player.name} adopted ${space.name}!`);
        updatePlayerInfo();
        setTimeout(nextPlayerTurn, 2000);
    }

    /**
     * Handles the logic for skipping a purchase.
     */
    function skipPurchase() {
        isWaitingForAction = false;
        showMessage(`${players[currentPlayer].name} decided not to adopt.`);
        setTimeout(nextPlayerTurn, 2000);
    }

    // ---------------------------------------------------------------------------
    // VII. UI & MODAL SYSTEM
    // ---------------------------------------------------------------------------

    /**
     * Instantly moves all player tokens to their current positions.
     */
    function teleportAllPlayersToPosition() {
        const boardRect = boardElement.getBoundingClientRect();
        players.forEach((player) => {
            teleportPlayerToPosition(player, boardRect);
        });
    }

    /**
     * Instantly moves a single player token to its current position.
     * @param {object} player - The player object.
     * @param {DOMRect} [boardRect] - Optional pre-calculated board rectangle.
     */
    function teleportPlayerToPosition(player, boardRect) {
        if (player.isBankrupt) {
            player.marker.style.display = 'none';
            return;
        }
        if (!boardRect) boardRect = boardElement.getBoundingClientRect();
        const spaceEl = document.getElementById(`space-${player.position}`);
        const spaceRect = spaceEl.getBoundingClientRect();
        const top = spaceRect.top - boardRect.top + 5 + (player.id % 2 * 20);
        const left = spaceRect.left - boardRect.left + 5 + (Math.floor(player.id / 2) * 20);
        player.marker.style.top = `${top}px`;
        player.marker.style.left = `${left}px`;
    }

    /**
     * Updates all player info cards in the UI.
     */
    function updatePlayerInfo() {
        playerInfoContainer.innerHTML = '';
        players.forEach((player, index) => {
            const card = document.createElement('div');
            card.id = `player-card-${index}`;
            card.className = `player-card ${index === currentPlayer ? 'active' : ''} ${player.isBankrupt ? 'bankrupt' : ''}`;
            card.innerHTML = `
                <div class="player-name" style="color: ${player.color}">${player.name} ${player.isBankrupt ? '(Bankrupt)' : ''}</div>
                <div class="player-money">$${player.money}</div>
                <div class="owned-pets">Pets: ${player.pets.length}</div>`;
            playerInfoContainer.appendChild(card);
        });
        updateGameStats();
    }

    /**
     * Updates the main game statistics display.
     */
    function updateGameStats() {
        turnCounterElement.textContent = turnCounter;
        activePlayersElement.textContent = players.filter(p => !p.isBankrupt).length;
        totalMoneyElement.textContent = `$${players.reduce((s, p) => s + p.money, 0)}`;
    }

    /**
     * Displays a message in the main message bar.
     * @param {string} text - The message to display.
     */
    function showMessage(text) {
        messageElement.innerHTML = text;
    }

    /**
     * Shows the generic modal with custom content.
     * @param {string} title - The title for the modal.
     * @param {string} content - The body content for the modal.
     * @param {Array<object>} buttons - An array of button configuration objects.
     */
    function showModal(title, content, buttons) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modalFooter.innerHTML = '';
        buttons.forEach(b => {
            const btn = document.createElement('button');
            btn.className = `modal-btn ${b.class}`;
            btn.textContent = b.text;
            btn.onclick = () => {
                closeModal();
                if (b.callback) b.callback();
            };
            modalFooter.appendChild(btn);
        });
        modalOverlay.style.display = 'flex';
    }

    /**
     * Hides the generic modal.
     */
    function closeModal() {
        modalOverlay.style.display = 'none';
    }

    /**
     * Shows the game over screen and starts confetti.
     * @param {object} winner - The winning player object.
     */
    function triggerGameOver(winner) {
        playSound('win');
        winnerNameElement.textContent = winner.name;
        winnerNameElement.style.color = winner.color;
        gameOverModal.style.display = 'flex';
        startConfetti();
    }

    /**
     * Creates and animates confetti elements.
     */
    function startConfetti() {
        confettiContainer.innerHTML = '';
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#b19cd9', '#ffb347'];
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `scale(${Math.random() * 1.5 + 0.5})`;
            confettiContainer.appendChild(confetti);
        }
    }

    /**
     * Animates a coin icon moving between player cards.
     * @param {number} fromPlayerIndex - The index of the paying player.
     * @param {number} toPlayerIndex - The index of the receiving player.
     */
    function animateMoneyTransfer(fromPlayerIndex, toPlayerIndex) {
        const fromCard = document.getElementById(`player-card-${fromPlayerIndex}`);
        const toCard = document.getElementById(`player-card-${toPlayerIndex}`);
        if (!fromCard || !toCard) return;
        const fromRect = fromCard.getBoundingClientRect();
        const toRect = toCard.getBoundingClientRect();
        const coin = document.createElement('div');
        coin.className = 'money-transfer-coin';
        coin.textContent = '💰';
        document.body.appendChild(coin);
        coin.style.left = `${fromRect.left + fromRect.width / 2}px`;
        coin.style.top = `${fromRect.top + fromRect.height / 2}px`;
        coin.style.opacity = '1';
        setTimeout(() => {
            coin.style.left = `${toRect.left + toRect.width / 2}px`;
            coin.style.top = `${toRect.top + toRect.height / 2}px`;
            coin.style.transform = 'scale(0.5)';
            coin.style.opacity = '0';
        }, 50);
        setTimeout(() => document.body.removeChild(coin), 1050);
    }

    // ---------------------------------------------------------------------------
    // VIII. QUICK ACTION HANDLERS
    // ---------------------------------------------------------------------------

    function showSpaceInfo(i) {
        const s = boardSpaces[i];
        let c = ``;
        if (s.emoji) c += `${s.emoji}\n\n`;
        if (s.price) {
            c += `Price: $${s.price}\nRent: $${s.rent}\n\n`;
            const oi = ownedSpaces[i];
            c += oi !== undefined ? `Owner: ${players[oi].name}` : 'Available for adoption!';
        } else {
            c += s.text;
        }
        showModal(s.name, c, [{ text: 'Close', class: 'primary' }]);
    }
    
    function showAllProperties() {
        let list = "🏠 ALL PETS IN GAME:\n\n";
        boardSpaces.forEach((s, i) => {
            if (s.type === 'pet') {
                const oi = ownedSpaces[i];
                list += `${s.emoji} ${s.name} ($${s.price})\n  - Owner: ${oi !== undefined ? players[oi].name : 'Available'}\n\n`;
            }
        });
        showModal('All Pets', list, [{ text: 'Close', class: 'primary' }]);
    }
    
    function showLeaderboard() {
        let list = "🏆 CURRENT LEADERBOARD:\n(Based on cash)\n\n";
        [...players].sort((a, b) => b.money - a.money).forEach((p, i) => {
            list += `${i + 1}. ${p.name} - $${p.money} ${p.isBankrupt ? '(Bankrupt)' : ''}\n`;
        });
        showModal('Leaderboard', list, [{ text: 'Close', class: 'primary' }]);
    }
    
    function askResetGame() {
        showModal('New Game?', 'Are you sure? All progress will be lost!', [
            { text: 'Yes, New Game', class: 'danger', callback: () => location.reload() },
            { text: 'No, Cancel', class: 'secondary' }
        ]);
    }

    // ---------------------------------------------------------------------------
    // IX. EVENT LISTENERS & INITIALIZATION
    // ---------------------------------------------------------------------------

    // Setup screen listeners
    playerCountButtons.addEventListener('click', selectPlayerCount);
    playerSetupContainer.addEventListener('input', updatePlayerName);
    playerSetupContainer.addEventListener('click', selectPlayerColor);
    startBtn.addEventListener('click', startGame);

    // Game screen listeners
    rollBtn.addEventListener('click', rollDice);
    viewPetsBtn.addEventListener('click', showAllProperties);
    leaderboardBtn.addEventListener('click', showLeaderboard);
    newGameBtn.addEventListener('click', askResetGame);
    playAgainBtn.addEventListener('click', () => location.reload());

    // Initial call to set up the first screen
    generatePlayerSetup();
});
