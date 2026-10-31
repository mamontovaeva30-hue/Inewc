
/* CONDEMNED — STORY EVENTS */

window.GAME_EVENTS = {

    episodes: [
        {
            id: 1,
            title: "THE CONTRACT",
            name: "Контракт",
            task: "Познакомиться со Скарлетт и изучить условия соглашения.",
            description: "Первое столкновение двух влиятельных наследниц.",
            next: 2
        },
        {
            id: 2,
            title: "FIRST IMPRESSION",
            name: "Первое впечатление",
            task: "Узнать больше о VANTA TECHNOLOGIES.",
            description: "Деловая встреча превращается в личное противостояние.",
            next: 3
        },
        {
            id: 3,
            title: "BAD COMPANY",
            name: "Плохая компания",
            task: "Найти источник утечки корпоративной информации.",
            description: "Внутри CONDEMNED кто-то играет против Доминики.",
            next: 4
        },
        {
            id: 4,
            title: "DIGITAL GHOST",
            name: "Цифровой призрак",
            task: "Изучить загадочное цифровое досье.",
            description: "Прошлое Скарлетт начинает всплывать.",
            next: 5
        },
        {
            id: 5,
            title: "NO TRUST",
            name: "Нет доверия",
            task: "Определить, кому можно доверять.",
            description: "Каждая сторона скрывает часть правды.",
            next: 6
        },
        {
            id: 6,
            title: "AFTER HOURS",
            name: "После полуночи",
            task: "Расследовать ночную встречу.",
            description: "Случайная встреча меняет отношения героинь.",
            next: 7
        },
        {
            id: 7,
            title: "THE HEIRS",
            name: "Наследники",
            task: "Изучить семейные документы.",
            description: "Старые семейные тайны выходят наружу.",
            next: 8
        },
        {
            id: 8,
            title: "PRIVATE ACCESS",
            name: "Закрытый доступ",
            task: "Найти недостающую часть архива.",
            description: "Ключ к расследованию оказывается ближе, чем кажется.",
            next: 9
        },
        {
            id: 9,
            title: "THE OTHER SIDE",
            name: "Другая сторона",
            task: "Выяснить мотивы неизвестного союзника.",
            description: "Привычные представления начинают рушиться.",
            next: 10
        },
        {
            id: 10,
            title: "DOUBLE GAME",
            name: "Двойная игра",
            task: "Определить, кто ведёт двойную игру.",
            description: "Не все союзники играют на одной стороне.",
            next: 11
        },
        {
            id: 11,
            title: "NO MERCY",
            name: "Без пощады",
            task: "Принять решение о будущем CONDEMNED.",
            description: "Доминике приходится выбирать между властью и доверием.",
            next: 12
        },
        {
            id: 12,
            title: "THE NIGHT WE MET",
            name: "Ночь нашей встречи",
            task: "Восстановить события прошлого.",
            description: "Одна ночь связывает несколько важных секретов.",
            next: 13
        },
        {
            id: 13,
            title: "THE BETRAYAL",
            name: "Предательство",
            task: "Выяснить, кто скрыл важную информацию.",
            description: "Последствия прежних решений становятся очевидными.",
            next: 14
        },
        {
            id: 14,
            title: "OPEN SECRETS",
            name: "Открытые секреты",
            task: "Сопоставить найденные доказательства.",
            description: "Расследование приближается к разгадке.",
            next: 15
        },
        {
            id: 15,
            title: "THE PRICE",
            name: "Цена выбора",
            task: "Определить, чем ты готова пожертвовать.",
            description: "Каждое решение имеет свою цену.",
            next: 16
        },
        {
            id: 16,
            title: "COLLAPSE",
            name: "Крах",
            task: "Попытаться сохранить то, что ещё осталось.",
            description: "Империя оказывается на грани разрушения.",
            next: 17
        },
        {
            id: 17,
            title: "NO WAY BACK",
            name: "Пути назад нет",
            task: "Подготовиться к последнему противостоянию.",
            description: "Все сюжетные линии сходятся вместе.",
            next: 18
        },
        {
            id: 18,
            title: "CONDEMNED",
            name: "Приговор",
            task: "Принять окончательное решение.",
            description: "Твои выборы определят финал истории.",
            next: null
        }
    ],

    currentEpisode: 1,

    getEpisode: function(id) {
        return this.episodes.find(episode => episode.id === id);
    },

    startEpisode: function(id) {
        const episode = this.getEpisode(id);

        if (!episode) return;

        this.currentEpisode = id;

        if (typeof saveGame === "function") {
            saveGame({
                episode: id,
                progress: 0
            });
        }

        this.updateInterface();

        return episode;
    },

    completeEpisode: function() {
        const episode = this.getEpisode(this.currentEpisode);

        if (!episode) return;

        if (episode.next !== null) {
            if (typeof unlockEpisode === "function") {
                unlockEpisode(episode.next);
            }

            this.startEpisode(episode.next);
        } else {
            this.showEndingMessage();
        }
    },

    updateProgress: function(amount = 1) {
        const save = typeof getActiveSave === "function"
            ? getActiveSave()
            : null;

        if (!save) return;

        const progress = Math.min(
            100,
            (save.progress || 0) + amount
        );

        saveGame({ progress: progress });

        this.updateInterface();
    },

    updateInterface: function() {
        const episode = this.getEpisode(this.currentEpisode);

        if (!episode) return;

        const name = document.getElementById("episode-name");
        const number = document.getElementById("episode-number");
        const title = document.getElementById("task-title");
        const description = document.getElementById("task-description");
        const progressBar = document.getElementById("episode-progress-bar");
        const progressText = document.getElementById("episode-progress-text");

        if (name) name.textContent = episode.title;
        if (number) number.textContent = episode.id;
        if (title) title.textContent = episode.task;
        if (description) description.textContent = episode.description;

        const save = typeof getActiveSave === "function"
            ? getActiveSave()
            : null;

        const progress = save?.progress || 0;

        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

        if (progressText) {
            progressText.textContent = progress + "%";
        }
    },

    showEndingMessage: function() {
        alert("История CONDEMNED завершена. Твои решения определили её финал.");
    }
};

document.addEventListener("DOMContentLoaded", function() {
    const save = typeof getActiveSave === "function"
        ? getActiveSave()
        : null;

    if (save) {
        GAME_EVENTS.currentEpisode = save.episode || 1;
    }

    GAME_EVENTS.updateInterface();
});
