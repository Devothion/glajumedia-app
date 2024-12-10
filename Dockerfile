# Usa una imagen base de Node.js
FROM node:18

# Instala herramientas necesarias para la compilación
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    python3-dev \
    libsqlite3-dev

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./
COPY . .

# Copiar el archivo .envExample y renombrarlo como .env
COPY .envExample .env

# Instala las dependencias
RUN npm install

# Expone el puerto de tu aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
