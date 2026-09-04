// Config pública de la demo. MovieTime es un proyecto 100% frontend sin backend,
// así que esta key SIEMPRE es visible para cualquiera que abra las devtools del
// navegador (TMDb no ofrece restricción de key por dominio como Google Maps).
// Por eso se aísla acá, en un único archivo, y se trata como una key de demo de
// solo lectura que se puede regenerar sin tocar el resto del código.
//
// Para regenerarla: https://www.themoviedb.org/settings/api (necesita tu login de TMDb)
const TMDB_API_KEY = "192e0b9821564f26f52949758ea3c473";
