
import mongoose from "mongoose";

const levels = new mongoose.Schema({
    guildId: {
      required: true,
      type: String,
    },
    memberId: {
       type: String,
    },
    messageCount : {
        type: Number,
    }

    
}, { timestamps: { createdAt: 'Created at' }});

export default  mongoose.model('levels', levels);