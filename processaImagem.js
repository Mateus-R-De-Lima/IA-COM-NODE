import { inicializaModelo } from './modelo.js';
import { readFileSync } from 'fs'

// "Por favor, revise os valores, pois a cobrança é pós-paga. Isso significa que este modelo pode gerar uma fatura para você.
// https://ai.google.dev/pricing?hl=pt-br
const model = await inicializaModelo("gemini-1.5-flash");

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(readFileSync(path)).toString("base64"),
            mimeType
        },
    };
}


export async function processaImagem(imagem) {
    const prompt = "Me fale tudo que puder sobre o destino mostrado nessa imagem";

    const imageParts = [
        //image e tipo arquivo e imagem
        fileToGenerativePart(imagem, "image/jpeg"),
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}