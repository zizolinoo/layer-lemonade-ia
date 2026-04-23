# Premiere Template - Reels Verticais Layer Lemonade IA

Este arquivo define um template de montagem para videos curtos de noticia, benchmark e comentario rapido.

## Captacao base

- camera: iPhone 14 Pro Max
- enquadramento: vertical nativo
- fps recomendado: 30 fps
- resolucao recomendada: 4K vertical
- audio: microfone de lapela como fonte principal

## Boas praticas na gravacao

- usar a lente principal sempre que possivel
- travar foco e exposicao antes de gravar
- evitar HDR se a ideia for editar rapido em Rec.709 no Premiere
- manter distancia parecida da camera e do lapela entre takes
- deixar margem visual acima da cabeca para punch-in leve na edicao

## Sequencia master no Premiere

- frame size: `1080 x 1920`
- timebase: `30 fps`
- pixel aspect: `square pixels`
- fields: `no fields progressive`
- working color space: Rec.709
- nome sugerido da sequencia: `LLIA_REELS_TEMPLATE_1080x1920_30`

## Layout de trilhas

- `V1` A-roll principal
- `V2` punch-ins do A-roll ou duplicata para crops
- `V3` prints de noticia, prints de tela e imagens de benchmark
- `V4` textos curtos, palavras-chave e barras de destaque
- `V5` adjustment layer de color e acabamento
- `A1` voz principal do lapela
- `A2` musica de base
- `A3` efeitos de transicao e hits

## Stack visual recomendado

### V5 - Adjustment Layer

Aplicar uma adjustment layer por sequencia inteira com:

- Lumetri Color
- sharpen muito leve apenas se a imagem pedir

## Lumetri base recomendado para iPhone Rec.709

Use como ponto de partida, nunca como regra fixa:

- Exposure: `0 a +0.20`
- Contrast: `+8 a +15`
- Highlights: `-10 a -25`
- Shadows: `+5 a +15`
- Whites: `0 a +8`
- Blacks: `-4 a -10`
- Saturation: `100 a 105`

## Cor e pele

- preservar pele natural antes de buscar look
- evitar saturacao excessiva no vermelho
- manter fundo um pouco menos vivo que o rosto
- se precisar, aquecer levemente o mids em vez de exagerar no contraste

## Transicoes recomendadas

- corte seco como padrao
- `Dip to Black` apenas em viradas maiores
- `Cross Dissolve` curto so quando o corte seco ficar duro demais
- zoom digital rapido via keyframe no proprio clipe para dar ritmo

## Audio - cadeia simples e funcional

### A1 - Voz do lapela

Tratar a faixa como Dialogue no Essential Sound e usar:

- Loudness: auto-match ou alvo em torno de `-14 LUFS` para short
- Parametric EQ:
- high-pass entre `80 e 100 Hz`
- pequeno corte em `200 a 350 Hz` se embolar
- leve presenca em `3 kHz a 5 kHz` se faltar nitidez
- Dynamics:
- compressor leve
- limiter em `-3 dB`
- DeNoise leve se necessario

### A2 - Musica

- deixar a musica abaixo da fala
- faixa segura: `-26 dB` a `-20 dB`, ajustando pelo arranjo

### A3 - SFX

- usar swipes, clicks e risers curtos
- evitar efeitos chamando mais atencao que a informacao

## Regras de tela

- texto importante no centro seguro
- evitar colocar legenda muito baixa por causa da interface do Reels
- prints podem entrar full-frame com pan vertical lento
- alternar rosto, print e palavra forte para manter dinamica

## Template por sequencia

Cada video deve nascer da mesma base:

1. duplicar a sequencia master
2. renomear com data e tema
3. substituir A-roll
4. inserir prints em `V3`
5. inserir textos em `V4`
6. manter adjustment layer em `V5`

## Nomes sugeridos

- `SEQ_2026-04-22_GPT_IMAGES_2_0`
- `SEQ_2026-04-22_DEEPFAKE_SEGURANCA`
- `SEQ_2026-04-22_BENCHMARK_MJ_GPT_CLAUDE`
