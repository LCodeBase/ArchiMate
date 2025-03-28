# Limpar diretórios existentes
Remove-Item -Path "static" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "ArchiMate" -Recurse -Force -ErrorAction SilentlyContinue

# Criar diretório ArchiMate
New-Item -ItemType Directory -Force -Path "ArchiMate"

# Copiar arquivos do frontend/build para o diretório ArchiMate
Copy-Item "frontend/build/static" -Destination "ArchiMate/static" -Recurse -Force
Copy-Item "frontend/build/manifest.json" -Destination "ArchiMate/manifest.json" -Force
Copy-Item "frontend/build/index.html" -Destination "ArchiMate/index.html" -Force

# Copiar arquivos para a raiz (para compatibilidade)
Copy-Item "ArchiMate/static" -Destination "static" -Recurse -Force
Copy-Item "ArchiMate/manifest.json" -Destination "manifest.json" -Force
Copy-Item "ArchiMate/index.html" -Destination "index.html" -Force

Write-Host "Arquivos copiados com sucesso!"