# Organización del archivo Blender

Usar un archivo maestro `auditorio_telmex_1-200.blend` y mantener estas colecciones:

- `00_REFERENCIAS`
- `01_BASE_ENTORNO`
- `02_VOLUMEN_EXTERIOR`
- `03_SALA_ESCENARIO`
- `04_FACHADAS_INTERCAMBIABLES`
- `05_ILUMINACION`
- `06_PIEZAS_FABRICACION`
- `99_TEMPORAL`

Escenas sugeridas:

- `BLOQUEO`: masas sin detalle.
- `EXTERIOR`: presentación exterior.
- `INTERIOR`: techo oculto o transparente.
- `CONCIERTO`: configuración con escenario adelantado.
- `FABRICACION`: piezas separadas, nombres y tolerancias.

Los scripts generados por IA deben guardarse en `blender/scripts/`, revisarse manualmente y ejecutarse sobre una copia del archivo. Los archivos `.stl`, `.obj`, `.glb` y `.blend` grandes deberán migrarse a Git LFS cuando se incorporen.
