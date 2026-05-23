import { Package } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const stockRotacionPT: DeepAreaContent = {
  name: "Stock e Rotação",
  tagline: "Identifique o que não se move antes de ser tarde",
  intro: "Esta secção ajuda-o a identificar vinhos estagnados a quantificar o capital que tem imobilizado e a tomar decisões concretas: empurrar mover para copo deslistação ou liquidação. Isto não é teoria de inventário. É sobre garantir que cada garrafa na sua garrafeira tem um plano.",
  icon: Package,
  accent: "text-emerald-500",
  bg: "bg-emerald-500/10",
  audiences: ["sala", "compras-fb", "direccion"],
  topErrors: [
    { error: "Manter referências lentas porque 'venderão algum dia'", porQueOcurre: "Porque deslistação sente-se como admitir um erro de compra. É mais fácil esperar.", consecuencia: "O capital fica imobilizado o vinho perde valor com o tempo e ocupa espaço na carta que poderia gerar vendas reais." },
    { error: "Não quantificar o custo real do stock morto", porQueOcurre: "Porque stock morto não aparece como despesa na conta de resultados. Só o vê quando faz a anulação.", consecuencia: "Não sente a urgência. 20 garrafas com custo de 12 euros são 240 euros que poderiam ser investidos em referências que realmente rodam." },
    { error: "Empurrar uma referência sem medir o resultado", porQueOcurre: "Porque diz à equipa 'recomende-a' mas ninguém segue o resultado. Sem medição não há aprendizagem.", consecuencia: "Não sabe se a acção funcionou. Repete o ciclo: empurra sem medir espera sem dados deslistação demasiado tarde." },
    { error: "Reencomenda automaticamente tudo que acaba", porQueOcurre: "Porque a reencomenda está em piloto automático. A mesma encomenda sai cada semana sem verificar se a procura mudou.", consecuencia: "Financia stock que fica ocioso. As encomendas devem basear-se em rotação real não na carta do mês anterior." },
    { error: "Confundir 'vinho caro' com 'stock morto'", porQueOcurre: "Porque um vinho de 60 euros que demora tempo a vender parece stock morto mas pode servir um papel de imagem ou de bilhete alto.", consecuencia: "Deslistar vinhos estratégicos que servem um propósito e substituí-los com mais da mesma gama média que já saturou." },
  ],
  links: [
    { label: "Calculadora de stock morto", href: "/herramientas/calculadora-stock-muerto", description: "Quantifique o capital imobilizado em referências sem vendas", type: "tool" },
    { label: "Checklist: Detecção de stock morto", href: "/recursos/checklist-deteccion-vinos-muertos", description: "Processo passo a passo para identificar e agir no stock estagnado", type: "resource" },
    { label: "Scorecard mensal", href: "/recursos/scorecard-mensual", description: "Monitorize a saúde do seu stock cada mês com métricas-chave", type: "resource" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "O motor analítico que detecta baixa rotação automaticamente", type: "product" },
    { label: "Winerim Supply", href: "/producto/winerim-supply", description: "Conecte rotação com decisões de compra e reabastecimento", type: "product" },
    { label: "Blog: Como detectar stock morto", href: "/article/como-detectar-stock-muerto-carta-vinos", description: "Sinais de aviso e processo para identificar vinhos sem rotação", type: "article" },
    { label: "Blog: Que vinhos merecem reabastecimento", href: "/article/que-vinos-merece-la-pena-reponer", description: "Critérios para decidir o que fica e o que sai da próxima encomenda", type: "article" },
  ],
  miniCases: [
    {
      profile: "Restaurante de hotel com 90 referências",
      situation: "22 referências tinham passado 90 dias sem uma única venda. Capital imobilizado: 3.400 euros.",
      action: "Deslistou 15 referências. Moveu 5 para copo com preços agressivos. Devolveu as restantes 2 ao fornecedor.",
      result: "Libertou 2.800 euros de capital que foi reinvestido em 8 novas referências com procura validada. Stock morto desceu de 24 para 6 por cento.",
    },
    {
      profile: "Bistro urbano com 28 referências",
      situation: "Só observava vendas semanais. Não notou que 6 vinhos tinham passado 45 dias sem rotação porque 'um vendeu-se recentemente'.",
      action: "Configure um alerta automático no Winerim aos 30 dias sem venda. Cada segunda revê a lista e decide: empurra copo ou deslistar.",
      result: "Em 3 meses passou de 6 vinhos mortos para 1. A rotação média da lista melhorou 18 por cento.",
    },
  ],
  subtopics: [
    {
      id: "stock-muerto",
      title: "O que conta como stock morto",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "O Winerim identificou referências na sua lista com zero vendas por mais de 60 dias.",
        whyMatters: "Entre 10 e 25 por cento da carta média de restaurante é stock morto sem o saberem. É capital que não funciona.",
        riskIfIgnored: "Cada mês que passa esse dinheiro fica ocioso. Não melhora com o tempo: apenas se acumula.",
      },
      queSignifica:
        "Stock morto é qualquer referência que passou mais de 60 dias sem venda e sem clara justificação estratégica (reserva especial vinho mantido para evento etc.). Não é o mesmo que stock lento: um vinho que vende 2 garrafas por mês é lento mas vivo. Um que não se move há 3 meses está morto. A distinção importa porque a acção é diferente.",
      porQueImporta:
        "Porque cada garrafa ociosa é dinheiro que não funciona. Um restaurante médio tem entre 10 e 25 por cento da sua lista em stock morto sem o saber. Se tem 20 referências mortas com custo médio de 8 euros com média de 3 garrafas cada isso são 480 euros imobilizados que poderiam gerar margem em referências que realmente rodam.",
      queHacer: [
        "Filtre todas as referências com zero vendas nos últimos 60 dias.",
        "Separe as com justificação estratégica (evento reserva de cliente) daquelas que simplesmente foram esquecidas.",
        "Para as esquecidas decida agora: empurra em serviço copo desconto ou deslistação?",
        "Estabeleça uma regra: qualquer referência sem venda em 60 dias entra automaticamente em revisão.",
      ],
      errores: [
        { mistake: "Pensar que 'stock morto' significa apenas vinho velho ou deteriorado", consequence: "O stock morto mais caro é normalmente vinho perfeitamente bebível que ninguém comanda." },
        { mistake: "Não distinguir entre stock morto e stock estratégico", consequence: "Deslistar vinhos que deveria manter ou manter os que deveria ir." },
        { mistake: "Esperar que o problema se resolva sozinho", consequence: "Vinho não melhora com o tempo numa garrafeira de restaurante. O capital fica ocioso." },
      ],
    },
    {
      id: "capital-inmovilizado",
      title: "Como detectar capital imobilizado",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "O Winerim calculou o valor total de garrafas não vendidas na sua garrafeira.",
        whyMatters: "É dinheiro real investido que não gera retorno. Invisível na conta de resultados mas muito real no seu fluxo de caixa.",
        riskIfIgnored: "Sem acção o capital imobilizado cresce cada mês com cada nova encomenda que não se ajusta à procura.",
      },
      queSignifica:
        "Capital imobilizado é o valor total de compra de todas as garrafas que tem na garrafeira que não se vendem. Não é número abstracto: são euros reais que investiu que não geram retorno. Para o calcular multiplique o custo de compra de cada referência sem vendas pelo número de garrafas em stock.",
      porQueImporta:
        "Porque é dinheiro invisível. Não aparece como despesa na sua conta de resultados mas também não gera receita. É a forma mais silenciosa de perder rentabilidade. Um grupo de restaurantes pode ter milhares de euros imobilizados sem ninguém saber porque o stock está espalhado por locais e ninguém soma.",
      queHacer: [
        "Calcule o valor total do stock sem vendas nos últimos 60 dias (custo × unidades).",
        "Ordene do maior para o menor: as top 5 referências provavelmente representam 50 por cento do problema.",
        "Defina um alvo: reduzir capital imobilizado 30 por cento nos próximos 60 dias.",
        "Estabeleça um indicador mensal: capital imobilizado como percentagem do stock total.",
      ],
      errores: [
        { mistake: "Nunca calcular capital imobilizado", consequence: "Não sabe quanto dinheiro tem ocioso. Não consegue melhorar o que não mede." },
        { mistake: "Contar apenas unidades não valor em euros", consequence: "20 garrafas a 3 euros não são o mesmo que 20 a 25 euros. O impacto é radicalmente diferente." },
        { mistake: "Rever stock total sem separar o que roda do que não roda", consequence: "O seu inventário parece razoável mas lá dentro há uma camada de capital morto que não consegue ver." },
      ],
    },
    {
      id: "cuando-impulsar",
      title: "Quando deve empurrar uma referência",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "O Winerim encontrou vinhos com boa margem e boas classificações mas baixa rotação: não se vendem mas poderiam.",
        whyMatters: "Muitos vinhos não se vendem por falta de visibilidade não qualidade. Um empurrão de 7 a 14 dias pode reactivá-los.",
        riskIfIgnored: "Deslistar vinhos potencialmente rentáveis sem lhes dar uma oportunidade real de venda.",
      },
      queSignifica:
        "Empurrar significa dar a um vinho que não se vende uma segunda oportunidade activa. Não é esperar: é pôr a equipa de sala a trabalhar com essa referência por um período específico (7 a 14 dias) e medir se responde. Se o vinho é bom bem posicionado e o cliente simplesmente não o conhece um empurrão da sala pode reactivá-lo.",
      porQueImporta:
        "Porque muitos vinhos não se vendem por falta de visibilidade não falta de qualidade. Se a equipa de sala não o conhece não o recomenda. Se não o recomenda não se vende. E se não se vende deslistar sem saber se realmente não tinha procura.",
      queHacer: [
        "Seleccione 2 a 3 referências com baixa rotação mas boa margem e bom rácio qualidade-preço.",
        "Treine a equipa de sala: deixe-os provar saibam como descrever e tenham uma clara proposta de venda.",
        "Defina um período de empurrão (7 a 14 dias) e uma meta mínima de vendas.",
        "Se não respondeu no fim do período passe ao nível seguinte: copo ou deslistação.",
      ],
      errores: [
        { mistake: "Empurrar tudo ao mesmo tempo", consequence: "A equipa não consegue recomendar 10 vinhos novos em simultâneo. Concentre-se." },
        { mistake: "Empurrar sem treinar a equipa", consequence: "Se o escanção não sabe o que dizer o empurrão não funciona." },
        { mistake: "Não definir prazo para o empurrão", consequence: "Sem prazo o 'empurrão' torna-se uma esperança eterna." },
      ],
    },
    {
      id: "cuando-sacar-por-copa",
      title: "Quando mover para copo",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "O Winerim encontrou referências lentas que poderiam funcionar por copo para acelerar rotação.",
        whyMatters: "O copo baixa a barreira de entrada do cliente e deixa recuperar capital em dias em vez de meses.",
        riskIfIgnored: "O stock fica ocioso até se deteriorar ou liquida com perda.",
      },
      queSignifica:
        "Mover uma referência lenta para copo é uma estratégia de resgate: em vez de esperar que alguém encomende a garrafa oferece-a por copo para acelerar rotação e recuperar pelo menos parte do investimento. Funciona bem com vinhos que são bons mas o cliente não ousa encomenda por garrafa (preço alto uva desconhecida região desconhecida).",
      porQueImporta:
        "Porque o copo baixa a barreira de entrada do cliente. Um vinho que ninguém comanda a 35 euros por garrafa pode facilmente vender-se a 8 euros por copo. Além disso o copo deixa recuperar capital em dias em vez de meses. Mas só funciona se o vinho tem rotação suficiente por copo para terminar a garrafa antes de oxidar.",
      queHacer: [
        "Avalie se o vinho aguenta 24 a 48 horas aberto sem perder qualidade (se não exclua para copo).",
        "Calcule o preço de copo incluindo perda real (mínimo 20 a 25 por cento de perda na garrafa).",
        "Diga à equipa de sala que é uma referência prioritária para recomendar por copo.",
        "Se em 2 semanas não vendeu pelo menos 2 a 3 copos por semana deslistar e liberte o espaço.",
      ],
      errores: [
        { mistake: "Colocar um vinho por copo que não aguenta aberto", consequence: "Serve vinho oxidado perde confiança do cliente e desperdiça a garrafa." },
        { mistake: "Não ajustar o preço de copo para cobrir perda", consequence: "Vende por copo mas perde dinheiro porque a garrafa nunca se termina." },
        { mistake: "Manter demasiados copos activos de vinhos lentos", consequence: "Abre 8 garrafas vende 2 copos de cada e joga o resto fora." },
      ],
    },
    {
      id: "cuando-retirar",
      title: "Quando deslistação uma referência",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "O Winerim identificou referências que não responderam a empurrão ou copo: claros candidatos a deslistação.",
        whyMatters: "Cada referência sem justificação tira espaço físico e mental a outra que poderia realmente vender.",
        riskIfIgnored: "Manter stock morto indefinidamente acumular capital ocioso e complexidade sem retorno.",
      },
      queSignifica:
        "Deslistação é a última opção mas por vezes é a melhor. Um vinho deve sair da lista quando: passou por empurrão e copo sem resultado a sua margem não justifica o esforço ou simplesmente não se encaixa no seu conceito. Deslistação não é falha: é gestão. O pior que pode fazer é manter uma referência que ocupa espaço sem gerar nada.",
      porQueImporta:
        "Porque cada referência que mantém sem justificação ocupa espaço (físico e mental) a outra que poderia vender. A sua lista tem um número óptimo de referências e excedê-lo dilui atenção do cliente complica operações e aumenta custo de gestão.",
      queHacer: [
        "Se uma referência não respondeu a empurrão ou copo em 30 dias deslistar.",
        "Decida o que fazer com o stock restante: liquidar devolver ao fornecedor ou consumo interno.",
        "Actualize a lista e avise a equipa que a referência já não está disponível.",
        "Documente a decisão para não ser reencomendada no futuro.",
      ],
      errores: [
        { mistake: "Manter 'em caso de alguém pedir'", consequence: "Ninguém vai pedir. Enquanto isso ocupa espaço e capital." },
        { mistake: "Deslistação sem documentar a razão", consequence: "O próximo escanção ou comprador pode encomendá-lo outra vez." },
        { mistake: "Não ter um processo claro de deslistação", consequence: "As decisões ficam adiadas indefinidamente e stock morto acumula." },
      ],
    },
    {
      id: "evolucion-stock",
      title: "Como ler a evolução do stock",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "O Winerim monitoriza o seu trend de stock mês a mês: capital imobilizado referências sem vendas e baixa rotação.",
        whyMatters: "O que importa não é o retrato de hoje mas se o trend está a melhorar ou piorar.",
        riskIfIgnored: "Stock que piora cada mês torna-se crise. Se não observar o trend só reage quando é tarde.",
      },
      queSignifica:
        "Evolução do stock não é um retrato: é um trend. O que importa não é quanto stock tem hoje mas como mudou em relação ao mês anterior. Subiu o capital imobilizado? Apareceram novas referências sem vendas? O percentual da lista com baixa rotação está a melhorar ou piorar? Ler a evolução deixa-o antecipar problemas antes de virarem crises.",
      porQueImporta:
        "Porque stock que piora cada mês sinala que algo está a falhar na sua compra lista ou equipa de sala. Se não observar o trend só reage quando o problema é já grande. Se o fizer consegue corrigir a rota antes do capital imobilizado espiral.",
      queHacer: [
        "Compare 3 indicadores cada mês: capital imobilizado total número de referências sem vendas em 60 dias e percentual da lista com rotação menor que 1 por mês.",
        "Se qualquer um dos três subiu em relação ao mês anterior investigue a causa antes que se acumule.",
        "Correlacione evolução do stock com as suas decisões de compra: está a comprar mais do que vende?",
        "Estabeleça uma meta trimestral de melhoria e reveja com a equipa cada mês.",
      ],
      errores: [
        { mistake: "Observar apenas o stock total sem desagregar por rotação", consequence: "O seu inventário pode parecer estável enquanto stock morto cresce lá dentro." },
        { mistake: "Rever stock apenas quando há um problema visível", consequence: "Quando vê já perdeu meses de capital imobilizado." },
        { mistake: "Não ligar evolução do stock com decisões de compra", consequence: "Continua a comprar o que não se vende porque ninguém cruza os dados." },
      ],
    },
  ],
  nextStep: {
    label: "Detecte stock morto com a calculadora",
    href: "/herramientas/calculadora-stock-muerto",
    description: "Quantifique o capital imobilizado em referências sem vendas e decida qual deslistar primeiro.",
  },
};

export default stockRotacionPT;
