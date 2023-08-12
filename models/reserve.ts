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
    places: {
        type: [Number],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled'],
        required: true,
        default:"active"
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

const reserveModel =mongoose.models.reserves || mongoose.model('reserves', schema)


export { reserveModel }

reserveModel.createIndexes()