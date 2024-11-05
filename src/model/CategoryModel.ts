import { model, Schema } from "mongoose";

const schema = new Schema({
name: {
    type: String,
    required: true,
    unique: true, 
    maxLength:32
}
})

export const CategoryModel= model("Category", schema)