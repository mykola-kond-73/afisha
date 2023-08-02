import { ReserveModelType } from "@/types";
import mongoose, { Schema } from "mongoose"

const schema = new mongoose.Schema<ReserveModelType>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    session: {
        type: Schema.Types.ObjectId,
        ref: 'sessions',
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled'],
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: new Date(),
    }
}, {
    versionKey: false,
    autoIndex: false
})

schema.pre('updateOne', function () {
    this.set({ updatedAt: new Date() });
});

const reserveModel = mongoose.model('reserves', schema)


export { reserveModel }

reserveModel.createIndexes()