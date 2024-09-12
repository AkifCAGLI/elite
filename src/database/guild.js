import { model, Schema } from 'mongoose';
export default model('guilds', new Schema({
    guildID: {
        type: String,
        required: true
    },
    levelDisable: {
        type: Boolean,
        required: true,
        default: false
    },
    levelChannelEnable: {
        type: Boolean,
        required: true,
        default: false
    },
    levelChannelID: String,
    levelMessage: {
        type: String,
        required: true,
        default: "Hey {user}, welcome to **{server}**!"
    }
}));