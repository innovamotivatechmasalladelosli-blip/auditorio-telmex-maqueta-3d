# IA local: segunda etapa

La IA no será el punto de partida del modelo. Primero se validará la geometría, la escala y el despiece. Después se añadirá una capa local que pueda seguir instrucciones y proponer cambios sin sustituir la revisión del usuario.

## Flujo propuesto

1. **Ollama, LM Studio o llama.cpp:** ejecutan modelos locales de lenguaje.
2. **Asistente de Blender:** interpreta instrucciones en español y genera cambios o scripts Python.
3. **Blender Open MCP:** proyecto de referencia que conecta un servidor MCP, un complemento de Blender y proveedores locales como Ollama, LM Studio o llama.cpp. Documenta herramientas para obtener información de escena, crear/modificar objetos, aplicar materiales, renderizar y ejecutar código revisable. [1]
4. **Modelo de visión o imagen a 3D opcional:** se usará solo para piezas auxiliares, no para decidir la forma arquitectónica principal.
5. **Registro de variantes:** cada cambio se guarda como una escena o archivo JSON con nombre, fecha, prompt y materiales afectados.

## Instrucciones objetivo

- “Cambia el concreto a gris más claro y conserva las nervaduras.”
- “Genera una cubierta desmontable en cuatro paneles.”
- “Cambia de configuración de concierto a teatro y mueve el escenario.”
- “Prepara un despiece para foamboard de 5 mm a escala 1:200.”
- “Dime qué piezas son estimadas y cuáles tienen una medida verificada.”

## Controles obligatorios

La IA debe mostrar una vista previa del cambio y pedir confirmación local antes de borrar objetos, aplicar booleanos, cambiar escala global o sobrescribir archivos. La maqueta web puede recibir una instrucción, pero la modificación real y reproducible debe ocurrir en un archivo Blender versionado.

## Hardware y expectativas

La elección del modelo dependerá de la RAM y VRAM del equipo. Un modelo pequeño de código puede generar scripts; un modelo con visión puede revisar capturas; los modelos de imagen a 3D suelen requerir GPU y limpieza manual. El proyecto debe funcionar sin nube, pero no todos los modelos tendrán la misma calidad ni velocidad.

## Referencia

[1]: https://github.com/dhakalnirajan/blender-open-mcp "Blender Open MCP — Local-first MCP server for Blender"
