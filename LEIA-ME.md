# SGP Celular — Leia-me

Aplicativo de celular do **SGP – Sistema de Gestão de Carga e Pesagem**.
Ele lê a placa do caminhão com a câmera, preenche os dados do veículo e envia o lançamento para o computador da balança.

**Quem dá o número do ticket é sempre o computador da balança.** O celular envia o lançamento com um código provisório (ex.: `CEL-7K2P9X`), e o SGP do computador cria o ticket com o próximo número da sequência. Por isso **o número do ticket nunca se repete**.

---

## 1. Como funciona

```
 CELULAR (SGP Celular)                 ONEDRIVE                    COMPUTADOR DA BALANÇA (SGP)
 lê a placa → completa → envia  ──►  SGP Dados\celular\entrada  ──►  cria o ticket nº X (ABERTO)
                                                                         operador captura o peso
 vê "Ticket nº X" / "24,460 t"  ◄──  SGP Dados\celular\status   ◄──  devolve a situação
 placas, taras e listas         ◄──  SGP Dados\celular\cadastro ◄──  envia o cadastro
```

- **Sem internet:** o celular guarda o lançamento na fila e envia sozinho quando o sinal voltar.
- **Placa lida com erro:** o app compara com as placas cadastradas no SGP e sugere a mais parecida. Sempre dá para digitar.
- **Placa com pesagem em aberto:** o celular mostra o aviso.
- **Login:** cada pessoa entra no celular com o **mesmo usuário e senha do SGP**.

---

## 2. Testar agora (antes de publicar)

### a) Modo demonstração (sem conexão nenhuma)
1. Abra a pasta `SGP-Celular` e rode o app por um servidor local, ou espere a publicação (passo 4).
   Pelo arquivo direto (`index.html`) a câmera não funciona, porque o navegador exige https.
2. Em **Configurar**, escolha **Demonstração**, depois **Salvar e sincronizar**.
3. Entre com o usuário **DEMO** e a senha **1234**. As placas de exemplo são ABC1D23, DEF4G56 e HIJ7K89.

### b) Teste completo no computador ("Pasta do computador")
Esse teste usa o Chrome ou o Edge do próprio computador, sem Microsoft e sem celular:
1. No SGP do computador, abra **Configurações → Celular** e deixe marcado **"Receber os lançamentos do celular neste computador"**.
2. Abra o SGP Celular no navegador. Em **Configurar**, escolha **Pasta do computador** e selecione a mesma pasta de dados do SGP (ex.: `C:\Balanca\Dados`).
3. Clique em **Salvar e sincronizar**. Os usuários do SGP aparecem na tela de login.
4. Lance uma carga no app. Em até 10 segundos ela aparece no SGP como ticket **📱 PESAR**.

---

## 3. Preparar o computador da balança

1. **Coloque a pasta de dados do SGP dentro do OneDrive.**
   No SGP, abra **Configurações → Escolher / trocar pasta de dados** e escolha, por exemplo, `C:\Users\SEU_USUARIO\OneDrive\SGP Dados`.
   O OneDrive do Windows precisa estar ligado e entrado com a **sua conta Microsoft**.
2. Em **Configurações → Celular**, marque **"Receber os lançamentos do celular neste computador"**.
   Deixe marcado **só no computador da balança**.
3. Deixe o SGP aberto nesse computador. Ele verifica o celular a cada 10 segundos.

---

## 4. Publicar o app (GitHub Pages — gratuito)

O celular só libera a câmera para páginas em **https**, por isso o app precisa ficar num endereço da internet.

1. Crie uma conta em **github.com**.
2. Clique em **New repository**, dê o nome `sgp-celular`, escolha **Public** e clique em **Create repository**.
   Só o código do app fica público. **Nenhum dado de pesagem vai para o GitHub.**
3. Clique em **uploading an existing file** e arraste **todo o conteúdo** da pasta `SGP-Celular`
   (index.html, manifest.webmanifest, sw.js, os ícones e a pasta `vendor`). Clique em **Commit changes**.
4. Abra **Settings → Pages**. Em **Branch**, escolha `main` e `/ (root)` e clique em **Save**.
5. Em 1 a 2 minutos o endereço aparece, por exemplo: `https://SEU_USUARIO.github.io/sgp-celular/`.
   **Anote esse endereço.**

---

## 5. Registrar o app na Microsoft (só o fornecedor do SGP, uma vez)

Esse passo é feito **uma vez só, pelo dono do programa**, e vale para **todos os clientes**. O cliente nunca faz este passo: ele só entra com a conta Microsoft dele no celular. Não tem custo.

1. Entre em **https://portal.azure.com** com a **mesma conta Microsoft do OneDrive**.
   Se pedir, ative a conta gratuita do Azure. Pode ser pedido um cartão só para confirmar a identidade, sem cobrança.
2. Procure **"Registros de aplicativo"** (App registrations) e clique em **+ Novo registro**:
   - **Nome:** `SGP Celular`
   - **Tipos de conta:** *"Contas em qualquer diretório organizacional e contas pessoais da Microsoft"* (assim funciona com Hotmail/Outlook e com e-mail de empresa)
   - **URI de redirecionamento:** plataforma **"Aplicativo de página única (SPA)"**, com o endereço do passo 4 (ex.: `https://SEU_USUARIO.github.io/sgp-celular/`).
3. Clique em **Registrar** e copie o **"ID do aplicativo (cliente)"**, no formato `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.
   Esse código vai gravado no app, em `CLIENT_ID_PADRAO` no começo do script do `index.html`. Depois publique de novo (passo 4).
4. Abra **Permissões de API → Adicionar permissão → Microsoft Graph → Permissões delegadas** e marque **Files.ReadWrite** e **User.Read**. Depois clique em **Adicionar permissões**.

---

## 6. Configurar cada celular

1. Abra o endereço do app no **Chrome** (Android) ou no **Safari** (iPhone).
2. Em **Configurar**, escolha **OneDrive**:
   - **Pasta:** `SGP Dados`, o mesmo nome da pasta dentro do OneDrive.
   - **Nome deste aparelho:** ex.: `CELULAR PORTARIA`.
3. Toque em **Entrar com a conta Microsoft**, entre com a **mesma conta do OneDrive do computador da balança** (pessoal ou da empresa) e aceite a permissão.
   Algumas empresas exigem que o responsável de TI aprove o app na primeira vez. O app avisa quando for o caso.
4. Toque em **Salvar e sincronizar**. Os usuários do SGP aparecem no login.
5. Entre com o usuário e a senha do SGP.
6. Instale na tela inicial:
   - **Android:** menu ⋮ → **Instalar app** (ou "Adicionar à tela inicial").
   - **iPhone:** botão Compartilhar → **Adicionar à Tela de Início**.

---

## 7. Uso no dia a dia

**No celular:** toque em **Ler placa com a câmera**, enquadre a placa no retângulo e toque em **Ler placa**. Confirme a placa, confira os dados preenchidos, ajuste material e frente de serviço e toque em **Enviar para a balança**.
Em **Lançamentos** aparece a situação: **NA FILA → ENVIADO → TICKET Nº X → Nº X · 24,460 t**.

**Na balança:** o ticket aparece na lista com **📱 PESAR**. Clique nele: a tara do cadastro já vem preenchida, é só capturar o peso bruto e salvar.

---

## 8. Dúvidas comuns

- **A câmera não abre:** o app precisa estar no endereço https (GitHub Pages) e você precisa permitir a câmera.
- **A placa não é lida:** chegue mais perto, deixe a placa reta e iluminada e enquadre só a placa. Ou digite.
- **O lançamento não chega na balança:**
  - confira se o SGP está aberto no computador da balança, com **"Receber os lançamentos do celular"** marcado;
  - confira se a pasta de dados está **dentro do OneDrive** e se o OneDrive está sincronizando (ícone de nuvem azul);
  - confira se o celular está com a **mesma conta Microsoft**.
- **Usuários não aparecem no celular:** abra o SGP no computador uma vez com a pasta no OneDrive. Ele cria o arquivo `celular\cadastro.json`.
