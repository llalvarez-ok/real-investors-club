# Shorts de los vivos

1. Lean sube el MP4 del vivo a Drive (RIC/referencias o RIC/videos, link público); se baja con
   `curl -L "https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t"`.
2. Subtítulos del vivo con la API de captions (o Supadata) para elegir tramos; tiempos exactos por palabra con
   faster-whisper (medium) sobre ventanas del vivo.
3. Una pieza JSON por Short (`tramos`, `palabras` con correcciones, `gancho`, `fecha`, `insertos` opcionales) y
   `python herramientas/vivo_shorts.py <pieza.json> <vivo.mp4> <trabajo> <salida.mp4>`.
Diseño: gancho arriba (palabra clave en oro), cámara de Lean agrandada con borde dorado, el gráfico sin la fila del título
(ahí aparece el nombre del bróker), subtítulos palabra por palabra y los 380 px de abajo libres; cierre «Real Investors Club ·
Suscribite». Evitar tramos donde se nombran brókers. Solo mostrar operaciones con resultado comprobado con datos reales.
