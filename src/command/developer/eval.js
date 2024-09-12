import util from 'util';
export default {
    name: 'eval',
    description: 'eval',
    aliases: ['e'],
    async execute(message, args) {
        if (["645369244997124115", "354272053756690433", "639200958089265162"].includes(message.author.id)) {
            try {
                const { client } = message;
                let code = await eval(args.join(' '));
                if (typeof code !== 'string') code = util.inspect(code, { depth: 0 });
                if (code.length > 2000) {
                    message.channel.send(`${code.slice(0, 2000)}`);
                    message.channel.send(`${code.slice(2000, 4000)}`);
                } else message.channel.send(`${code}`);
            } catch (e) {
                message.channel.send('hata');
                e = e.toString();
                message.client.channels.cache.get("1007030619273957506")?.send(`${e.slice(0, 2000)}`);
                if (e.length > 2000) message.client.channels.cache.get("1007030619273957506")?.send(`${e.slice(2000, 4000)}`);
            }
        }
    }
}