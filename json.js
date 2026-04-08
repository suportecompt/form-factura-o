const json = {
  "title": "Inicio de Faturação - Zonesoft",
  "clearInvisibleValues": "none",
  "logo": "./logo.png",
  "logoWidth": "auto",
  "logoHeight": "60",
  "pages": [
    // --- PÁGINA 0: LOGIN ---
    {
      "name": "step_login",
      "navigationTitle": "Login",
      "elements": [
        {
          "type": "html",
          "name": "header_login",
          "html": `
            <div style="text-align: center;">
              <h2 style="color: #4b8a2e; margin-bottom: 5px;">Acesso ao Sistema</h2>
              <p style="color: #666; font-size: 14px;">Introduza as suas credenciais para continuar.</p>
            </div>
          `
        },
        {
          "type": "text",
          "name": "login_email",
          "title": "Email",
          "isRequired": true,
          "inputType": "email",
          "placeholder": "tecnico@empresa.pt"
        },
        {
          "type": "text",
          "name": "login_password",
          "title": "Palavra-passe",
          "isRequired": true,
          "inputType": "password",
          "placeholder": "••••••••"
        }
      ]
    },
    // --- PÁGINA 1: FORMULARIO ---
    {
      "name": "planeamento",
      "elements": [
        {
          "type": "dropdown",
          "name": "ticketnr",
          "title": "Ticket/SGPP",
          "isRequired": true,
          "choicesLazyLoadEnabled": true,
          "choicesLazyLoadPageSize": 20,
          "placeholder": "Escreva pelo menos 3 caracteres..."
        },
        {
          "type": "dropdown",
          "name": "tecnico",
          "title": "Técnico",
          "isRequired": true
        },
        {
          "type": "dropdown",
          "name": "id_unidade",
          "title": "POS (@meshcentral)", 
          "isRequired": true,
          "choicesLazyLoadEnabled": true,
          "choicesLazyLoadPageSize": 20,
          "placeholder": "Escreva pelo menos 3 caracteres..."
        },
        {
          "type": "dropdown",
          "name": "nome_unidade",
          "title": "Unidade name",
          "isRequired": true,
          "choicesLazyLoadEnabled": true,
          "choicesLazyLoadPageSize": 20,
          "placeholder": "Escreva pelo menos 3 caracteres..."
        },
        {
          "type": "text",
          "name": "local",
          "title": "Local (Pos/Produtos/Produção)",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "data_inicio",
          "title": "Data de inicio",
          "inputType": "date",
          "isRequired": true,
          "width": "50%"
        },
        {
          "type": "text",
          "name": "hora_inicio",
          "title": "Hora de inicio",
          "inputType": "time",
          "isRequired": true,
          "startWithNewLine": false,
          "width": "50%"
        },
        {
          "type": "comment",
          "name": "nota",
          "title": "Nota",
          "rows": 6
        }
      ]
    }
  ],
  "showPrevButton": true,
  "pageNextText": "Continuar",
  "completeText": "Submeter Dados",
  "questionErrorLocation": "bottom",
  "widthMode": "static",
  "width": "800"
};