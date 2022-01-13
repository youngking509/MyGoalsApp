
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const goalSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = mongoose.model('Goal', goalSchema);

module.exports = Goal;