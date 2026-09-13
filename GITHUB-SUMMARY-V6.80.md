# GitHub Summary — V6.80

## Objetivo da rodada
Encurtar a Home da Merlin sem empobrecer a experiência. A página passa a funcionar como uma curadoria premium: mostra o suficiente para orientar a cliente e leva mais rápido ao catálogo, ao briefing e ao orçamento.

## Melhorias aplicadas
- Removida a faixa decorativa animada de diferenciais logo após a hero; ela repetia conceitos já presentes na própria página.
- A amostra de inspirações da Home foi reduzida de 6 para 4 modelos.
- A amostra de coleções foi reduzida de 6 para 4 categorias.
- A consulta de produtos em destaque foi alinhada ao que realmente é exibido: 4 itens.
- Inspirações e coleções passam a caber em uma única faixa no desktop amplo.
- Espaçamentos verticais entre as principais seções foram reduzidos sem comprimir a leitura.
- No celular, inspirações, coleções, produtos, depoimentos e diferenciais do ateliê passam a usar trilhos horizontais com scroll-snap em vez de pilhas verticais longas.
- Os trilhos preservam toque, rolagem natural, scrollbar discreta e `prefers-reduced-motion`.
- Briefing e CTA final receberam compactação leve no mobile, permanecendo totalmente visíveis e acessíveis.

## Resultado esperado
Menos rolagem até as ações importantes, Home mais objetiva e sensação de curadoria de marca em vez de catálogo infinito. A cliente ainda consegue conhecer inspirações, coleções, produtos, processo e prova social, mas sem precisar atravessar várias telas repetitivas.

## Escopo técnico
A V6.80 altera somente composição e apresentação da Home. Não modifica Neon, schema, migrations, APIs, inquiries, CRM, autenticação, MFA, Cloudflare R2, backups, restauração ou regras de persistência.

## Arquivos centrais
- `app/page.tsx`
- `app/home-v680.css`
