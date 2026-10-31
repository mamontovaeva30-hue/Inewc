
/* CONDEMNED — RELATIONSHIPS SYSTEM */

window.GAME_RELATIONSHIPS = {

    stats: {
        trust: 0,
        chemistry: 0,
        authority: 0,
        loyalty: 0,
        finances: 0,
        exposure: 0,
        reputation: 0,
        independence: 0
    },

    descriptions: {
        trust: "Доверие",
        chemistry: "Химия",
        authority: "Авторитет",
        loyalty: "Лояльность",
        finances: "Финансы",
        exposure: "Раскрытие секретов",
        reputation: "Репутация",
        independence: "Независимость"
    },

    init: function() {
        this.load();
        this.updateInterface();
    },

    load: function() {
        if (typeof getActiveSave !== "function") return;

        const save = getActiveSave();

        if (!save) return;

        Object.keys(this.stats).forEach(stat => {
            if (typeof save[stat] === "number") {
                this.stats[stat] = save[stat];
            }
        });
    },

    change: function(stat, amount) {
        if (!(stat in this.stats)) {
            console.warn("Неизвестный показатель:", stat);
            return;
        }

        this.stats[stat] += amount;

        if (typeof updateGameStat === "function") {
            updateGameStat(stat, amount);
        }

        this.updateInterface();

        return this.stats[stat];
    },

    set: function(stat, value) {
        if (!(stat in this.stats)) return;

        this.stats[stat] = value;

        if (typeof saveGame === "function") {
            saveGame({ [stat]: value });
        }

        this.updateInterface();
    },

    get: function(stat) {
        return this.stats[stat] ?? 0;
    },

    getStatus: function() {
        const trust = this.get("trust");
        const chemistry = this.get("chemistry");

        if (trust >= 15 && chemistry >= 15) {
            return "Особая связь";
        }

        if (chemistry >= 10) {
            return "Взаимное притяжение";
        }

        if (trust >= 10) {
            return "Растущее доверие";
        }

        if (trust <= -10) {
            return "Недоверие";
        }

        return "Непростые отношения";
    },

    updateInterface: function() {
        this.updateBar("trust-bar", "trust");
        this.updateBar("chemistry-bar", "chemistry");

        const status = document.getElementById(
            "relationship-status"
        );

        if (status) {
            status.textContent = this.getStatus();
        }
    },

    updateBar: function(elementId, stat) {
        const bar = document.getElementById(elementId);

        if (!bar) return;

        const value = this.get(stat);

        const percentage = Math.max(
            0,
            Math.min(100, 50 + value * 2)
        );

        bar.style.width = percentage + "%";
    },

    getAllStats: function() {
        return { ...this.stats };
    }
};

document.addEventListener("DOMContentLoaded", function() {
    GAME_RELATIONSHIPS.init();
});
