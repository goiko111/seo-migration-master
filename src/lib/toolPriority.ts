export const PRIORITY_TOOL_ROUTES = [
  "/herramientas/calculadora-tiempo-operativo",
  "/herramientas/diagnostico-rentabilidad-bodega",
  "/herramientas/calculadora-fuga-margen",
  "/herramientas/calculadora-mermas-vino",
  "/herramientas/planificador-pedido-semanal-vino",
  "/herramientas/calculadora-rentabilidad-menu-maridaje",
  "/herramientas/conciliador-stock-vino",
  "/herramientas/simulador-rotura-stock-vino",
  "/herramientas/simulador-impacto-integracion-tpv",
] as const;

const priorityByRoute = new Map<string, number>(
  PRIORITY_TOOL_ROUTES.map((route, index) => [route, index]),
);

export const prioritizeToolItems = <T extends { to: string }>(items: readonly T[]): T[] =>
  items
    .map((item, index) => ({ item, index }))
    .sort((left, right) => {
      const leftPriority = priorityByRoute.get(left.item.to) ?? PRIORITY_TOOL_ROUTES.length;
      const rightPriority = priorityByRoute.get(right.item.to) ?? PRIORITY_TOOL_ROUTES.length;

      return leftPriority - rightPriority || left.index - right.index;
    })
    .map(({ item }) => item);
