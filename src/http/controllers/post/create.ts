import { makeCreatePostUseCase } from "@/useCases/factory/makeCreatePostUseCase";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response) {
  const registerBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    dateTime: z.preprocess((val) => new Date(String(val)), z.date()),
    author: z.string(),
  });

  const { title, content, dateTime, author } = registerBodySchema.parse(req.body);

  const createPostUseCase = makeCreatePostUseCase();
  const post = await createPostUseCase.handler({
    title,
    content,
    dateTime,
    author,
  });

  res.status(201).send(post);
}