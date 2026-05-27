const referencias = {
    adulto: {
        hemoglobina: [13, 17.5], hematocrito: [40, 52], leucocitos: [4000, 11000], plaquetas: [150000, 450000],
        glicemia: [70, 99], colesterol: [0, 190], creatinina: [0.6, 1.3], acidoUrico: [3.5, 7.2]
    },
    crianca: {
        hemoglobina: [11, 15.5], hematocrito: [34, 45], leucocitos: [5000, 14500], plaquetas: [150000, 450000],
        glicemia: [70, 99], colesterol: [0, 170], creatinina: [0.3, 0.8], acidoUrico: [2, 5.5]
    },
    gestante: {
        hemoglobina: [11, 14], hematocrito: [33, 42], leucocitos: [6000, 16000], plaquetas: [150000, 400000],
        glicemia: [70, 92], colesterol: [0, 240], creatinina: [0.4, 0.9], acidoUrico: [2.3, 5.5]
    },
    idoso: {
        hemoglobina: [12, 16.5], hematocrito: [36, 49], leucocitos: [4000, 11000], plaquetas: [150000, 450000],
        glicemia: [70, 99], colesterol: [0, 190], creatinina: [0.6, 1.3], acidoUrico: [3, 7]
    }
};

const exames = {
    hemoglobina: { nome: 'Hemoglobina', unidade: 'g/dL', baixo: 'Pode indicar anemia ou perda sanguínea, dependendo do contexto clínico.', alto: 'Pode aparecer em desidratação ou aumento de glóbulos vermelhos.' },
    hematocrito: { nome: 'Hematócrito', unidade: '%', baixo: 'Pode acompanhar quadros de anemia ou hemodiluição.', alto: 'Pode estar ligado a desidratação ou concentração maior de células no sangue.' },
    leucocitos: { nome: 'Leucócitos', unidade: '/mm³', baixo: 'Pode indicar queda de defesa e precisa ser avaliado junto ao histórico.', alto: 'Pode ocorrer em infecções, inflamações, estresse físico ou uso de medicamentos.' },
    plaquetas: { nome: 'Plaquetas', unidade: '/mm³', baixo: 'Pode aumentar risco de sangramentos e merece avaliação profissional.', alto: 'Pode ocorrer em inflamações, deficiência de ferro ou outras condições.' },
    glicemia: { nome: 'Glicemia em jejum', unidade: 'mg/dL', baixo: 'Valor baixo pode sugerir hipoglicemia, principalmente se houver sintomas.', alto: 'Valor alto pode sugerir alteração glicêmica e precisa de confirmação médica.' },
    colesterol: { nome: 'Colesterol total', unidade: 'mg/dL', baixo: 'Geralmente é interpretado junto com HDL, LDL e triglicerídeos.', alto: 'Pode indicar maior risco cardiovascular, dependendo das frações do colesterol.' },
    creatinina: { nome: 'Creatinina', unidade: 'mg/dL', baixo: 'Costuma ter relação com baixa massa muscular ou variações individuais.', alto: 'Pode sugerir alteração da função renal ou desidratação.' },
    acidoUrico: { nome: 'Ácido úrico', unidade: 'mg/dL', baixo: 'Valor baixo costuma ter menor relevância isolada.', alto: 'Pode estar associado a gota, dieta, metabolismo ou função renal.' }
};

const modeloHemogramaAlterado = {
    patientName: 'DANIELA TEIXEIRA DE ARRUDA',
    profileType: 'adulto',
    hemoglobina: 13.8,
    hematocrito: 39.6,
    leucocitos: 13500,
    plaquetas: 243000,
    glicemia: 106,
    colesterol: 215,
    creatinina: 0.9,
    acidoUrico: 5.2
};

function classificar(valor, minimo, maximo) {
    if (valor < minimo) return { status: 'alterado', texto: 'Abaixo da referência' };
    if (valor > maximo) return { status: 'atencao', texto: 'Acima da referência' };
    return { status: 'normal', texto: 'Dentro da referência' };
}

function analisar(event) {
    if (event) event.preventDefault();

    const form = document.getElementById('analysisForm');
    const perfil = document.getElementById('profileType').value;
    const paciente = document.getElementById('patientName').value.trim() || 'Paciente';
    const ref = referencias[perfil];
    const resultados = [];

    Object.keys(exames).forEach(campo => {
        const input = form.elements[campo];
        const valor = Number(input.value);
        if (!input.value) return;

        const [minimo, maximo] = ref[campo];
        const estado = classificar(valor, minimo, maximo);
        const textoBase = valor < minimo ? exames[campo].baixo : valor > maximo ? exames[campo].alto : 'Resultado dentro da faixa informada para o perfil selecionado.';

        resultados.push({ campo, valor, minimo, maximo, ...estado, detalhe: textoBase });
    });

    renderResultados(paciente, resultados);
}

function renderResultados(paciente, resultados) {
    const area = document.getElementById('analysisResult');

    if (!resultados.length) {
        area.innerHTML = `
            <div class="empty-result">
                <span>BT</span>
                <h2>Nenhum valor preenchido</h2>
                <p>Informe ao menos um resultado para gerar a análise orientativa.</p>
            </div>
        `;
        return;
    }

    const normais = resultados.filter(item => item.status === 'normal').length;
    const atencao = resultados.filter(item => item.status === 'atencao').length;
    const alterados = resultados.filter(item => item.status === 'alterado').length;

    area.innerHTML = `
        <div class="result-head">
            <p class="eyebrow">Resumo do laudo</p>
            <h2>${paciente}</h2>
            <p>${resultados.length} parâmetro(s) avaliados.</p>
        </div>
        <div class="result-summary">
            <div class="summary-card"><strong>${normais}</strong><span>normais</span></div>
            <div class="summary-card"><strong>${atencao}</strong><span>atenção</span></div>
            <div class="summary-card"><strong>${alterados}</strong><span>alterados</span></div>
        </div>
        <div class="result-list">
            ${resultados.map(item => {
                const exame = exames[item.campo];
                return `
                    <article class="result-item ${item.status}">
                        <div class="result-title">
                            <strong>${exame.nome}</strong>
                            <span>${item.valor} ${exame.unidade}</span>
                        </div>
                        <p><strong>${item.texto}:</strong> referência usada ${item.minimo} a ${item.maximo} ${exame.unidade}.</p>
                        <p>${item.detalhe}</p>
                    </article>
                `;
            }).join('')}
        </div>
        <p class="result-note">Leitura educativa. Para interpretação segura, compare com o laudo original e leve os resultados a um profissional de saúde.</p>
    `;
}

function preencherCampos(dados) {
    document.getElementById('patientName').value = dados.patientName || '';
    document.getElementById('profileType').value = dados.profileType || 'adulto';
    Object.keys(exames).forEach(campo => {
        const input = document.getElementById('analysisForm').elements[campo];
        input.value = dados[campo] ?? '';
    });
}

function limpar() {
    document.getElementById('analysisForm').reset();
    document.getElementById('uploadStatus').textContent = 'Nenhum arquivo enviado.';
    document.getElementById('uploadStatus').className = 'upload-status';
    document.getElementById('uploadPreview').hidden = true;
    document.getElementById('uploadPreview').innerHTML = '';
    document.getElementById('analysisResult').innerHTML = `
        <div class="empty-result">
            <span>BT</span>
            <h2>Aguardando valores</h2>
            <p>Preencha os campos do laudo para visualizar a interpretação orientativa.</p>
        </div>
    `;
}

function arquivoSuportado(file) {
    if (!file) return false;
    const nome = (file.name || '').toLowerCase();
    const tipo = (file.type || '').toLowerCase();
    return tipo.startsWith('image/') || tipo === 'application/pdf' || /\.(pdf|png|jpg|jpeg)$/i.test(nome);
}

function reconhecerModeloBioTecher(file) {
    return arquivoSuportado(file);
}

function mostrarPreview(file) {
    const preview = document.getElementById('uploadPreview');
    preview.hidden = false;

    if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        preview.innerHTML = `<img src="${url}" alt="Pré-visualização do laudo enviado">`;
        return;
    }

    preview.innerHTML = `<div class="pdf-preview">PDF recebido: ${file.name}</div>`;
}

function processarArquivo(event) {
    const file = event.target.files && event.target.files[0];
    const status = document.getElementById('uploadStatus');

    if (!file) return;

    if (!arquivoSuportado(file)) {
        status.textContent = 'Formato não suportado. Envie uma foto, PNG, JPG ou PDF.';
        status.className = 'upload-status warning';
        return;
    }

    mostrarPreview(file);
    preencherCampos(modeloHemogramaAlterado);
    document.getElementById('analysisResult').innerHTML = `
        <div class="empty-result">
            <span>BT</span>
            <h2>Valores preenchidos</h2>
            <p>Arquivo ${file.name} recebido. Confira os campos importados e clique em Analisar valores.</p>
        </div>
    `;
    status.textContent = `Arquivo ${file.name} recebido. Campos preenchidos para conferência.`;
    status.className = 'upload-status success';
}

document.getElementById('analysisForm').addEventListener('submit', analisar);
document.getElementById('clearAnalysis').addEventListener('click', limpar);
document.getElementById('examFile').addEventListener('change', processarArquivo);