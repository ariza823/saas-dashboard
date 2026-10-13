# Panel de casos · Dashboard SaaS

Dashboard de gestión de casos legales hecho con React + TypeScript. Usa datos ficticios generados en el cliente.

**Demo:** https://ariza823.github.io/saas-dashboard/

## Qué tiene

- KPIs que se recalculan según los filtros activos
- Gráfico de casos por área (Recharts)
- Tabla con búsqueda (con debounce), filtros por estado y área, orden por columna y paginación
- Modo oscuro que respeta la preferencia del sistema y se guarda en `localStorage`
- Tests de la lógica de estado con Vitest

## Stack

React 19 · TypeScript · Redux Toolkit · Recharts · Tailwind CSS v4 · Vite · Vitest

## Decisiones

- El estado vive en Redux Toolkit y todo lo derivado (lista filtrada, página actual, KPIs, datos del gráfico) sale de selectores memorizados con `createSelector`. Así no se guarda información duplicada y los componentes solo re-renderizan cuando su dato cambia.
- La búsqueda usa estado local con debounce de 300 ms y solo despacha a Redux cuando el usuario deja de escribir.
- Los encabezados ordenables exponen `aria-sort` para lectores de pantalla.

## Correr local

```bash
npm install
npm run dev     # http://localhost:5173/saas-dashboard/
npm test
npm run build
```

## Estructura

```
src/
├── app/            # store y hooks tipados
├── components/     # UI: KPIs, filtros, gráfico, tabla, toggle de tema
└── features/
    ├── cases/      # slice, selectores, tipos, datos mock y tests
    └── theme/      # slice del tema
```
