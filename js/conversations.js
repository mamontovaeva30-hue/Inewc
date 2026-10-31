
/* CONDEMNED — CONVERSATIONS */

window.CONVERSATIONS = {

    scarlett: {
        name: "Скарлетт Хейл",
        status: "В сети",
        avatar: "assets/characters/scarlett.jpg",

        messages: [
            {
                id: 1,
                sender: "scarlett",
                type: "text",
                text: "Нам нужно поговорить.",
                time: "21:14"
            },
            {
                id: 2,
                sender: "scarlett",
                type: "text",
                text: "И прежде чем ты начнёшь спорить — нет, это не приглашение на ужин.",
                time: "21:14"
            },
            {
                id: 3,
                sender: "player",
                type: "text",
                text: "Жаль. Я уже выбирала ресторан.",
                time: "21:15"
            },
            {
                id: 4,
                sender: "scarlett",
                type: "text",
                text: "Чернова, у тебя удивительный талант раздражать меня даже через экран.",
                time: "21:15"
            }
        ],

        choices: [
            {
                text: "«Ты тоже умеешь поднять мне настроение».",
                effects: {
                    chemistry: 2
                },
                nextMessage: "scarlett_flirt"
            },
            {
                text: "«Перейдём к делу, Хейл».",
                effects: {
                    authority: 1
                },
                nextMessage: "scarlett_business"
            },
            {
                text: "«Что случилось?»",
                effects: {
                    trust: 1
                },
                nextMessage: "scarlett_serious"
            }
        ]
    },

    damian: {
        name: "Дамиан Рид",
        status: "Был недавно",
        avatar: "assets/characters/damian.jpg",

        messages: [
            {
                id: 1,
                sender: "damian",
                type: "text",
                text: "У нас проблема.",
                time: "20:48"
            },
            {
                id: 2,
                sender: "damian",
                type: "text",
                text: "Документы по сделке изменили после согласования.",
                time: "20:49"
            },
            {
                id: 3,
                sender: "damian",
                type: "text",
                text: "Я проверяю, кто имел доступ к последней версии.",
                time: "20:49"
            }
        ],

        choices: [
            {
                text: "«Проверь список сотрудников».",
                effects: {
                    authority: 1
                },
                nextMessage: "damian_staff"
            },
            {
                text: "«Никому пока не говори».",
                effects: {
                    loyalty: 1
                },
                nextMessage: "damian_secret"
            }
        ]
    },

    miranda: {
        name: "Миранда Кейн",
        status: "В сети",
        avatar: "assets/characters/miranda.jpg",

        messages: [
            {
                id: 1,
                sender: "miranda",
                type: "text",
                text: "Я нашла кое-что интересное.",
                time: "22:03"
            },
            {
                id: 2,
                sender: "miranda",
                type: "text",
                text: "Имя Скарлетт Хейл встречается в старом архиве CONDEMNED.",
                time: "22:04"
            },
            {
                id: 3,
                sender: "miranda",
                type: "text",
                text: "Но дата создания документа вызывает вопросы.",
                time: "22:04"
            },
            {
                id: 4,
                sender: "miranda",
                type: "attachment",
                file: "attachments/old_archive.pdf",
                caption: "Старый архив — фрагмент документа",
                time: "22:05"
            }
        ],

        choices: [
            {
                text: "«Пришли полный отчёт».",
                effects: {
                    trust: 1
                },
                nextMessage: "miranda_report"
            },
            {
                text: "«Пока не трогай этот файл».",
                effects: {
                    authority: 1
                },
                nextMessage: "miranda_wait"
            }
        ]
    },

    group: {
        name: "THE INNER CIRCLE",
        status: "4 участника",
        avatar: "assets/characters/group.jpg",

        messages: [
            {
                id: 1,
                sender: "damian",
                type: "text",
                text: "Все здесь?",
                time: "23:16"
            },
            {
                id: 2,
                sender: "miranda",
                type: "text",
                text: "Да. Что произошло?",
                time: "23:16"
            },
            {
                id: 3,
                sender: "scarlett",
                type: "text",
                text: "Надеюсь, это не очередное совещание в полночь.",
                time: "23:17"
            },
            {
                id: 4,
                sender: "damian",
                type: "text",
                text: "Боюсь, именно оно.",
                time: "23:17"
            },
            {
                id: 5,
                sender: "player",
                type: "text",
                text: "Кто-нибудь объяснит, что происходит?",
                time: "23:18"
            }
        ],

        choices: [
            {
                text: "«Начинайте с самого начала».",
                effects: {
                    authority: 1
                },
                nextMessage: "group_explanation"
            },
            {
                text: "«Скарлетт, ты что-нибудь знаешь?»",
                effects: {
                    chemistry: 1
                },
                nextMessage: "group_scarlett"
            }
        ]
    },

    specialMessages: {

        scarlett_flirt: {
            sender: "scarlett",
            type: "text",
            text: "Не льсти себе, Чернова.",
            time: "21:16"
        },

        scarlett_business: {
            sender: "scarlett",
            type: "text",
            text: "Наконец-то. У меня есть информация о VANTA.",
            time: "21:16"
        },

        scarlett_serious: {
            sender: "scarlett",
            type: "text",
            text: "Кто-то пытается получить доступ к моим старым документам.",
            time: "21:16"
        },

        damian_staff: {
            sender: "damian",
            type: "text",
            text: "Уже занимаюсь этим. Отчёт будет утром.",
            time: "20:50"
        },

        damian_secret: {
            sender: "damian",
            type: "text",
            text: "Понял. Пока информация останется между нами.",
            time: "20:50"
        },

        miranda_report: {
            sender: "miranda",
            type: "text",
            text: "Отправлю тебе всё, что удалось восстановить.",
            time: "22:06"
        },

        miranda_wait: {
            sender: "miranda",
            type: "text",
            text: "Хорошо. Сохраню копию и продолжу наблюдать.",
            time: "22:06"
        },

        group_explanation: {
            sender: "damian",
            type: "text",
            text: "В архиве обнаружили документы, связанные с семьёй Хейл.",
            time: "23:19"
        },

        group_scarlett: {
            sender: "scarlett",
            type: "text",
            text: "Я бы тоже хотела знать, почему моё имя снова всплыло.",
            time: "23:19"
        }
    }
};
