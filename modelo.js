import { GoogleGenerativeAI } from "@google/generative-ai";

export async function inicializaModelo(modelo) {
    // Acesse sua chave de API como uma variável de ambiente (consulte "Configurar sua chave de API" acima)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelo });
    return model;
}