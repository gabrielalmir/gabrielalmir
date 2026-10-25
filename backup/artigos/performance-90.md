# Como reduzi em 90% o carregamento de um sistema crítico

_Performance · 4 min_

> Um relato anonimizado sobre medir antes de decidir.

Alguns trabalhos importantes não podem ser apresentados com telas, diagramas ou uma lista de decisões técnicas. Este é um deles.

## A restrição

Eu trabalhava em um sistema crítico, dentro de um ambiente regulado. O tempo de carregamento prejudicava a operação, e qualquer mudança precisava preservar regras, integrações e dados que não podem ser publicados. Tratei a confidencialidade como parte do trabalho: nomes, arquitetura, volumes, componentes e detalhes de implementação ficam de fora.

## A decisão

Observei o percurso completo que determinava o tempo percebido. Comparei etapas, isolei o custo dominante e priorizei a menor intervenção segura. Validei a mudança com a mesma referência antes e depois — sem essa comparação, velocidade seria apenas impressão.

## O resultado

O tempo de carregamento caiu **90%**. Esse é o único número publicado: foi medido, verificado e aprovado para divulgação.

## O que ficou comigo

Aprendi a medir o fluxo que afeta as pessoas, localizar a restrição antes de escolher a solução e comunicar impacto sem ultrapassar os limites do contexto. Performance confiável começa em observação, não em uma tecnologia escolhida cedo demais.
