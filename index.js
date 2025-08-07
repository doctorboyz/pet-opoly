<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pet-opoly - The Pet Adoption Game</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Comic Sans MS', cursive, sans-serif;
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .game-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 20px;
            max-width: 800px;
            width: 100%;
        }
        
        .game-title {
            text-align: center;
            color: #ff6b6b;
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        
        .game-subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1rem;
        }
        
        /* Setup Screen Styles */
        .setup-screen {
            text-align: center;
            padding: 20px;
        }
        
        .setup-section {
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(45deg, #f8f9fa, #e9ecef);
            border-radius: 15px;
            border: 2px solid #dee2e6;
        }
        
        .setup-section h3 {
            color: #ff6b6b;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .player-count-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
        }
        
        .count-btn {
            background: white;
            border: 3px solid #ddd;
            border-radius: 15px;
            padding: 15px 25px;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #666;
        }
        
        .count-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.2);
        }
        
        .count-btn.selected {
            border-color: #ff6b6b;
            background: linear-gradient(45deg, #ff6b6b, #ffa500);
            color: white;
        }
        
        .player-setup {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .player-config {
            background: white;
            border: 3px solid #ddd;
            border-radius: 15px;
            padding: 20px;
            text-align: center;
        }
        
        .player-config h4 {
            color: #333;
            margin-bottom: 15px;
            font-size: 1.1rem;
        }
        
        .player-name-input {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 10px;
            font-size: 1rem;
            margin-bottom: 15px;
            text-align: center;
            font-family: inherit;
        }
        
        .player-name-input:focus {
            outline: none;
            border-color: #ff6b6b;
        }
        
        .color-options {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .color-option {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid #ddd;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .color-option:hover {
            transform: scale(1.1);
        }
        
        .color-option.selected {
            border-color: #333;
            transform: scale(1.2);
        }
        
        .color-option.selected::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        
        .color-red { background: #ff6b6b; }
        .color-blue { background: #4ecdc4; }
        .color-yellow { background: #ffe66d; }
        .color-green { background: #a8e6cf; }
        .color-purple { background: #b19cd9; }
        .color-orange { background: #ffb347; }
        .color-pink { background: #ffb3ba; }
        .color-teal { background: #77dd77; }
        
        .start-game-btn {
            background: linear-gradient(45deg, #4ecdc4, #44a08d);
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 25px;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 6px 12px rgba(0,0,0,0.2);
            margin-top: 30px;
        }
        
        .start-game-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.3);
        }
        
        .start-game-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        /* Game Screen Styles */
        .game-screen {
            display: none;
        }
        
        .board {
            display: grid;
            grid-template-columns: repeat(11, 1fr);
            grid-template-rows: repeat(11, 1fr);
            gap: 2px;
            background: #4ecdc4;
            padding: 10px;
            border-radius: 15px;
            aspect-ratio: 1;
            width: 90vmin;
            max-width: 700px;
            margin: 0 auto 30px;
        }
        
        .space {
            background: white;
            border: 2px solid #333;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 5px;
            font-size: 0.7rem;
            text-align: center;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .space:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .corner {
            grid-column: span 1;
            grid-row: span 1;
            font-size: 0.6rem;
            font-weight: bold;
        }
        
        .go { background: linear-gradient(45deg, #ff6b6b, #ffa500); color: white; }
        .jail { background: linear-gradient(45deg, #666, #999); color: white; }
        .free-parking { background: linear-gradient(45deg, #4ecdc4, #45b7aa); color: white; }
        .go-to-jail { background: linear-gradient(45deg, #ff4757, #c44569); color: white; }
        
        .pet-space {
            background: linear-gradient(45deg, #a8e6cf, #dcedc1);
        }
        
        .special-space {
            background: linear-gradient(45deg, #ffd93d, #ff6b6b);
            color: white;
        }
        
        .center {
            grid-column: 2 / 11;
            grid-row: 2 / 11;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .pet-emoji {
            font-size: 1.2rem;
            margin-bottom: 2px;
        }
        
        .price {
            font-size: 0.6rem;
            color: #ff6b6b;
            font-weight: bold;
        }
        
        .player {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            position: absolute;
            top: 2px;
            right: 2px;
            border: 2px solid white;
            z-index: 10;
        }
        
        .game-controls {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .dice-container {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        
        .dice {
            width: 50px;
            height: 50px;
            background: white;
            border: 3px solid #333;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .roll-btn {
            background: linear-gradient(45deg, #ff6b6b, #ffa500);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .roll-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        }
        
        .roll-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        .game-layout {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 30px;
            margin-top: 20px;
            align-items: start;
        }
        
        .player-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 15px;
        }
        
        .game-stats {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .stats-card {
            background: white;
            border: 3px solid #ddd;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .stats-card h3 {
            color: #ff6b6b;
            margin-bottom: 15px;
            text-align: center;
            font-size: 1.1rem;
        }
        
        .stat-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        
        .stat-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .stat-label {
            color: #666;
            font-weight: bold;
        }
        
        .stat-value {
            color: #4ecdc4;
            font-weight: bold;
            font-size: 1.1rem;
        }
        
        .quick-btn {
            background: linear-gradient(45deg, #4ecdc4, #44a08d);
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 10px;
            font-size: 0.9rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 3px 6px rgba(0,0,0,0.2);
            margin-bottom: 10px;
            width: 100%;
        }
        
        .quick-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .quick-btn:last-child {
            margin-bottom: 0;
        }
        
        .player-card {
            background: white;
            border: 3px solid #ddd;
            border-radius: 15px;
            padding: 15px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .player-card.active {
            border-color: #ff6b6b;
            background: linear-gradient(45deg, #fff5f5, #ffffff);
        }
        
        .player-name {
            font-weight: bold;
            font-size: 1.1rem;
            margin-bottom: 8px;
        }
        
        .player-money {
            color: #4ecdc4;
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .owned-pets {
            margin-top: 8px;
            font-size: 0.9rem;
            color: #666;
        }
        
        .log-icon {
            position: absolute;
            bottom: 5px;
            left: 5px;
            background: #ff6b6b;
            color: white;
            border: none;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            font-size: 0.8rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .log-icon:hover {
            transform: scale(1.1);
            background: #ff5252;
        }
        
        .log-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .log-content {
            background: white;
            border-radius: 15px;
            padding: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 70vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .log-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #eee;
        }
        
        .log-title {
            color: #ff6b6b;
            font-size: 1.3rem;
            font-weight: bold;
        }
        
        .close-log {
            background: #ff6b6b;
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            font-size: 1.2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .log-entry {
            padding: 8px 12px;
            margin-bottom: 8px;
            border-radius: 8px;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .log-move {
            background: linear-gradient(45deg, #e3f2fd, #f3e5f5);
            border-left: 4px solid #2196f3;
        }
        
        .log-purchase {
            background: linear-gradient(45deg, #e8f5e8, #f1f8e9);
            border-left: 4px solid #4caf50;
        }
        
        .log-payment {
            background: linear-gradient(45deg, #ffebee, #fce4ec);
            border-left: 4px solid #f44336;
        }
        
        .log-bonus {
            background: linear-gradient(45deg, #fff3e0, #fef7e0);
            border-left: 4px solid #ff9800;
        }
        
        .message {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px;
            border-radius: 15px;
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .game-instructions {
            background: linear-gradient(45deg, #f8f9fa, #e9ecef);
            border: 2px solid #dee2e6;
            border-radius: 15px;
            padding: 20px;
            margin-top: 20px;
            font-size: 0.9rem;
            line-height: 1.6;
        }
        
        .instructions-title {
            color: #ff6b6b;
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .instruction-section {
            margin-bottom: 15px;
        }
        
        .instruction-section h4 {
            color: #333;
            font-weight: bold;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .instruction-list {
            color: #666;
            margin-left: 20px;
        }
        
        .instruction-list li {
            margin-bottom: 5px;
        }
        
        .action-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-top: 15px;
            flex-wrap: wrap;
        }
        
        .action-btn {
            background: linear-gradient(45deg, #4ecdc4, #44a08d);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 3px 6px rgba(0,0,0,0.2);
        }
        
        .action-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .action-btn.danger {
            background: linear-gradient(45deg, #ff6b6b, #ff4757);
        }
        
        .action-btn.success {
            background: linear-gradient(45deg, #a8e6cf, #77dd77);
        }
        
        @media (max-width: 768px) {
            .game-title { font-size: 2rem; }
            .board { width: 95vmin; max-width: 95vw; }
            .space { font-size: 0.6rem; padding: 3px; }
            .pet-emoji { font-size: 1rem; }
            .center { font-size: 1.2rem; }
            .player-setup { grid-template-columns: 1fr; }
            .game-layout { 
                grid-template-columns: 1fr; 
                gap: 20px; 
            }
            .game-stats { 
                flex-direction: row; 
                overflow-x: auto; 
            }
            .stats-card { 
                min-width: 250px; 
                flex-shrink: 0; 
            }
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1 class="game-title">🐾 PET-OPOLY 🐾</h1>
        <p class="game-subtitle">Adopt pets, build shelters, and become the ultimate pet parent!</p>
        
        <!-- Setup Screen -->
        <div class="setup-screen" id="setupScreen">
            <div class="setup-section">
                <h3>🎮 How many players?</h3>
                <div class="player-count-buttons">
                    <button class="count-btn" onclick="selectPlayerCount(2)">2 Players</button>
                    <button class="count-btn" onclick="selectPlayerCount(3)">3 Players</button>
                    <button class="count-btn selected" onclick="selectPlayerCount(4)">4 Players</button>
                </div>
            </div>
            
            <div class="setup-section">
                <h3>👥 Player Setup</h3>
                <div class="player-setup" id="playerSetup">
                    <!-- Player config cards will be generated here -->
                </div>
            </div>
            
            <button class="start-game-btn" onclick="startGame()" id="startBtn">
                🚀 Start Pet-opoly Adventure!
            </button>
        </div>
        
        <!-- Game Screen -->
        <div class="game-screen" id="gameScreen">
            <div class="board" id="board">
                <!-- Board spaces will be generated by JavaScript -->
            </div>
            
            <div class="game-controls">
                <div class="dice-container">
                    <div class="dice" id="dice1">🎲</div>
                    <div class="dice" id="dice2">🎲</div>
                    <button class="roll-btn" id="rollBtn" onclick="rollDice()">Roll Dice</button>
                </div>
            </div>
            
            <div class="game-layout">
                <div class="player-info" id="playerInfo">
                    <!-- Player cards will be generated by JavaScript -->
                </div>
                
                <div class="game-stats">
                    <div class="stats-card">
                        <h3>🏆 Game Stats</h3>
                        <div class="stat-item">
                            <span class="stat-label">Turn:</span>
                            <span class="stat-value" id="turnCounter">1</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Pets Adopted:</span>
                            <span class="stat-value" id="totalPets">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Money in Play:</span>
                            <span class="stat-value" id="totalMoney">$6000</span>
                        </div>
                    </div>
                    
                    <div class="stats-card">
                        <h3>🎯 Quick Actions</h3>
                        <button class="quick-btn" onclick="showAllProperties()">
                            🏠 View All Pets
                        </button>
                        <button class="quick-btn" onclick="showLeaderboard()">
                            📊 Leaderboard
                        </button>
                        <button class="quick-btn" onclick="resetGame()">
                            🔄 New Game
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="message" id="message">
                Welcome to Pet-opoly! Roll the dice to start adopting pets! 🎮
            </div>
            
            <!-- Game Log Modal -->
            <div class="log-modal" id="logModal">
                <div class="log-content">
                    <div class="log-header">
                        <div class="log-title" id="logPlayerName">Player Log</div>
                        <button class="close-log" onclick="closeLog()">×</button>
                    </div>
                    <div id="logEntries">
                        <!-- Log entries will be populated here -->
                    </div>
                </div>
            </div>
            
            <div class="game-instructions">
                <div class="instructions-title">🎮 How to Play Pet-opoly</div>
                
                <div class="instruction-section">
                    <h4>🎲 Basic Gameplay</h4>
                    <ul class="instruction-list">
                        <li>Roll dice to move around the board</li>
                        <li>Land on pet spaces to adopt them</li>
                        <li>Collect $200 when you pass START</li>
                        <li>Build your pet collection and earn rent!</li>
                    </ul>
                </div>
                
                <div class="instruction-section">
                    <h4>🐾 Pet Adoption</h4>
                    <ul class="instruction-list">
                        <li>Land on an unowned pet space to buy it</li>
                        <li>You'll be asked: "Buy [Pet Name] for $[Price]?"</li>
                        <li>Click OK to adopt, Cancel to skip</li>
                        <li>Owned pets will show your player color border</li>
                    </ul>
                </div>
                
                <div class="instruction-section">
                    <h4>💰 Rent & Payments</h4>
                    <ul class="instruction-list">
                        <li>Land on others' pets = pay rent automatically</li>
                        <li>Special spaces may require payments or give rewards</li>
                        <li>Watch your money - you need it to adopt more pets!</li>
                        <li>Lucky spaces give you bonus money! 🍀</li>
                    </ul>
                </div>
                
                <div class="instruction-section">
                    <h4>🏆 Winning Strategy</h4>
                    <ul class="instruction-list">
                        <li>Adopt pets early to collect rent from other players</li>
                        <li>Balance spending vs. saving for expensive pets</li>
                        <li>Click on any space to see its details and owner</li>
                        <li>The player with the most pets and money wins!</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Setup variables
        let selectedPlayerCount = 4;
        let playerConfigs = [];
        
        // Available colors
        const availableColors = [
            { name: 'Red', class: 'color-red', value: '#ff6b6b' },
            { name: 'Blue', class: 'color-blue', value: '#4ecdc4' },
            { name: 'Yellow', class: 'color-yellow', value: '#ffe66d' },
            { name: 'Green', class: 'color-green', value: '#a8e6cf' },
            { name: 'Purple', class: 'color-purple', value: '#b19cd9' },
            { name: 'Orange', class: 'color-orange', value: '#ffb347' },
            { name: 'Pink', class: 'color-pink', value: '#ffb3ba' },
            { name: 'Teal', class: 'color-teal', value: '#77dd77' }
        ];
        
        // Game state
        let currentPlayer = 0;
        let players = [];
        
        // Sound system using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        function playSound(type) {
            try {
                let frequency, duration, volume;
                
                switch(type) {
                    case 'diceRoll':
                        // Create a dice rolling sound effect
                        playDiceRollSound();
                        break;
                    case 'step':
                        // Quick step sound
                        frequency = 800;
                        duration = 0.1;
                        volume = 0.3;
                        playTone(frequency, duration, volume);
                        break;
                    case 'landing':
                        // Landing sound with multiple tones
                        playLandingSound();
                        break;
                }
            } catch (error) {
                // Silently handle audio context errors
                console.log('Audio not available');
            }
        }
        
        function playTone(frequency, duration, volume = 0.5) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }
        
        function playDiceRollSound() {
            // Create a rattling dice sound with multiple quick tones
            const frequencies = [400, 600, 500, 700, 450, 650];
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    playTone(freq, 0.08, 0.2);
                }, index * 50);
            });
        }
        
        function playLandingSound() {
            // Create a satisfying landing sound
            playTone(600, 0.15, 0.4);
            setTimeout(() => {
                playTone(400, 0.2, 0.3);
            }, 100);
        }
        
        // Initialize audio context on first user interaction
        function initAudio() {
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
        }
        
        // Board spaces data
        const boardSpaces = [
            { type: "go", name: "START", text: "🏠 Collect $200 Pet Allowance" },
            { type: "pet", name: "Goldfish Bowl", emoji: "🐠", price: 60, rent: 10 },
            { type: "special", name: "Pet Lottery", text: "🎰 Lucky! Get $150" },
            { type: "pet", name: "Hamster Cage", emoji: "🐹", price: 60, rent: 12 },
            { type: "special", name: "Pet Contest", text: "🏆 Win $120!" },
            { type: "pet", name: "Rabbit Hutch", emoji: "🐰", price: 200, rent: 25 },
            { type: "pet", name: "Cat Tower", emoji: "🐱", price: 100, rent: 15 },
            { type: "special", name: "Pet Treats", text: "🦴 Lucky! Get $100" },
            { type: "pet", name: "Dog House", emoji: "🐶", price: 120, rent: 18 },
            { type: "pet", name: "Bird Perch", emoji: "🦜", price: 140, rent: 20 },
            { type: "jail", name: "VET VISIT", text: "🏥 Just Visiting" },
            { type: "pet", name: "Horse Stable", emoji: "🐴", price: 140, rent: 22 },
            { type: "special", name: "Pet Sponsorship", text: "💝 Get $180!" },
            { type: "pet", name: "Pig Pen", emoji: "🐷", price: 160, rent: 24 },
            { type: "pet", name: "Cow Pasture", emoji: "🐄", price: 180, rent: 26 },
            { type: "special", name: "Pet Donation", text: "🎁 Lucky! Get $160" },
            { type: "pet", name: "Turtle Tank", emoji: "🐢", price: 180, rent: 26 },
            { type: "special", name: "Pet Show", text: "🏆 Win $200!" },
            { type: "pet", name: "Frog Pond", emoji: "🐸", price: 200, rent: 30 },
            { type: "pet", name: "Snake Terrarium", emoji: "🐍", price: 220, rent: 32 },
            { type: "free-parking", name: "PET PARK", text: "🌳 Free Parking" },
            { type: "pet", name: "Monkey Jungle", emoji: "🐵", price: 220, rent: 34 },
            { type: "special", name: "Pet Jackpot", text: "💰 Lucky! Get $250" },
            { type: "pet", name: "Elephant Sanctuary", emoji: "🐘", price: 240, rent: 36 },
            { type: "pet", name: "Lion Den", emoji: "🦁", price: 260, rent: 38 },
            { type: "special", name: "Pet Inheritance", text: "💎 Win $300!" },
            { type: "pet", name: "Bear Cave", emoji: "🐻", price: 300, rent: 42 },
            { type: "pet", name: "Panda Bamboo", emoji: "🐼", price: 300, rent: 44 },
            { type: "special", name: "Pet Charity", text: "🌟 Get $200!" },
            { type: "pet", name: "Penguin Ice", emoji: "🐧", price: 320, rent: 46 },
            { type: "pet", name: "Whale Ocean", emoji: "🐋", price: 350, rent: 50 },
            { type: "go-to-jail", name: "LOST PET", text: "🚨 Go to Vet!" },
            { type: "pet", name: "Unicorn Magic", emoji: "🦄", price: 350, rent: 55 },
            { type: "pet", name: "Dragon Lair", emoji: "🐉", price: 400, rent: 60 },
            { type: "special", name: "Pet Treasure", text: "💰 Lucky! Get $350" },
            { type: "pet", name: "Phoenix Nest", emoji: "🔥", price: 400, rent: 65 },
            { type: "special", name: "Pet Bonus", text: "🎉 Win $280!" },
            { type: "pet", name: "Octopus Tank", emoji: "🐙", price: 375, rent: 58 },
            { type: "special", name: "Pet Windfall", text: "🌟 Get $400!" },
            { type: "pet", name: "Royal Pets", emoji: "👑", price: 400, rent: 70 }
        ];
        
        let ownedSpaces = {};
        let playerLogs = [];
        let isWaitingForAction = false;
        let turnCounter = 1;
        
        // Setup functions
        function selectPlayerCount(count) {
            selectedPlayerCount = count;
            
            // Update button selection
            document.querySelectorAll('.count-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            event.target.classList.add('selected');
            
            generatePlayerSetup();
        }
        
        function generatePlayerSetup() {
            const playerSetup = document.getElementById('playerSetup');
            playerSetup.innerHTML = '';
            
            playerConfigs = [];
            
            for (let i = 0; i < selectedPlayerCount; i++) {
                const playerConfig = document.createElement('div');
                playerConfig.className = 'player-config';
                
                const defaultColor = availableColors[i % availableColors.length];
                
                playerConfigs.push({
                    name: `Player ${i + 1}`,
                    color: defaultColor
                });
                
                playerConfig.innerHTML = `
                    <h4>Player ${i + 1}</h4>
                    <input type="text" class="player-name-input" value="Player ${i + 1}" 
                           oninput="updatePlayerName(${i}, this.value)" placeholder="Enter name">
                    <div class="color-options">
                        ${availableColors.map((color, colorIndex) => `
                            <div class="color-option ${color.class} ${colorIndex === i ? 'selected' : ''}" 
                                 onclick="selectPlayerColor(${i}, ${colorIndex})"></div>
                        `).join('')}
                    </div>
                `;
                
                playerSetup.appendChild(playerConfig);
            }
            
            updateStartButton();
        }
        
        function updatePlayerName(playerIndex, name) {
            playerConfigs[playerIndex].name = name || `Player ${playerIndex + 1}`;
            updateStartButton();
        }
        
        function selectPlayerColor(playerIndex, colorIndex) {
            // Check if color is already taken
            const selectedColor = availableColors[colorIndex];
            const isColorTaken = playerConfigs.some((config, index) => 
                index !== playerIndex && config.color.class === selectedColor.class
            );
            
            if (isColorTaken) {
                alert('This color is already taken! Please choose another color.');
                return;
            }
            
            playerConfigs[playerIndex].color = selectedColor;
            
            // Update visual selection
            const playerConfig = document.querySelectorAll('.player-config')[playerIndex];
            playerConfig.querySelectorAll('.color-option').forEach(option => {
                option.classList.remove('selected');
            });
            playerConfig.querySelectorAll('.color-option')[colorIndex].classList.add('selected');
            
            updateStartButton();
        }
        
        function updateStartButton() {
            const startBtn = document.getElementById('startBtn');
            const allNamesValid = playerConfigs.every(config => config.name.trim().length > 0);
            const allColorsUnique = new Set(playerConfigs.map(config => config.color.class)).size === playerConfigs.length;
            
            startBtn.disabled = !allNamesValid || !allColorsUnique;
        }
        
        function startGame() {
            // Initialize audio context
            initAudio();
            
            // Initialize players from configs
            players = playerConfigs.map((config, index) => ({
                name: config.name,
                money: 1500,
                position: 0,
                pets: [],
                color: config.color.value
            }));
            
            // Initialize player logs
            playerLogs = players.map(() => []);
            
            // Hide setup screen and show game screen
            document.getElementById('setupScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';
            
            // Initialize the game board
            initializeBoard();
            
            showMessage(`${players[0].name}'s turn! Roll the dice to start your pet adoption journey! 🎲`);
        }
        
        // Game functions
        function initializeBoard() {
            const board = document.getElementById('board');
            board.innerHTML = '';
            
            // Create all 40 spaces
            for (let i = 0; i < 40; i++) {
                const space = document.createElement('div');
                space.className = 'space';
                space.id = `space-${i}`;
                
                const spaceData = boardSpaces[i];
                
                // Add appropriate classes
                if (spaceData.type === 'go' || spaceData.type === 'jail' || 
                    spaceData.type === 'free-parking' || spaceData.type === 'go-to-jail') {
                    space.classList.add('corner', spaceData.type);
                } else if (spaceData.type === 'pet') {
                    space.classList.add('pet-space');
                } else {
                    space.classList.add('special-space');
                }
                
                // Position spaces around the board
                if (i <= 10) {
                    // Bottom row
                    space.style.gridColumn = `${11 - i}`;
                    space.style.gridRow = '11';
                } else if (i <= 20) {
                    // Left column
                    space.style.gridColumn = '1';
                    space.style.gridRow = `${11 - (i - 10)}`;
                } else if (i <= 30) {
                    // Top row
                    space.style.gridColumn = `${i - 20}`;
                    space.style.gridRow = '1';
                } else {
                    // Right column
                    space.style.gridColumn = '11';
                    space.style.gridRow = `${i - 30}`;
                }
                
                // Add content
                if (spaceData.emoji) {
                    space.innerHTML = `
                        <div class="pet-emoji">${spaceData.emoji}</div>
                        <div>${spaceData.name}</div>
                        <div class="price">$${spaceData.price}</div>
                    `;
                } else {
                    space.innerHTML = `
                        <div style="font-weight: bold;">${spaceData.name}</div>
                        <div style="font-size: 0.6rem;">${spaceData.text}</div>
                    `;
                }
                
                space.onclick = () => showSpaceInfo(i);
                board.appendChild(space);
            }
            
            // Add center logo
            const center = document.createElement('div');
            center.className = 'center';
            center.innerHTML = `
                <div>🐾 PET-OPOLY 🐾</div>
                <div style="font-size: 1rem; margin-top: 10px;">Adopt • Care • Love</div>
            `;
            board.appendChild(center);
            
            updatePlayerPositions();
            updatePlayerInfo();
        }
        
        function updatePlayerPositions() {
            // Clear all player markers
            document.querySelectorAll('.player').forEach(p => p.remove());
            
            // Add current player positions
            players.forEach((player, index) => {
                const space = document.getElementById(`space-${player.position}`);
                const playerMarker = document.createElement('div');
                playerMarker.className = 'player';
                playerMarker.style.backgroundColor = player.color;
                playerMarker.style.top = `${2 + index * 4}px`;
                playerMarker.style.right = `${2 + index * 4}px`;
                space.appendChild(playerMarker);
            });
        }
        
        function updatePlayerInfo() {
            const playerInfo = document.getElementById('playerInfo');
            playerInfo.innerHTML = '';
            
            players.forEach((player, index) => {
                const card = document.createElement('div');
                card.className = `player-card ${index === currentPlayer ? 'active' : ''}`;
                card.style.position = 'relative';
                card.innerHTML = `
                    <div class="player-name" style="color: ${player.color}">${player.name}</div>
                    <div class="player-money">$${player.money}</div>
                    <div class="owned-pets">Pets: ${player.pets.length}</div>
                    <button class="log-icon" onclick="showPlayerLog(${index})" title="View ${player.name}'s game log">📋</button>
                `;
                playerInfo.appendChild(card);
            });
            
            updateGameStats();
        }
        
        function updateGameStats() {
            // Update turn counter
            document.getElementById('turnCounter').textContent = turnCounter;
            
            // Update total pets adopted
            const totalPets = players.reduce((sum, player) => sum + player.pets.length, 0);
            document.getElementById('totalPets').textContent = totalPets;
            
            // Update total money in play
            const totalMoney = players.reduce((sum, player) => sum + player.money, 0);
            document.getElementById('totalMoney').textContent = `$${totalMoney}`;
        }
        
        function rollDice() {
            if (isWaitingForAction) {
                return; // Don't allow rolling while waiting for player action
            }
            
            // Initialize audio on first interaction
            initAudio();
            
            // Play dice rolling sound
            playSound('diceRoll');
            
            const dice1 = Math.floor(Math.random() * 6) + 1;
            const dice2 = Math.floor(Math.random() * 6) + 1;
            const total = dice1 + dice2;
            
            document.getElementById('dice1').textContent = dice1;
            document.getElementById('dice2').textContent = dice2;
            
            // Disable roll button temporarily
            document.getElementById('rollBtn').disabled = true;
            
            // Log the dice roll
            addToPlayerLog(currentPlayer, `🎲 Rolled ${dice1} + ${dice2} = ${total}`, 'move');
            
            setTimeout(() => {
                movePlayer(total);
            }, 1000);
        }
        
        function movePlayer(spaces) {
            const player = players[currentPlayer];
            const oldPosition = player.position;
            
            // Animate movement step by step
            animatePlayerMovement(spaces, () => {
                // Check if passed GO
                if (player.position < oldPosition) {
                    player.money += 200;
                    addToPlayerLog(currentPlayer, `🏠 Passed START and collected $200`, 'bonus');
                    showMessage(`${player.name} passed START and collected $200! 🏠`);
                }
                
                // Log the final movement
                const landedSpace = boardSpaces[player.position];
                addToPlayerLog(currentPlayer, `🚶 Moved to ${landedSpace.name} ${landedSpace.emoji || ''}`, 'move');
                
                // Play landing sound
                playSound('landing');
                
                updatePlayerPositions();
                handleSpaceLanding();
            });
        }
        
        function animatePlayerMovement(totalSpaces, callback) {
            const player = players[currentPlayer];
            let currentStep = 0;
            
            const stepInterval = setInterval(() => {
                if (currentStep < totalSpaces) {
                    player.position = (player.position + 1) % 40;
                    updatePlayerPositions();
                    
                    // Play step sound
                    playSound('step');
                    
                    currentStep++;
                } else {
                    clearInterval(stepInterval);
                    callback();
                }
            }, 300); // 300ms between each step
        }
        
        function handleSpaceLanding() {
            const player = players[currentPlayer];
            const space = boardSpaces[player.position];
            
            if (space.type === 'pet') {
                if (ownedSpaces[player.position] !== undefined) {
                    // Pet is owned by someone
                    const owner = ownedSpaces[player.position];
                    if (owner !== currentPlayer) {
                        // Pay rent to the owner
                        const rent = space.rent;
                        
                        if (player.money >= rent) {
                            player.money -= rent;
                            players[owner].money += rent;
                            
                            // Log rent payment for both players
                            addToPlayerLog(currentPlayer, `💸 Paid $${rent} rent for ${space.name} to ${players[owner].name}`, 'payment');
                            addToPlayerLog(owner, `💰 Received $${rent} rent from ${player.name} for ${space.name}`, 'bonus');
                            
                            showMessage(`${player.name} paid $${rent} rent for ${space.name} to ${players[owner].name}! ${space.emoji} 💰`);
                        } else {
                            // Player can't afford full rent
                            const paidAmount = player.money;
                            const shortage = rent - player.money;
                            players[owner].money += paidAmount;
                            player.money = 0;
                            
                            addToPlayerLog(currentPlayer, `💸 Paid $${paidAmount} rent (all money) for ${space.name}. Still owed $${shortage}`, 'payment');
                            addToPlayerLog(owner, `💰 Received $${paidAmount} partial rent from ${player.name} for ${space.name}`, 'bonus');
                            
                            showMessage(`${player.name} paid all their money ($${paidAmount}) as rent for ${space.name} to ${players[owner].name}! Still owes $${shortage} 💸`);
                        }
                    } else {
                        // Player landed on their own pet
                        addToPlayerLog(currentPlayer, `🏠 Visited own ${space.name}`, 'move');
                        showMessage(`${player.name} visited their own ${space.name}! No rent needed! ${space.emoji} 🏠`);
                    }
                } else {
                    // Pet is available for adoption
                    if (player.money >= space.price) {
                        showPurchaseDialog(space, player.position);
                        return; // Don't continue to next turn yet, wait for player decision
                    } else {
                        addToPlayerLog(currentPlayer, `❌ Can't afford ${space.name} ($${space.price})`, 'move');
                        showMessage(`${player.name} can't afford ${space.name} ($${space.price}). Need $${space.price - player.money} more! ${space.emoji}`);
                        setTimeout(() => {
                            nextPlayerTurn();
                        }, 3000);
                        return;
                    }
                }
            } else if (space.type === 'special') {
                handleSpecialSpace(space);
            } else if (space.type === 'go') {
                showMessage(`${player.name} is at START! Collect $200 pet allowance! 🏠`);
            } else if (space.type === 'go-to-jail') {
                player.position = 10; // Move to jail
                updatePlayerPositions();
                showMessage(`${player.name}'s pet got lost! Go to the vet! 🏥`);
            } else {
                showMessage(`${player.name} landed on ${space.name}! ${space.text}`);
            }
            
            updatePlayerInfo();
            
            // For rent payments and other automatic actions, go to next turn
            if (space.type === 'pet' && ownedSpaces[player.position] && ownedSpaces[player.position] !== currentPlayer) {
                setTimeout(() => {
                    nextPlayerTurn();
                }, 3000);
            } else if (space.type === 'pet' && ownedSpaces[player.position] === currentPlayer) {
                setTimeout(() => {
                    nextPlayerTurn();
                }, 3000);
            } else if (space.type === 'go' || space.type === 'go-to-jail' || space.type === 'jail' || space.type === 'free-parking') {
                setTimeout(() => {
                    nextPlayerTurn();
                }, 3000);
            }
        }
        
        function handleSpecialSpace(space) {
            const player = players[currentPlayer];
            
            if (space.text.includes('Pay')) {
                const amount = parseInt(space.text.match(/\$(\d+)/)[1]);
                showPaymentDialog(space, amount);
            } else if (space.text.includes('Get') || space.text.includes('Win')) {
                const amount = parseInt(space.text.match(/\$(\d+)/)[1]);
                player.money += amount;
                addToPlayerLog(currentPlayer, `🍀 Lucky! ${space.text}`, 'bonus');
                showMessage(`🍀 Lucky! ${player.name} ${space.text}! 💰`);
                setTimeout(() => {
                    nextPlayerTurn();
                }, 3000);
            } else {
                showMessage(`${player.name} landed on ${space.name}! ${space.text}`);
                setTimeout(() => {
                    nextPlayerTurn();
                }, 3000);
            }
        }
        
        function showSpaceInfo(spaceIndex) {
            const space = boardSpaces[spaceIndex];
            let info = `${space.name}\n`;
            
            if (space.emoji) {
                info += `${space.emoji}\n`;
            }
            
            if (space.price) {
                info += `Price: $${space.price}\nRent: $${space.rent}\n`;
                
                if (ownedSpaces[spaceIndex] !== undefined) {
                    info += `Owner: ${players[ownedSpaces[spaceIndex]].name}`;
                } else {
                    info += 'Available for adoption!';
                }
            } else {
                info += space.text;
            }
            
            alert(info);
        }
        
        function showMessage(text) {
            document.getElementById('message').textContent = text;
        }
        
        function showPurchaseDialog(space, position) {
            const player = players[currentPlayer];
            const messageDiv = document.getElementById('message');
            
            // Set waiting for action state and disable roll button
            isWaitingForAction = true;
            document.getElementById('rollBtn').disabled = true;
            
            messageDiv.innerHTML = `
                <div>
                    <div style="margin-bottom: 10px;">
                        ${space.emoji} <strong>${player.name}</strong>, do you want to adopt <strong>${space.name}</strong>?
                    </div>
                    <div style="margin-bottom: 15px; font-size: 1.1rem;">
                        💰 Cost: $${space.price} | 🏠 Rent: $${space.rent}
                    </div>
                    <div class="action-buttons">
                        <button class="action-btn success" onclick="buyPet(${position})">
                            ✅ Yes, Adopt Pet!
                        </button>
                        <button class="action-btn danger" onclick="skipPurchase()">
                            ❌ No, Skip
                        </button>
                    </div>
                </div>
            `;
        }
        
        function showPaymentDialog(space, amount) {
            const player = players[currentPlayer];
            const messageDiv = document.getElementById('message');
            
            // Set waiting for action state and disable roll button
            isWaitingForAction = true;
            document.getElementById('rollBtn').disabled = true;
            
            messageDiv.innerHTML = `
                <div>
                    <div style="margin-bottom: 10px;">
                        <strong>${player.name}</strong> landed on <strong>${space.name}</strong>!
                    </div>
                    <div style="margin-bottom: 15px; font-size: 1.1rem;">
                        💸 You must pay: <strong>$${amount}</strong>
                    </div>
                    <div style="margin-bottom: 15px; color: #ffeb3b;">
                        Your current money: $${player.money}
                    </div>
                    <div class="action-buttons">
                        <button class="action-btn danger" onclick="payAmount(${amount})">
                            💳 Pay $${amount}
                        </button>
                    </div>
                </div>
            `;
        }
        
        function buyPet(position) {
            const player = players[currentPlayer];
            const space = boardSpaces[position];
            
            player.money -= space.price;
            player.pets.push(space.name);
            ownedSpaces[position] = currentPlayer;
            
            // Log the purchase
            addToPlayerLog(currentPlayer, `🐾 Adopted ${space.name} for $${space.price}`, 'purchase');
            
            // Color the space to show ownership
            const spaceElement = document.getElementById(`space-${position}`);
            spaceElement.style.borderColor = player.color;
            spaceElement.style.borderWidth = '3px';
            
            showMessage(`🎉 ${player.name} successfully adopted ${space.name} for $${space.price}! ${space.emoji}`);
            updatePlayerInfo();
            
            // Clear waiting state
            isWaitingForAction = false;
            
            setTimeout(() => {
                nextPlayerTurn();
            }, 3000);
        }
        
        function skipPurchase() {
            const player = players[currentPlayer];
            const space = boardSpaces[player.position];
            
            // Log the skip
            addToPlayerLog(currentPlayer, `❌ Skipped adopting ${space.name}`, 'move');
            
            showMessage(`${player.name} decided not to adopt ${space.name}. ${space.emoji}`);
            
            // Clear waiting state
            isWaitingForAction = false;
            
            setTimeout(() => {
                nextPlayerTurn();
            }, 3000);
        }
        
        function payAmount(amount) {
            const player = players[currentPlayer];
            
            if (player.money >= amount) {
                player.money -= amount;
                addToPlayerLog(currentPlayer, `💸 Paid $${amount}. Money left: $${player.money}`, 'payment');
                showMessage(`💸 ${player.name} paid $${amount}. Remaining money: $${player.money}`);
            } else {
                // Player doesn't have enough money
                const shortage = amount - player.money;
                const paidAmount = player.money;
                player.money = 0;
                addToPlayerLog(currentPlayer, `💸 Paid $${paidAmount} (all money). Still owes $${shortage}`, 'payment');
                showMessage(`💸 ${player.name} paid all remaining money ($${paidAmount}) but still owes $${shortage}!`);
            }
            
            updatePlayerInfo();
            
            // Clear waiting state
            isWaitingForAction = false;
            
            setTimeout(() => {
                nextPlayerTurn();
            }, 3000);
        }
        
        function nextPlayerTurn() {
            currentPlayer = (currentPlayer + 1) % players.length;
            
            // Increment turn counter when it's player 1's turn again
            if (currentPlayer === 0) {
                turnCounter++;
            }
            
            updatePlayerInfo();
            
            // Re-enable roll button for next player
            document.getElementById('rollBtn').disabled = false;
            isWaitingForAction = false;
            
            showMessage(`${players[currentPlayer].name}'s turn! Roll the dice! 🎲`);
        }
        
        function showMessage(text) {
            document.getElementById('message').innerHTML = text;
        }
        
        // Log system functions
        function addToPlayerLog(playerIndex, message, type) {
            if (!playerLogs[playerIndex]) {
                playerLogs[playerIndex] = [];
            }
            
            const timestamp = new Date().toLocaleTimeString();
            playerLogs[playerIndex].push({
                message: message,
                type: type,
                time: timestamp
            });
        }
        
        function showPlayerLog(playerIndex) {
            const player = players[playerIndex];
            const modal = document.getElementById('logModal');
            const playerNameElement = document.getElementById('logPlayerName');
            const logEntriesElement = document.getElementById('logEntries');
            
            playerNameElement.textContent = `${player.name}'s Game Log`;
            playerNameElement.style.color = player.color;
            
            // Clear previous entries
            logEntriesElement.innerHTML = '';
            
            if (!playerLogs[playerIndex] || playerLogs[playerIndex].length === 0) {
                logEntriesElement.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">No actions yet!</div>';
            } else {
                // Show entries in reverse order (newest first)
                const entries = [...playerLogs[playerIndex]].reverse();
                entries.forEach(entry => {
                    const entryDiv = document.createElement('div');
                    entryDiv.className = `log-entry log-${entry.type}`;
                    entryDiv.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div style="flex: 1;">${entry.message}</div>
                            <div style="font-size: 0.8rem; color: #888; margin-left: 10px;">${entry.time}</div>
                        </div>
                    `;
                    logEntriesElement.appendChild(entryDiv);
                });
            }
            
            modal.style.display = 'flex';
        }
        
        function closeLog() {
            document.getElementById('logModal').style.display = 'none';
        }
        
        // Close modal when clicking outside
        document.getElementById('logModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeLog();
            }
        });
        
        // Quick action functions
        function showAllProperties() {
            let propertyList = "🏠 ALL PETS IN GAME:\n\n";
            
            boardSpaces.forEach((space, index) => {
                if (space.type === 'pet') {
                    const owner = ownedSpaces[index];
                    const ownerName = owner !== undefined ? players[owner].name : 'Available';
                    propertyList += `${space.emoji} ${space.name} - $${space.price}\n`;
                    propertyList += `   Owner: ${ownerName}\n`;
                    propertyList += `   Rent: $${space.rent}\n\n`;
                }
            });
            
            alert(propertyList);
        }
        
        function showLeaderboard() {
            const sortedPlayers = [...players].sort((a, b) => {
                const aTotal = a.money + (a.pets.length * 100);
                const bTotal = b.money + (b.pets.length * 100);
                return bTotal - aTotal;
            });
            
            let leaderboard = "🏆 CURRENT LEADERBOARD:\n\n";
            sortedPlayers.forEach((player, index) => {
                const totalValue = player.money + (player.pets.length * 100);
                leaderboard += `${index + 1}. ${player.name}\n`;
                leaderboard += `   Money: $${player.money}\n`;
                leaderboard += `   Pets: ${player.pets.length}\n`;
                leaderboard += `   Total Value: $${totalValue}\n\n`;
            });
            
            alert(leaderboard);
        }
        
        function resetGame() {
            if (confirm('Are you sure you want to start a new game? All progress will be lost!')) {
                location.reload();
            }
        }
        
        // Initialize the setup screen
        generatePlayerSetup();
    </script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9696e073746ad326',t:'MTc1NDIzNTI0MS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
