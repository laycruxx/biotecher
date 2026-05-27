const exames = [];

function addExam(dados) {
    const referencia = dados.referencia || ['A faixa de referência pode variar conforme idade, sexo, método e laboratório.'];
    exames.push({
        id: dados.id,
        nome: dados.nome,
        categoria: dados.categoria,
        letra: dados.letra || dados.nome.charAt(0).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase(),
        tags: dados.tags || [],
        resumo: dados.resumo,
        descricao: dados.descricao,
        funcionamento: dados.funcionamento,
        motivo: dados.motivo,
        quando: dados.quando,
        preparo: dados.preparo || 'Na maioria dos casos, o preparo depende da orientação do laboratório e do conjunto de exames solicitados no mesmo pedido.',
        alto: dados.alto,
        baixo: dados.baixo,
        alteracao: dados.alteracao,
        valores: referencia,
        observacao: dados.observacao || 'Resultado isolado não fecha diagnóstico. A interpretação deve considerar sintomas, histórico clínico, medicamentos em uso e comparação com exames anteriores.',
        importante: dados.importante || 'Leve o laudo ao profissional responsável, principalmente se houver sintomas ou resultados fora da faixa de referência.'
    });
}

addExam({
    id: 'acido-urico', nome: 'Ácido Úrico', categoria: 'Bioquímica', letra: 'A',
    tags: ['gota', 'rim', 'rins', 'pedra nos rins', 'dor articular', 'purinas'],
    resumo: 'Mede a concentração de ácido úrico no sangue e auxilia na investigação de gota, cálculos renais e alterações do metabolismo de purinas.',
    descricao: 'O ácido úrico é uma substância formada quando o organismo degrada purinas, compostos presentes nas células e em alguns alimentos. Ele circula no sangue e é eliminado principalmente pelos rins.',
    funcionamento: 'A análise é feita em amostra de sangue venoso. O laboratório mede a quantidade de ácido úrico presente no soro e compara o resultado com a faixa de referência adotada.',
    motivo: 'Ajuda a investigar crises de dor articular sugestivas de gota, formação de pedras nos rins, acompanhamento de doença renal e monitoramento de algumas terapias.',
    quando: 'Costuma ser solicitado em dor e inchaço nas articulações, histórico de cálculo renal, doença renal, uso de medicamentos que alteram ácido úrico ou acompanhamento de quimioterapia.',
    alto: 'Valores altos podem estar associados a gota, redução da eliminação renal, dieta rica em purinas, consumo de álcool, desidratação ou aumento da destruição celular.',
    baixo: 'Valores baixos geralmente têm menor relevância isolada, mas podem ocorrer por uso de medicamentos, alterações hepáticas ou eliminação aumentada.',
    preparo: 'Pode ser solicitado jejum de 4 a 8 horas. Evitar álcool e excesso de carnes ou frutos do mar antes da coleta pode ser orientado pelo laboratório.',
    alteracao: 'Álcool, carnes vermelhas, frutos do mar, diuréticos, anti-inflamatórios, desidratação e função renal podem alterar o resultado.',
    referencia: ['Mulheres: cerca de 2,4 a 6,0 mg/dL', 'Homens: cerca de 3,4 a 7,0 mg/dL']
});

addExam({ id: 'albumina', nome: 'Albumina', categoria: 'Bioquímica', tags: ['fígado', 'rim', 'nutrição', 'proteína'], resumo: 'Avalia uma proteína produzida pelo fígado e ajuda a observar estado nutricional, função hepática e perdas renais.', descricao: 'A albumina é uma das principais proteínas do sangue. Ela ajuda a manter líquidos dentro dos vasos e transporta hormônios, medicamentos e outras substâncias.', funcionamento: 'É dosada em amostra de sangue e pode ser avaliada junto com proteínas totais, função hepática, função renal e urina.', motivo: 'Serve para investigar desnutrição, doenças hepáticas, inflamações crônicas, perdas de proteína pelos rins ou intestino e acompanhamento clínico geral.', quando: 'É solicitada em edema, perda de peso, doença no fígado, doença renal, internações, avaliação nutricional e acompanhamento de doenças inflamatórias.', alto: 'Albumina alta é menos comum e costuma refletir desidratação ou concentração do sangue.', baixo: 'Albumina baixa pode ocorrer em doença hepática, inflamação, desnutrição, perdas renais, queimaduras ou doenças intestinais.', preparo: 'Geralmente não exige jejum.', alteracao: 'Hidratação, inflamação, função hepática, perdas urinárias e estado nutricional interferem no resultado.', referencia: ['Adultos: cerca de 3,5 a 5,0 g/dL'] });
addExam({ id: 'alt-tgp', nome: 'ALT (TGP)', categoria: 'Função hepática', tags: ['fígado', 'hepatite', 'gordura no fígado', 'enzima'], resumo: 'Enzima usada para investigar lesão ou inflamação no fígado.', descricao: 'A ALT é uma enzima encontrada principalmente nas células do fígado. Quando essas células sofrem irritação ou lesão, a enzima pode aumentar no sangue.', funcionamento: 'O laboratório dosa a enzima no soro. Ela costuma ser analisada junto com AST, GGT, fosfatase alcalina e bilirrubinas.', motivo: 'Ajuda a avaliar hepatites, esteatose hepática, toxicidade por medicamentos, álcool e outras alterações hepáticas.', quando: 'É solicitada em dor abdominal, pele amarelada, alterações em exames de rotina, uso de medicamentos hepatotóxicos ou acompanhamento de doença hepática.', alto: 'ALT elevada pode indicar inflamação no fígado, gordura hepática, hepatites, uso de álcool, medicamentos ou lesões musculares em menor grau.', baixo: 'Valores baixos geralmente não têm significado clínico importante isoladamente.', preparo: 'Jejum pode ser solicitado se houver outros exames no mesmo pedido.', alteracao: 'Álcool, medicamentos, suplementos, exercício intenso e doenças hepáticas podem alterar.', referencia: ['Mulheres: até cerca de 34 U/L', 'Homens: até cerca de 45 U/L'] });
addExam({ id: 'ast-tgo', nome: 'AST (TGO)', categoria: 'Função hepática', tags: ['fígado', 'músculo', 'coração', 'hepatite'], resumo: 'Enzima presente no fígado, músculos e coração, útil para avaliar lesões celulares.', descricao: 'A AST é uma enzima encontrada em diferentes tecidos. Por isso, sua interpretação costuma depender de outros exames e do quadro clínico.', funcionamento: 'É medida no sangue e comparada com ALT e outras enzimas para entender se a origem provável é hepática, muscular ou outra.', motivo: 'Auxilia na investigação de doenças hepáticas, lesão muscular e acompanhamento de tratamentos.', quando: 'Pode ser solicitada em dor abdominal, suspeita de hepatite, alteração de ALT, dores musculares intensas ou uso de medicamentos específicos.', alto: 'Pode subir em hepatites, esteatose, álcool, lesão muscular, exercício intenso e algumas doenças cardíacas.', baixo: 'Valores baixos normalmente não indicam doença.', preparo: 'Evitar exercício intenso antes da coleta pode ser orientado em alguns casos.', alteracao: 'Exercício, álcool, medicamentos e lesões musculares podem interferir.', referencia: ['Mulheres: até cerca de 35 U/L', 'Homens: até cerca de 40 U/L'] });

const lista = [
['amilase','Amilase','Bioquímica','A','Avalia uma enzima ligada principalmente ao pâncreas e às glândulas salivares.','Ajuda na investigação de pancreatite e dor abdominal importante.','Adultos: cerca de 30 a 110 U/L'],
['beta-hcg','Beta-hCG','Hormônios','B','Hormônio produzido principalmente durante a gestação.','Confirma gravidez, acompanha início gestacional e pode auxiliar em alguns contextos oncológicos.','Não gestantes: geralmente menor que 5 mUI/mL'],
['bilirrubinas','Bilirrubinas','Função hepática','B','Pigmentos formados pela degradação da hemoglobina.','Investigam icterícia, obstruções biliares e alterações hepáticas.','Total: cerca de 0,2 a 1,2 mg/dL'],
['calcio','Cálcio Total','Bioquímica','C','Mineral essencial para ossos, músculos, nervos e coagulação.','Avalia metabolismo ósseo, paratireoide, rins e vitamina D.','Cálcio total: cerca de 8,5 a 10,5 mg/dL'],
['colesterol','Colesterol Total e Frações','Lipídios','C','Painel que mede colesterol total, HDL, LDL e triglicerídeos.','Estima risco cardiovascular e acompanha tratamento dietético ou medicamentoso.','Colesterol total desejável: menor que 190 mg/dL'],
['creatinina','Creatinina','Função renal','C','Resíduo produzido pelos músculos e eliminado pelos rins.','Avalia função renal e auxilia no cálculo da taxa de filtração glomerular.','Mulheres: 0,5 a 1,1 mg/dL; Homens: 0,7 a 1,3 mg/dL'],
['d-dimero','D-dímero','Coagulação','D','Fragmento produzido quando o organismo degrada coágulos.','Ajuda na investigação de trombose e embolia quando associado à avaliação médica.','Geralmente menor que 500 ng/mL FEU'],
['dosagem-ferro','Ferro Sérico','Bioquímica','F','Mede o ferro circulante ligado à transferrina.','Investiga anemia, deficiência de ferro e sobrecarga de ferro.','Adultos: cerca de 60 a 170 µg/dL'],
['ferritina','Ferritina','Hematologia','F','Proteína que reflete as reservas de ferro do organismo.','Ajuda a diferenciar tipos de anemia e avaliar inflamação ou sobrecarga de ferro.','Mulheres: 15 a 150 ng/mL; Homens: 30 a 400 ng/mL'],
['fosfatase-alcalina','Fosfatase Alcalina','Função hepática','F','Enzima relacionada a vias biliares e atividade óssea.','Avalia alterações biliares, hepáticas e ósseas.','Adultos: cerca de 40 a 130 U/L'],
['gama-gt','Gama-GT (GGT)','Função hepática','G','Enzima sensível a alterações biliares, álcool e alguns medicamentos.','Complementa a avaliação hepática e biliar.','Mulheres: até 38 U/L; Homens: até 55 U/L'],
['glicemia','Glicemia em Jejum','Bioquímica','G','Mede a glicose no sangue após jejum.','Rastreia diabetes, pré-diabetes e acompanha controle metabólico.','Normal: abaixo de 99 mg/dL'],
['hemograma','Hemograma Completo','Hematologia','H','Avalia hemácias, hemoglobina, hematócrito, leucócitos e plaquetas.','Investiga anemia, infecção, inflamação, sangramentos e estado geral de saúde.','Valores variam por sexo, idade e parâmetro'],
['hba1c','Hemoglobina Glicada (HbA1c)','Endocrinologia','H','Mostra a média aproximada da glicose dos últimos 2 a 3 meses.','Acompanha diabetes e avalia risco de pré-diabetes.','Normal: menor que 5,7%'],
['insulina','Insulina','Hormônios','I','Hormônio que ajuda a glicose a entrar nas células.','Avalia resistência insulínica, hipoglicemia e metabolismo da glicose.','Jejum: cerca de 2 a 25 µUI/mL'],
['iga','Imunoglobulina A (IgA)','Imunologia','I','Anticorpo importante nas mucosas e na defesa imunológica.','Investiga imunodeficiências, doença celíaca e alterações imunológicas.','Adultos: cerca de 70 a 400 mg/dL'],
['kappa-lambda','Cadeias Leves Kappa/Lambda','Imunologia','K','Avalia proteínas produzidas por células do sistema imune.','Auxilia na investigação de gamopatias monoclonais e mieloma múltiplo.','Relação kappa/lambda conforme método do laboratório'],
['ldh','LDH','Bioquímica','L','Enzima presente em vários tecidos do corpo.','Pode indicar lesão celular, hemólise, inflamação ou acompanhar algumas doenças.','Adultos: cerca de 120 a 250 U/L'],
['lipase','Lipase','Bioquímica','L','Enzima produzida principalmente pelo pâncreas para digestão de gorduras.','Investiga pancreatite e dor abdominal intensa.','Adultos: cerca de 10 a 60 U/L'],
['magnesio','Magnésio','Bioquímica','M','Mineral importante para músculos, nervos e ritmo cardíaco.','Avalia distúrbios eletrolíticos, câimbras, arritmias e função renal.','Adultos: 1,7 a 2,4 mg/dL'],
['microalbuminuria','Microalbuminúria','Função renal','M','Detecta pequenas perdas de albumina na urina.','Rastreia lesão renal precoce em diabetes e hipertensão.','Relação albumina/creatinina: menor que 30 mg/g'],
['sodio','Sódio','Eletrólitos','S','Eletrólito essencial para equilíbrio de líquidos e função neurológica.','Avalia hidratação, rins, hormônios e distúrbios metabólicos.','Adultos: 135 a 145 mEq/L'],
['potassio','Potássio','Eletrólitos','P','Eletrólito essencial para músculos e coração.','Avalia risco de arritmias, função renal e efeitos de medicamentos.','Adultos: 3,5 a 5,1 mEq/L'],
['pcr','Proteína C Reativa (PCR)','Inflamação','P','Marcador de inflamação produzido pelo fígado.','Ajuda a avaliar processos inflamatórios e infecciosos.','Geralmente menor que 5 mg/L'],
['psa','PSA Total','Marcadores tumorais','P','Proteína produzida pela próstata.','Auxilia no rastreio e acompanhamento de alterações prostáticas.','Valor depende da idade; frequentemente menor que 4 ng/mL'],
['reticulocitos','Reticulócitos','Hematologia','R','Hemácias jovens liberadas pela medula óssea.','Avalia resposta da medula em anemias e após sangramentos.','Adultos: cerca de 0,5% a 2,5%'],
['tsh','TSH','Hormônios','T','Hormônio da hipófise que regula a tireoide.','Investiga hipotireoidismo, hipertireoidismo e acompanhamento de tratamento.','Adultos: cerca de 0,4 a 4,0 mUI/L'],
['t4-livre','T4 Livre','Hormônios','T','Forma livre do hormônio tireoidiano tiroxina.','Complementa avaliação da tireoide junto ao TSH.','Adultos: cerca de 0,8 a 1,8 ng/dL'],
['tp-inr','Tempo de Protrombina (TP/INR)','Coagulação','T','Avalia uma via da coagulação sanguínea.','Monitora anticoagulantes e investiga sangramentos ou função hepática.','INR em geral próximo de 1,0 sem anticoagulação'],
['ttpa','TTPa','Coagulação','T','Avalia outra via da coagulação do sangue.','Investiga distúrbios de coagulação e monitora heparina.','Faixa comum: cerca de 25 a 35 segundos'],
['ureia','Ureia','Função renal','U','Produto do metabolismo de proteínas eliminado pelos rins.','Avalia função renal, hidratação e metabolismo proteico.','Adultos: cerca de 15 a 40 mg/dL'],
['vitamina-b12','Vitamina B12','Vitaminas','V','Vitamina essencial para nervos e formação das células do sangue.','Investiga anemia, formigamentos, alterações neurológicas e deficiência nutricional.','Adultos: cerca de 200 a 900 pg/mL'],
['vitamina-d','Vitamina D','Vitaminas','V','Vitamina ligada ao metabolismo ósseo e imunidade.','Avalia deficiência, saúde óssea e acompanhamento de suplementação.','Suficiência frequentemente acima de 30 ng/mL'],
['waaler-rose','Waaler-Rose','Imunologia','W','Exame relacionado à investigação de fator reumatoide, hoje menos utilizado em muitos serviços.','Pode apoiar investigação de doenças autoimunes quando solicitado pelo médico.','Referência conforme método do laboratório'],
['xilose','D-Xilose','Bioquímica','X','Avalia absorção intestinal de um açúcar simples.','Pode ajudar na investigação de má absorção intestinal.','Referência depende do protocolo do laboratório'],
['yersinia','Sorologia para Yersinia','Imunologia','Y','Pesquisa anticorpos contra bactérias do gênero Yersinia.','Auxilia investigação de infecção prévia ou resposta imune em quadro compatível.','Resultado: reagente ou não reagente conforme método'],
['zinco','Zinco Sérico','Vitaminas e minerais','Z','Mineral importante para imunidade, cicatrização e metabolismo.','Investiga deficiência nutricional, alterações de paladar e acompanhamento nutricional.','Adultos: cerca de 70 a 120 µg/dL']
];

lista.forEach(([id, nome, categoria, letra, descricaoCurta, uso, ref]) => {
    addExam({
        id,
        nome,
        categoria,
        letra,
        tags: [nome.toLowerCase(), categoria.toLowerCase(), descricaoCurta.toLowerCase(), uso.toLowerCase()],
        resumo: `${descricaoCurta} ${uso}`,
        descricao: `${nome} é um exame laboratorial utilizado para avaliar ${descricaoCurta.charAt(0).toLowerCase() + descricaoCurta.slice(1)} A interpretação deve considerar o quadro clínico e outros exames associados.`,
        funcionamento: 'A coleta geralmente é feita por sangue venoso, com análise em equipamento laboratorial ou método imunológico específico, conforme o tipo de exame.',
        motivo: uso,
        quando: 'Pode ser solicitado em avaliação de rotina, investigação de sintomas, acompanhamento de doença conhecida, controle de tratamento ou confirmação de suspeitas clínicas.',
        alto: 'Resultado acima da faixa pode indicar alteração relacionada ao órgão, sistema ou processo avaliado, mas precisa ser interpretado junto ao histórico do paciente.',
        baixo: 'Resultado abaixo da faixa pode sugerir deficiência, consumo aumentado, perda, redução de produção ou variação individual, dependendo do exame.',
        preparo: 'O preparo varia. Alguns exames exigem jejum, pausa de suplementos ou horário específico de coleta. Siga a orientação do laboratório.',
        alteracao: 'Medicamentos, alimentação recente, álcool, exercício intenso, hidratação, horário da coleta e condições clínicas podem interferir no resultado.',
        referencia: [ref]
    });
});

const guiaBioTecher = {
    'bilirrubinas': {
        categoria: 'Função hepática / hemólise',
        resumo: 'Avalia bilirrubina total, direta e indireta para investigar icterícia, alterações hepáticas, obstrução biliar e aumento de destruição de hemácias.',
        descricao: 'A bilirrubina é um pigmento formado durante a renovação natural das hemácias. Depois de produzida, ela passa pelo fígado, é processada e segue para a bile. Por isso, o exame ajuda a entender se a alteração vem do sangue, do fígado ou das vias biliares.',
        funcionamento: 'A dosagem é feita no sangue e normalmente informa bilirrubina total, direta e indireta. A comparação entre as frações orienta a provável origem do aumento.',
        motivo: 'Serve para investigar pele ou olhos amarelados, urina escura, dor abdominal, suspeita de hepatite, obstrução biliar, anemia hemolítica e acompanhamento de recém-nascidos.',
        quando: 'É solicitado quando há icterícia, alteração de enzimas hepáticas, suspeita de doença da vesícula, acompanhamento neonatal ou sinais de anemia com destruição aumentada de hemácias.',
        alto: 'Bilirrubina alta pode ocorrer por hepatites, obstrução das vias biliares, cálculos, síndrome de Gilbert, hemólise, reação a medicamentos ou imaturidade hepática em recém-nascidos.',
        baixo: 'Valores baixos geralmente não têm relevância clínica isolada.',
        preparo: 'Em geral não exige jejum, mas pode ser coletada junto com outros exames que pedem preparo.',
        alteracao: 'Hemólise da amostra, alguns medicamentos, jejum prolongado, álcool e doenças hepáticas podem interferir.',
        referencia: ['Bilirrubina total: cerca de 0,2 a 1,2 mg/dL', 'Direta: até 0,3 mg/dL', 'Indireta: calculada pela diferença entre total e direta']
    },
    'colesterol': {
        categoria: 'Bioquímica / risco cardiovascular',
        resumo: 'Mede colesterol total e frações para avaliar risco cardiovascular e acompanhar prevenção ou tratamento de dislipidemias.',
        descricao: 'O perfil lipídico observa gorduras circulantes no sangue, como colesterol total, HDL, LDL e triglicerídeos. Ele não mostra apenas um número: ajuda a estimar risco para coração e vasos.',
        funcionamento: 'A análise é feita em amostra de sangue. Muitos laboratórios calculam LDL a partir de uma fórmula, enquanto outros podem dosar diretamente conforme o método utilizado.',
        motivo: 'Serve para prevenção cardiovascular, acompanhamento de dieta, atividade física, uso de estatinas e investigação de histórico familiar de colesterol elevado.',
        quando: 'Costuma ser solicitado em check-ups, hipertensão, diabetes, obesidade, histórico familiar, dor no peito, acompanhamento cardiológico ou controle de tratamento.',
        alto: 'LDL ou colesterol total elevados podem aumentar risco cardiovascular, principalmente quando associados a hipertensão, diabetes, tabagismo ou histórico familiar.',
        baixo: 'Colesterol muito baixo pode ocorrer por desnutrição, doenças hepáticas, hipertireoidismo ou uso de medicamentos, mas a interpretação depende do contexto.',
        preparo: 'O jejum pode variar conforme orientação médica e protocolo do laboratório. Para triglicerídeos, alguns serviços ainda recomendam 8 a 12 horas.',
        alteracao: 'Alimentação recente, álcool, variação de peso, gravidez, hipotireoidismo, diabetes descompensado e medicamentos podem alterar o resultado.',
        referencia: ['Colesterol total desejável: menor que 190 mg/dL', 'HDL: geralmente acima de 40 mg/dL', 'LDL: meta varia conforme risco cardiovascular', 'Triglicerídeos: geralmente menor que 150 mg/dL em jejum']
    },
    'creatinina': {
        categoria: 'Função renal',
        resumo: 'Avalia a filtração dos rins e auxilia no cálculo da taxa de filtração glomerular estimada.',
        descricao: 'A creatinina é formada pelo metabolismo muscular e eliminada pelos rins. Quando os rins filtram menos, ela tende a se acumular no sangue.',
        funcionamento: 'É medida no sangue e pode ser usada em fórmulas que estimam a função renal considerando idade, sexo e outros dados do paciente.',
        motivo: 'Serve para acompanhar saúde renal, ajustar doses de medicamentos, investigar inchaço, pressão alta, alterações urinárias e monitorar doenças crônicas.',
        quando: 'É comum em check-ups, diabetes, hipertensão, uso de medicamentos que exigem controle renal, internações e acompanhamento nefrológico.',
        alto: 'Creatinina alta pode indicar redução da função renal, desidratação, obstrução urinária, lesão renal aguda ou maior massa muscular, dependendo do caso.',
        baixo: 'Valores baixos podem aparecer em baixa massa muscular, gestação ou algumas condições nutricionais.',
        preparo: 'Geralmente não exige jejum. Evitar exercício muito intenso antes da coleta pode ser orientado.',
        alteracao: 'Hidratação, massa muscular, dieta muito rica em carne, suplementos de creatina, medicamentos e função renal interferem no resultado.',
        referencia: ['Mulheres: cerca de 0,5 a 1,1 mg/dL', 'Homens: cerca de 0,7 a 1,3 mg/dL', 'A taxa de filtração estimada deve ser interpretada junto com a creatinina']
    },
    'd-dimero': {
        categoria: 'Coagulação / eventos trombóticos',
        resumo: 'Mede fragmentos ligados à degradação de coágulos e ajuda a investigar trombose e embolia quando usado com avaliação médica.',
        descricao: 'O Dímero-D aparece quando o organismo forma e depois quebra coágulos. Ele é sensível, mas não é específico: pode aumentar por várias causas além de trombose.',
        funcionamento: 'A dosagem é feita no sangue e costuma ser interpretada junto com risco clínico, sintomas, exame físico e, quando necessário, exames de imagem.',
        motivo: 'Ajuda na investigação de trombose venosa profunda, embolia pulmonar, coagulação intravascular disseminada e acompanhamento de situações de maior ativação da coagulação.',
        quando: 'Pode ser solicitado em falta de ar, dor no peito, dor ou inchaço em pernas, pós-operatório, internação ou suspeita de eventos trombóticos.',
        alto: 'Valores altos podem ocorrer em trombose, embolia, infecções, inflamações, trauma, cirurgia recente, gravidez, câncer e idade avançada.',
        baixo: 'Resultado baixo, quando combinado com baixa probabilidade clínica, ajuda a afastar trombose em muitos protocolos.',
        preparo: 'Não costuma exigir jejum.',
        alteracao: 'Inflamações, cirurgias recentes, gestação, idade, trauma, internação e doenças crônicas podem elevar o marcador.',
        referencia: ['Geralmente menor que 500 ng/mL FEU', 'Alguns protocolos usam ponto de corte ajustado por idade']
    },
    'ferritina': {
        categoria: 'Hematologia / metabolismo do ferro',
        resumo: 'Reflete as reservas de ferro do organismo e ajuda a investigar anemia, deficiência ou sobrecarga de ferro.',
        descricao: 'A ferritina é uma proteína que armazena ferro. Ela é muito útil para entender se há reserva suficiente, mas também pode subir em processos inflamatórios.',
        funcionamento: 'É dosada no sangue e frequentemente analisada junto com ferro sérico, transferrina, saturação de transferrina e hemograma.',
        motivo: 'Serve para investigar anemia ferropriva, queda de cabelo por deficiência de ferro, fadiga, inflamação crônica e suspeita de sobrecarga de ferro.',
        quando: 'É solicitada em anemia, menstruação intensa, gestação, dietas restritivas, sintomas de cansaço, doenças inflamatórias e acompanhamento de reposição de ferro.',
        alto: 'Ferritina alta pode ocorrer por inflamação, infecção, doença hepática, sobrecarga de ferro, álcool, síndrome metabólica ou algumas doenças crônicas.',
        baixo: 'Ferritina baixa costuma indicar estoque reduzido de ferro, podendo aparecer antes mesmo da anemia ficar evidente no hemograma.',
        preparo: 'Geralmente não exige jejum, mas o laboratório pode orientar conforme exames associados.',
        alteracao: 'Inflamação, infecções, álcool, doenças hepáticas, reposição de ferro e suplementos podem interferir.',
        referencia: ['Mulheres: cerca de 15 a 150 ng/mL', 'Homens: cerca de 30 a 400 ng/mL', 'Metas podem variar conforme idade, gestação e condição clínica']
    },
    'glicemia': {
        categoria: 'Bioquímica / endocrinologia',
        resumo: 'Mede a glicose no sangue em jejum e ajuda no rastreio de diabetes, pré-diabetes e controle metabólico.',
        descricao: 'A glicose é a principal fonte de energia do organismo. O exame mostra como está a concentração de açúcar no sangue no momento da coleta.',
        funcionamento: 'A coleta é feita após jejum quando solicitado. O resultado pode ser comparado com hemoglobina glicada, prova oral de tolerância à glicose e dados clínicos.',
        motivo: 'Serve para detectar alterações do metabolismo da glicose, acompanhar diabetes, avaliar sintomas de hipoglicemia ou hiperglicemia e orientar prevenção.',
        quando: 'É solicitada em check-ups, sede excessiva, urina frequente, perda de peso sem explicação, ganho de peso, gestação, histórico familiar ou acompanhamento de diabetes.',
        alto: 'Glicemia alta pode sugerir diabetes, pré-diabetes, estresse agudo, infecção, uso de corticoides ou jejum inadequado.',
        baixo: 'Glicemia baixa pode causar tremores, suor frio, fraqueza, tontura e confusão, principalmente em pessoas que usam medicamentos para diabetes.',
        preparo: 'Quando for glicemia de jejum, normalmente o jejum recomendado fica entre 8 e 12 horas, conforme orientação do laboratório.',
        alteracao: 'Alimentação, jejum incorreto, exercício, estresse, infecções, corticoides e medicamentos para diabetes interferem.',
        referencia: ['Normal em jejum: abaixo de 100 mg/dL', 'Pré-diabetes: 100 a 125 mg/dL', 'Diabetes: 126 mg/dL ou mais em critérios confirmatórios']
    },
    'hemograma': {
        categoria: 'Hematologia',
        resumo: 'Avalia células do sangue e ajuda a investigar anemia, infecção, inflamação, sangramentos e alterações de plaquetas.',
        descricao: 'O hemograma completo observa glóbulos vermelhos, hemoglobina, hematócrito, índices hematimétricos, glóbulos brancos e plaquetas. É um dos exames mais usados na prática clínica.',
        funcionamento: 'O sangue é analisado em equipamento automatizado e, quando necessário, o laboratório complementa com avaliação microscópica da lâmina.',
        motivo: 'Serve para avaliar anemia, infecções, alergias, inflamações, risco de sangramento, resposta a tratamentos e estado geral de saúde.',
        quando: 'É solicitado em check-ups, febre, cansaço, palidez, sangramentos, infecções recorrentes, acompanhamento pré-operatório e monitoramento de medicamentos.',
        alto: 'A interpretação depende do parâmetro. Leucócitos altos podem sugerir infecção ou inflamação; plaquetas altas podem ocorrer por inflamação ou deficiência de ferro; hemoglobina alta pode aparecer em desidratação ou outras condições.',
        baixo: 'Hemoglobina baixa sugere anemia; leucócitos baixos podem indicar redução de defesa; plaquetas baixas podem aumentar risco de sangramento, conforme intensidade e contexto.',
        preparo: 'Geralmente não exige jejum.',
        alteracao: 'Infecções, inflamações, menstruação, gestação, hidratação, medicamentos, atividade física intensa e coleta recente após sangramento podem alterar.',
        referencia: ['Hemoglobina: varia por sexo e idade', 'Leucócitos: cerca de 4.000 a 10.000/mm³ em adultos', 'Plaquetas: cerca de 150.000 a 450.000/mm³']
    },
    'ureia': {
        categoria: 'Função renal',
        resumo: 'Avalia produto do metabolismo das proteínas e ajuda a observar função renal, hidratação e estado metabólico.',
        descricao: 'A ureia é formada no fígado a partir do metabolismo de proteínas e eliminada pelos rins. Ela complementa a avaliação renal, mas sofre influência da dieta e hidratação.',
        funcionamento: 'É dosada no sangue e costuma ser interpretada junto com creatinina, eletrólitos, urina e dados clínicos.',
        motivo: 'Serve para acompanhar função renal, hidratação, consumo proteico, internações, doenças crônicas e resposta a tratamentos.',
        quando: 'É solicitada em check-ups, doença renal, desidratação, vômitos, diarreia, hipertensão, diabetes, uso de medicamentos e acompanhamento hospitalar.',
        alto: 'Ureia alta pode ocorrer por redução da função renal, desidratação, sangramento digestivo, dieta rica em proteína ou aumento do catabolismo.',
        baixo: 'Ureia baixa pode ocorrer em baixa ingestão proteica, doença hepática, gestação ou excesso de hidratação.',
        preparo: 'Geralmente não exige jejum, salvo orientação para exames associados.',
        alteracao: 'Dieta rica em proteínas, hidratação, função hepática, função renal, sangramentos e medicamentos podem interferir.',
        referencia: ['Adultos: cerca de 15 a 40 mg/dL', 'A interpretação deve ser feita junto com creatinina e taxa de filtração estimada']
    }
};

Object.entries(guiaBioTecher).forEach(([id, dados]) => {
    const exame = exames.find(item => item.id === id);
    if (exame) {
        if (dados.referencia) dados.valores = dados.referencia;
        Object.assign(exame, dados);
    }
});

const state = {
    termo: '',
    letra: '',
    favoritos: readStorage('biotecher_favoritos'),
    historico: readStorage('biotecher_historico_exames')
};

const sugestoes = ['açúcar', 'fígado', 'rim', 'tireoide', 'anemia', 'colesterol'];
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function normalizeText(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ');
}

function readStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
}

function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function matchesSearch(exam, term) {
    if (!term) return true;
    const normalizedTerm = normalizeText(term);
    const searchable = normalizeText([exam.nome, exam.categoria, exam.resumo, exam.descricao, exam.motivo, exam.alto, exam.baixo, exam.alteracao, ...exam.tags].join(' '));
    return normalizedTerm.split(/\s+/).filter(Boolean).every(part => searchable.includes(part));
}

function hasActiveFilter() {
    return Boolean(state.letra || state.termo.trim());
}

function getFilteredExams() {
    if (!hasActiveFilter()) return [];
    return exames.filter(exam => {
        const byLetter = state.letra ? exam.letra === state.letra : true;
        return byLetter && matchesSearch(exam, state.termo);
    }).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

function renderAlphabet() {
    const container = document.getElementById('alphabetContainer');
    const available = new Set(exames.map(exam => exam.letra));
    container.innerHTML = alphabet.map(letter => `
        <button type="button" class="letter-btn ${state.letra === letter ? 'active' : ''}" ${available.has(letter) ? '' : 'disabled'} data-letter="${letter}">${letter}</button>
    `).join('') + '<button type="button" class="letter-btn small" id="clearLetter">Limpar</button>';

    container.querySelectorAll('[data-letter]').forEach(button => {
        button.addEventListener('click', () => {
            state.letra = button.dataset.letter;
            document.getElementById('searchInput').value = '';
            state.termo = '';
            renderAll();
        });
    });

    document.getElementById('clearLetter').addEventListener('click', () => {
        state.letra = '';
        renderAll();
    });
}

function renderQuickSearches() {
    const container = document.getElementById('quickSearches');
    container.innerHTML = sugestoes.map(item => `<button type="button" class="quick-chip" data-term="${item}">${item}</button>`).join('');
    container.querySelectorAll('[data-term]').forEach(button => {
        button.addEventListener('click', () => {
            state.termo = button.dataset.term;
            state.letra = '';
            document.getElementById('searchInput').value = button.dataset.term;
            renderAll();
        });
    });
}

function renderExamList() {
    const list = getFilteredExams();
    const container = document.getElementById('examsContainer');
    const counter = document.getElementById('resultsCounter');

    if (!hasActiveFilter()) {
        counter.innerHTML = 'Use a busca, uma letra ou uma palavra relacionada para consultar os exames.';
        container.innerHTML = '<div class="empty-state">Digite o nome do exame, escolha uma letra ou pesquise por uma função do corpo, como rim, fígado, coração, tireoide ou anemia.</div>';
        return;
    }

    counter.innerHTML = `Mostrando <strong>${list.length}</strong> de <strong>${exames.length}</strong> exames`;

    if (!list.length) {
        container.innerHTML = '<div class="empty-state">Não encontramos esse termo. Tente buscar por açúcar, fígado, rim, coração, tireoide ou anemia.</div>';
        return;
    }

    container.innerHTML = list.map(exam => {
        const saved = state.favoritos.includes(exam.id);
        return `
            <article class="exam-item" data-id="${exam.id}">
                <button type="button" class="exam-main" data-open="${exam.id}">
                    <span>
                        <strong class="exam-name">${exam.nome}</strong>
                        <small>${exam.resumo}</small>
                    </span>
                    <span class="exam-category">${exam.categoria}</span>
                </button>
                <button type="button" class="favorite-btn ${saved ? 'saved' : ''}" data-favorite="${exam.id}" aria-label="Salvar ${exam.nome}">${saved ? 'Salvo' : 'Salvar'}</button>
            </article>
        `;
    }).join('');

    container.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.open)));
    container.querySelectorAll('[data-favorite]').forEach(button => button.addEventListener('click', () => toggleFavorite(button.dataset.favorite)));
}

function renderCollections() {
    renderChips('favoritesList', 'savedSection', state.favoritos, true);
    renderChips('recentList', 'recentSection', state.historico, false);
}

function renderChips(listId, sectionId, ids, removable) {
    const section = document.getElementById(sectionId);
    const list = document.getElementById(listId);
    section.hidden = ids.length === 0;
    if (!ids.length) return;

    list.innerHTML = ids.map(id => {
        const exam = exames.find(item => item.id === id);
        if (!exam) return '';
        return `<button type="button" class="saved-chip" data-open="${exam.id}">${exam.nome}${removable ? ' · salvo' : ''}</button>`;
    }).join('');

    list.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.open)));
}

function toggleFavorite(id) {
    if (state.favoritos.includes(id)) {
        state.favoritos = state.favoritos.filter(item => item !== id);
    } else {
        state.favoritos = [id, ...state.favoritos].slice(0, 8);
    }
    writeStorage('biotecher_favoritos', state.favoritos);
    renderAll();
}

function saveHistory(id) {
    state.historico = [id, ...state.historico.filter(item => item !== id)].slice(0, 5);
    writeStorage('biotecher_historico_exames', state.historico);
    renderCollections();
}

function section(title, html) {
    return `<section class="info-section"><h3>${title}</h3>${html}</section>`;
}

function openModal(id) {
    const exam = exames.find(item => item.id === id);
    if (!exam) return;

    saveHistory(id);
    document.getElementById('modalTitle').textContent = exam.nome;
    document.getElementById('modalCategory').textContent = exam.categoria;
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-alert">Conteúdo educativo. Use como apoio para conversar com seu médico, não como diagnóstico.</div>
        ${section('O que é o exame', `<p>${exam.descricao}</p>`)}
        ${section('Como funciona', `<p>${exam.funcionamento}</p>`)}
        ${section('Para que serve', `<p>${exam.motivo}</p>`)}
        ${section('Quando é solicitado', `<p>${exam.quando}</p>`)}
        ${section('Valores de referência', `<div class="values-grid">${exam.valores.map(valor => `<div class="value-card">${valor}</div>`).join('')}</div>`)}
        ${section('Como interpretar resultados altos', `<p>${exam.alto}</p>`)}
        ${section('Como interpretar resultados baixos', `<p>${exam.baixo}</p>`)}
        ${section('Preparo necessário', `<p>${exam.preparo}</p>`)}
        ${section('O que pode alterar o resultado', `<p>${exam.alteracao}</p>`)}
        ${section('Informações importantes', `<p>${exam.importante}</p>`)}
        <p class="reference-note">${exam.observacao}</p>
        <button type="button" class="favorite-wide ${state.favoritos.includes(id) ? 'saved' : ''}" data-modal-favorite="${id}">${state.favoritos.includes(id) ? 'Remover dos favoritos' : 'Salvar exame'}</button>
    `;

    document.querySelector('[data-modal-favorite]').addEventListener('click', event => {
        toggleFavorite(event.target.dataset.modalFavorite);
        openModal(id);
    });

    document.getElementById('examModal').classList.add('show');
    document.getElementById('examModal').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('examModal').classList.remove('show');
    document.getElementById('examModal').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

function renderAll() {
    renderAlphabet();
    renderExamList();
    renderCollections();
}

document.addEventListener('DOMContentLoaded', () => {
    renderQuickSearches();
    renderAll();

        const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    function executarBusca() {
        state.termo = searchInput.value.trim();
        state.letra = '';
        renderAll();
    }

    searchButton.addEventListener('click', executarBusca);

    searchInput.addEventListener('input', () => {
        state.termo = '';
        state.letra = '';
        renderAll();
    });

    searchInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            executarBusca();
        }
    });

    document.getElementById('clearFavorites').addEventListener('click', () => {
        state.favoritos = [];
        writeStorage('biotecher_favoritos', state.favoritos);
        renderAll();
    });

    document.getElementById('clearHistory').addEventListener('click', () => {
        state.historico = [];
        writeStorage('biotecher_historico_exames', state.historico);
        renderCollections();
    });

    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('examModal').addEventListener('click', event => {
        if (event.target.id === 'examModal') closeModal();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeModal();
    });
});
