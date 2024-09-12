import { Client, Collection } from "discord.js";
import { readdirSync } from 'fs';

export default class baseClient extends Client {
    constructor(options) {
        super(options);
        this.commands = new Collection();
        this.databaseData = new Collection();
    }
    loadEvents() {
        readdirSync('./src/events/').forEach(event => {
            import(`./src/events/${event}`).then(m => m.default(this));
        });
        return true;
    }
    loadCommand() {
        readdirSync("./src/command").forEach(dir => {
            readdirSync(`./src/command/${dir}`).forEach(async file => {
                const command = await import(`./src/command/${dir}/${file}`).then(m => m.default);
                command.category = dir;
                this.commands.set(command.name, command);
            });
        });
        return true;
    }
    async loadDatabase() {
        const db = readdirSync(`./src/database`);
        await Promise.all(db.map(async x => {
            const veri = await import(`./src/database/${x}`).then(m => m.default);
            this.databaseData.set(x.toLowerCase().split('.')[0], veri);
            return veri;
        }))
    }
    database(dir) {
        let db = this.databaseData.get(dir.toLowerCase())
        if (!db) throw new Error(`${dir} is not a valid database ${this.databaseData.values()}`);
        return db;
    }
}