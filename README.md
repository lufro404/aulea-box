
# Aulea Box – Tecnología para mejorar la educación

**Proyecto individual – ODS 4: Educación de calidad**

## 1. Descripción del proyecto

Aulea Box es un proyecto tecnológico que busca mejorar el acceso a la educación mediante un dispositivo pensado para utilizarse en las aulas.

La idea es facilitar el aprendizaje utilizando la tecnología y ayudar a los centros educativos que tienen dificultades de conexión a Internet o menos recursos.

## 2. Objetivo de Desarrollo Sostenible

**ODS 4 – Educación de calidad**

Este objetivo busca que todas las personas puedan acceder a una educación de calidad, independientemente de dónde vivan o de los recursos económicos que tengan.

Nuestro proyecto intenta ayudar a reducir estas diferencias mediante la tecnología.

## 3. Nuestro producto: Aulea Box

Aulea Box es un dispositivo basado en una Raspberry Pi que crea su propia red Wi-Fi local. De esta forma, los alumnos pueden acceder a clases, ejercicios y vídeos desde sus dispositivos sin necesidad de conexión a Internet.

Disponemos de tres versiones:

- **Mini:** modelo básico y económico.
- **Plus:** modelo intermedio que incluye batería.
- **Pro:** modelo más completo, con pantalla y antenas.

Cada versión está pensada para adaptarse a diferentes necesidades y presupuestos.

## 4. Análisis de datos

Para estudiar el problema de la falta de acceso a la educación, hemos utilizado Python y la biblioteca Pandas.

Con Pandas hemos trabajado con los datos para obtener información como:

- La media de los datos.
- El valor máximo y mínimo.
- La ordenación de los datos de menor a mayor.
- Los cambios en el número de personas sin escolarizar.
- La evolución del problema a lo largo del tiempo.
- La distribución regional de los jóvenes sin escolarizar en edad de secundaria alta.

También hemos creado gráficos con Matplotlib para representar los resultados de forma visual.

Los datos muestran la evolución desde el año 2000 hasta 2024. Las cifras históricas son aproximadas y están redondeadas. La cifra de 2000 se estima sumando los 127 millones de descenso indicados por la UNESCO a los 264 millones de 2015.

El porcentaje regional del 74 % corresponde únicamente a los jóvenes sin escolarizar en edad de secundaria alta de África subsahariana y Asia central y meridional. No representa el porcentaje del total de 273 millones.

## 5. Tecnologías utilizadas

Para desarrollar el proyecto hemos utilizado las siguientes tecnologías:

- **HTML5:** para crear la estructura de la página web.
- **CSS3:** para diseñar la web y darle formato.
- **JavaScript:** para añadir funciones interactivas.
- **Python:** para programar el análisis de datos.
- **Pandas:** para organizar, ordenar y analizar los datos.
- **Matplotlib:** para crear los gráficos.
- **GitHub:** para guardar el código y publicar la página web.

## 6. Estructura del proyecto

```text
Aulea-Box/
│
├── index.html
├── style.css
├── script.js
├── analisis_ods4.py
│
├── datos_ods4.csv
├── datos_evolucion.csv
│
├── resultados.txt
├── grafica_ods4.jpg
├── grafica_evolucion_ods4.jpg
│
└── README.md
```

## 7. Página web

Hemos creado una página web para presentar nuestra empresa y dar a conocer Aulea Box.

La web incluye:

- Información sobre el ODS 4.
- Un vídeo educativo sobre la importancia de la educación.
- Dibujos e ilustraciones creados en SVG.
- Un aula interactiva con elementos que se pueden pulsar.
- Un catálogo con los tres modelos del producto.
- Una calculadora para recomendar un modelo según el número de alumnos.
- Un apartado con los datos y sus gráficos.
- Información sobre la empresa y sus productos.
- Un formulario de contacto de demostración.

La página está publicada mediante GitHub Pages:

https://lufro404.github.io/aulea-box/

## 8. Fuentes de información

Los datos utilizados en el proyecto proceden de la UNESCO:

- [UNESCO – Out-of-school rate](https://www.unesco.org/en/education/view/outofschool)
- [UNESCO – Global Education Monitoring Report](https://www.unesco.org/gem-report/)

Las cifras pueden estar redondeadas y se utilizan con fines educativos y de análisis.

## 9. Conclusión

Con este proyecto queremos demostrar que la tecnología puede ayudar a mejorar la educación y facilitar que más personas tengan acceso a ella.

Gracias al análisis de datos hemos podido conocer mejor el problema y entender por qué es importante buscar soluciones.

Aulea Box es nuestra propuesta para utilizar la tecnología como una herramienta que facilite el aprendizaje y ayude a conseguir una educación de calidad para todos.
