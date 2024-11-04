const { Schema, models, model } = require("mongoose");

const SettingsSchema = new Schema({
    name: { type: Object, required: true, unique: true },
    value: String
}, { timestamps: true })

export const Settings = models?.Setting || model('Setting', SettingsSchema)