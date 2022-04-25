import { Schema, model } from "mongoose";

const schema = new Schema({
	name: {
		type: String,
		required: true,
	},
    created:{
        type: String,
        default: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    },
    content: { 
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    dates: {
        type: String
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
    iconTask: {
        type: String,
        default: "shopping-cart.png"
    }
});

export default model("todo", schema);
