---
title: "Como Reduzi em 90% o Tempo de Sincronização de um Sistema Atendimento ao Cliente Crítico"
date: "2024-08-15T00:00:00-03:00"
excerpt: "A história de como transformei um processo manual lento em uma solução automatizada que sincroniza dados de bulas médicas em menos de 2 minutos, melhorando drasticamente o atendimento no SAC farmacêutico e a confiabilidade do sistema."
category: "technical"
tags: ["Python", "Otimização", "ERP", "Automação", "Performance", "Case Study"]
author: "Gabriel Almir"
readTime: "8 min"
---

Imagine um atendente do SAC tentando ajudar um médico que ligou para tirar uma dúvida urgente sobre uma bula, mas tendo que esperar mais de 20 minutos apenas para acessar as informações no sistema. Frustrante para ambos os lados, certo? Esse era o cenário que encontrei quando comecei a trabalhar na otimização do sistema de busca de bulas de uma farmácia.

## O Problema que Precisava Resolver

O sistema existente tinha um gargalo crítico: a sincronização entre múltiplos ERPs estava completamente travada. Toda vez que precisávamos atualizar os dados de bulas, o processo demorava uma eternidade e, pior ainda, muitas vezes falhava no meio do caminho.

Os sintomas eram claros:
- Atendentes do SAC esperando interminavemente para responder médicos e comerciantes
- Processos manuais consumindo horas de trabalho
- Dados inconsistentes entre os sistemas
- Sistema caindo frequentemente (disponibilidade de apenas 71%)
- Um débito técnico crescente que ninguém queria tocar

O pior era saber que isso impactava diretamente o trabalho dos profissionais de saúde e comerciantes que dependiam dessas informações. Quando você atende médicos que precisam de dados técnicos urgentes, cada minuto de espera é crítico.

## A Jornada para a Solução

Comecei analisando o código legado e logo entendi o problema: tudo rodava sequencialmente, fazendo chamadas síncronas para ERPs lentos, sem cache, sem otimização, sem nada. Era basicamente uma receita para o desastre.

Decidi reconstruir a solução do zero, mas de forma inteligente. A ideia era simples: **automatizar tudo o que era manual, paralelizar o que podia ser paralelo, e cachear o que não mudava com frequência**.

### Construindo a Base: Multi-threading e Cache

O primeiro passo foi implementar processamento paralelo. Ao invés de processar um ERP por vez, por que não processar todos simultaneamente?
Parece simples, mas essa mudança sozinha já reduziu o tempo em 60%. O resto veio de otimizações mais refinadas.

### Automatização com Cron Jobs

Manual era coisa do passado. Configurei cron jobs para rodar a sincronização automaticamente a cada hora, com retry logic e alertas caso algo desse errado. Assim, o sistema se autocurava e ninguém mais precisava ficar babando ele.

### Sistema de Busca Heurística

Para encontrar dados específicos entre milhares de bulas, implementei algoritmos de busca heurística. Ao invés de varrer tudo linearmente, o sistema agora "pula" diretamente para onde o dado provavelmente está. Ganho de performance: imenso.

## A Stack Técnica

Cada tecnologia foi escolhida por uma razão específica:

- **Python 3.x** - Pela facilidade de trabalhar com APIs e processamento de dados
- **ThreadPoolExecutor** - Para paralelização sem complicação
- **Redis** - Cache in-memory ultra-rápido
- **Cron** - Agendamento confiável e battle-tested
- **REST APIs** - Comunicação padronizada com os ERPs
- **SQL otimizado** - Queries enxutas com índices nos lugares certos

## Os Números que Importam

Depois de semanas de desenvolvimento e testes intensivos, coloquei em produção. Os resultados superaram até minhas expectativas:

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| Tempo de sincronização | ~20 minutos | <2 minutos | **90% mais rápido** |
| Disponibilidade do sistema | 71% | 99.9% | **40% de aumento** |
| Processos manuais | Tudo | Nada | **Automação completa** |
| Acoplamento com legado | Alto | Zero | **Débito eliminado** |

Mas números são só números. O que realmente importou foi ver a diferença no dia a dia:

- Atendentes do SAC conseguindo responder médicos e comerciantes instantaneamente
- Zero chamados de "sistema lento" ou "sistema fora do ar"
- Equipe de TI livre para trabalhar em coisas mais importantes
- Dados sempre consistentes e atualizados
- Arquitetura pronta para escalar quando necessário

## Obstáculos no Caminho

Nem tudo foi um mar de rosas. Enfrentei desafios reais que exigiram criatividade:

**APIs inconsistentes** - Cada ERP tinha sua própria forma de retornar dados. Solução: criar uma camada de abstração que normalizava tudo antes de processar.

**Volume de dados** - Milhares de bulas significavam muito processamento. Solução: processamento em lotes otimizados e cache estratégico.

**Confiabilidade** - Um erro em qualquer parte travava tudo. Solução: retry logic com exponential backoff e circuit breakers.

**Monitoramento** - Como saber se algo quebrou? Solução: logging detalhado e alertas no Slack para qualquer anomalia.

## Lições que Levei

Esse projeto me ensinou várias lições valiosas sobre otimização e arquitetura:

**Paralelização muda o jogo** - A diferença entre sequencial e paralelo é absurda. Use threads ou async quando possível.

**Cache é seu melhor amigo** - Se não muda a cada segundo, cacheia. A performance ganha é desproporcional ao esforço.

**Automação > Processos manuais** - Sempre. Sem exceções. Cron jobs bem configurados são mais confiáveis que qualquer humano.

**Observabilidade é crítica** - Você não pode consertar o que não pode ver. Logs, métricas e alertas não são opcionais.

**Desacoplamento facilita manutenção** - Remover dependências de sistemas legados foi a melhor decisão arquitetural do projeto.

## Como Ficou a Arquitetura

A solução final é elegantemente simples:

```
┌─────────────────┐
│   Cron Job      │  ← Executa a cada hora
│   (Scheduler)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Sync Service   │◄──── Redis Cache (dados quentes)
│    (Python)     │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│ ERP 1 │ │ ERP 2 │  ← Consultas paralelas
└───────┘ └───────┘
```

Simples, eficiente, escalável.

## O Impacto Real

No fim das contas, tecnologia existe para resolver problemas de pessoas. Este projeto:

- Economizou centenas de horas de trabalho manual todo mês
- Melhorou significativamente a qualidade do atendimento no SAC farmacêutico
- Permitiu que médicos e comerciantes obtivessem informações técnicas precisas instantaneamente
- Deu confiabilidade para um sistema crítico
- Eliminou um passivo técnico que assombrava o time
- Criou uma base sólida para crescimento futuro

Começamos com um sistema que travava e frustrava atendentes, médicos e comerciantes. Terminamos com uma solução que simplesmente funciona, silenciosamente, 24/7, sem precisar de babá.

## Pensamentos Finais

Esse projeto me mostrou que as melhores otimizações não vêm de tecnologias mirabolantes, mas de entender profundamente o problema e aplicar os fundamentos corretamente: paralelização, cache, automação e observabilidade.

Se você está lidando com sistemas lentos ou processos manuais tediosos, talvez a solução esteja mais próxima do que imagina. Às vezes é só uma questão de dar um passo atrás e repensar a abordagem.

---

**Quer trocar ideias sobre otimização de sistemas ou arquitetura?** [Entre em contato](/#contato) - adoro discutir esses desafios!

**Tecnologias relacionadas que trabalho:** Python, Node.js/NestJS, AWS, Microsserviços, Arquitetura Distribuída, Performance Engineering
