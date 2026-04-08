/**
 * LÓGICA PRINCIPAL - INÍCIO DE FATURAÇÃO
 */

// 1. Inicializar el modelo
window.survey = new Survey.Model(json);
window.survey.applyTheme(themeJson);

window.idDictionary = {
    ticketnr: {},
    id_unidade: {},
    nome_unidade: {}
};

const questionTableMapping = {
    "ticketnr": "tickets",
    "id_unidade": "id_unidade",
    "nome_unidade": "nome_unidade"
};

// Variable para el debounce del buscador (FUERA para que funcione el clearTimeout)
let lazyLoadTimeout;

// --- 2. VALIDACIÓN DE LOGIN ---
window.survey.onCurrentPageChanging.add(async (sender, options) => {
    if (options.oldCurrentPage.name === "step_login" && options.newCurrentPage.name === "planeamento") {
        
        // Bloqueamos el avance mientras validamos
        options.allowChanging = false;

        const email = sender.getValue("login_email");
        const password = sender.getValue("login_password");

        if (!email || !password) {
            alert("Por favor, preencha o email e a palavra-passe.");
            return;
        }

        try {
            const response = await fetch(`${CONFIG.SUPABASE_URL}${CONFIG.ENDPOINTS.LOGIN}`, {
                method: 'POST',
                headers: {
                    'apikey': CONFIG.SUPABASE_ANON_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error_description || "Credenciais inválidas.");
            }

            CONFIG.SESSION_TOKEN = data.access_token;
            
            // Cargar técnicos antes de pasar de página
            await loadTechnicians();

            // Forzar el cambio de página ahora que tenemos el token
            options.allowChanging = true;
            sender.nextPage(); 

        } catch (e) {
            alert("Erro de Autenticação: " + e.message);
        }
    }
});

window.survey.render(document.getElementById("surveyElement"));

// --- 3. CARGAR TÉCNICOS ---
async function loadTechnicians() {
    try {
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/tecnicos?select=id,descricao`, {
            method: 'GET',
            headers: {
                'apikey': CONFIG.SUPABASE_ANON_KEY,
                'Authorization': `${CONFIG.SESSION_TOKEN}`
            }
        });

        if (!response.ok) throw new Error("Erro ao carregar técnicos.");
        
        const data = await response.json();
        const qTec = window.survey.getQuestionByName("tecnico");
        if (qTec) {
            qTec.choices = data.map(t => ({ value: t.id, text: t.descricao }));
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// --- 4. BÚSQUEDA DINÁMICA (LAZY LOAD) ---
window.survey.onChoicesLazyLoad.add((sender, options) => {
    const tableName = questionTableMapping[options.question.name];
    if (!tableName || options.skip > 0) return;

    const text = options.filter || "";
    if (text.length < 3) { options.setItems([], 0); return; }

    // Limpiar timeout previo para evitar múltiples peticiones
    clearTimeout(lazyLoadTimeout);

    lazyLoadTimeout = setTimeout(async () => {
        try {
            const searchField = (tableName === 'tickets') ? 'title' : 'valor';
            const queryParams = new URLSearchParams({
                select: '*',
                [searchField]: `ilike.*${text}*`,
                limit: CONFIG.UI.DROPDOWN_SEARCH_LIMIT
            });

            const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/${tableName}?${queryParams}`, {
                method: 'GET',
                headers: {
                    'apikey': CONFIG.SUPABASE_ANON_KEY,
                    'Authorization': `${CONFIG.SESSION_TOKEN}`
                }
            });

            const data = await response.json();

            // Limpiar diccionario de este campo antes de añadir nuevos
            window.idDictionary[options.question.name] = {};

            const formattedData = data.map(item => {
                const realId = (tableName === 'tickets') ? item.ticket_id : (item.id_propio || item.id);
                const displayLabel = item[searchField];
                
                window.idDictionary[options.question.name][displayLabel] = realId;
                return { value: displayLabel, text: displayLabel };
            });

            options.setItems(formattedData, formattedData.length);
        } catch (e) {
            options.setItems([], 0);
        }
    }, CONFIG.UI.SEARCH_DELAY_MS);
});