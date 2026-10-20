# forania — prototipo navegable (KindTECH 2026, Ficha 4)

Prototipo interactivo de **Foráneos/forania**, hecho en HTML, CSS y JavaScript puro (sin frameworks, sin paso de build). Pensado para abrir en VS Code y publicar en GitHub Pages en minutos.

## Archivos

```
forania-prototype/
├── index.html   → las 6 pantallas del flujo
├── styles.css   → estilos, paleta y animaciones
├── script.js    → navegación, formulario y lógica de "IA" simulada
├── ImagenFO1.png → imagen de la pantalla 1 (ponla en esta misma carpeta; si es .jpg/.webp también la detecta)
└── README.md    → este archivo
```

No hay backend ni IA real conectada: todo el "emparejamiento" usa datos ficticios guardados en `script.js` (array `MATCHES`), tal como pide la Ficha 4 ("no se exige backend funcional, sí coherencia").

## Cómo verlo en tu computadora

1. Abre la carpeta `forania-prototype` en VS Code.
2. Instala la extensión **Live Server** (o similar) si no la tienes.
3. Clic derecho sobre `index.html` → **"Open with Live Server"**.
   - Alternativa sin extensión: abre `index.html` directamente con doble clic (funciona igual, solo que sin autorecarga al editar).

## Cómo publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub (público).
2. Sube estos 3 archivos (`index.html`, `styles.css`, `script.js`) a la raíz del repositorio.
   - Desde VS Code: usa la pestaña de Source Control para hacer commit y push, o arrastra los archivos desde la web de GitHub ("Add file" → "Upload files").
3. Entra a **Settings → Pages** del repositorio.
4. En "Branch", selecciona `main` (o `master`) y la carpeta `/ (root)`. Guarda.
5. Espera 1–2 minutos; GitHub te dará un link tipo:
   `https://tu-usuario.github.io/nombre-del-repo/`
6. Ese es el link que puedes pegar en la Ficha 4 como "Enlace al prototipo navegable".

## Qué pantallas incluye (coinciden con tu export de Figma)

1. **Inicio** — propuesta de valor.
2. **Perfil** — formulario completo (nombre, región, carrera, universidad, correo institucional con "verificación" simulada, horarios, zona, presupuesto, tipo de apoyo, preferencia de fin de semana).
3. **Objetivo** — elegir "compañía esta semana" o "círculo de confianza".
4. **Procesando** — animación de "buscando" (anillo + semilla creciendo), con los datos reales que la persona acaba de ingresar.
5. **Resultado** — sugerencia de padrino/madrina, plan de bajo costo y un cuadro vacío donde la persona escribe su propio mensaje (no se puede continuar sin escribirlo). Botón "Prefiero otra sugerencia" alterna entre 2 ejemplos distintos.
6. **Confirmar y enviar** — revisión final del mensaje y botón "Enviar mensaje", que simula el envío (nada se envía de verdad) y muestra una confirmación, con opción de reiniciar la demo.

## Lo que pueden personalizar fácilmente

- **Textos y copys:** directamente en `index.html`.
- **Colores:** variables al inicio de `styles.css` (`:root { --cream, --green-deep, --amber, ... }`).
- **Los perfiles de ejemplo (Camila/Jorge):** array `MATCHES` al inicio de `script.js`. Pueden agregar más opciones o cambiar nombres, universidades, planes y precios.
- **Tiempo de la animación de "procesando":** constante `3200` (en milisegundos) dentro de `runProcessingScreen()` en `script.js`.

## Nota ética (para la Ficha 4)

Todo lo que aparece es ficticio y está rotulado como tal ("perfil de ejemplo", "datos ficticios de muestra", "vista de ejemplo: no se realiza ningún envío real"). El botón "Enviar mensaje" nunca contacta a nadie real: solo simula localmente, en el navegador de quien prueba el prototipo, para que el jurado o un usuario de prueba pueda vivir el flujo completo sin que se genere ningún mensaje real.
