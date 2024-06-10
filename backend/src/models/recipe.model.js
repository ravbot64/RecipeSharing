import mongoose, {Schema} from "mongoose";

const recipeSchema = new Schema(
   {
    title: {
        type: String,
        required: true,
        trim: true, 
        index: true
    },
    instruction: {
        type: String,
        required: true,
    },
    
    dish: {
        type: String, 
        required: true,
    },
    username: {
        type: String, 
        required: true,
    },
    ingredients: {
        type: String, 
        required: true,
    },

    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
   },
   {
    timestamps: true
}
)

export const Recipe = mongoose.model("Recipe", recipeSchema)