import { GoogleGenerativeAI } from "@google/generative-ai";
import { fazerPergunta } from "./pergunta.js";
//const { GoogleGenerativeAI } = require("@google/generative-ai");

// Acesse sua chave de API como uma variável de ambiente (consulte "Configurar sua chave de API" acima)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Definindo um prompt objetivo.   
    const prompt = await fazerPergunta("Me fale sobre o destino que deseja conhecer: ")

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();
