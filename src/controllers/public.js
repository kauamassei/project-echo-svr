import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();


const JWT_SECRET = process.env.JWT_SECRET

//Cadastro

export async function createUserController (req, res){
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const userDb = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword,
      },
    });

    res.status(201).json(userDb);
  } catch (error) {
    console.log(error, "Esse email já está em uso");
    res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
}

//Login

export async function loginUserController(req, res) {
    try {
        const userInfo = req.body;
    
        const user = await prisma.user.findUnique({
          where: { email: userInfo.email },
        });
    
        //verifica se usuario existe no banco
        if (!user) {
          res.status(404).json({ message: "Usuário não encontrado" });
        }
    
        // compara a senha do banco com a que o usuário digitou
        const isMatch = await bcrypt.compare(userInfo.password, user.password);
        
        if (!isMatch) {
          res.status(400).json({ message: "Senha inválida" });
        }
    
        // gera o token jwt
    
        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '7d'})
    
        res.status(200).json(token);
    
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro no servidor, tente novamente" });
      }
}


