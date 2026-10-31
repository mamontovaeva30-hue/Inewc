
/* CONDEMNED — MAIN GAME SYSTEM */

window.CONDEMNED = {

    initialized: false,

    // Запуск игры
    init: function() {
        if (this.initialized) return;

        this.initialized = true;

        this.setupScreens();
        this.setupNavigation();
        this.setupGameButtons();
        this.setupEpisodeButtons();
        this.setupMessenger();

        this.hideLoadingScreen();
        this.updateHomeScreen();
    },

    // Убираем загрузочный экран
    hideLoadingScreen: function() {
        const loading = document.getElementById("loading-screen");
        const game = document.getElementById("game");

        if (loading) loading.style.display = "none";
        if (game) game.style.display = "block";
    },

    // Переключение экранов
    setupScreens: function() {
        document.querySelectorAll("[data-screen]").forEach(button => {
            button.addEventListener("click", () => {
                this.openScreen(button.dataset.screen);
            });
        });
    },

    openScreen: function(screenName) {
        const screens = document.querySelectorAll(
            ".screen, [id$='-screen']"
        );

        screens.forEach(screen => {
            if (screen.id === "loading-screen") return;
            screen.style.display = "none";
        });

        const target = document.getElementById(
            screenName + "-screen"
        );

        if (target) {
            target.style.display = "block";
        } else {
            console.warn("Экран не найден:", screenName);
        }
    },

    // Навигация
    setupNavigation: function() {
        document.querySelectorAll("[data-screen]").forEach(button => {
            button.addEventListener("click", () => {
                document.querySelectorAll("[data-screen]").forEach(item => {
                    item.classList.remove("active");
                });

                button.classList.add("active");
            });
        });
    },

    // Основные кнопки
    setupGameButtons: function() {
        const continueButton = document.getElementById("continue-button");
        const taskButton = document.getElementById("task-button");
        const saveButton = document.getElementById("save-button");

        if (continueButton) {
            continueButton.addEventListener("click", () => {
                this.continueGame();
            });
        }

        if (taskButton) {
            taskButton.addEventListener("click", () => {
                this.openScreen("episodes");
            });
        }

        if (saveButton) {
            saveButton.addEventListener("click", () => {
                this.saveCurrentGame();
            });
        }
    },

    // Новая игра или продолжение
    continueGame: function() {
        let save = typeof getActiveSave === "function"
            ? getActiveSave()
            : null;

        if (!save) {
            const saves = typeof getAllSaves === "function"
                ? getAllSaves()
                : {};

            const existingSlot = Object.keys(saves)[0];

            if (existingSlot) {
                save = loadGame(existingSlot);
            } else if (typeof createSave === "function") {
                save = createSave("slot1");
            }
        }

        if (!save) {
            alert("Не удалось создать сохранение.");
            return;
        }

        if (window.GAME_EVENTS) {
            GAME_EVENTS.currentEpisode = save.episode || 1;
            GAME_EVENTS.updateInterface();
        }

        this.openScreen("home");
    },

    // Сохранение
    saveCurrentGame: function() {
        if (typeof getActiveSave !== "function" ||
            typeof saveGame !== "function") {
            return;
        }

        const save = getActiveSave();

        if (!save) {
            alert("Сначала начни новую игру.");
            return;
        }

        saveGame(save);
        alert("Игра сохранена.");
    },

    // Кнопки эпизодов
    setupEpisodeButtons: function() {
        document.querySelectorAll("[data-episode]").forEach(button => {
            button.addEventListener("click", () => {
                const episodeId = Number(button.dataset.episode);
                this.openEpisode(episodeId);
            });
        });
    },

    openEpisode: function(episodeId) {
        const save = typeof getActiveSave === "function"
            ? getActiveSave()
            : null;

        if (!save) {
            alert("Сначала начни игру.");
            return;
        }

        const unlocked = save.unlockedEpisodes || [1];

        if (!unlocked.includes(episodeId)) {
            alert("Этот эпизод пока закрыт.");
            return;
        }

        if (window.GAME_EVENTS) {
            GAME_EVENTS.startEpisode(episodeId);
        }

        this.openScreen("home");
    },

    // Мессенджер
    setupMessenger: function() {
        document.querySelectorAll("[data-chat]").forEach(button => {
            button.addEventListener("click", () => {
                this.openScreen("messenger");
            });
        });
    },

    // Обновление главного экрана
    updateHomeScreen: function() {
        const save = typeof getActiveSave === "function"
            ? getActiveSave()
            : null;

        if (!save) return;

        if (window.GAME_EVENTS) {
            GAME_EVENTS.currentEpisode = save.episode || 1;
            GAME_EVENTS.updateInterface();
        }

        if (window.GAME_RELATIONSHIPS) {
            GAME_RELATIONSHIPS.load();
            GAME_RELATIONSHIPS.updateInterface();
        }
    }
};

// Запуск после загрузки страницы
document.addEventListener("DOMContentLoaded", function() {
    CONDEMNED.init();
});
  
