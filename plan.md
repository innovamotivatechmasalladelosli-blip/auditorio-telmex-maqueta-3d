# Plan de Estudio Telmex 3D

## Producto

Una aplicación web local dentro del repositorio que permita explorar una maqueta 3D conceptual del Auditorio Telmex y modificar materiales, capas de visualización y configuración del escenario sin instalar un programa de modelado completo.

## Decisiones de implementación

- Three.js + TypeScript + Vite para una vista 3D ligera y portable.
- Geometría paramétrica inicial para evitar depender de un modelo de terceros.
- Interfaz de diseñador con paneles laterales, vista central, selección por clic y controles de visibilidad.
- Próxima integración: Ollama local para generar instrucciones o scripts revisables; exportación GLB/STL y sincronización con Blender después de validar la experiencia base.

## Diseño

**Estilos considerados:** laboratorio arquitectónico oscuro (0.55), tablero de ingeniería editorial (0.27), galería blanca de maqueta (0.18). Se elige laboratorio arquitectónico oscuro.

La estética usa superficies grafito, líneas finas, naranja arcilla como color de acento y azul verdoso para datos editables. El layout coloca la vista 3D al centro y dos paneles de trabajo a los lados, como una mesa de revisión técnica. Las interacciones son directas: seleccionar, cambiar, ocultar y probar. Las animaciones deben ser discretas y funcionales, con transiciones cortas para estados activos.

**Esencia:** un pequeño laboratorio local para tomar decisiones de maqueta antes de cortar materiales. Personalidad: preciso, experimental y tangible.

## Estructura

- `app/src/main.ts`: escena 3D, geometría paramétrica e interacciones.
- `app/src/styles.css`: sistema visual responsivo.
- `app/public/manus-routes.json`: manifest de ruta.
- `docs/`: investigación, materiales, escala e IA local.
