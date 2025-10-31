# Gestión de Familias - Invitación CYE Wedding

## 📋 Descripción General

La invitación **cye-wedding** ahora carga dinámicamente la información de las familias desde un archivo JSON. Esto permite agregar, editar o eliminar familias sin modificar el código de la aplicación.

## 📁 Archivos Importantes

### 1. **cye-wedding-families.json** (Archivo Principal)
- **Ubicación**: `/static/cye-wedding-families.json`
- **Propósito**: Archivo que contiene TODAS las familias que tendrán acceso a la invitación
- **Capacidad**: Hasta 100 familias
- **Formato**: JSON Array con objetos de familia

### 2. **cye-wedding-families-template.json** (Plantilla de Referencia)
- **Ubicación**: `/static/cye-wedding-families-template.json`
- **Propósito**: Plantilla con ejemplos para agregar nuevas familias
- **No modificar**: Este archivo es solo referencia

## 🔧 Estructura de Cada Familia

Cada familia debe tener la siguiente estructura:

```json
{
  "password": "codigo_unico_familia",
  "familyName": "Nombre de la Familia",
  "personalMessage": "Mensaje personalizado para esta familia"
}
```

### Descripción de Campos:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `password` | string | ✅ Sí | Código único de acceso (case-insensitive) |
| `familyName` | string | ✅ Sí | Nombre de la familia que se mostrará |
| `personalMessage` | string | ⚠️ Opcional | Mensaje personalizado en la portada |

## 📝 Cómo Agregar Nuevas Familias

### Paso 1: Abrir el archivo principal
```bash
# Ubicación del archivo
/static/cye-wedding-families.json
```

### Paso 2: Agregar nueva familia al array

```json
[
  {
    "password": "familia2024",
    "familyName": "Familia García",
    "personalMessage": "Querida familia García, nos llena de alegría tenerlos en este día especial."
  },
  {
    "password": "nuevafamilia2024",
    "familyName": "Familia López",
    "personalMessage": "Estimada familia López, su presencia hace este día aún más especial."
  }
]
```

### Paso 3: Guardar y verificar

1. Guardar el archivo
2. Refrescar la aplicación
3. Probar con el nuevo password

## ✅ Mejores Prácticas

### 1. **Passwords Únicos**
- Cada familia debe tener un password diferente
- Evitar passwords muy simples
- Sugerencias: `familiagarcia2024`, `amigoscecy2024`, `compañeroslalo2024`

### 2. **Mensajes Personalizados**
- Usar el tono apropiado (formal/informal) según la familia
- Longitud recomendada: 50-150 caracteres
- Mencionar el nombre de la familia si es posible

### 3. **Nombres de Familia**
- Usar nombres descriptivos
- Evitar caracteres especiales problemáticos
- Ejemplos buenos: "Familia García", "Amigos de la Universidad", "Compañeros de Trabajo"

## 📊 Ejemplos de Familias

### Ejemplo 1: Familia Cercana
```json
{
  "password": "garcia2024cecy",
  "familyName": "Familia García",
  "personalMessage": "Querida familia, ustedes han sido parte fundamental de nuestra historia. ¡Los esperamos con amor!"
}
```

### Ejemplo 2: Amigos
```json
{
  "password": "amigosuni2024",
  "familyName": "Amigos de la Universidad",
  "personalMessage": "¡Amigos! Gracias por ser parte de tantos momentos especiales. Este día no sería igual sin ustedes."
}
```

### Ejemplo 3: Compañeros
```json
{
  "password": "trabajocecy2024",
  "familyName": "Compañeros de Trabajo",
  "personalMessage": "Estimados compañeros, será un honor contar con su presencia en este día tan especial."
}
```

### Ejemplo 4: Familia Extendida
```json
{
  "password": "primos2024",
  "familyName": "Familia Ruiz (Primos)",
  "personalMessage": "Queridos primos, ¡prepárense para una gran celebración familiar!"
}
```

## 🚨 Validaciones y Errores

### Errores Comunes:

1. **JSON mal formado**
   - ❌ Falta una coma entre objetos
   - ❌ Comilla sin cerrar
   - ✅ Usar un validador JSON online

2. **Password duplicado**
   - ❌ Dos familias con el mismo password
   - ✅ Cada password debe ser único

3. **Campos vacíos**
   - ❌ `"password": ""`
   - ✅ Todos los campos requeridos deben tener valor

## 🔍 Validador JSON

Antes de guardar, valida tu JSON en:
- https://jsonlint.com/
- https://jsonformatter.org/

## 📱 Cómo Funciona el Login

1. Usuario ingresa su password en la pantalla de login
2. La aplicación busca en `cye-wedding-families.json`
3. Si encuentra coincidencia (case-insensitive):
   - ✅ Permite acceso
   - 📝 Muestra mensaje personalizado en portada
   - 💾 Guarda sesión en localStorage
4. Si NO encuentra:
   - ❌ Muestra error "Contraseña incorrecta"

## 🔒 Seguridad

### Notas Importantes:
- ⚠️ Este sistema es básico y NO es seguro para producción
- ⚠️ Los passwords están en texto plano en el cliente
- ⚠️ Cualquiera puede ver el archivo JSON
- ✅ Para eventos privados reales, implementar backend con autenticación real

### Recomendaciones:
1. Usar passwords únicos y no obvios
2. Compartir passwords solo con invitados
3. Cambiar archivo antes del deployment
4. No incluir información sensible en mensajes

## 📦 Deployment

### Antes de hacer deploy:

1. ✅ Eliminar familias de ejemplo
2. ✅ Validar que el JSON esté bien formado
3. ✅ Verificar que todos los passwords sean únicos
4. ✅ Probar al menos 3 passwords diferentes
5. ✅ Revisar que los mensajes personalizados se vean bien

### Archivo Final de Producción:
```json
[
  {
    "password": "tu_password_real_1",
    "familyName": "Nombre Real Familia 1",
    "personalMessage": "Mensaje real familia 1"
  },
  {
    "password": "tu_password_real_2",
    "familyName": "Nombre Real Familia 2",
    "personalMessage": "Mensaje real familia 2"
  }
]
```

## 🛠️ Troubleshooting

### Problema: "No carga las familias"
**Solución**:
- Verificar que el archivo esté en `/public/cye-wedding-families.json`
- Abrir consola del navegador y buscar errores
- Verificar que el JSON sea válido

### Problema: "Password no funciona"
**Solución**:
- Verificar que el password esté escrito correctamente (sin espacios)
- El sistema es case-insensitive: "FAMILIA2024" = "familia2024"
- Revisar que el password esté en el archivo JSON

### Problema: "No se ve el mensaje personalizado"
**Solución**:
- Verificar que el campo `personalMessage` tenga contenido
- Si no quieres mensaje, puedes dejar el campo vacío: `"personalMessage": ""`

## 📞 Soporte

Si tienes dudas sobre cómo agregar familias:
1. Revisa los ejemplos en este documento
2. Usa la plantilla en `cye-wedding-families-template.json`
3. Valida tu JSON antes de guardar

---

**Última actualización**: 2025
**Versión**: 1.0
