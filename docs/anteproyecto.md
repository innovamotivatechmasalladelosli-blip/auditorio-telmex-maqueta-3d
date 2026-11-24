# Anteproyecto de la maqueta

## Idea general

La maqueta será una representación arquitectónica de estudio, no una copia certificada para construcción. La prioridad será comunicar la forma general del Auditorio Telmex, sus accesos, la relación entre sala y escenario y la capacidad de cambiar configuraciones sin destruir el modelo.

El diseño físico se dividirá en cuatro módulos:

1. **Base y entorno inmediato:** plataforma rígida, plaza, vialidad de acceso, estacionamiento parcial y señalización.
2. **Volumen exterior:** envolvente principal, cubierta, accesos, circulaciones visibles y elementos de fachada.
3. **Sala y escenario:** techo desmontable o transparente, gradas, escenario y plataformas representadas con piezas móviles o intercambiables.
4. **Sistemas:** iluminación LED, cableado oculto y, opcionalmente, pequeños servomotores para demostrar el movimiento de plataformas.

## Referencias verificadas

La página histórica oficial del recinto indica que fue inaugurado el 1 de septiembre de 2007 y diseñado por José de Arimatea Moyao. También reporta 31,000 m² de construcción, 50,000 m² de terreno, estacionamiento para 3,500 autos, un escenario de 33 × 24 m, tres plataformas mecánicas y una distancia máxima de 64 m al escenario. [1]

La página oficial del recorrido virtual publica los mismos datos generales, pero muestra un aforo de 2,658 a 8,712 personas, mientras que la página histórica muestra 2,658 a 9,163. Esa diferencia debe conservarse como una advertencia de verificación y no resolverse inventando un número. [1] [2]

## Escala y tamaño recomendado

La primera versión se propone a **1:200**. Las conversiones de referencia son:

- 33 m de frente de escenario → 16.5 cm.
- 24 m de fondo de escenario → 12 cm.
- 64 m hasta el espectador más lejano → 32 cm.
- 380 m² de escenario adelantado → aproximadamente 95 cm² de superficie a escala 1:200 (porque las áreas se reducen por 200²); para piezas simples conviene usar la geometría real de la plataforma y no una reducción por área aislada.

Para una maqueta grande, se recomienda una base aproximada de 120 × 90 cm, dividida en cuatro paneles de 60 × 45 cm. Esta base permite moverla, almacenarla y reparar cada módulo. La forma exacta del edificio deberá trazarse a partir de fotografías frontales, laterales y vistas aéreas, porque las fuentes públicas consultadas no proporcionan un plano arquitectónico completo.

## Diseño para cambios

El edificio se diseñará como un sistema de capas:

- Base estructural en MDF o triplay.
- Volúmenes principales en foamboard, cartón pluma o impresión 3D.
- Fachadas intercambiables sujetas con imanes de neodimio o encajes.
- Techo desmontable con acrílico transparente para observar el interior.
- Escenario y gradas en piezas independientes.
- Canaletas inferiores para LED y conectores.

Así, una instrucción como “cambia el acabado de la fachada”, “abre el techo” o “muestra el escenario adelantado” puede convertirse en una variante física sin rehacer toda la maqueta.

## Fases de trabajo

### Fase 1: investigación y levantamiento visual

Reunir fotografías propias o autorizadas, capturas de mapas, vistas del recorrido virtual y medidas de control. Marcar cada dato como `verificado`, `estimado` o `pendiente`.

### Fase 2: bloque volumétrico

Modelar en Blender únicamente terreno parcial, volumen exterior, sala y escenario. No añadir detalles hasta comprobar que la proporción general funciona a escala.

### Fase 3: despiece para fabricación

Separar el modelo en piezas imprimibles, cortables o ensamblables. Añadir tolerancias de corte y numeración de piezas.

### Fase 4: prototipo de prueba

Fabricar un fragmento de fachada y una sección de gradas a escala. Revisar rigidez, visibilidad, tamaño de pasillos y facilidad de montaje.

### Fase 5: fabricación final

Cortar base y volúmenes, imprimir piezas pequeñas, montar fachadas y preparar la iluminación. El modelo debe probarse por módulos antes de pegarlo definitivamente.

### Fase 6: presentación

Preparar una lámina con escala, norte, leyenda de materiales, diagrama de módulos y una comparación entre las configuraciones de sala.

## Criterios de éxito

- La maqueta se puede transportar por módulos.
- El techo puede retirarse sin dañar la sala.
- Se entiende la relación entre acceso, sala, escenario y plaza.
- Los materiales están etiquetados y se puede repetir la fabricación.
- Cada medida crítica tiene fuente o está identificada como estimación.
