# Maqueta 3D del Auditorio Telmex

Anteproyecto para construir una maqueta grande, desmontable y documentada del Auditorio Telmex, ubicado en Zapopan, Jalisco, México. El proyecto combina fabricación manual, modelado 3D en Blender y un procedimiento de fabricación escolar documentado.

> **Estado:** anteproyecto conceptual. Las medidas geométricas que no aparecen en fuentes públicas deberán validarse con planos, fotografías ortogonales, levantamiento propio o información autorizada antes de fabricar piezas definitivas.

## Objetivos

- Representar la volumetría exterior, accesos, plaza inmediata y una sección interior simplificada.
- Mantener una escala física razonable para una maqueta grande y transportable.
- Diseñar piezas desmontables para poder cambiar fachadas, acabados, iluminación y configuraciones interiores.
- Usar IA local como asistente para generar variantes, scripts de Blender, listas de materiales y documentación, sin depender obligatoriamente de servicios en la nube.

## Propuesta inicial de escala

Se propone trabajar a **escala 1:200** para el edificio y una porción del entorno inmediato. Con esta escala, el escenario de referencia de 33 × 24 m se representa aproximadamente como 16.5 × 12 cm, y la distancia máxima publicada de 64 m al escenario equivale a 32 cm. La maqueta completa no intentará representar los 50,000 m² de terreno a escala estricta; se concentrará en el edificio, accesos, plaza, estacionamiento parcial y elementos urbanos relevantes.

## Estructura

- [`docs/anteproyecto.md`](docs/anteproyecto.md): concepto, alcance, escala, fases y criterios de diseño.
- [`docs/materiales-y-construccion.md`](docs/materiales-y-construccion.md): materiales, herramientas, presupuesto preliminar y orden de fabricación.
- [`docs/ia-local-y-modelado.md`](docs/ia-local-y-modelado.md): flujo Blender + Ollama + herramientas locales de generación 3D.
- [`docs/datos-y-referencias.md`](docs/datos-y-referencias.md): datos públicos, supuestos y pendientes de medición.
- [`blender/README.md`](blender/README.md): organización prevista del archivo `.blend` y scripts iniciales.

## Cómo colaborar

1. Crear una rama para cada cambio importante: `modelo-base`, `fachada`, `interior`, `iluminacion` o `documentacion`.
2. Guardar los archivos Blender grandes mediante Git LFS cuando el proyecto empiece a crecer.
3. No subir fotografías, planos o logotipos con derechos restringidos sin confirmar permiso de uso.
4. Registrar en cada cambio qué medidas son verificadas y cuáles son aproximadas.

## Licencia sugerida

Para el código, scripts y documentación original del proyecto puede usarse MIT o CC BY 4.0. Las fotografías, planos, marcas y materiales de terceros conservan sus propias condiciones de uso.

## Aplicación visible en GitHub Pages

La compilación actual también está en la raíz de `main` para que GitHub Pages pueda publicarla usando `main` + `/ (root)`. Al abrir la URL de Pages debe aparecer **Estudio Telmex 3D**, no solo esta documentación. El panel **Diseña con IA** intenta conectarse a Ollama en `localhost:11434`; la IA corre en la computadora local del usuario y no dentro de GitHub Pages.

## Enfoque escolar

La versión actual está pensada para una maqueta escolar. Los materiales predeterminados son cartón cascarón, cartón pluma, cartulina, acetato, papel batería, palitos de madera y pintura acrílica escolar. La base sugerida es de 80 × 60 cm. Las opciones de MDF, corte láser, impresión 3D y automatización quedan como mejoras futuras, no como requisitos.
