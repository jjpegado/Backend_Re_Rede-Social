import { Request, Response } from "express";
import User  from "../models/User";

export class UserController {
    async create( req: Request, res: Response) {
            const { 
                nome, 
                email, 
                username, 
                photo, 
                description 
            } = req.body;

            try {
                const existsUserEmailOrUsername = await User.findOne({ 
                    $or: [{ email }, { username }] 
                });
                
                if (existsUserEmailOrUsername) {
                    return res.status(400).json({ message: 'Email ou username já existe' });
                }

                const newUser = await User.create({
                    nome,
                    email,
                    username,
                    photo,
                    description,
                    isActive: true,
                    isVerified: false,
                    createdAt: new Date()
                });

                return res.status(201).json(newUser);

            } catch (error) {
                return res.status(500).json({ message: 'Erro interno do servidor' });
            }
    }
}