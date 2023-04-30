// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const { Configuration, OpenAIApi } = require("openai");
// const http = require("http");

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import http from "http";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", async (req, res) => {
  res.status(200).send({
    message: "hello from codex",
  });
});

app.post("/api", async (req, res) => {
  try {
    // if (req.headers.token === process.env.TOKEN) {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
    // } else {
    //   res.status(500).send({
    //     message: "token invalid",
    //   });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.use((req, res) => {
  res.status(500).send({
    message: "Invalid request",
  });
});

http.createServer(app).listen(5000, () => {
  console.log("Connected on PORT : 5000");
});
