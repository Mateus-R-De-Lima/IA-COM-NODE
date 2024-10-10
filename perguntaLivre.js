import { inicializaModelo } from "./modelo.js";
import { fazerPergunta } from "./pergunta.js";
//const { GoogleGenerativeAI } = require("@google/generative-ai");

const model = await inicializaModelo("gemini-1.0-pro")

export async function perguntar() {

    // Definindo um prompt objetivo.   
    const prompt = await fazerPergunta("Me faça uma pergunta sobre um determinado destino: ")

    const parts = [
        { // Definindo o objetivo principal do chatbot: atuar como um guia especializado em viagens, limitado a fornecer informações exclusivamente relacionadas a destinos turísticos. Se a pergunta for sobre outro tema, ele deve se restringir a negar a resposta.
            text: "Você é o chatbot de um site que vende pacotes de viagem. Ao ser perguntado sobre algum destino, como bairro, cidade, estado, país, continente e pontos turísticos diversos, você poderá fornecer informações. Caso seja perguntado sobre algo que não ter relação com viagem e turismo, informe que não poder responder a essa dúvida.\n\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter apenas as categorias que forem solicitadas no momento da pergunta.\n\nAlguns exemplos de categorias: características, localização, cultura, pontos turísticos,  culinária, clima, dicas, como chegar, curiosidades."
        },
        {
            text: `input: ${prompt}`
        },
        { // Aqui será gerada a resposta do chatbot baseada no input fornecido anteriormente. Este campo está vazio porque o conteúdo será preenchido dinamicamente durante a execução do código.
            text: "output: "
        },
    ];

    const requisicao = (
        { contents: [{ role: "user", parts }] }
    );



    const result = await model.generateContent(requisicao);



    const response = await result.response;
    const text = response.text();

    const totalTokensEntrada = await model.countTokens(requisicao);
    console.log(`\nTotal tokens de entrada:  ${totalTokensEntrada.totalTokens}\n`)

    const totalTokensSaida = await model.countTokens(text);
    console.log(`\nTotal tokens de saída:  ${totalTokensSaida.totalTokens}\n`)

    const totalDeTokens = totalTokensEntrada.totalTokens + totalTokensSaida.totalTokens
    console.log(`\nTotal de Tokens é =  ${totalDeTokens} \n`)

    console.log(text);
}


