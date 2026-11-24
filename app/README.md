# Estudio Telmex 3D

Aplicación local de prototipado para explorar la maqueta del Auditorio Telmex directamente en el navegador. Esta primera versión genera una volumetría conceptual con Three.js y permite:

- orbitar, acercar y seleccionar piezas;
- cambiar materiales de piezas editables;
- alternar techo desmontable, interior y entorno;
- probar tres configuraciones de escenario;
- preparar el punto de integración futura con Ollama y Blender.

## Ejecutar localmente

```bash
cd app
npm install
npm run dev
```

Después abre la dirección local que muestre Vite. Para generar una compilación de producción:

```bash
npm run build
```

La geometría es conceptual y no sustituye planos oficiales. Las dimensiones de referencia se documentan en `../docs/datos-y-referencias.md`.
