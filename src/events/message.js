import messageXpUtil from "../utils/message.js"

export default client => {

    client.on('messageCreate', async message => {
        console.log(message)
        if (message.webhookID || message.author.bot) return;

        // if (message.channel.type !== 1) messageXpUtil(message);
        if (!message.content.toLowerCase().startsWith(process.env.prefix)) return;

        const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
        const commandName = args.shift()?.toLocaleLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        if (command.category == "developer" && !["645369244997124115", "354272053756690433", "639200958089265162"].includes(message.author.id)) return message.reply('Bu komutu kullanmak için yetkin yok');
        if (message.channel.type == 1 && (!["645369244997124115", "354272053756690433", "639200958089265162"].includes(message.author.id) || command.name !== "eval")) return;

        try {
            command.execute(message, args);
        } catch (e) {
            console.log(e);
            message.channel.send('Hata ile karşılaştık');
        }
    });

}