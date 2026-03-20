const json = {
  // General survey appearance and basic settings
  "title": "Inicio de Faturação - Zonesoft",
  "clearInvisibleValues": "none",
  "logo": "./logo.png",
  "logoWidth": "auto",
  "logoHeight": "60",

  "pages": [
    {
      "name": "planeamento",
      "elements": [
        {
          "type": "dropdown",
          "name": "ticketnr",
          "title": "Ticket/SGPP",
          "isRequired": true,
          // Enables dynamic data fetching via index.js as the user types
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
          // Enables dynamic data fetching
          "choicesLazyLoadEnabled": true,
          "choicesLazyLoadPageSize": 20,
          "placeholder": "Escreva pelo menos 3 caracteres..."
        },
        {
          "type": "dropdown",
          "name": "nome_unidade",
          "title": "Unidade name",
          "isRequired": true,
          // Enables dynamic data fetching
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
          // Restricts width so the time field can fit on the same line
          "width": "50%",
          "minWidth": "250px"
        },
        {
          "type": "text",
          "name": "hora_inicio",
          "title": "Hora de inicio",
          "inputType": "time",
          "isRequired": true,
          // Prevents line break to align this field next to the date field
          "startWithNewLine": false,
          "width": "50%",
          "minWidth": "150px"
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

  // Footer controls and form sizing configuration
  "showPrevButton": false,
  "questionErrorLocation": "bottom",
  "completeText": "Submit",
  "widthMode": "static",
  "width": "800"
};