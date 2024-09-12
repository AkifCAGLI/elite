import baseClient from './baseClient.js';
import { Partials, Options, GatewayIntentBits } from 'discord.js';
import db from 'mongoose';
import "dotenv/config";

const allIntents = Object.keys(GatewayIntentBits).filter(x => typeof x != 'number');
const client = new baseClient({
    intents: allIntents,
    partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
    presence: { status: "dnd", activities: [{ name: `Elite's`, type: 1 }] },
    sweepers: {
        ...Options.DefaultSweeperSettings,
        messages: {
            interval: 1800,
            filter: () => message => {
                let time = (Date.now() - (message.editedTimestamp ?? message.createdTimestamp));

                if (time > 1_200_000/*20 min*/) return time;
                return message.author?.bot && client.user.id != message.author.id;
            }
        }
    }
});

await client.loadDatabase();
client.loadEvents();
client.loadCommand();

db.connect(process.env.dbp)
    .then(() => console.log('mongodb hazır'));
client.login(process.env.token);