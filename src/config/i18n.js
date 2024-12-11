const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['en', 'es'], // Idiomas soportados
    directory: path.join(__dirname, '../locales'), // Carpeta donde estarán los archivos de traducción
    defaultLocale: 'es', // Idioma por defecto
    queryParameter: 'lang', // Parámetro para cambiar de idioma vía query string
    autoReload: true, // Recargar automáticamente los archivos de traducción si cambian
    syncFiles: true, // Crear archivos locales automáticamente si no existen
    cookie: 'locale', // Guardar el idioma en una cookie
});

module.exports = i18n;
