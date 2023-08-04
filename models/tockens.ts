import { TockenModelType } from "@/types";
import mongoose, { Schema } from "mongoose"

const schema = new mongoose.Schema<TockenModelType>({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true
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

const tockenModel = mongoose.model('tockens', schema)

export { tockenModel }

tockenModel.createIndexes()