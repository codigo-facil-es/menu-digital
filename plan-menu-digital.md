# Carta digital para bar de tapas con QR

Plan para crear una carta digital accesible mediante QR en cada mesa, con un panel de administración sencillo que permita al propietario actualizar precios y marcar platos como agotados, usando React, Supabase y Vercel, y guiado por Claude Code.

## Problema
Los clientes de bares de tapas no pueden consultar la carta actualizada al instante y el propietario necesita cambiar precios o indicar platos agotados sin conocimientos técnicos, lo que genera confusión y pérdida de ventas.

## Para quién
Clientes del bar que usan su móvil para consultar la carta y el dueño del bar sin conocimientos de programación que necesita gestionar precios y disponibilidad.

## Propuesta de valor
Los clientes acceden a la carta en tiempo real desde su móvil mediante un QR; el dueño actualiza precios y disponibilidad con un panel web simple, sin tocar código ni infraestructura.

## MVP
**Imprescindible**
- Página web responsive que muestra la carta de tapas.
- URL única accesible mediante QR que carga la carta.
- Panel de administración protegido para editar precios y estado de cada plato.
- Base de datos que almacena platos y su disponibilidad.

**Para después**
- Sistema de reservas de mesas.
- Valoraciones y comentarios de los clientes.
- Integración de pagos para pedidos en mesa.
- Soporte multilingüe.

## Stack recomendado
- **Interfaz:** React con Vite — Permite crear una SPA rápida y responsive con poca configuración.
- **Backend / API:** Supabase Edge Functions — Ofrece API sin servidor que se integra directamente con la base de datos y la autenticación.
- **Datos:** Supabase PostgreSQL — Base de datos relacional gestionada, con sincronización en tiempo real para la carta.
- **Autenticación:** Supabase Auth (email + password) — Gestión sencilla de usuarios y control de acceso al panel de admin.
- **Despliegue:** Vercel — Despliegue continuo de la app estática y funciones serverless, con HTTPS automático.

## Modelo de datos
- **Plato:** id (uuid), nombre (string), descripcion (string), precio (numeric), disponible (boolean), imagenUrl (string), categoria (string)
- **Usuario:** id (uuid), email (string), rol (string, ej. 'owner')

## Plan paso a paso
### 1. Crear proyecto React con Vite
**Objetivo:** Tener la base del frontend lista y ejecutable.

**Prompt para el agente:**
```
Claude, crea un nuevo proyecto usando Vite con plantilla React. Incluye los scripts de desarrollo y build. Explica cada archivo creado y cómo iniciar el servidor local.
```

**Cómo comprobarlo:** Ejecuta `npm run dev`; abre http://localhost:5173 y verifica que aparece la página "Vite + React" sin errores en la consola.

### 2. Configurar Supabase y crear tabla 'platos'
**Objetivo:** Tener la base de datos y la tabla mínima para almacenar la carta.

**Prompt para el agente:**
```
Claude, crea una cuenta gratuita en Supabase, genera un proyecto llamado 'carta-tapas', y dentro crea una tabla 'platos' con los campos id, nombre, descripcion, precio, disponible, imagenUrl y categoria. Proporciona la URL y la anon key. Explica cómo comprobar que la tabla existe en el dashboard.
```

**Cómo comprobarlo:** En el dashboard de Supabase, abre la tabla 'platos' y verifica que aparecen los campos indicados; inserta un registro de prueba y confirma que se guarda.

### 3. Conectar React con Supabase
**Objetivo:** Poder leer datos de la tabla 'platos' desde el frontend.

**Prompt para el agente:**
```
Claude, instala el cliente de Supabase en el proyecto (`npm i @supabase/supabase-js`). Crea un archivo `src/lib/supabase.js` que inicialice el cliente usando la URL y la anon key. Añade un hook `usePlatos` que devuelva la lista de platos en tiempo real. Explica cómo funciona la suscripción.
```

**Cómo comprobarlo:** En la consola del navegador, ejecuta `usePlatos()` desde la consola de React DevTools y verifica que devuelve un array con los platos (incluido el registro de prueba).

### 4. Diseñar página pública de la carta
**Objetivo:** Mostrar la lista de platos de forma atractiva y responsive.

**Prompt para el agente:**
```
Claude, crea un componente `Carta.jsx` que use `usePlatos` y renderice cada plato con nombre, descripción, precio y una imagen opcional. Usa CSS Grid o Flexbox para que sea responsive. Añade un mensaje "Plato agotado" cuando `disponible` sea false. Explica cómo probar la responsividad.
```

**Cómo comprobarlo:** Abre la app en el navegador, verifica que aparecen los platos y que el mensaje de agotado se muestra correctamente; redimensiona la ventana para comprobar que el layout se adapta.

### 5. Crear panel de administración protegido
**Objetivo:** Permitir al dueño iniciar sesión y editar precios y disponibilidad.

**Prompt para el agente:**
```
Claude, implementa autenticación con Supabase Auth: crea una página `/admin/login` con formulario de email/contraseña y un botón de registro rápido. Después de login, redirige a `/admin/panel` donde se liste la tabla 'platos' con campos editables (precio y disponible). Usa la API de Supabase para actualizar registros. Explica cómo probar el flujo de login y edición.
```

**Cómo comprobarlo:** Regístrate con un email de prueba, accede al panel, modifica el precio de un plato y verifica en el dashboard de Supabase que el registro se actualizó.

### 6. Generar URL estática y probar QR
**Objetivo:** Obtener una URL que pueda convertirse en QR y que cargue la carta.

**Prompt para el agente:**
```
Claude, indica cuál será la URL pública de la app una vez desplegada (por ejemplo `https://carta-tapas.vercel.app`). Proporciona un enlace a un generador de QR gratuito y muestra cómo crear el QR para esa URL. Explica cómo validar que el QR lleva a la carta.
```

**Cómo comprobarlo:** Escanea el QR con un móvil, abre la URL y confirma que se muestra la carta completa.

### 7. Desplegar en Vercel
**Objetivo:** Publicar la aplicación para que sea accesible desde cualquier dispositivo.

**Prompt para el agente:**
```
Claude, crea un repositorio Git en GitHub, sube el código, y conecta el proyecto a Vercel (usando la integración de Vercel con GitHub). Configura las variables de entorno (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). Explica cómo lanzar el despliegue y cómo obtener la URL final.
```

**Cómo comprobarlo:** Visita la URL que Vercel genera; la carta debe cargar sin errores y el panel de admin debe seguir funcionando.

## Seguridad
- Usar HTTPS (Vercel lo proporciona automáticamente).
- Proteger el panel de admin con Supabase Auth y verificar el rol 'owner' antes de permitir ediciones.
- Validar en el backend (Supabase) que los campos precio y disponible tengan tipos correctos antes de guardarlos.
- No exponer la `service_role` key en el cliente; solo la `anon` key está disponible en frontend.
- Limitar CORS a los dominios de la app mediante la configuración de Supabase.

## Riesgos
- El dueño puede olvidar su contraseña – habilitar recuperación vía email en Supabase.
- Dependencia de conexión a internet – indicar que la carta necesita conexión y ofrecer versión offline opcional en futuras iteraciones.
- Límites de uso gratuito de Supabase – monitorizar consumo y avisar al propietario antes de superar cuotas.
- El QR puede romperse si cambia el dominio – usar un subdominio permanente y redirigir si es necesario.
- Posible edición accidental de precios – añadir confirmación modal antes de guardar cambios.

## Valida con personas reales
1) Reclutar 3 clientes habituales del bar y 2 dueños de bares pequeños. 2) Mostrar el QR generado y pedirles que lo escaneen con su móvil para comprobar que la carta carga rápidamente y se ve bien. 3) Pedir a los dueños que prueben el flujo de login y edición de un plato, verificando que el cambio se refleja en la carta. 4) Recoger feedback sobre usabilidad y claridad del panel. 5) Ajustar UI o mensajes según los comentarios antes de lanzar la versión pública.

---

## CLAUDE.md

# CLAUDE.md

## Descripción del producto
Carta digital para bar de tapas accesible mediante QR. Panel de administración simple para que el propietario actualice precios y marque platos como agotados.

## Stack elegido
- **Interfaz:** React con Vite
- **Backend / API:** Supabase Edge Functions
- **Datos:** Supabase PostgreSQL
- **Autenticación:** Supabase Auth (email/password)
- **Despliegue:** Vercel

## Convenciones de código
- Usa ES6+ y JSX.
- Componentes en `src/components/`.
- Hooks en `src/hooks/`.
- Configuración de Supabase en `src/lib/supabase.js`.
- Variables de entorno con prefijo `VITE_`.

## Estructura de carpetas
```
src/
  components/
    Carta.jsx
    AdminPanel.jsx
    Login.jsx
  hooks/
    usePlatos.js
  lib/
    supabase.js
  pages/
    index.jsx
    admin/
      login.jsx
      panel.jsx
  assets/
    logo.png
```

## Comandos habituales
- `npm install` – instalar dependencias.
- `npm run dev` – lanzar servidor de desarrollo.
- `npm run build` – generar build para producción.
- `git push` – despliegue automático en Vercel.

## Reglas de seguridad
1. **HTTPS obligatorio** – Vercel provee certificado automático.
2. **Auth obligatoria** para cualquier ruta bajo `/admin`.
3. **Validación de datos** en Supabase (tipo y rango).
4. **No exponer** la `service_role` key en el cliente.
5. **CORS restringido** a dominios de la app.

## Qué NO hacer
- No almacenar contraseñas en texto plano.
- No usar `service_role` en el frontend.
- No incluir lógica de negocio sensible en el cliente.
- No subir archivos grandes sin compresión.
- No desactivar reglas de seguridad de Supabase.

---
*Este archivo guía a Claude Code para generar cada pieza del proyecto siguiendo las decisiones arriba descritas.*

---
Generado con Código Fácil · https://codigofacil.es
