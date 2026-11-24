# IA local y modelado 3D

## Flujo recomendado

La propuesta inicial es combinar **Blender** para el modelo principal, **Ollama** para un asistente de lenguaje local y una herramienta local de imagen a 3D como **Modly** para experimentar con referencias visuales. Blender es software libre y de código abierto para creación 3D. [3] Ollama permite ejecutar modelos abiertos localmente y anuncia que los prompts no se almacenan ni se usan para entrenamiento en su servicio local. [4] Modly se presenta como una aplicación de escritorio de código abierto que genera mallas 3D desde imágenes o prompts usando modelos locales en la GPU. [5]

El modelo arquitectónico base no debe depender de una generación automática. Para un edificio real, conviene construir primero volúmenes y proporciones manualmente en Blender, y usar IA para tareas repetitivas: crear scripts Python, proponer variantes de materiales, nombrar piezas, revisar listas y convertir instrucciones en cambios controlados.

## Arquitectura técnica

1. **Blender:** archivo maestro, geometría, materiales, cámaras, escenas y exportación STL/OBJ/GLB.
2. **Ollama:** asistente local para interpretar instrucciones y generar código Python revisable.
3. **Blender Python API:** ejecuta cambios solo después de guardarlos en una rama o copia del archivo.
4. **Modly o herramienta equivalente:** pruebas de imagen a malla para elementos auxiliares, nunca como fuente única de la volumetría arquitectónica.
5. **Git + Git LFS:** versiones del código, documentación y archivos 3D grandes.

## Ejemplos de instrucciones

- “Cambia la fachada exterior a concreto claro y conserva las ventanas.”
- “Genera una variante de techo desmontable en cuatro paneles.”
- “Mueve la plataforma del escenario 4 mm hacia el público en la escena de concierto.”
- “Prepara una lista de piezas para imprimir en PLA y otra para cortar en foamboard.”
- “Comprueba que todas las piezas tengan un nombre y que ninguna esté fuera de la base.”

## Reglas de seguridad del flujo

- La IA no debe afirmar que una medida es oficial si no tiene una fuente.
- Todo script generado se ejecuta primero sobre una copia del `.blend`.
- Las operaciones destructivas, como aplicar booleanos o borrar objetos, requieren revisión manual.
- Se conservan escenas separadas: `bloqueo`, `fachada`, `interior`, `concierto` y `maqueta-fabricacion`.
- Se documenta el hardware utilizado, el modelo local y la versión de los programas para poder reproducir el resultado.

## Instalación conceptual

### Blender y Ollama

1. Instalar Blender desde su sitio oficial.
2. Instalar Ollama para el sistema operativo disponible.
3. Descargar un modelo local que pueda seguir instrucciones y escribir Python; elegirlo según la memoria RAM/VRAM del equipo.
4. Crear un pequeño servicio o complemento que envíe instrucciones a Ollama y muestre el script antes de ejecutarlo en Blender.
5. Probar primero con acciones no destructivas: crear una colección, añadir un cubo, cambiar un material y guardar una copia.

### Modly

El proyecto consultado documenta instalación mediante repositorio, dependencias de Node y un backend Python. También indica soporte para Windows, Linux y macOS Apple Silicon, con notas específicas para GPU AMD/ROCm. [5] Hay que revisar la versión actual, los pesos del modelo y los requisitos de la computadora antes de instalar.

## Qué sí y qué no esperar de la IA

La IA local puede acelerar variantes, scripts, etiquetado y generación de piezas auxiliares. No sustituye la comprobación de escala, la lectura de fotografías ni la decisión de cómo fabricar una unión resistente. Las mallas generadas desde una sola fotografía suelen necesitar limpieza, reducción de polígonos, corrección de escala y rediseño de superficies planas antes de convertirse en piezas para maqueta.
