# Copiar arquivos do frontend/build para a raiz
Copy-Item "frontend/build/static" -Destination "static" -Recurse -Force
Copy-Item "frontend/build/logo.svg" -Destination "logo.svg" -Force
Copy-Item "frontend/build/manifest.json" -Destination "manifest.json" -Force
Copy-Item "frontend/build/index.html" -Destination "index.html" -Force

Write-Host "Arquivos copiados com sucesso!"