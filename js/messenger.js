
/* CONDEMNED — MESSENGER SYSTEM */

window.GAME_MESSENGER = {

    currentChat: null,

    init: function() {
        this.bindChatButtons();
        this.bindSendButton();
    },

    bindChatButtons: function() {
        document.querySelectorAll("[data-chat]").forEach(button => {
            button.addEventListener("click", () => {
                this.openChat(button.dataset.chat);
            });
        });
    },

    openChat: function(chatId) {
        const chat = window.CONVERSATIONS?.[chatId];

        if (!chat) {
            console.warn("Чат не найден:", chatId);
            return;
        }

        this.currentChat = chatId;

        const title = document.getElementById("chat-title");
        const messages = document.getElementById("chat-messages");
        const choices = document.getElementById("chat-choices");

        if (title) title.textContent = chat.name;

        if (messages) {
            messages.innerHTML = "";

            chat.messages.forEach(message => {
                this.renderMessage(message, messages);
            });
        }

        if (choices) {
            choices.innerHTML = "";

            if (chat.choices) {
                chat.choices.forEach((choice, index) => {
                    const button = document.createElement("button");

                    button.className = "chat-choice";
                    button.textContent = choice.text;

                    button.addEventListener("click", () => {
                        this.chooseAnswer(index);
                    });

                    choices.appendChild(button);
                });
            }
        }

        if (messages) {
            messages.scrollTop = messages.scrollHeight;
        }
    },

    renderMessage: function(message, container) {
        const bubble = document.createElement("div");

        bubble.className =
            "message message-" + message.sender;

        if (message.type === "text") {
            bubble.textContent = message.text;
        }

        if (message.type === "attachment") {
            bubble.textContent =
                "📎 " + message.caption;
        }

        if (message.type === "voice") {
            bubble.textContent =
                "🎙 Голосовое сообщение: " +
                (message.transcript || "Прослушать");
        }

        const time = document.createElement("span");

        time.className = "message-time";
        time.textContent = message.time || "";

        bubble.appendChild(time);
        container.appendChild(bubble);
    },

    chooseAnswer: function(index) {
        const chat = window.CONVERSATIONS?.[this.currentChat];

        if (!chat || !chat.choices?.[index]) return;

        const choice = chat.choices[index];

        if (typeof recordChoice === "function") {
            recordChoice(choice.text);
        }

        if (choice.effects) {
            Object.entries(choice.effects).forEach(([stat, amount]) => {
                if (typeof updateGameStat === "function") {
                    updateGameStat(stat, amount);
                }
            });
        }

        const playerMessage = {
            sender: "player",
            type: "text",
            text: choice.text,
            time: this.getTime()
        };

        const messages = document.getElementById("chat-messages");

        if (messages) {
            this.renderMessage(playerMessage, messages);
        }

        const next = chat.specialMessages?.[choice.nextMessage];

        if (next && messages) {
            this.renderMessage(next, messages);
        }

        const choices = document.getElementById("chat-choices");

        if (choices) {
            choices.innerHTML = "";
        }

        if (messages) {
            messages.scrollTop = messages.scrollHeight;
        }
    },

    bindSendButton: function() {
        const button = document.getElementById("send-message");
        const input = document.getElementById("message-input");

        if (!button || !input) return;

        button.addEventListener("click", () => {
            this.sendMessage(input.value);
            input.value = "";
        });
    },

    sendMessage: function(text) {
        if (!text.trim()) return;

        const messages = document.getElementById("chat-messages");

        if (!messages) return;

        this.renderMessage({
            sender: "player",
            type: "text",
            text: text,
            time: this.getTime()
        }, messages);

        messages.scrollTop = messages.scrollHeight;
    },

    getTime: function() {
        return new Date().toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit"
        });
    }
};

document.addEventListener("DOMContentLoaded", function() {
    GAME_MESSENGER.init();
});
