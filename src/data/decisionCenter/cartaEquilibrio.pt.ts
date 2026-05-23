import { BarChart3 } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const cartaEquilibrioPT: DeepAreaContent = {
  name: "Carta de Vinhos & Equilibrio",
  tagline: "A sua carta de vinhos deveria contar uma historia coerente",
  intro: "Esta seccao ajuda-o a avaliar se a sua carta de vinhos tem a estrutura certa para vender, nao apenas para impressionar. Equilibrar uma carta nao e ter 'um pouco de tudo': e cada referencia ter um papel claro. Especialmente para cartas grandes e complexas - de 250 referencias em diante - o equilibrio deixa de ser uma questao estetica e torna-se uma decisao estrategica que impacta directamente as vendas, o stock e a experiencia do cliente.",
  icon: BarChart3,
  accent: "text-wine",
  bg: "bg-wine/10",
  audiences: ["sala", "direccion", "compras-fb"],
  topErrors: [
    { error: "Construir a carta por acumulacao em vez de por design", porQueOcurre: "Porque cada vinho novo e adicionado sem remover outro. O fornecedor oferece, o escanção aceita, a carta cresce sem criterios.", consecuencia: "A carta incha, fica desequilibrada e enche-se com redundancias que canibalizem vendas e geram stock morto." },
    { error: "Saturar um nivel de preco sem cobrir outros", porQueOcurre: "Porque compra o que gosta ou o que o fornecedor habitual oferece, que normalmente opera no mesmo nivel.", consecuencia: "Compete consigo mesmo a EUR 25-35 enquanto clientes a procura de algo abaixo de EUR 20 ou acima de EUR 50 nao encontram opcoes." },
    { error: "Desequilibrio por origem: 80% de uma unica apelacao", porQueOcurre: "Porque a zona de conforto do comprador ou proximidade geografica concentra compras de poucas origens.", consecuencia: "Dependencia de um mercado (risco de preco), falta de diversidade para o cliente e uma carta que nao conta uma historia interessante." },
    { error: "Adicionar sem remover: 'mais opcoes, melhor'", porQueOcurre: "Porque remover parece perder e adicionar parece ganhar. Mas alem de certo ponto, cada referencia nova dilui atencao.", consecuencia: "O cliente demora mais para decidir, a equipa nao consegue conhecer a carta completa e as vendas concentram-se em 15-20 referencias enquanto o resto e decoracao." },
    { error: "Nao mapear a carta antes de tomar decisoes", porQueOcurre: "Porque trabalha da lista de referencias sem visualizar a estrutura. As decisoes sao tomadas uma a uma, sem ver o quadro completo.", consecuencia: "Adiciona onde ja esta saturado e deixa lacunas onde ha procura. E como renovar uma casa sem olhar para a planta." },
  ],
  links: [
    { label: "Modelo de wine mapping", href: "/recursos/plantilla-wine-mapping-restaurante", description: "Mapeie a sua carta por tipo, preco, origem e papel comercial", type: "resource" as const },
    { label: "Modelo de equilibrio da carta", href: "/recursos/plantilla-equilibrio-carta", description: "Diagnostique saturacao, lacunas e canibalizacao por nivel", type: "resource" as const },
    { label: "Checklist de carta rentavel", href: "/recursos/checklist-carta-rentable", description: "Verifique se a sua carta cumpre os criterios de uma carta que vende", type: "resource" as const },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "O motor de analise que avalia o seu equilibrio de carta automaticamente", type: "product" as const },
    { label: "Blog: A sua carta esta desequilibrada?", href: "/article/como-saber-si-carta-vinos-esta-descompensada", description: "Diagnostico rapido para detectar desequilibrios na sua carta de vinhos", type: "article" as const },
    { label: "Blog: A sua carta e demasiado longa?", href: "/article/cuando-carta-vinos-es-demasiado-larga", description: "Sinais de demasiadas referencias e como agir", type: "article" as const },
  ],
  subtopics: [
    {
      id: "carta-descompensada",
      title: "Como perceber se uma carta esta desequilibrada",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim mapeou a distribuicao da sua carta por tipo, preco e origem e encontrou areas de saturacao e lacunas.", whyMatters: "Uma carta desequilibrada perde vendas (o cliente nao encontra o que quer), canibalizeia margem e acumula stock onde ha excesso.", riskIfIgnored: "Cada referencia nova adicionada sem criterios desequilibra ainda mais a carta e amplifica o problema." },
      queSignifica:
        "Uma carta desequilibrada e aquela onde a distribuicao de referencias nao reflete o que os seus clientes realmente encomendam. Podia ser excesso de tintos e quase nenhum espumante, uma concentracao exagerada num nivel de preco, ou 40% da carta dedicada a uma unica regiao. O desequilibrio nao e visivel a primeira vista: e detectado quando mapeia a carta por variaveis e compara com os seus dados de vendas.",
      porQueImporta:
        "Porque uma carta desequilibrada cria tres problemas simultaneamente: o cliente nao consegue encontrar o que quer (venda perdida), referencias saturadas canibalizem-se mutuamente (margem perdida) e acumula stock em areas de excesso (capital atado). Em cartas grandes - de 250 referencias em diante - o desequilibrio amplifica-se exponencialmente.",
      queHacer: [
        "Mapeie a sua carta por tipo de vinho (tinto, branco, rose, espumante, fortificado) e calcule o % de cada.",
        "Cruze essa distribuicao com os seus dados de vendas: e 70% da sua carta tinto mas 40% das suas vendas branco?",
        "Identifique as 3 categorias mais saturadas e as 2 mais vazias. Essas sao as suas oportunidades.",
        "Estabeleca uma distribuicao alvo consistente com o seu conceito e revise-a trimestralmente.",
      ],
      errores: [
        { mistake: "Assumir que a carta e equilibrada porque 'tem um pouco de tudo'", consequence: "Ter um pouco de tudo nao e equilibrio. Podia ter 60 tintos e 4 brancos." },
        { mistake: "Equilibrar pelo numero de referencias sem olhar para vendas", consequence: "Podia ter 20 vinhos espumantes e vender 2. O equilibrio deveria refletir procura." },
        { mistake: "Nao rever equilibrio apos adicionar referencias novas", consequence: "Cada adicao sem criterios desequilibra um pouco mais a carta." },
      ],
    },
    {
      id: "exceso-huecos-precio",
      title: "Excesso e lacunas por faixa de preco",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim analisou a sua distribuicao de referencias por nivel de preco e encontrou zonas saturadas e niveis vazios.", whyMatters: "O preco e o primeiro filtro do cliente. Saturar um nivel gera canibalizacao; deixar lacunas perde vendas que nunca ve.", riskIfIgnored: "Continua a saturar niveis onde ja compite consigo mesmo enquanto o cliente a procura de algo diferente parte sem encomendar." },
      queSignifica:
        "Faixas de preco sao os niveis onde as suas referencias sao distribuidas: EUR 10-15, EUR 15-25, EUR 25-40, etc. Excesso num nivel significa ter demasiadas referencias competindo pelo mesmo cliente no mesmo intervalo. Uma lacuna significa ha um nivel onde o cliente procura e nao encontra nada. Ambos sao problemas, mas excesso e mais caro (gera canibalizacao e stock) e lacunas sao mais invisiveis (perde vendas que nunca ve).",
      porQueImporta:
        "Porque o preco e o primeiro filtro do cliente. Se a sua carta tem 15 tintos entre EUR 18 e EUR 22 e nenhum entre EUR 30 e EUR 40, esta a saturar o cliente indeciso num nivel e perder o que procura algo especial. Em cartas grandes, este efeito multiplica-se: cada nivel saturado e um ninho de canibalizacao.",
      queHacer: [
        "Divida a sua carta em niveis de preco (p.ex. <EUR 15, EUR 15-25, EUR 25-40, EUR 40-60, >EUR 60) e conte referencias em cada.",
        "Identifique niveis com mais de 10 referencias do mesmo tipo: isso e saturacao.",
        "Procure niveis vazios ou com menos de 2 opcoes: essa e uma lacuna para preencher.",
        "Compare distribuicao de preco com o seu bilhete medio de vinho: estao a maioria das suas opcoes no nivel que o seu cliente escolhe?",
      ],
      errores: [
        { mistake: "Sem visibilidade da distribuicao por nivel de preco", consequence: "Nao sabe onde esta saturado ou onde tem lacunas ate um cliente lhe dizer." },
        { mistake: "Adicionar referencias sem verificar em que nivel caem", consequence: "Cada referencia nova que cai num nivel saturado piora o problema." },
        { mistake: "Preencher uma lacuna com um vinho que nao se adequa ao conceito", consequence: "Ter algo naquele nivel nao e suficiente: deve ser consistente com o seu restaurante." },
      ],
    },
    {
      id: "equilibrio-estilos",
      title: "Equilibrio por estilo",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim classificou a sua carta por perfil organoletico e detectou concentracao excessiva em certos estilos.", whyMatters: "Se todos os seus tintos sao poderosos ou todos os seus brancos sao frutados, limita o seu mercado potencial a um unico tipo de palato.", riskIfIgnored: "Perde o cliente que quer algo diferente. E nunca sabe, porque nao pergunta: simplesmente escolhe algo diferente ou salta o vinho." },
      queSignifica:
        "Alem de tinto/branco/rose, equilibrio de estilo olha para a diversidade de perfis organoleticos: tem vinhos leves e frescos ao lado de poderosos? Ha opcoes jovens tanto como envelhecidas? A sua carta oferece variedade de castas e vinificacao, ou tudo soa similar? O equilibrio de estilo determina se a sua carta cobre a amplitude dos gostos da sua clientela ou fala apenas a um tipo de palato.",
      porQueImporta:
        "Porque o cliente nao escolhe apenas por tipo e preco: escolhe o que apetece. Se todos os seus tintos sao poderosos e com madeira, perde o que quer algo leve. Se todos os seus brancos sao frutados, perde o que procura mineralsidade. Um bom equilibrio de estilo maximiza a probabilidade de cada cliente encontrar algo que encaixa.",
      queHacer: [
        "Classifique as suas referencias por perfil: leve/medio/completo, jovem/envelhecido/reserva, aromatico/mineral/estruturado.",
        "Verifique se tem opcoes em cada quadrante ou se tudo se concentra num perfil.",
        "Pergunte a equipa de sala: ha pedidos que nao conseguem cobrir com a carta atual?",
        "Se 80% da sua carta tem um perfil similar, esta a limitar o seu mercado potencial.",
      ],
      errores: [
        { mistake: "Desenhar a carta segundo o gosto do escanção ou chef", consequence: "A sua carta satisfaz quem a desenha, mas pode estar a ignorar 60% dos clientes." },
        { mistake: "Confundir variedade de produtores com variedade de estilos", consequence: "20 produtores diferentes podem fazer vinhos muito similares se sao da mesma regiao e casta." },
        { mistake: "Nao adaptar estilos a cozinha do restaurante", consequence: "Uma carta cheia de tintos poderosos num restaurante de cozinha leve cria dissonancia." },
      ],
    },
    {
      id: "equilibrio-origen",
      title: "Equilibrio por origem",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim analisou a distribuicao da sua carta por apelacao e origem e detectou sobre-concentracao ou dispersao.", whyMatters: "A concentracao de origem cria risco de compra (dependencia de mercado) e pode nao refletir o que a sua clientela pede.", riskIfIgnored: "Se a sua apelacao principal aumenta precos, nao tem alternativas. E a sua carta conta uma historia que pode nao combinar com o seu cliente." },
      queSignifica:
        "O equilibrio de origem avalia como as suas referencias sao distribuidas por apelacao, regiao ou pais. Concentracao excessiva numa origem pode limitar a sua oferta e criar dependencia de um mercado de compra. Dispersao excessiva pode gerar uma carta sem identidade. O ponto ideal depende do seu conceito: um restaurante de cozinha regional tem concentracao logica; um cosmopolita precisa de amplitude.",
      porQueImporta:
        "Porque a origem e parte da historia que a sua carta conta. Se tem 30 Riojas e 2 Albarinos, a sua carta diz algo sobre as suas prioridades - que pode ou nao corresponder ao que a sua clientela encomenda. Tambem, a concentracao de origem cria risco de compra: se a sua apelacao principal aumenta precos, nao tem alternativas imediatas.",
      queHacer: [
        "Liste as 5 apelacoes ou regioes com mais referencias na sua carta. Excedem 50% do total?",
        "Compare com os seus dados de vendas: a concentracao e justificada por procura ou por inercia de compra?",
        "Avalie se a sua distribuicao de origem e coerente com o seu tipo de cozinha e perfil de cliente.",
        "Se detectar sobre-concentracao, nao elimine tudo de uma vez: substitua gradualmente ao renovar referencias.",
      ],
      errores: [
        { mistake: "Sobre-representar uma apelacao devido a relacoes pessoais com adegarias ou distribuidoras", consequence: "A sua carta reflete os seus contactos comerciais, nao as necessidades do cliente." },
        { mistake: "Diversificar pelo bem da diversidade sem criterios", consequence: "Uma carta com 30 paises e sem profundidade nao transmite expertise: transmite desordem." },
        { mistake: "Nao adaptar origens a sazoneidade da cozinha", consequence: "Brancos de clima frio em inverno e tintos poderosos em verao nao correspondem ao que o cliente quer." },
      ],
    },
    {
      id: "carta-demasiado-larga",
      title: "Quando uma carta de vinhos e demasiado longa",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim calculou o seu racio de efetividade: referencias com vendas reais vs. total de referencias na carta.", whyMatters: "Opcoes em excesso paralizam o cliente, concentram vendas em 15-20 referencias e tornam o resto decoracao custosa.", riskIfIgnored: "Acumula complexidade, stock e gestao sem retorno. A sua equipa sempre recomenda o mesmo porque nao consegue conhecer a carta completa." },
      queSignifica:
        "Uma carta e demasiado longa quando tem mais referencias do que a sua operacao consegue gerir, do que a sua equipa consegue conhecer, ou do que o cliente consegue processar. Nao ha numero magico, mas ha sinais claros: se mais de 20% das suas referencias nao venderam em 60 dias, se a equipa de sala nao consegue descrever metade da carta, ou se o cliente demora mais de 5 minutos para escolher, a sua carta e demasiado longa para o seu contexto.",
      porQueImporta:
        "Porque uma carta longa nao impressiona: paralisa. O excesso de opcoes (paradoxo da escolha) reduz conversao, aumenta tempo de servico e concentra vendas nas mesmas 15-20 referencias que a equipa conhece e recomenda. O resto e decoracao gerando stock, gestao e custo sem retorno. Em cartas grandes de 250 referencias em diante, este risco e estrutural.",
      queHacer: [
        "Calcule o seu racio de efetividade: referencias com vendas reais nos ultimos 60 dias / total de referencias.",
        "Se o seu racio e < 70%, a sua carta tem demasiadas referencias para o seu nivel de procura.",
        "Identifique referencias que a equipa nunca recomenda: sao provavelmente desnecessarias.",
        "Estabeleca um limite operacional e respeite-o: cada adicao nova requer uma remocao.",
      ],
      errores: [
        { mistake: "Acreditar que uma carta longa significa qualidade ou prestigio", consequence: "Uma carta de 400 referencias onde 150 nao vendem nao e prestigiosa: e ineficiente." },
        { mistake: "Nao estabelecer limite no numero de referencias", consequence: "A carta cresce por acumulacao e nunca e podada, ate o stock morto forcaestao." },
        { mistake: "Reduzir a carta eliminando os vinhos mais baratos", consequence: "Vinhos de entrada sao os que mais rodam e frequentemente a porta de entrada para vendas de vinho a copo." },
      ],
    },
    {
      id: "carta-amplia-compleja",
      title: "O que significa uma carta grande e complexa",
      priority: "seguimiento",
      porQueTeLoMostramos: { detected: "A sua carta excede 250 referencias: e um ativo estrategico se gerido com dados, e uma responsabilidade se gerido por intuicao.", whyMatters: "Complexidade adiciona profundidade mas tambem friccao: mais stock, mais canibalizacao, mais risco sem visibilidade.", riskIfIgnored: "Sem ferramentas de analise, complexidade torna-se caos. Nao consegue ver o que canibalizeia ou onde estao as lacunas." },
      queSignifica:
        "Uma carta grande e complexa - de 250 referencias em diante - nao e inerentemente boa nem ma. E um ativo estrategico se gerida com dados, e uma responsabilidade operacional se gerida por intuicao. Complexidade adiciona profundidade (mais opcoes para o cliente experto) mas tambem adiciona friccao (mais dificil de gerir, mais stock, mais risco de canibalizacao). Winerim foi especificamente desenhado para este cenario.",
      porQueImporta:
        "Porque gerir uma carta de 250+ referencias sem ferramentas de analise e como voar um aviao sem instrumentos. Precisa de saber o que vende, o que nao, o que canibalizeia, onde tem lacunas e onde tem excesso. Sem essa visibilidade, complexidade torna-se caos. Com ela, torna-se vantagem competitiva.",
      queHacer: [
        "Se a sua carta excede 250 referencias, priorize implementar um sistema de analise continua (nao reviews pontuais).",
        "Segmente a carta em blocos geraveis: por tipo, por nivel de preco, por origem. Analise cada bloco separadamente.",
        "Designe um proprietario da saude da carta que reveja indicadores chave mensalmente.",
        "Aceite que complexidade requer ferramentas: o que funciona com 80 referencias nao escala para 300.",
      ],
      errores: [
        { mistake: "Gerir uma carta de 300 referencias com os mesmos metodos que uma de 50", consequence: "Complexidade cresce exponencialmente, mas metodos manuais nao escalam." },
        { mistake: "Nao segmentar: tratar a carta inteira como um bloco", consequence: "Problemas num segmento diluem-se na media e nao sao detectados ate serem graves." },
        { mistake: "Considerar complexidade como um problema a reduzir em vez de um ativo a gerir", consequence: "Se o seu conceito requer amplitude, a solucao nao e cortar: e gerir melhor." },
      ],
    },
    {
      id: "wine-mapping",
      title: "Como interpretar wine mapping e arquitetura de carta",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim gerou automaticamente o wine mapping para a sua carta cruzando tipo × preco × estilo.", whyMatters: "Sem um mapa visual, cada decisao (adicao, remocao, repreco) e tomada sem contexto. O mapa diz-lhe onde agir em 5 minutos.", riskIfIgnored: "Toma decisoes numa carta sem ver a estrutura. E como renovar uma casa sem ter a planta." },
      queSignifica:
        "Wine mapping e a representacao visual da sua carta numa matriz cruzando pelo menos duas variaveis: tipicamente tipo de vinho × nivel de preco, ou estilo × origem. Arquitetura de carta e o proximo passo: atribuir um papel comercial a cada zona do mapa (atracao, conversao, posicionamento, exploracao). Um mapa bem lido diz-lhe onde agir. Uma arquitetura bem definida diz-lhe por que.",
      porQueImporta:
        "Porque sem um mapa nao consegue ver a estrutura da sua carta. E sem estrutura, cada decisao (adicionar, remover, repreco) e tomada sem contexto. Wine mapping converte uma lista de 200 referencias numa imagem que qualquer gestor consegue interpretar em 5 minutos. E a ferramenta de diagnostico mais rapida que existe para uma carta de vinhos.",
      queHacer: [
        "Crie um mapa da sua carta com eixos tipo × preco. Cada referencia e um ponto no mapa.",
        "Identifique zonas densas (saturacao) e zonas vazias (oportunidade ou irrelevancia).",
        "Atribua papeis: que zona atrai o cliente? Que converte? Que posiciona o seu restaurante?",
        "Use o mapa para decisoes de adicao/remocao: se um vinho novo cai numa zona saturada, precisa remover outro primeiro.",
      ],
      errores: [
        { mistake: "Nao ter um mapa visual da carta", consequence: "Toma decisoes numa carta sem ver a estrutura. E como renovar uma casa sem ter a planta." },
        { mistake: "Fazer wine mapping uma vez e nao atualizar", consequence: "O mapa expira com cada alteracao da carta. Deve ser um documento vivo." },
        { mistake: "Mapear apenas por tipo e preco sem incluir dados de vendas", consequence: "Ve a estrutura mas nao sabe que zonas funcionam e que nao." },
      ],
    },
  ],
  miniCases: [
    {
      profile: "Fine dining com carta de 180 referencias",
      situation: "65% da carta eram tintos de Rioja e Ribera, concentrados entre EUR 25 e EUR 35. Brancos e espumantes representavam apenas 12%. A equipa reconhecia que muitos clientes pediam 'algo fresco' e nao encontravam opcoes.",
      action: "Mapeou a carta por tipo × preco. Removeu 14 tintos redundantes no nivel saturado e adicionou 6 brancos e 3 espumantes em niveis vazios (EUR 15-25 e EUR 35-50). Redistribuiu sem alterar o numero total de referencias.",
      result: "As vendas de brancos subiram 28% no primeiro mes. O bilhete medio de vinho aumentou EUR 2,40 porque clientes encontraram opcoes onde nao havia.",
    },
    {
      profile: "Hotel boutique com carta de 310 referencias",
      situation: "Carta grande e complexa gerida como uma lista plana, sem wine mapping. 22% das referencias nao venderam em 90 dias. A equipa de compras nao sabia o que remover porque 'tudo podia vender'.",
      action: "Implementou Winerim Core para gerar wine mapping automatico. Identificou 68 referencias em zonas de saturacao e 4 niveis de preco sem cobertura. Removeu 35 referencias em 3 fases mensais.",
      result: "O racio de efetividade foi de 72% para 89%. Capital libertado do stock: EUR 8.200. A equipa de sala passou de recomendar sempre os mesmos vinhos para cobrir pedidos diversos.",
    },
    {
      profile: "Wine bar com 95 referencias e rotacao alta",
      situation: "Todos os vinhos ficavam entre EUR 18 e EUR 30. Nada abaixo de EUR 15 (entrada) ou acima de EUR 45 (especial). O cliente casual partia sem encomendar e o conhecedor nao encontrava profundidade.",
      action: "Criou tres niveis novos: entrada (<EUR 15, 4 vinhos), exploracao (EUR 35-45, 5 vinhos) e imagem (>EUR 50, 3 vinhos). Reduziu o nivel central de 95 para 83 referencias.",
      result: "A penetracao de vinho por mesa subiu de 62% para 74%. Vinhos de imagem abriram conversas que a equipa aproveitou para vender o nivel de exploracao.",
    },
    {
      profile: "Grupo de 5 locais casual-premium",
      situation: "Cada local tinha uma carta diferente criada pelo seu gestor de sala. Nao havia criterio de equilibrio por tipo ou preco. Dois locais nao tinham espumante; um tinha 40% de rose sem procura.",
      action: "Definiu uma arquitetura de carta comum: distribuicao alvo por tipo (50% tinto, 25% branco, 15% espumante, 10% outro) com margem de adaptacao local de ±10%. Usou Winerim Core para monitorizar desvios mensais.",
      result: "Em 3 meses, todos os 5 locais convergiram no equilibrio sem perder identidade. O local com excesso de rose reduziu stock morto em 60%. O benchmarking entre locais permitiu replicar best practices.",
    },
  ],
  nextStep: {
    label: "Revise o equilibrio da sua carta",
    href: "/recursos/plantilla-equilibrio-carta",
    description: "Descarregue o modelo e diagnostique saturacao, lacunas e canibalizacao na sua carta atual.",
  },
};

export default cartaEquilibrioPT;
