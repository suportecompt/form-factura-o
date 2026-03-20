// index.js

// Security check
if (!window.supabaseClient) {
    console.error("Supabase is not initialized. Please check credentials in the HTML file.");
}

window.survey = new Survey.Model(json);
window.survey.applyTheme(themeJson);

// Dictionary to store IDs for the final data swap
window.idDictionary = {
    ticketnr: {},
    id_unidade: {},
    nome_unidade: {}
};

// Mapping of survey questions to Supabase tables
const questionTableMapping = {
    "ticketnr": "tickets",
    "id_unidade": "id_unidade",
    "nome_unidade": "nome_unidade"
};

// Load Technicians on startup (Static Dropdown)
async function loadTechnicians() {
    const { data, error } = await window.supabaseClient
        .from('tecnicos')
        .select('id, descricao');
    
    if (!error && data) {
        const qTec = window.survey.getQuestionByName("tecnico");
        if (qTec) {
            // Set choices for the technician dropdown
            qTec.choices = data.map(t => ({ value: t.id, text: t.descricao }));
        }
    }
}

// Handle Lazy Load for the 3 dynamic dropdowns
window.survey.onChoicesLazyLoad.add((sender, options) => {
    const tableName = questionTableMapping[options.question.name];
    if (!tableName || options.skip > 0) return;

    const text = options.filter || "";
    // Minimum 3 characters to start searching
    if (text.length < 3) { options.setItems([], 0); return; }

    let lazyLoadTimeout;
    clearTimeout(lazyLoadTimeout);

    lazyLoadTimeout = setTimeout(async () => {
        try {
            // Determine search column: 'subject' for tickets, 'valor' for units
            const searchField = (tableName === 'tickets') ? 'subject' : 'valor';
            
            const { data, error } = await window.supabaseClient
                .from(tableName)
                .select('*')
                .ilike(searchField, `%${text}%`)
                .limit(20);

            if (error) throw error;

            const formattedData = data.map(item => {
                // Capture the internal ID: 'id_propio' for units, 'id' for tickets
                const realId = item.id_propio || item.id;
                const realText = item[searchField];

                // Save to dictionary for the final data swap before submission
                window.idDictionary[options.question.name][realText] = realId;

                return { value: realText, text: realText };
            });

            options.setItems(formattedData, formattedData.length);
        } catch (e) {
            console.error("Error during lazy load:", e);
            options.setItems([], 0);
        }
    }, 250);
});

// Initialize survey rendering and data loading
document.addEventListener("DOMContentLoaded", () => {
    window.survey.render(document.getElementById("surveyElement"));
    loadTechnicians();
});