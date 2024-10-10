import { inicializaModelo } from "./modelo.js";
import { fazerPergunta } from "./pergunta.js";
//const { GoogleGenerativeAI } = require("@google/generative-ai");

const model = await inicializaModelo("gemini-1.0-pro")

async function run() {



    // Definindo um prompt objetivo.   
    const prompt = await fazerPergunta("Me fale sobre o destino que deseja conhecer: ")
    const categorias = await fazerPergunta("categorias que deseja saber: ")
    const parts = [
        { // Definindo o objetivo principal do chatbot: atuar como um guia especializado em viagens, limitado a fornecer informações exclusivamente relacionadas a destinos turísticos. Se a pergunta for sobre outro tema, ele deve se restringir a negar a resposta.
            text: "Você é o chatbot de um site que vende pacotes de viagem. Ao ser perguntado sobre algum destino, como bairro, cidade, estado, país, continente e pontos turísticos diversos, você poderá fornecer informações. Caso seja perguntado sobre algo que não ter relação com viagem e turismo, informe que não poder responder a essa dúvida.\n\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter apenas as categorias que forem solicitadas no momento da pergunta.\n\nAlguns exemplos de categorias: características, localização, cultura, pontos turísticos,  culinária, clima, dicas, como chegar, curiosidades."
        },
        { // Exemplo de uma interação típica com o usuário. Aqui, o chatbot é solicitado a fornecer informações sobre um destino específico (no caso, um bairro no Rio de Janeiro).
            text: "input: me fale sobre o Canada"
        },
        {  // Exemplo de como o chatbot pode responder a uma pergunta de forma detalhada, fornecendo informações turísticas relevantes sobre o bairro solicitado. A resposta inclui detalhes como pontos turísticos, cultura, vida noturna, transporte e outras curiosidades.
            text: "output: ## Canadá\n\n* **Localização:** América do Norte, a norte dos Estados Unidos. \n* **Características:** País vasto e com grande variedade de paisagens, incluindo montanhas, florestas, lagos, rios e costas oceânicas. \n* **Cultura:**  Cultura rica e diversificada, com influências europeias, indígenas e americanas. \n* **Pontos turísticos:** \n    * **Toronto:**  CN Tower, Museu Real de Ontário, Distillery District.\n    * **Montreal:**  Vieux-Montréal, Mount Royal, Biosphère. \n    * **Vancouver:** Stanley Park, Granville Island Market, Capilano Suspension Bridge. \n    * **Banff National Park:** Lake Louise, Moraine Lake, Banff Gondola.\n    * **Niagara Falls:** Cataratas do Niágara, Journey Behind the Falls, Niagara-on-the-Lake.\n* **Clima:** Clima varia muito de acordo com a região, com invernos frios e nevados no interior e verões quentes e úmidos no litoral. \n* **Dicas:** \n    * Certifique-se de ter um visto de turista se necessário.\n    * A moeda do Canadá é o dólar canadense (CAD).\n    * É importante verificar o clima antes de viajar, especialmente durante o inverno.\n    * O Canadá é um país seguro para turistas.\n* **Como chegar:** \n    * Por avião: Diversos aeroportos internacionais, como Toronto Pearson (YYZ), Montreal Pierre Elliott Trudeau (YUL) e Vancouver International (YVR).\n    * Por carro: Possibilidade de alugar um carro e explorar as diferentes regiões do país.\n* **Curiosidades:** \n    * O Canadá tem mais de 100.000 lagos.\n    * O Canadá é o segundo maior país do mundo em área.\n    * O hino nacional canadense é \"O Canadá\".\n    * O Canadá é um país multilíngue, com inglês e francês como idiomas oficiais."
        },
        {  // Aqui, a estrutura de input dinâmico é demonstrada. O valor `${prompt}` será substituído pelo destino que o usuário inserir, permitindo que o chatbot gere uma resposta personalizada para qualquer local solicitado.
            text: `input: me fale sobre ${categorias} do destino ${prompt}`
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
