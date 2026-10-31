
/* CONDEMNED — CALL SYSTEM */

window.GAME_CALLS = {

    contacts: {
        scarlett: {
            name: "Скарлетт Хейл",
            role: "VANTA TECHNOLOGIES",
            avatar: "assets/characters/scarlett.jpg",
            incomingText: "Скарлетт звонит тебе..."
        },

        damian: {
            name: "Дамиан Рид",
            role: "EXECUTIVE OFFICE",
            avatar: "assets/characters/damian.jpg",
            incomingText: "Дамиан звонит тебе..."
        },

        miranda: {
            name: "Миранда Кейн",
            role: "INTELLIGENCE",
            avatar: "assets/characters/miranda.jpg",
            incomingText: "Миранда звонит тебе..."
        }
    },

    currentCall: null,

    history: [],

    start: function(contactId) {
        const contact = this.contacts[contactId];

        if (!contact) return;

        this.currentCall = {
            id: contactId,
            contact: contact,
            status: "incoming"
        };

        this.showScreen();
    },

    showScreen: function() {
        const oldScreen = document.getElementById("game-call-screen");

        if (oldScreen) oldScreen.remove();

        const call = this.currentCall;
        if (!call) return;

        const screen = document.createElement("div");

        screen.id = "game-call-screen";

        screen.innerHTML = `
            <div class="game-call-content">

                <div class="game-call-label">
                    CONDEMNED SECURE LINE
                </div>

                <div class="game-call-avatar">
                    <img
                        src="${call.contact.avatar}"
                        alt="${call.contact.name}"
                        onerror="this.style.display='none'"
                    >
                </div>

                <h2>${call.contact.name}</h2>

                <p>${call.contact.role}</p>

                <div id="game-call-status">
                    ${call.contact.incomingText}
                </div>

                <div class="game-call-buttons">
                    <button onclick="GAME_CALLS.decline()">
                        Отклонить
                    </button>

                    <button onclick="GAME_CALLS.answer()">
                        Ответить
                    </button>
                </div>

            </div>
        `;

        screen.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #100d10;
            color: #f5edf0;
            font-family: Arial, sans-serif;
            text-align: center;
        `;

        const style = document.createElement("style");

        style.textContent = `
            .game-call-content {
                width: 90%;
                max-width: 380px;
                padding: 25px;
            }

            .game-call-label {
                color: #a66b78;
                letter-spacing: 3px;
                font-size: 11px;
                margin-bottom: 50px;
            }

            .game-call-avatar {
                width: 145px;
                height: 145px;
                margin: auto;
                border-radius: 50%;
                overflow: hidden;
                background: #30232a;
                border: 2px solid #814151;
            }

            .game-call-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .game-call-content h2 {
                font-family: Georgia, serif;
                margin-top: 25px;
            }

            .game-call-content p {
                color: #a99ba2;
                font-size: 12px;
                letter-spacing: 2px;
            }

            #game-call-status {
                margin: 35px 0;
                color: #d5c5cc;
            }

            .game-call-buttons {
                display: flex;
                justify-content: center;
                gap: 15px;
            }

            .game-call-buttons button {
                border: 1px solid #75404e;
                border-radius: 30px;
                padding: 14px 20px;
                background: #301c24;
                color: white;
                font-size: 13px;
            }

            .game-call-buttons button:last-child {
                background: #81394c;
            }
        `;

        screen.appendChild(style);
        document.body.appendChild(screen);
    },

    answer: function() {
        if (!this.currentCall) return;

        this.currentCall.status = "active";

        const status = document.getElementById("game-call-status");

        if (status) {
            status.textContent = "Соединение установлено...";
        }

        const buttons = document.querySelector(
            ".game-call-buttons"
        );

        if (buttons) {
            buttons.innerHTML = `
                <button onclick="GAME_CALLS.end()">
                    Завершить звонок
                </button>
            `;
        }

        this.history.push({
            contact: this.currentCall.id,
            result: "answered",
            date: new Date().toISOString()
        });
    },

    decline: function() {
        this.finish("declined");
    },

    end: function() {
        this.finish("completed");
    },

    finish: function(result) {
        if (!this.currentCall) return;

        this.history.push({
            contact: this.currentCall.id,
            result: result,
            date: new Date().toISOString()
        });

        const screen = document.getElementById("game-call-screen");

        if (screen) screen.remove();

        this.currentCall = null;
    }
};

/* Кнопки вызова персонажей */

document.addEventListener("click", function(event) {
    const button = event.target.closest("[data-call]");

    if (!button) return;

    GAME_CALLS.start(button.dataset.call);
});
