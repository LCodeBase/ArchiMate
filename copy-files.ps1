# Copiar arquivos do frontend/build para a raiz
Copy-Item "frontend/build/static" -Destination "static" -Recurse -Force
Copy-Item "frontend/public/logo.svg" -Destination "logo.svg" -Force
Copy-Item "frontend/build/manifest.json" -Destination "manifest.json" -Force
Copy-Item "frontend/build/index.html" -Destination "index.html" -Force

# Criar diretório ArchiMate se não existir
New-Item -ItemType Directory -Force -Path "ArchiMate"

# Copiar arquivos para o diretório ArchiMate
Copy-Item "logo.svg" -Destination "ArchiMate/logo.svg" -Force
Copy-Item "manifest.json" -Destination "ArchiMate/manifest.json" -Force
Copy-Item "static" -Destination "ArchiMate/static" -Recurse -Force
Copy-Item "index.html" -Destination "ArchiMate/index.html" -Force

Write-Host "Arquivos copiados com sucesso!"