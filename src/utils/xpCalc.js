const firstNeedXp = 100;
export default ({ level = 0, xp = 0 } = { level: 0, xp: 0 }) => {

    while (level * 200 + firstNeedXp > xp) {
        level++;
        xp -= level * 200 + firstNeedXp;
    }

    return { level, xp };
}