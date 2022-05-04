import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapater';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';


export const routes = express.Router();



routes.post('/feedbacks', async(req, res) => {
    const { type, comment, screenshot } = req.body;
    
    const prismaFeedbacksRepository =  new PrismaFeedbacksRepository;
    const nodemailer = new NodemailerMailAdapter;

    const submitFeedBackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailer
    )

    await submitFeedBackUseCase.execute({
        type,
        comment,
        screenshot,
    })


    return res.status(201).send();
})