# 🛠️ Guia de Desenvolvimento

## Debug da Extensão

### Ver logs do Service Worker

1. Vá para `chrome://extensions/`
2. Encontre "YouTube Shorts Blocker"
3. Clique em **"Service worker"** sob "Background" > "Inspetor"

### Ver logs do Content Script

1. Abra um site do YouTube
2. Pressione `F12` ou `Ctrl+Shift+I`
3. Vá para a aba **Console**
4. Verifique se há mensagens de erro

### Recarregar extensão

1. Vá para `chrome://extensions/`
2. Clique no botão ⟲ (atualizar) da extensão

## Estrutura de Arquivos

### manifest.json

Define permissões, scripts, ícones e popup da extensão.

**Pontos importantes:**

- `"manifest_version": 3` - Versão mais recente
- `"permissions"` - Permissões necessárias
- `"background.service_worker"` - Service worker
- `"content_scripts"` - Scripts injetados nas páginas
- `"action"` - Ícone e popup da extensão

### content.js

Script executado em todas as páginas do YouTube.

**Funções principais:**

- `hideShorts()` - Oculta elementos de Shorts
- `redirectShortsPage()` - Redireciona /shorts/* para home
- `observePage()` - Monitora mudanças no DOM

### background.js

Service Worker que executa em background.

**Função:**

- Monitora navegação para `/shorts`
- Verifica estado do bloqueador
- Executa redirecionamento se necessário

### popup.html + popup.js

Interface do popup mostrada ao clicar no ícone.

**Funcionalidade:**

- Toggle para ativar/desativar
- Mostrar status
- Recarregar abas do YouTube

## Testando Localmente

### Teste 1: Ocultar Shorts

1. Carregue a extensão
2. Acesse <https://www.youtube.com/>
3. Verifique se os Shorts estão ocultos
4. Abra o console (F12) para ver logs

### Teste 2: Bloquear acesso direto

1. Tente acessar <https://www.youtube.com/shorts/abc123>
2. Você deve ser redirecionado para <https://www.youtube.com/>

### Teste 3: Toggle on/off

1. Clique no ícone 🚫
2. Desative o toggle
3. Recarregue a página (Ctrl+R)
4. Shorts devem aparecer
5. Reative e verifique que sumiram

## Modificações Futuras

### Adicionar lista negra de canais

Modificar `content.js` para detectar e ocultar canais específicos.

### Adicionar opções de customização

1. Criar `options.html` e `options.js`
2. Adicionar `"options_page": "options.html"` no manifest
3. Implementar configurações avançadas

### Adicionar estatísticas

1. Contar quantos Shorts foram bloqueados
2. Mostrar no popup

## Recursos Úteis

- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/mv2-sunset/)
- [Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)

## Troubleshooting

### "Manifest error: Unknown key 'property'"

Verifique se todas as chaves no manifest.json estão corretas.

### "Cannot read property 'storage' of undefined"

Certifique-se de que `chrome.storage.sync` foi acessado corretamente.

### Scripts não estão sendo executados

1. Verifique se o host_permissions está correto
2. Recarregue a extensão
3. Limpe o cache do navegador
