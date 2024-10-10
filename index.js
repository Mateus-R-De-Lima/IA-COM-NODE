import { GoogleGenerativeAI } from "@google/generative-ai";
import { fazerPergunta } from "./pergunta.js";
//const { GoogleGenerativeAI } = require("@google/generative-ai");

// Acesse sua chave de API como uma variável de ambiente (consulte "Configurar sua chave de API" acima)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Definindo um prompt objetivo.   
    const prompt = await fazerPergunta("Me fale sobre o destino que deseja conhecer: ")

    const parts = [
        { // Definindo o objetivo principal do chatbot: atuar como um guia especializado em viagens, limitado a fornecer informações exclusivamente relacionadas a destinos turísticos. Se a pergunta for sobre outro tema, ele deve se restringir a negar a resposta.
            text: "Você é o chatbot de um site que vende pacotes de viagem. Ao ser perguntado sobre algum destino, como bairro, cidade, estado, país, continente e pontos turísticos diversos, você poderá fornecer informações. Caso seja perguntado sobre algo que não ter relação com viagem e turismo, informe que não poder responder a essa dúvida.\n\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter as categorias: características, localização, cultura, pontos turísticos e culinária."
        },
        { // Exemplo de uma interação típica com o usuário. Aqui, o chatbot é solicitado a fornecer informações sobre um destino específico (no caso, um bairro no Rio de Janeiro).
            text: "input: me fale sobre o bairro do flamengo, no Rio de Janeiro"
        },
        {  // Exemplo de como o chatbot pode responder a uma pergunta de forma detalhada, fornecendo informações turísticas relevantes sobre o bairro solicitado. A resposta inclui detalhes como pontos turísticos, cultura, vida noturna, transporte e outras curiosidades.
            text: "output: **Bairro do Flamengo, Rio de Janeiro**\n\n* **Características:**\n    * Bairro nobre e residencial\n    * Conhecido por sua orla e parques\n    * Coração financeiro da cidade\n* **Localização:**\n    * Zona Sul do Rio de Janeiro\n    * Limita-se com as praias de Copacabana, Botafogo e Glória\n* **Cultura:**\n    * Sede do Museu de Arte Moderna (MAM) e da Marina da Glória\n    * Abriga o Parque do Flamengo, um dos maiores parques urbanos do país\n* **Pontos Turísticos:**\n    * Orla do Flamengo (anel viário com ciclovia e vista panorâmica)\n    * Museu de Arte Moderna (MAM)\n    * Marina da Glória (e palco do Reveillon)\n    * Parque do Flamengo\n    * Morro da Viúva (com vista para o Pão de Açúcar)\n* **Culinária:**\n    * Diversos restaurantes e bares na orla e no Parque do Flamengo\n    * Opções gastronômicas variadas, de frutos do mar a comida internacional"
        },
        {  // Aqui, a estrutura de input dinâmico é demonstrada. O valor `${prompt}` será substituído pelo destino que o usuário inserir, permitindo que o chatbot gere uma resposta personalizada para qualquer local solicitado.
            text: `input: me fale sobre o destino ${prompt}`
        },
        { // Aqui será gerada a resposta do chatbot baseada no input fornecido anteriormente. Este campo está vazio porque o conteúdo será preenchido dinamicamente durante a execução do código.
            text: "output: "
        },
    ];



    const result = await model.generateContent({
        contents: [{ role: "user", parts }]
    });
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();
