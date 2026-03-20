// submitData.js

window.survey.onComplete.add(async function (sender, options) {
    // User message in Portuguese while saving
    options.showDataSaving("A guardar os dados no sistema...");

    // 1. Clone raw data for JSONB storage
    let rawData = JSON.parse(JSON.stringify(sender.data));
    let processedData = JSON.parse(JSON.stringify(sender.data));

    // 2. SWAP: Replace Text with ID only for fields in the dictionary
    const fieldsToSwap = ["ticketnr", "id_unidade", "nome_unidade"];
    fieldsToSwap.forEach(field => {
        const selectedText = processedData[field];
        if (selectedText && window.idDictionary[field][selectedText]) {
            processedData[field] = window.idDictionary[field][selectedText];
        }
    });

    // 3. Prepare Payload for Supabase
    // Mapping individual columns + the 'respostas' JSONB field
    const payload = {
        ticket_id: processedData.ticketnr,
        tecnico_id: processedData.tecnico,
        id_unidade_propio: processedData.id_unidade,
        nome_unidade_propio: processedData.nome_unidade,
        local: processedData.local, // Stores the free text content
        data_inicio: processedData.data_inicio,
        hora_inicio: processedData.hora_inicio,
        nota: processedData.nota,
        respostas: rawData // Stores the full original JSON with readable text
    };

    try {
        // Attempting to insert into Supabase
        const { error } = await window.supabaseClient
            .from('inicio_faturacao_responses')
            .insert([payload]);

        if (error) throw error;
        
        // Success message in Portuguese
        options.showDataSavingSuccess("Dados guardados com sucesso!");

    } catch (err) {
        // Error handling with console logging and user feedback in Portuguese
        console.error("Supabase Error:", err.message);
        options.showDataSavingError("Erro ao guardar. Tente novamente.");
    }
});