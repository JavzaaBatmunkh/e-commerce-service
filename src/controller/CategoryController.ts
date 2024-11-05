import { Request, Response, } from "express";
import { CategoryModel } from "../model/CategoryModel";

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryModel.find()
        res.send(categories)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ errorMessage: "Error" })
    }
}

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findById(id)
        res.send(category)
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Error" })
    }
}

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        if (!name) { return res.json({ error: 'Name is required' }) }

        const existingCategory= await CategoryModel.findOne({name})
        if(existingCategory){return res.json({error: "Category already exists"})}

        const category = await CategoryModel.create({name})
        res.send(category)
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Create doesn't working!", error })
    }
}
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const update = await CategoryModel.findByIdAndUpdate(id, { name})
        res.send(update)
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Edit doesn't working!" })
    }
}
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await CategoryModel.deleteOne({ _id: id })
        res.send({ message: "Successfully deleted!" })
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Delete doesn't working!" })
    }
}