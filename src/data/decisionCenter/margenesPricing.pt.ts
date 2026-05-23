import { DollarSign } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const margenesPricingPT: DeepAreaContent = {
  name: "Margens e Definição de Preços",
  tagline: "Compreenda a rentabilidade real de cada vinho e aja com dados",
  intro: "Esta secção ajuda-o a interpretar cada indicador de margem, definição de preços e rentabilidade que o Winerim lhe mostra. Não necessita ser um especialista em finanças: precisa de saber o que observar, porque é importante e o que fazer com cada ponto de dados.",
  icon: DollarSign,
  accent: "text-amber-500",
  bg: "bg-amber-500/10",
  audiences: ["direccion", "compras-fb"],
  topErrors: [
    { error: "Aumentar preços sem rever o custo de compra primeiro", porQueOcurre: "Porque é mais fácil mudar o preço de venda do que negociar com o fornecedor. A suposição é que margem baixa é um problema de preço, mas frequentemente a origem está na compra.", consecuencia: "Aumenta o preço para o cliente (que nota) quando poderia ter melhorado a margem de forma invisível renegociando a compra." },
    { error: "Aplicar um multiplicador único a toda a carta", porQueOcurre: "Porque simplifica a gestão e soa 'justo'. Um ×3 em tudo parece razoável.", consecuencia: "Perde margem em vinhos baratos (onde o cliente é sensível ao preço) e fica pouco competitivo em vinhos caros (onde o multiplicador deveria ser menor)." },
    { error: "Não rever margens cada mês", porQueOcurre: "Porque o dia a dia toma toda a atenção e as margens parecem estáveis. Mas os custos sobem, a perda varia e a procura muda.", consecuencia: "Os desvios acumulam-se silenciosamente. Só os vê quando fecha o trimestre e os números não batem." },
    { error: "Definir preço de copo dividindo a garrafa por 5", porQueOcurre: "Porque é o cálculo mental mais rápido. Mas ignora a perda, o serviço e a margem adicional que o copo deveria gerar.", consecuencia: "Vende copos com prejuízo sem o saber. Uma perda real de 25 por cento converte a sua margem teórica de 70 por cento numa margem real de 35 por cento." },
    { error: "Manter um vinho com boa margem mas sem vendas", porQueOcurre: "Porque o número de margem parece positivo e tranquilizador. Mas um vinho que não se vende não gera nenhuma margem real.", consecuencia: "Capital imobilizado ocupando espaço na garrafeira e na carta sem gerar retorno. A margem potencial nunca se materializa." },
  ],
  links: [
    { label: "Calculadora de margens", href: "/calculadora-margen-vino", description: "Calcule a margem real de qualquer referência em segundos", type: "tool" },
    { label: "Modelo: Revisão mensal de margens", href: "/recursos/plantilla-revision-mensual-margenes", description: "Processo mensal para detectar desvios e oportunidades", type: "resource" },
    { label: "Recurso: Análise de margens", href: "/recursos/scorecard-mensual", description: "Scorecard para monitorizar a saúde da sua definição de preços", type: "resource" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "O motor analítico que automatiza isto tudo para si", type: "product" },
    { label: "Blog: 7 erros ao definir preços", href: "/article/errores-fijar-precios-vino-restaurante", description: "Os erros mais frequentes na definição de preços e como evitá-los", type: "article" },
    { label: "Blog: Alavancas para melhorar margem", href: "/article/palancas-mejorar-margen-vino-sin-rehacer-carta", description: "Como melhorar a margem sem refazer a carta de vinhos", type: "article" },
    { label: "Blog: Métricas F&B de vinho", href: "/article/metricas-fb-vino-restaurante", description: "As métricas que todo o F&B deveria monitorizar" },
  ],
  miniCases: [
    {
      profile: "Gastronómico com carta de 60 referências",
      situation: "Margem média de 58 por cento, mas as 5 referências mais vendidas tinham um multiplicador de ×2,2 porque nunca foram actualizadas após a última subida do fornecedor.",
      action: "Recalculou preços das 5 referências top. Aumentou entre 1 e 3 euros consoante a faixa. Deu ao equipo de sala argumentários de valor para justificar a mudança.",
      result: "Margem média subiu para 63 por cento sem perder nenhuma venda nessas referências. Impacto estimado: +1.800 euros/mês.",
    },
    {
      profile: "Casual dining com 35 referências",
      situation: "Aplicava ×3 uniforme a toda a carta. Vinhos de entrada (custo menor que 5 euros) ficavam a 15 euros e não se vendiam; os maiores que 15 euros de custo ficavam a 45 euros e também não.",
      action: "Implementou multiplicador escalonado: ×3,5 em vinhos com custo menor que 8 euros, ×2,8 na faixa média, ×2,2 nos de prestígio.",
      result: "Bilhete médio de vinho subiu 12 por cento porque os clientes deixaram de escolher sempre o mais barato.",
    },
  ],
  subtopics: [
    {
      id: "margen-bruto",
      title: "O que é margem bruta",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "O Winerim calculou a margem bruta de cada referência da sua carta cruzando preço de venda com custo de compra real.",
        whyMatters: "Se não distinguir entre margem percentual e contribuição absoluta, pode estar a promover os vinhos errados.",
        riskIfIgnored: "Continua a promover vinhos que parecem rentáveis em percentagem mas deixam menos em euros do que outros que não observa.",
      },
      queSignifica:
        "A margem bruta é a diferença entre o que cobra por um vinho e o que lhe custa comprá-lo. Exprime-se em euros (contribuição) ou em percentagem. É a métrica mais básica de rentabilidade, mas não a única que importa. Um vinho com 60 por cento de margem pode deixar menos dinheiro real do que outro com 45 por cento se este último se vender ao dobro do preço.",
      porQueImporta:
        "Porque é o ponto de partida de qualquer decisão de definição de preços. Se não conhecer a sua margem bruta por referência está a tomar decisões às cegas. E se apenas observa a percentagem sem ver a contribuição absoluta, pode estar a promover os vinhos errados.",
      queHacer: [
        "Calcule a margem bruta em euros e em percentagem das suas 10 referências mais vendidas.",
        "Ordene-as por contribuição absoluta (euros), não por percentagem.",
        "Compare: os seus vinhos mais vendidos são também os que mais margem deixam?",
        "Se não o forem tem uma oportunidade imediata de repreço.",
      ],
      errores: [
        { mistake: "Observar apenas a percentagem de margem", consequence: "Um vinho de 8 euros com 65 por cento de margem deixa 5,20 euros. Um de 25 euros com 50 por cento deixa 12,50 euros. O segundo é melhor negócio." },
        { mistake: "Calcular a margem sobre preço de venda em vez de sobre custo", consequence: "Engana-se com um número mais alto que não reflecte o que realmente ganha." },
        { mistake: "Não actualizar o custo após mudanças do fornecedor", consequence: "A sua margem teórica já não existe: vende acreditando que ganha, mas não." },
      ],
    },
    {
      id: "margen-sano",
      title: "Que margem é saudável",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "O Winerim comparou o seu multiplicador médio ponderado com o benchmark do seu segmento.",
        whyMatters: "Se está abaixo da gama saudável tem um problema estrutural que não se resolve vendendo mais.",
        riskIfIgnored: "Cada mês que passa com a margem desalinhada perde rentabilidade cumulada que já não consegue recuperar.",
      },
      queSignifica:
        "Não existe uma margem universal 'correcta'. Depende do seu segmento, do seu bilhete médio, do seu volume e da sua estrutura de custos. Mas há referências de mercado: a maioria dos restaurantes rentáveis opera com um multiplicador médio entre ×2,5 e ×3,5 sobre custo, o que equivale a margens brutas de 60 a 72 por cento. O importante não é um número fixo, mas que a sua margem média ponderada por vendas esteja alinhada com o seu modelo de negócio.",
      porQueImporta:
        "Porque se a sua margem média está abaixo do benchmark do seu segmento tem um problema estrutural que não se resolve vendendo mais. E se está muito acima podia estar a perder competitividade e volume sem o saber.",
      queHacer: [
        "Calcule o seu multiplicador médio ponderado por vendas (não por referência).",
        "Compare com o benchmark do seu segmento: casual (×2,5-3), gastronómico (×2-2,5), hotel (×3-4).",
        "Se está abaixo identifique as referências que baixam a média.",
        "Se está acima avalie se o seu volume de copo e garrafa é o esperado.",
      ],
      errores: [
        { mistake: "Aplicar um multiplicador único a toda a carta", consequence: "Perde margem em vinhos baratos e fica pouco competitivo em vinhos caros." },
        { mistake: "Comparar a sua margem com a de outro segmento", consequence: "Um hotel tem estrutura de custos diferente de um bistro. Não são comparáveis." },
        { mistake: "Não ponderar por vendas", consequence: "A sua média de margem parece boa, mas os vinhos que mais vende têm pior margem." },
      ],
    },
    {
      id: "referencias-mal-calibradas",
      title: "Como detectar referências mal calibradas",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "O Winerim identificou referências cujo preço não corresponde ao custo, posição ou papel comercial.",
        whyMatters: "Uma única referência mal calibrada no seu top 5 pode custar-lhe milhares de euros por ano sem dar por isso.",
        riskIfIgnored: "O impacto acumula-se dia a dia e só o vê quando fecha o trimestre e a margem não dá.",
      },
      queSignifica:
        "Uma referência mal calibrada é um vinho cujo preço não reflecte o seu custo real, posição ou papel comercial. Pode estar demasiado barato (perde margem), demasiado caro (não roda) ou mal posicionado frente a outros vinhos da mesma faixa.",
      porQueImporta:
        "Porque uma única referência mal calibrada no seu top 5 de vendas pode custar-lhe milhares de euros por ano. E se tiver várias o impacto acumula-se sem ser visível no dia a dia.",
      queHacer: [
        "Cruze as suas 10 referências mais vendidas com a sua margem: procure as que mais vendem e menos deixam.",
        "Identifique referências com multiplicador menor que ×2 ou maior que ×4,5 (ambos os extremos são sinais de alerta).",
        "Verifique se há vinhos com preço idêntico mas custo muito diferente: um deles está mal calibrado.",
        "Corrija pelo menos uma referência esta semana e meça o impacto em 30 dias.",
      ],
      errores: [
        { mistake: "Assumir que se vende bem o preço está bem", consequence: "Um vinho pode vender muito precisamente porque está demasiado barato." },
        { mistake: "Não rever após mudanças de custo do fornecedor", consequence: "A margem desaparece sem que dê por isso até ao fim do mês." },
        { mistake: "Calibrar apenas por custo sem considerar a percepção do cliente", consequence: "Um repreço agressivo pode quebrar a confiança do cliente habitual." },
      ],
    },
    {
      id: "cuando-subir-precio",
      title: "Quando aumentar preço",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "O Winerim detectou referências com alto volume de venda mas margem abaixo da média da sua carta.",
        whyMatters: "São candidatas claras a um aumento de 1 a 2 euros que raramente impacta a procura mas melhora o seu resultado diário.",
        riskIfIgnored: "Cada serviço que passa sem corrigir o preço é margem que perde e que já não consegue recuperar.",
      },
      queSignifica:
        "Aumentar preço não é sempre a resposta, mas frequentemente é a acção mais directa para melhorar a rentabilidade. O momento certo é quando tem dados que o justificam: uma margem abaixo do benchmark, um custo que subiu, uma referência que vende bem com margem baixa, ou uma faixa de preço onde não tem concorrência interna.",
      porQueImporta:
        "Porque muitos restaurantes evitam aumentar preços por receio de perder clientes, mas a realidade é que aumentos de 1 a 2 euros em referências estratégicas raramente impactam a procura. Por outro lado não aumentar quando deveria custa-lhe margem todos os dias.",
      queHacer: [
        "Identifique as 3 referências com maior volume de venda e margem abaixo da média.",
        "Avalie um aumento de 1 a 2 euros e calcule o impacto anual (volume × incremento).",
        "Comprove que o novo preço não entra em conflito com outra referência da mesma faixa.",
        "Implemente a mudança e revise vendas aos 30 dias. Se o volume não cair o preço estava correcto.",
      ],
      errores: [
        { mistake: "Aumentar todos os preços ao mesmo tempo", consequence: "O cliente habitual nota a mudança e a percepção de valor resente-se." },
        { mistake: "Nunca aumentar por receio de reacção", consequence: "A sua margem erode ano após ano enquanto os custos sobem." },
        { mistake: "Aumentar sem verificar a faixa competitiva", consequence: "Cria um vazio de preço ou uma sobreposição que não existia." },
      ],
    },
    {
      id: "cuando-revisar-compra",
      title: "Quando rever a compra",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "O Winerim detectou referências com margem baixa cujo custo de compra subiu face ao histórico.",
        whyMatters: "Cada euro que poupa na compra é margem directa invisível para o cliente mas muito visível na sua conta de resultados.",
        riskIfIgnored: "Continua a pagar mais do que deveria por lealdade ao fornecedor, não por valor recebido.",
      },
      queSignifica:
        "Uma margem baixa nem sempre se resolve aumentando preço. Às vezes o problema é que está a comprar caro. Rever a compra significa verificar se o custo de aquisição de uma referência continua competitivo se há alternativas mais baratas com qualidade equivalente ou se consegue negociar melhores condições.",
      porQueImporta:
        "Porque cada euro que poupa na compra é um euro de margem directa. E ao contrário de aumentar preço (que o cliente vê) melhorar a compra é invisível para o cliente mas muito visível na sua conta de resultados.",
      queHacer: [
        "Identifique referências com margem baixa e reveja o seu histórico de custo: subiu?",
        "Solicite pelo menos 2 orçamentos alternativos para essas referências.",
        "Negoceie com o seu fornecedor actual usando os preços de mercado como alavanca.",
        "Se a diferença é superior a 10 por cento considere a mudança ou use a negociação para obter melhores condições.",
      ],
      errores: [
        { mistake: "Não rever custos porque 'sempre compra ao mesmo'", consequence: "Paga mais do que necessário por lealdade não por valor recebido." },
        { mistake: "Comparar apenas preço sem avaliar serviço e condições", consequence: "Um fornecedor barato mas pouco fiável custa-lhe mais a longo prazo." },
        { mistake: "Não ligar margem baixa com origem de compra", consequence: "Procura a solução no PVP quando o problema está no custo." },
      ],
    },
    {
      id: "cuando-revisar-copeo",
      title: "Quando rever o programa de copo",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "O Winerim detectou referências por copo cuja margem real difere significativamente da margem teórica.",
        whyMatters: "O copo pode ser a sua melhor alavanca de margem ou a sua maior fonte de perda invisível. Um erro de 0,50 euros por copo em 20 copos semanais é 500 euros/ano perdidos.",
        riskIfIgnored: "Continua a servir copos a preço deficitário sem o saber porque nunca cruzou dados de perda com dados de preço.",
      },
      queSignifica:
        "Se uma referência tem margem baixa e é servida por copo o problema pode estar no copeo: preço de copo mal calculado, perda não contabilizada ou rotação insuficiente. O copeo multiplica os erros de preço porque cada garrafa se divide em 4 a 6 serviços e qualquer desvio repete-se em cada copo.",
      porQueImporta:
        "Porque o copo pode ser a sua melhor alavanca de margem (até ×3 sobre garrafa) ou a sua maior fonte de perda invisível. Um erro de 0,50 euros por copo multiplicado por 20 copos semanais são mais de 500 euros ao ano perdidos numa única referência.",
      queHacer: [
        "Recalcule o preço de copo incluindo perda real (use mínimo 20 a 25 por cento de perda).",
        "Compare a margem por copo com a margem por garrafa da mesma referência.",
        "Se o copo não dá mais margem do que a garrafa ou tem problema de preço ou de perda.",
        "Verifique se a referência por copo tem rotação suficiente para terminar a garrafa em 24 a 48 horas.",
      ],
      errores: [
        { mistake: "Dividir o preço da garrafa por 5 para definir o preço do copo", consequence: "Não cobre perda serviço nem margem. Vende com prejuízo sem o saber." },
        { mistake: "Não medir a perda real de cada referência por copo", consequence: "A sua margem teórica e margem real podem diferir 30 por cento ou mais." },
        { mistake: "Manter copos com baixa rotação 'porque ficam bem na carta'", consequence: "Cada garrafa aberta que não se termina é dinheiro deitado fora." },
      ],
    },
    {
      id: "revision-mensual",
      title: "Como ler uma revisão mensal de margens",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "O Winerim gera automaticamente uma comparativa mensal de margens para que detecte desvios antes que se acumulem.",
        whyMatters: "Os fornecedores sobem preços a perda varia por estação e a procura muda. Sem revisão mensal acumula surpresas.",
        riskIfIgnored: "Os desvios somam-se silenciosamente e só os vê quando o trimestre fecha pior que o esperado.",
      },
      queSignifica:
        "A revisão mensal de margens é o processo de verificar cada mês se a sua carta continua rentável. Inclui comparar margens actuais com as do mês anterior detectar desvios de custo identificar referências que mudaram de rendimento e decidir ajustes. Não é um relatório: é um processo de decisão recorrente.",
      porQueImporta:
        "Porque as margens mudam sem que faça nada. Os fornecedores sobem preços a procura varia as copas geram perda diferente consoante a estação. Se não revê cada mês acumula desvios que ao fim do trimestre se convertem em surpresas desagradáveis.",
      queHacer: [
        "Reserve 1 hora por mês para rever margens. Coloque no calendário como rotina operacional.",
        "Compare a margem média ponderada deste mês versus o anterior. Subiu ou desceu?",
        "Identifique as 3 referências com maior queda de margem e procure a causa (custo volume perda).",
        "Tome pelo menos 1 decisão de ajuste por revisão: repreço mudança de copo negociação com fornecedor.",
      ],
      errores: [
        { mistake: "Não fazer revisão mensal porque 'não há tempo'", consequence: "Os desvios acumulam-se e só os vê quando já são um problema grave." },
        { mistake: "Rever apenas a margem média global", consequence: "A média pode estar bem enquanto 5 referências estão no vermelho." },
        { mistake: "Rever sem tomar nenhuma decisão concreta", consequence: "A revisão converte-se num exercício teórico que não muda nada." },
      ],
    },
  ],
  nextStep: {
    label: "Abra a calculadora de margens",
    href: "/calculadora-margen-vino",
    description: "Calcule a margem real das suas referências e detecte as que precisam de ajuste de preço.",
  },
};

export default margenesPricingPT;
