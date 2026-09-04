#!/usr/bin/env bash
# Genera config.js (gitignored) a partir de .env para desarrollo local.
# En Netlify este mismo paso lo hace el build command de netlify.toml,
# leyendo la env var TMDB_API_KEY configurada en el dashboard del sitio.
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f .env ]; then
    echo "Falta .env — copiá .env.example como .env y pegá tu key de TMDb." >&2
    exit 1
fi

set -a
source .env
set +a

echo "const TMDB_API_KEY = '$TMDB_API_KEY';" > config.js
echo "config.js generado desde .env"
