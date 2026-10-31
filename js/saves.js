
/* CONDEMNED — SAVE SYSTEM */

const SAVE_KEY = "condemned_saves";
const ACTIVE_SAVE_KEY = "condemned_active_save";

const DEFAULT_GAME_STATE = {
    episode: 1,
    progress: 0,

    trust: 0,
    chemistry: 0,
    authority: 0,
    loyalty: 0,
    finances: 0,
    exposure: 0,
    reputation: 0,
    independence: 0,

    choices: [],
    evidence: [],
    unlockedEpisodes: [1],
    endings: [],
    flags: {}
};

function getAllSaves() {
    try {
        return JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
    } catch (error) {
        return {};
    }
}

function createSave(slot) {
    const saves = getAllSaves();

    saves[slot] = {
        ...DEFAULT_GAME_STATE,
        choices: [],
        evidence: [],
        unlockedEpisodes: [1],
        endings: [],
        flags: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
    localStorage.setItem(ACTIVE_SAVE_KEY, slot);

    return saves[slot];
}

function getActiveSave() {
    const slot = localStorage.getItem(ACTIVE_SAVE_KEY);

    if (!slot) return null;

    const saves = getAllSaves();
    return saves[slot] || null;
}

function saveGame(data) {
    const slot = localStorage.getItem(ACTIVE_SAVE_KEY);

    if (!slot) return false;

    const saves = getAllSaves();

    saves[slot] = {
        ...saves[slot],
        ...data,
        updatedAt: new Date().toISOString()
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saves));

    return true;
}

function loadGame(slot) {
    const saves = getAllSaves();

    if (!saves[slot]) return null;

    localStorage.setItem(ACTIVE_SAVE_KEY, slot);

    return saves[slot];
}

function deleteSave(slot) {
    const saves = getAllSaves();

    delete saves[slot];

    localStorage.setItem(SAVE_KEY, JSON.stringify(saves));

    if (localStorage.getItem(ACTIVE_SAVE_KEY) === slot) {
        localStorage.removeItem(ACTIVE_SAVE_KEY);
    }
}

function updateGameStat(stat, amount) {
    const game = getActiveSave();

    if (!game || typeof game[stat] !== "number") return;

    game[stat] += amount;
    saveGame(game);
}

function recordChoice(choice) {
    const game = getActiveSave();

    if (!game) return;

    game.choices.push({
        choice: choice,
        date: new Date().toISOString()
    });

    saveGame(game);
}

function unlockEpisode(episode) {
    const game = getActiveSave();

    if (!game) return;

    if (!game.unlockedEpisodes.includes(episode)) {
        game.unlockedEpisodes.push(episode);
    }

    saveGame(game);
}

function setGameFlag(name, value = true) {
    const game = getActiveSave();

    if (!game) return;

    game.flags[name] = value;
    saveGame(game);
}

function addEvidence(evidence) {
    const game = getActiveSave();

    if (!game) return;

    if (!game.evidence.includes(evidence)) {
        game.evidence.push(evidence);
    }

    saveGame(game);
}
