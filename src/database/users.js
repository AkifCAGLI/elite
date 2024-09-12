import { model, Schema } from 'mongoose';
export default model('users', new Schema({
    memberID: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 0
    },
    xp: {
        type: Number,
        required: true,
        default: 0
    }
}));