window.survey.onComplete.add(async function (sender, options) {
    options.showDataSaving("A guardar os dados no sistema...");

    let rawData = JSON.parse(JSON.stringify(sender.data));
    let processedData = JSON.parse(JSON.stringify(sender.data));

    // Cambiar Texto por ID real
    const fieldsToSwap = ["ticketnr", "id_unidade", "nome_unidade"];
    fieldsToSwap.forEach(field => {
        const selectedText = processedData[field];
        if (selectedText && window.idDictionary[field][selectedText]) {
            processedData[field] = window.idDictionary[field][selectedText];
        }
    });

    const payload = {
        ticket_id: processedData.ticketnr,
        tecnico_id: processedData.tecnico,
        id_unidade_propio: processedData.id_unidade,
        nome_unidade_propio: processedData.nome_unidade,
        local: processedData.local,
        data_inicio: processedData.data_inicio,
        hora_inicio: processedData.hora_inicio,
        nota: processedData.nota,
        respostas: rawData 
    };

    try {
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/inicio_faturacao_responses`, {
            method: 'POST',
            headers: {
                'apikey': CONFIG.SUPABASE_ANON_KEY,
                'Authorization': `${CONFIG.SESSION_TOKEN}`, // ¡Corregido! Sin Bearer
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erro de inserção na Base de Dados");
        }
        
        options.showDataSavingSuccess("Dados guardados com sucesso!");

    } catch (err) {
        console.error("Supabase Error:", err.message);
        options.showDataSavingError("Erro ao guardar. Tente novamente.");
    }
});