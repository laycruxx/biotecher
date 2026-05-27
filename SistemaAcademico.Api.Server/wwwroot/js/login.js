document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const message = document.getElementById('loginMessage');
    const title = document.getElementById('formTitle');
    const hint = document.getElementById('formHint');
    const submitButton = document.getElementById('submitButton');
    const toggleMode = document.getElementById('toggleMode');
    const toggleText = document.getElementById('toggleText');
    const privacyConsent = document.getElementById('privacyConsent');
    const consentRow = document.getElementById('consentRow');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('togglePassword');
    const forgotPassword = document.getElementById('forgotPassword');
    const accessType = document.getElementById('accessType');
    const accessOptions = document.querySelectorAll('.access-option');
    const loginVisualImage = document.getElementById('loginVisualImage');
    const visualNoteTitle = document.querySelector('.visual-note strong');
    const visualNoteText = document.querySelector('.visual-note span');

    let isRegisterMode = false;
    let selectedRole = accessType ? accessType.value : 'Funcionario';

    function showMessage(text, type = '') {
        message.textContent = text;
        message.className = type ? `login-message ${type}` : 'login-message';
    }

    function setLoading(isLoading) {
        submitButton.disabled = isLoading;
        toggleMode.disabled = isLoading;
        submitButton.textContent = isLoading
            ? (isRegisterMode ? 'Cadastrando...' : 'Entrando...')
            : (isRegisterMode ? 'Cadastrar' : 'Entrar');
    }

    function updateAccessChoice(role) {
        selectedRole = role;
        if (accessType) accessType.value = role;
        accessOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.role === role);
        });

        if (loginVisualImage) {
            const nextImage = role === 'Paciente'
                ? loginVisualImage.dataset.pacienteSrc
                : loginVisualImage.dataset.funcionarioSrc;
            loginVisualImage.src = nextImage || loginVisualImage.dataset.defaultSrc;
            loginVisualImage.onerror = function () {
                loginVisualImage.onerror = null;
                loginVisualImage.src = loginVisualImage.dataset.defaultSrc;
            };
        }

        if (visualNoteTitle && visualNoteText) {
            visualNoteTitle.textContent = role === 'Paciente' ? 'Atendimento ao paciente' : 'Rotina do laboratório';
            visualNoteText.textContent = role === 'Paciente'
                ? 'Área de acesso para acompanhar solicitações, coleta e resultados.'
                : 'Área da equipe para acompanhar solicitações, coletas, análises e resultados.';
        }

        if (!isRegisterMode) {
            hint.textContent = role === 'Paciente'
                ? 'Acesso do paciente para acompanhar protocolos'
                : 'Acesso interno da equipe do laborat\u00f3rio';
        }
    }

    function updateMode() {
        showMessage('');
        consentRow.style.display = isRegisterMode ? 'block' : 'none';
        privacyConsent.required = isRegisterMode;
        passwordInput.autocomplete = isRegisterMode ? 'new-password' : 'current-password';

        if (isRegisterMode) {
            title.textContent = 'Criar conta';
            hint.textContent = selectedRole === 'Paciente' ? 'Crie uma conta de paciente para acompanhar seus exames' : 'Crie uma conta para a equipe do laborat\u00f3rio';
            submitButton.textContent = 'Cadastrar';
            toggleText.firstChild.textContent = 'J\u00e1 tem conta? ';
            toggleMode.textContent = 'Entrar';
            return;
        }

        title.textContent = 'Login BioTecher';
        hint.textContent = selectedRole === 'Paciente' ? 'Acesso do paciente para acompanhar protocolos' : 'Acesso interno da equipe do laborat\u00f3rio';
        submitButton.textContent = 'Entrar';
        toggleText.firstChild.textContent = 'N\u00e3o tem conta? ';
        toggleMode.textContent = 'Cadastre-se';
    }

    accessOptions.forEach(option => {
        option.addEventListener('click', function () {
            updateAccessChoice(option.dataset.role || 'Funcionario');
        });
    });

    toggleMode.addEventListener('click', function () {
        isRegisterMode = !isRegisterMode;
        updateAccessChoice(selectedRole);
    updateMode();
    });

    passwordToggle.addEventListener('click', function () {
        const showingPassword = passwordInput.type === 'text';
        passwordInput.type = showingPassword ? 'password' : 'text';
        passwordToggle.setAttribute('aria-label', showingPassword ? 'Mostrar senha' : 'Ocultar senha');
        passwordToggle.innerHTML = showingPassword ? '<i class="bx bx-show"></i>' : '<i class="bx bx-hide"></i>';
        passwordInput.focus();
    });

    forgotPassword.addEventListener('click', function () {
        showMessage('Para recuperar o acesso, fale com a equipe respons\u00e1vel do BioTecher ou crie uma nova conta.', 'info');
    });

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            showMessage('Preencha usu\u00e1rio e senha.', 'error');
            return;
        }

        if (username.length < 3 || password.length < 4) {
            showMessage('Use um usu\u00e1rio com pelo menos 3 caracteres e senha com pelo menos 4.', 'error');
            return;
        }

        if (isRegisterMode && !privacyConsent.checked) {
            showMessage('Para criar a conta, aceite o uso dos dados conforme a LGPD.', 'error');
            return;
        }

        setLoading(true);
        showMessage(isRegisterMode ? 'Criando conta...' : 'Entrando...');

        try {
            if (isRegisterMode) {
                const created = await register(username, password);
                if (!created) return;
                isRegisterMode = false;
                passwordInput.value = '';
                privacyConsent.checked = false;
                updateAccessChoice(selectedRole);
                updateMode();
                showMessage('Conta criada com sucesso. Agora entre com seu usuário e senha.', 'success');
                return;
            }

            const logged = await login(username, password);
            if (logged) window.location.assign('/interno.html');
        } catch (error) {
            showMessage('N\u00e3o foi poss\u00edvel conectar com a API. Confirme se o projeto est\u00e1 rodando.', 'error');
        } finally {
            setLoading(false);
        }
    });

    async function register(username, password) {
        const response = await fetch('/api/Auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role: selectedRole })
        });

        if (response.status === 409) {
            showMessage('Este usu\u00e1rio j\u00e1 existe. Use outro nome ou fa\u00e7a login.', 'error');
            return false;
        }

        if (!response.ok) {
            const error = await readApiMessage(response);
            showMessage(error || 'N\u00e3o foi poss\u00edvel criar a conta.', 'error');
            return false;
        }

        return true;
    }

    async function login(username, password) {
        const response = await fetch('/api/Auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const error = await readApiMessage(response);
            showMessage(error || 'Usu\u00e1rio ou senha inv\u00e1lidos.', 'error');
            return false;
        }

        const data = await response.json();
        if (!data.token || !data.usuario) {
            showMessage('A API respondeu, mas n\u00e3o enviou o token esperado.', 'error');
            return false;
        }

        localStorage.setItem('biotecher_token', data.token);
        localStorage.setItem('biotecher_user', data.usuario.username);
        const role = selectedRole;
        localStorage.setItem('biotecher_role', data.usuario.role || selectedRole);
        localStorage.setItem('biotecher_access_type', role);
        return true;
    }

    async function readApiMessage(response) {
        try {
            const data = await response.json();
            return data.mensagem || '';
        } catch {
            return '';
        }
    }

    updateAccessChoice(selectedRole);
    updateMode();
});
