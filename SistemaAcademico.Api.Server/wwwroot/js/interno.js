let solicitacoes = [
    { protocolo: 'BT2025001234', paciente: 'João Silva', exame: 'Hemograma Completo + Glicemia', status: 'coletando', prazo: 'Coleta em 5 min', risco: 'normal', responsavel: 'Tec. Ana Santos', origem: 'Base interna' },
    { protocolo: 'BT2025001235', paciente: 'Maria Santos', exame: 'Colesterol Total + Triglicerídeos', status: 'analisando', prazo: 'Resultado em 2h 30min', risco: 'atencao', responsavel: 'Lab. Central', origem: 'Base interna' },
    { protocolo: 'BT2025001236', paciente: 'Pedro Lima', exame: 'Glicemia em Jejum', status: 'liberado', prazo: 'Resultado disponível', risco: 'normal', responsavel: 'Dra. Camila Rocha', origem: 'Base interna' },
    { protocolo: 'BT2025001237', paciente: 'Ana Costa', exame: 'Vitamina D + B12', status: 'aceito', prazo: 'Técnico designado', risco: 'normal', responsavel: 'Tec. Bruno Alves', origem: 'Base interna' },
    { protocolo: 'BT2025001238', paciente: 'Carlos Mendes', exame: 'TSH + T4 Livre', status: 'analisando', prazo: 'Resultado em 1h 45min', risco: 'alterado', responsavel: 'Lab. Hormonal', origem: 'Base interna' },
    { protocolo: 'BT2025001239', paciente: 'Júlia Ferreira', exame: 'Ácido Úrico + Creatinina', status: 'solicitado', prazo: 'Aguardando aceite', risco: 'normal', responsavel: 'Pendente', origem: 'Base interna' }
];

const statusInfo = {
    solicitado: { label: 'Solicitado', progress: 20, className: 'solicitado' },
    aceito: { label: 'Aceito', progress: 40, className: 'aceito' },
    coletando: { label: 'Em coleta', progress: 60, className: 'coletando' },
    analisando: { label: 'Em análise', progress: 80, className: 'analisando' },
    liberado: { label: 'Liberado', progress: 100, className: 'liberado' }
};

const timelineSteps = [
    { id: 'solicitado', title: 'Solicitação médica', desc: 'Pedido cadastrado no sistema.' },
    { id: 'aceito', title: 'Laboratório aceitou', desc: 'Solicitação conferida e aceita.' },
    { id: 'coletando', title: 'Coleta do material', desc: 'Paciente em etapa de coleta.' },
    { id: 'analisando', title: 'Análise laboratorial', desc: 'Amostra em processamento técnico.' },
    { id: 'liberado', title: 'Resultado liberado', desc: 'Laudo disponível para consulta.' }
];

let currentFilter = 'todos';
let currentMode = 'paciente';
const sessionRole = (localStorage.getItem('biotecher_access_type') || localStorage.getItem('biotecher_role') || '').toLowerCase();
const sessionMode = sessionRole.includes('paciente') ? 'paciente' : 'funcionario';

function normalizeStatus(status) {
    const value = String(status || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (value.includes('liberado') || value.includes('resultado')) return 'liberado';
    if (value.includes('analise')) return 'analisando';
    if (value.includes('coleta') || value.includes('colet')) return 'coletando';
    if (value.includes('aceito')) return 'aceito';
    return 'solicitado';
}

function prazoPorStatus(status) {
    if (status === 'liberado') return 'Resultado disponível';
    if (status === 'analisando') return 'Resultado em processamento';
    if (status === 'coletando') return 'Coleta em andamento';
    if (status === 'aceito') return 'Técnico designado';
    return 'Aguardando aceite';
}

function mapApiSolicitacao(item) {
    const status = normalizeStatus(item.status);
    return {
        protocolo: item.protocolo,
        paciente: item.pacienteNome || `Paciente #${item.pacienteId}`,
        exame: item.exameNome || `Exame #${item.exameId}`,
        status,
        prazo: prazoPorStatus(status),
        risco: status === 'liberado' ? 'normal' : 'atencao',
        responsavel: item.medicoSolicitante || 'Equipe responsável',
        origem: 'API'
    };
}

async function loadSolicitacoesFromApi() {
    try {
        const response = await fetch('/api/SolicitacoesExames');
        if (!response.ok) return;

        const apiItems = await response.json();
                const mapped = apiItems
            .map(mapApiSolicitacao)
            .filter(item => item.protocolo)
            .filter(item => !/teste|codex/i.test([item.protocolo, item.paciente, item.exame, item.responsavel].join(' ')));
        const protocolosExistentes = new Set(solicitacoes.map(item => item.protocolo.toLowerCase()));
        const novosRegistros = mapped.filter(item => !protocolosExistentes.has(item.protocolo.toLowerCase()));

        if (novosRegistros.length) {
            solicitacoes = [...novosRegistros, ...solicitacoes];
        }
    } catch {
        return;
    }
}

function setMode(mode) {
    if (mode !== sessionMode) return;
    currentMode = mode;

    document.querySelectorAll('.mode-btn').forEach(button => {
        button.classList.toggle('active', button.dataset.mode === mode);
    });

    document.querySelectorAll('[data-view]').forEach(section => {
        section.hidden = section.dataset.view !== mode;
    });

    if (mode === 'funcionario') renderList();
}

function renderList() {
    const list = document.getElementById('examsList');
    const filtered = solicitacoes.filter(item => currentFilter === 'todos' || item.status === currentFilter);

    if (!filtered.length) {
        list.innerHTML = '<div class="not-found list-empty">Nenhuma solicitação encontrada para este filtro.</div>';
        updateCounters();
        return;
    }

    list.innerHTML = filtered.map(item => {
        const info = statusInfo[item.status] || statusInfo.solicitado;
        return `
            <article class="exam-item" data-status="${item.status}">
                <button type="button" class="exam-row" data-protocol="${item.protocolo}">
                    <div class="exam-info">
                        <div class="exam-icon icon-${info.className}">${info.progress}%</div>
                        <div class="exam-details">
                            <h4>${item.exame}</h4>
                            <div class="exam-protocol">Protocolo: ${item.protocolo} ${item.origem === 'API' ? '<span class="source-tag">API</span>' : ''}</div>
                            <div class="exam-patient">Paciente: ${item.paciente}</div>
                        </div>
                    </div>
                    <div class="exam-status">
                        <div class="status-badge status-${info.className}">${info.label}</div>
                        <div class="progress-bar"><div class="progress-fill progress-${info.progress}"></div></div>
                    </div>
                    <div class="exam-time result-${item.risco}">
                        <div class="time-label">Sinalização</div>
                        <div class="time-value">${labelRisco(item.risco)}</div>
                    </div>
                    <div class="exam-time">
                        <div class="time-label">Responsável</div>
                        <div class="time-value">${item.responsavel}</div>
                    </div>
                    <div class="exam-time">
                        <div class="time-label">Previsão</div>
                        <div class="time-value">${item.prazo}</div>
                    </div>
                </button>
            </article>
        `;
    }).join('');

    list.querySelectorAll('[data-protocol]').forEach(button => {
        button.addEventListener('click', () => openExamModal(button.dataset.protocol));
    });

    updateCounters();
}

function labelRisco(risco) {
    if (risco === 'alterado') return 'Alterado';
    if (risco === 'atencao') return 'Atenção';
    return 'Normal';
}

function updateCounters() {
    document.getElementById('totalExams').textContent = solicitacoes.length;
    document.getElementById('collectingExams').textContent = solicitacoes.filter(item => item.status === 'coletando').length;
    document.getElementById('analyzingExams').textContent = solicitacoes.filter(item => item.status === 'analisando').length;
    document.getElementById('completedExams').textContent = solicitacoes.filter(item => item.status === 'liberado').length;
}

function openExamModal(protocol) {
    const item = solicitacoes.find(exam => exam.protocolo === protocol);
    if (!item) return;

    document.getElementById('modalTitle').textContent = item.exame;
    document.getElementById('modalSubtitle').textContent = `${item.protocolo} - ${item.paciente}`;
    document.getElementById('modalTimeline').innerHTML = buildTimeline(item);
    document.getElementById('examModal').classList.add('show');
    document.getElementById('examModal').setAttribute('aria-hidden', 'false');
}

function buildTimeline(item) {
    const currentIndex = timelineSteps.findIndex(step => step.id === item.status);
    return timelineSteps.map((step, index) => {
        const done = index < currentIndex;
        const current = index === currentIndex;
        const className = done ? 'timeline-completed' : current ? 'timeline-current' : 'timeline-pending';
        const mark = done ? 'OK' : current ? 'Agora' : 'Pendente';
        return `
            <div class="timeline-item">
                <div class="timeline-icon ${className}">${mark}</div>
                <div class="timeline-content">
                    <div class="timeline-title">${step.title}</div>
                    <div class="timeline-desc">${step.desc}</div>
                    <div class="timeline-time">${current ? item.prazo : done ? 'Concluído' : 'Aguardando'}</div>
                </div>
            </div>
        `;
    }).join('');
}

function closeModal() {
    document.getElementById('examModal').classList.remove('show');
    document.getElementById('examModal').setAttribute('aria-hidden', 'true');
}

function renderProtocolEmptyState() {
    const result = document.getElementById('protocolResult');
    if (!result) return;

    result.innerHTML = `
        <div class="protocol-empty">
            Digite o protocolo recebido no atendimento e clique em Consultar para ver o andamento do exame.
        </div>
    `;
}

function consultProtocol(protocol) {
    const result = document.getElementById('protocolResult');
    const item = solicitacoes.find(exam => exam.protocolo.toLowerCase() === protocol.trim().toLowerCase());

    if (!protocol.trim()) {
        renderProtocolEmptyState();
        return;
    }

    if (!item) {
        result.innerHTML = '<div class="not-found">Protocolo não encontrado. Confira o código digitado.</div>';
        return;
    }

    const info = statusInfo[item.status] || statusInfo.solicitado;
    result.innerHTML = `
        <div class="protocol-summary">
            <div>
                <strong>${item.exame}</strong>
                <span>${item.paciente} - ${item.protocolo} ${item.origem === 'API' ? '(API)' : ''}</span>
            </div>
            <span class="status-badge status-${info.className}">${info.label}</span>
        </div>
        <div class="mini-timeline">${buildTimeline(item)}</div>
    `;
}

function setupEvents() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentFilter = button.dataset.status;
            document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
            button.classList.add('active');
            renderList();
        });
    });

    document.querySelectorAll('.mode-btn').forEach(button => {
        button.addEventListener('click', () => setMode(button.dataset.mode));
    });

    document.getElementById('protocolForm').addEventListener('submit', event => {
        event.preventDefault();
        consultProtocol(document.getElementById('protocolInput').value);
    });

    document.querySelectorAll('.logout-action').forEach(button => {
        button.addEventListener('click', () => {
            localStorage.removeItem('biotecher_token');
            localStorage.removeItem('biotecher_user');
            localStorage.removeItem('biotecher_role');
            localStorage.removeItem('biotecher_access_type');
            window.location.href = '/login.html';
        });
    });

    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('examModal').addEventListener('click', event => {
        if (event.target.id === 'examModal') closeModal();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeModal();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    setupEvents();
    document.body.dataset.profile = sessionMode;
    const modeSwitch = document.querySelector('.mode-switch');
    if (modeSwitch) modeSwitch.hidden = true;

    await loadSolicitacoesFromApi();
    setMode(sessionMode);
    renderList();
    renderProtocolEmptyState();
});
