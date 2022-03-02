# aguadulce-wordle

Aplicación demo para las jornadas de orientación profesional `Oriéntate` del [IES Aguadulce](http://www.iesaguadulce.es/)

- Introducción a Node.js
- Escalabilidad

Aplicación real corriendo en https://wordle.coderty.ninja/

## En qué consiste la aplicación
Una implementación simplificada del [Wordle - Juego de palabras diario](https://wordle.danielfrg.com/), la versión adaptada al español de [@danielfrg (twitter)](https://github.com/danielfrg) - [@danielfrg (github)](https://github.com/danielfrg)

## Cómo puedo probar el código
### 🐋 Docker
1. Clona el repo
2. Prepara tu fichero .env (`cp .env.sample .env`)
3. `docker-compose build`
4. `docker-compose up -t`
5. La aplicación estará disponible en http://localhost:8080

### Manual
1. Clona el repo
2. Prepara tu fichero .env (`cp .env.sample .env`)
3. Modifica el .env con la conexión de la base de datos
4. `npm start`

## Gracias! 
Hecho con ❤️ por el increíble equipo de [@CodertyStudio](https://twitter.com/CodertyStudio)
