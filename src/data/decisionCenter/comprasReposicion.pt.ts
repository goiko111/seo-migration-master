import { ShoppingCart } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const comprasReposicionPT: DeepAreaContent = {
  name: "Compras & Reposicao",
  tagline: "Comprar com dados, nao com intuicao",
  intro: "Esta seccao ajuda-o a tomar melhores decisoes de compra e reposicao. Nao se trata de comprar barato, mas de comprar o que se vende, ao preco certo e na quantidade certa. Cada decisao de compra impacta directamente a sua margem, o seu stock e a coerencia da sua carta de vinhos.",
  icon: ShoppingCart,
  accent: "text-blue-500",
  bg: "bg-blue-500/10",
  audiences: ["compras-fb", "direccion"],
  topErrors: [
    { error: "Comprar por habito ou pressao do fornecedor", porQueOcurre: "Porque o fornecedor liga toda a semana e e mais facil repetir a encomenda do que a rever. A rotina substitui a analise.", consecuencia: "A sua adega enche-se com o que lhe vendem, nao com o que precisa. O stock cresce sem relacao com a procura real." },
    { error: "Avaliar fornecedores apenas pelo preco de tabela", porQueOcurre: "Porque o preco por garrafa e o numero mais visivel. Mas ignora transporte, minimos, descontos, prazos de pagamento e devolucoes.", consecuencia: "Escolhe o fornecedor 'mais barato' que na verdade e mais caro por copo servido quando junta tudo." },
    { error: "Nao cruzar encomendas com dados de vendas", porQueOcurre: "Porque compras e staff de sala funcionam como departamentos separados. Quem encomenda nao olha para o que se vende.", consecuencia: "Compra o que nao se vende e fica sem o que se vende. O desalinhamento cresce a cada encomenda." },
    { error: "Repor sem verificar o stock atual na garrafeira", porQueOcurre: "Porque contar stock demora tempo e parece desnecessario quando 'sempre precisamos de mais'. Mas muitas vezes ja tem o suficiente.", consecuencia: "Acumula stock em excesso em referencias que ja tinha coberto. O capital fica atado desnecessariamente." },
    { error: "Negociar apenas quando ha um problema", porQueOcurre: "Porque a relacao com o fornecedor e tomada como garantida. So e revista quando ha um problema ou um aumento de preco.", consecuencia: "Perde a oportunidade de melhorar proactivamente as condicoes. O fornecedor assume que esta satisfeito e nao oferece nada melhor." },
  ],
  links: [
    { label: "Winerim Supply", href: "/producto/winerim-supply", description: "Inteligencia de compra: comparacao de precos, alertas de sobrepreco e reposicao orientada por dados", type: "product" },
    { label: "Calculadora de Compra Inteligente", href: "/herramientas/calculadora-compra-inteligente", description: "Avalie se uma compra faz sentido cruzando rotacao, margem e stock atual", type: "tool" },
    { label: "Modelo: Controlo de Grupo Multi-localizacao", href: "/recursos/plantilla-control-grupo-restauracion", description: "Coordene compras e sortido em varios locais do mesmo grupo", type: "resource" },
    { label: "Modelo: Revisao Mensal da Carta", href: "/recursos/plantilla-revision-mensual-carta", description: "Processo mensal para ligar desempenho da carta com decisoes de compra", type: "resource" },
    { label: "Blog: Esta a comprar vinho mal?", href: "/blog/como-saber-si-estas-comprando-mal-vino-restaurante", description: "Sinais de que o seu processo de compra precisa de revisao", type: "article" },
    { label: "Blog: Que vinhos merece a pena repor?", href: "/blog/que-vinos-merece-la-pena-reponer", description: "Criterios para decidir que vai para a sua proxima encomenda", type: "article" },
  ],
  miniCases: [
    {
      profile: "Grupo casual com 4 localizacoes",
      situation: "Cada localizacao encomendava ao fornecedor independentemente, sem coordenacao. O mesmo vinho era comprado a 3 precos diferentes consoante quem negociava.",
      action: "Compra centralizada para as 15 referencias partilhadas. Negociou um preco unico com o fornecedor com volume agregado e transporte incluido.",
      result: "Poupancas medias de 11% no custo de compra. EUR 4.200/ano apenas em referencias partilhadas.",
    },
    {
      profile: "Restaurante fine-dining independente",
      situation: "O escanção comprava por intuicao e catalogo. As encomendas nunca eram cruzadas com dados de vendas. Resultado: 30% da encomenda mensal ia para referencias com rotacao baixa.",
      action: "Antes de cada encomenda, exporta os Top 20 por rotacao e a lista de stock morto. Repoe apenas o que roda e testa 2 referencias novas por mes.",
      result: "Reduziu encomendas mensais em 20% sem perder vendas. O investimento concentra-se no que funciona.",
    },
  ],
  subtopics: [
    {
      id: "comprando-mal",
      title: "Como perceber se esta a comprar mal",
      priority: "inmediato",
      porQueTeLoMostramos: { detected: "Winerim cruzou as suas encomendas recentes com dados de vendas e detectou que parte do seu orcamento vai para referencias sem procura real.", whyMatters: "Se compra mal, o stock inflaciona, a sua margem comprime-se e a carta enche-se com o que ninguem encomenda.", riskIfIgnored: "Cada encomenda colocada por habito financia um erro recorrente que corroi a sua rentabilidade mes a mes." },
      queSignifica:
        "Comprar mal nao e apenas pagar de mais. E comprar o que nao se vende, em quantidades que nao precisa, de fornecedores que nao comparou, ou repor por inercia sem olhar para dados. O sinal mais claro de compras fracas e stock que cresce enquanto as vendas nao aumentam. Se a sua adega fica mais cheia cada mes mas o seu bilhete medio nao sobe, algo esta errado com as suas compras.",
      porQueImporta:
        "Porque a compra e a primeira decisao que condiciona tudo o resto. Se compra mal, o stock inflaciona, a sua margem comprime-se e a carta enche-se com referencias que ninguem encomenda. Corrigir a compra tem um efeito em cascata positivo em toda a operacao: melhor stock, melhor margem, melhor carta.",
      queHacer: [
        "Cruze a sua ultima encomenda com os dados de vendas dos ultimos 30 dias. Quantas referencias encomendadas nao tiveram procura real?",
        "Calcule que percentagem do seu orcamento de compra vai para referencias com rotacao baixa ou nula.",
        "Identifique se tem ruturas de stock em referencias que os seus clientes realmente pedem (sinal de que esta a comprar as coisas erradas).",
        "Verifique se repoe por inercia (mesma encomenda cada mes) ou por dados (ajustando a procura real).",
      ],
      errores: [
        { mistake: "Repetir a mesma encomenda todos os meses sem rever vendas", consequence: "Acumula o que nao se vende e fica sem o que se vende." },
        { mistake: "Comprar em volume para desconto sem procura real", consequence: "O desconto de 10% nao compensa 6 meses de stock parado." },
        { mistake: "Sem visibilidade do stock da adega antes de encomendar", consequence: "Duplica stock em referencias que ja tinha coberto, atando capital." },
      ],
    },
    {
      id: "cuando-no-reponer",
      title: "Quando nao deve repor uma referencia",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim detectou referencias com rotacao sustentavelmente baixa que continuam a ser repostas automaticamente.", whyMatters: "Repor por inercia e a forma mais comum de acumular stock morto. Cada reposicao sem dados e dinheiro que nao volta.", riskIfIgnored: "Financia um erro recorrente cada mes, comprando o que nao se vende enquanto o que se vende acaba." },
      queSignifica:
        "Nao repor e uma decisao activa, nao uma omissao. Para de repor quando os dados dizem que aquela referencia ja nao justifica o seu espaco: rotacao sustentavelmente baixa, margem insuficiente, canibalizacao com uma referencia melhor, ou uma mudanca no seu perfil de cliente. A chave e que a decisao e consciente e documentada, nao que simplesmente acaba e nao recomanda.",
      porQueImporta:
        "Porque repor por inercia e a forma mais comum de acumular stock morto. Cada referencia que repoe sem justificacao tira orcamento a uma que poderia realmente vender-se. E cada mes que repoe um vinho que nao roda, esta a financiar um erro recorrente.",
      queHacer: [
        "Antes de cada encomenda, reveja referencias com rotacao < 1x/mes. Realmente precisa de repor?",
        "Se uma referencia teve 2 meses seguidos de rotacao baixa, coloque-a em quarentena: nao reponha ate esgotar, depois avalie.",
        "Se uma vez esgotada ninguem (nem voce nem os clientes) a sente falta, nao compre novamente.",
        "Documente cada decisao de nao-reposicao para que a equipa saiba por que motivo e nao recomande.",
      ],
      errores: [
        { mistake: "Repor tudo o que se esgota sem avaliar desempenho", consequence: "Trata todas as referencias como iguais quando nao sao." },
        { mistake: "Nao repor sem avisar a equipa de sala", consequence: "O garcom promete um vinho que ja nao esta disponivel e o cliente fica desapontado." },
        { mistake: "Deixar o fornecedor decidir ('Envio o habitual')", consequence: "A sua carta e decidida por quem lhe vende, nao por quem gere o seu negocio." },
      ],
    },
    {
      id: "precios-compra",
      title: "Como ler precos de compra",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim analisou os seus custos de compra incluindo transporte, minimos e condicoes para calcular o custo total real.", whyMatters: "Cada euro de diferenca na compra e um euro directo na sua margem. EUR 0,80 extra em 50 garrafas/mes e EUR 480/ano perdidos numa unica referencia.", riskIfIgnored: "Escolhe fornecedores por preco de tabela, nao custo real. A sua margem corroi sem aparecer no preco unitario." },
      queSignifica:
        "O preco de compra nao e apenas o numero da factura. E aquele numero mais transporte, minimos de encomenda, descontos, prazos de pagamento e condicoes de devolucao. Dois fornecedores podem oferecer-lhe o mesmo vinho ao 'mesmo preco' com custos reais muito diferentes. Ler um preco de compra correctamente significa compreender o custo total de aquisicao, nao apenas o preco unitario.",
      porQueImporta:
        "Porque cada euro de diferenca na compra e um euro directo na sua margem. Se compra 50 garrafas/mes de uma referencia e paga EUR 0,80 a mais do que necessario, isso sao EUR 480/ano perdidos numa unica referencia. Multiplique por 10 referencias mal compradas e esta a falar de quase EUR 5.000 anualmente.",
      queHacer: [
        "Para cada referencia chave, calcule o custo total: preco + transporte por unidade + custo de capital (pagamento a 30 dias vs. 60 dias).",
        "Compare custo total entre fornecedores, nao apenas preco de tabela.",
        "Verifique se as suas condicoes de devolucao cobrem desperdicio: um fornecedor que aceita devolucoes pode ser mais barato mesmo que o preco seja mais alto.",
        "Negociar com dados: leve o seu historico de compras para a reuniao com o fornecedor.",
      ],
      errores: [
        { mistake: "Comparar apenas preco unitario entre fornecedores", consequence: "Escolhe o mais barato no papel mas o mais caro no custo real." },
        { mistake: "Nao rever precos apos negociacao inicial", consequence: "O seu fornecedor aumenta precos 5% cada ano e nao nota ate verificar margens." },
        { mistake: "Nao considerar custos de minimo de encomenda", consequence: "Compra 24 garrafas para ter o preco mas so precisa de 6." },
      ],
    },
    {
      id: "detectar-sobreprecio",
      title: "Como detectar sobrepreco",
      priority: "inmediato",
      porQueTeLoMostramos: { detected: "Winerim comparou os seus precos de compra com dados de mercado e detectou referencias onde pode estar a pagar mais do que necessario.", whyMatters: "O sobrepreco e invisivel ate procurar por ele. Num grupo, 8% de sobrepreço em 20 referencias pode significar dezenas de milhares de euros por ano.", riskIfIgnored: "Continua a pagar de mais porque nao compara. A lealdade do fornecedor nao deveria ser incompativel com uma boa gestao." },
      queSignifica:
        "Sobrepreco e quando paga mais do que o mercado pede por uma referencia ou por um vinho com caracteristicas equivalentes. Nem sempre e culpa do fornecedor: as vezes e porque nao comparou, porque compra ao mesmo ha anos sem negociar, ou porque o seu volume mudou e as suas condicoes nao foram actualizadas. Detectar sobrepreco requer comparacao, nao adivinhar.",
      porQueImporta:
        "Porque o sobrepreco e invisivel ate procurar por ele. Nao aparece como uma despesa extra no seu Resulta do Exercicio: simplesmente reduz a sua margem sem saber. Num grupo de restaurantes com compra centralizada, 8% de sobrepreço em 20 referencias pode significar dezenas de milhares de euros por ano.",
      queHacer: [
        "Seleccione as suas 10 referencias com maior volume e peca cotacoes a pelo menos 2 fornecedores alternativos.",
        "Compare nao apenas preco mas condicoes: prazos de pagamento, minimos, transporte, devolucoes.",
        "Se detectar uma diferenca > 10%, negocie com o seu fornecedor actual usando os dados como alavanca.",
        "Estabeleca uma revisao de precos pelo menos a cada seis meses. Os mercados mudam e as suas condicoes devem adaptar-se.",
      ],
      errores: [
        { mistake: "Nunca comparar porque 'o meu fornecedor e de confianca'", consequence: "A confianca nao e incompativel com comparacao. Comparar e gerir." },
        { mistake: "Comparar apenas uma vez por ano ou no inicio da relacao", consequence: "Os precos mudam trimestralmente. Se nao rever, fica para tras." },
        { mistake: "Trocar fornecedor apenas pelo preco sem valorizar servico", consequence: "Um fornecedor barato mas pouco fiavel custa mais em ruturas e problemas logisticos." },
      ],
    },
    {
      id: "decidir-entre-similares",
      title: "Como escolher entre referencias similares",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim detectou pares de referencias em competicao no mesmo segmento da sua carta: mesmo tipo, preco similar.", whyMatters: "Dois vinhos redundantes canibalizm vendas, dividem atencao e duplicam stock. A consolidacao liberta espaco e melhora condicoes de compra.", riskIfIgnored: "Ambos vendem mal em vez de um vender bem. Perde margem, eficiencia e a chance de preencher uma lacuna real." },
      queSignifica:
        "Quando tem dois ou mais vinhos em competicao no mesmo segmento (mesmo tipo, preco similar, perfil similar), precisa de um criterio claro para escolher qual fica e qual vai. Esse criterio deveria combinar tres variaveis: margem (qual rende mais), rotacao (qual se vende mais) e papel na carta (qual melhor cumpre a funcao que precisa cobrir).",
      porQueImporta:
        "Porque ter duas referencias similares canibaliza vendas, divide a atencao do cliente e duplica o stock necessario. Cada par de vinhos redundantes e uma oportunidade perdida de preencher uma lacuna real na sua carta ou de concentrar volume e melhorar condicoes de compra.",
      queHacer: [
        "Identifique pares ou trios de referencias em competicao no mesmo segmento (mesmo tipo, ±EUR 3 de diferenca).",
        "Compare: qual tem melhor margem? Qual se vende mais? Qual e mais recomendado pela equipa?",
        "Decida qual fica e remova o outro. Se tem stock do saindo, mude-o para vinho a copo ou promocao.",
        "Use o espaco libertado para preencher uma lacuna real ou para negociar melhor volume da referencia vencedora.",
      ],
      errores: [
        { mistake: "Manter ambos 'porque ambos se vendem um pouco'", consequence: "Ambos vendem mal em vez de um vender bem. Perde margem e eficiencia." },
        { mistake: "Decidir apenas por margem sem olhar para rotacao", consequence: "Mantem o mais lucrativo por garrafa mas o que ninguem encomenda." },
        { mistake: "Decidir pelo gosto pessoal do escanção ou chef", consequence: "A sua carta satisfaz quem a desenha, nao quem a consome." },
      ],
    },
    {
      id: "decision-compra-integrada",
      title: "Como combinar rotacao, margem e stock numa decisao de compra",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim cruza automaticamente rotacao, margem e nivel de stock para classificar cada referencia numa matriz de decisao.", whyMatters: "Olhar para uma unica metrica leva a decisoes parciais. So quando cruza as tres e que ve o quadro completo de cada referencia.", riskIfIgnored: "Compra o que nao precisa, repoe o que nao roda e fica sem o que se vende." },
      queSignifica:
        "A melhor decisao de compra nao olha para um unico ponto de dados: cruza tres. A rotacao diz-lhe se o vinho se vende. A margem diz-lhe se vale a pena vender. O stock diz-lhe se precisa de mais ou ja tem bastante. Quando os tres apontam na mesma direccao, a decisao e clara. Quando se contradizem, precisa de priorizar consoante a sua estrategia.",
      porQueImporta:
        "Porque olhar para uma unica metrica leva a decisoes parciais. Um vinho com boa rotacao mas margem fraca faz trabalhar muito por pouco ganho. Um com boa margem mas sem rotacao enche a adega com capital parado. E comprar mais de algo que ja tem em excesso e deitar dinheiro fora. So quando cruza os tres e que ve o quadro completo.",
      queHacer: [
        "Antes de cada encomenda, classifique cada referencia numa matriz 2x2: rotacao alta/baixa x margem alta/baixa.",
        "Rotacao alta + margem alta → reponha sem hesitar, negocie volume.",
        "Rotacao alta + margem baixa → repreco ou renegocie custo antes de repor.",
        "Rotacao baixa + margem alta → force em sala ou vinho a copo antes de repor.",
        "Rotacao baixa + margem baixa → nao reponha. Esgote stock e remova.",
        "Adicione a variavel stock: se ja tem 3 meses de inventario, nao precisa de repor mesmo que rode bem.",
      ],
      errores: [
        { mistake: "Basear decisoes de compra apenas em rotacao", consequence: "Repoe o bestseller sem verificar se rende margem suficiente." },
        { mistake: "Decidir apenas por margem", consequence: "Compra o que rende mais por garrafa mas ninguem encomenda." },
        { mistake: "Nao verificar stock actual antes de encomendar", consequence: "Duplica inventario em referencias que ja tinha o suficiente." },
      ],
    },
  ],
  nextStep: {
    label: "Avalie a sua proxima compra",
    href: "/herramientas/calculadora-compra-inteligente",
    description: "Cruze rotacao, margem e stock actual para decidir se uma compra faz sentido antes de colocar a encomenda.",
  },
};

export default comprasReposicionPT;
