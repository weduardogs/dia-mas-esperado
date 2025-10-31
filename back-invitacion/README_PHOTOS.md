# API de Álbum de Fotos para Eventos

API REST para compartir fotos en eventos con múltiples usuarios usando Cloudinary para almacenamiento.

## Características

- **Subida de fotos a Cloudinary**: Almacenamiento seguro y escalable
- **Álbumes compartidos**: Los invitados acceden con un código único
- **Arquitectura Hexagonal**: Código limpio y mantenible
- **Sin base de datos requerida**: Funciona con almacenamiento en memoria
- **Concurrencia**: Múltiples usuarios pueden subir fotos simultáneamente
- **Optimización automática**: Cloudinary genera thumbnails y optimiza imágenes

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` y configura tus credenciales de Cloudinary:

```env
# Application
APP_NAME=Photo Album API
DEBUG=True

# Cloudinary (IMPORTANTE - Obtén estas credenciales en cloudinary.com)
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# CORS (ajusta según tu frontend)
CORS_ORIGINS=["http://localhost:3000","http://localhost:5173"]
```

### 2. Obtener Credenciales de Cloudinary

1. Regístrate en [Cloudinary](https://cloudinary.com/)
2. Ve al Dashboard
3. Copia: Cloud Name, API Key, API Secret
4. Pégalos en tu archivo `.env`

### 3. Instalar Dependencias

```bash
pip install -r requirements.txt
```

### 4. Ejecutar la Aplicación

```bash
uvicorn main:app --reload --port 8000
```

## Endpoints API

### Álbumes

#### Crear un Álbum
```http
POST /api/v1/albums
Content-Type: application/json

{
  "name": "Boda María & Juan 2024",
  "event_code": "BODA2024",
  "description": "Álbum de fotos de nuestra boda",
  "event_date": "2024-12-15",
  "max_photos_per_user": 50
}
```

**Respuesta:**
```json
{
  "id": "abc123",
  "name": "Boda María & Juan 2024",
  "event_code": "BODA2024",
  "description": "Álbum de fotos de nuestra boda",
  "event_date": "2024-12-15",
  "is_active": true,
  "max_photos_per_user": 50,
  "photo_count": 0
}
```

#### Obtener Álbum por Código
```http
GET /api/v1/albums/code/{event_code}
```

Ejemplo:
```http
GET /api/v1/albums/code/BODA2024
```

#### Obtener Álbum por ID
```http
GET /api/v1/albums/{album_id}
```

#### Listar Todos los Álbumes
```http
GET /api/v1/albums?skip=0&limit=100
```

#### Actualizar Álbum
```http
PUT /api/v1/albums/{album_id}
Content-Type: application/json

{
  "name": "Nuevo nombre",
  "is_active": false
}
```

#### Eliminar Álbum
```http
DELETE /api/v1/albums/{album_id}
```

### Fotos

#### Subir una Foto
```http
POST /api/v1/photos/upload
Content-Type: multipart/form-data

file: [archivo de imagen]
album_id: "abc123"
uploader_name: "Pedro García"
```

**Ejemplo con cURL:**
```bash
curl -X POST "http://localhost:8000/api/v1/photos/upload" \
  -F "file=@/ruta/a/foto.jpg" \
  -F "album_id=abc123" \
  -F "uploader_name=Pedro García"
```

**Ejemplo con JavaScript (Frontend):**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('album_id', 'abc123');
formData.append('uploader_name', 'Pedro García');

const response = await fetch('http://localhost:8000/api/v1/photos/upload', {
  method: 'POST',
  body: formData
});

const photo = await response.json();
console.log(photo.url); // URL de Cloudinary
```

**Respuesta:**
```json
{
  "id": "photo123",
  "url": "https://res.cloudinary.com/tu-cloud/image/upload/v123/albums/abc123/foto.jpg",
  "public_id": "albums/abc123/foto",
  "album_id": "abc123",
  "thumbnail_url": "https://res.cloudinary.com/tu-cloud/image/upload/c_fill,h_400,w_400/albums/abc123/foto.jpg",
  "original_filename": "foto.jpg",
  "uploader_name": "Pedro García",
  "file_size": 1024000,
  "width": 1920,
  "height": 1080,
  "format": "jpg",
  "created_at": "2024-10-27T12:00:00"
}
```

#### Obtener Fotos de un Álbum
```http
GET /api/v1/photos/album/{album_id}?skip=0&limit=100
```

**Respuesta:**
```json
{
  "total": 42,
  "album_id": "abc123",
  "photos": [
    {
      "id": "photo123",
      "url": "https://res.cloudinary.com/...",
      "thumbnail_url": "https://res.cloudinary.com/...",
      "uploader_name": "Pedro García",
      "created_at": "2024-10-27T12:00:00"
    }
  ]
}
```

#### Obtener una Foto
```http
GET /api/v1/photos/{photo_id}
```

#### Eliminar una Foto
```http
DELETE /api/v1/photos/{photo_id}
```

## Flujo de Uso

### Caso: Álbum de Boda

1. **Organizador crea el álbum:**
```bash
POST /api/v1/albums
{
  "name": "Boda María & Juan",
  "event_code": "BODA2024"
}
```

2. **Organizador comparte el código** `BODA2024` con los invitados

3. **Frontend de invitados busca el álbum:**
```bash
GET /api/v1/albums/code/BODA2024
```

4. **Invitados suben fotos:**
```javascript
// El frontend permite seleccionar múltiples fotos
photos.forEach(async (photo) => {
  const formData = new FormData();
  formData.append('file', photo);
  formData.append('album_id', albumId);
  formData.append('uploader_name', guestName);

  await fetch('/api/v1/photos/upload', {
    method: 'POST',
    body: formData
  });
});
```

5. **Visualizar galería:**
```bash
GET /api/v1/photos/album/{album_id}
```

## Ejemplo de Integración con Frontend

### React/Next.js

```typescript
// components/PhotoUpload.tsx
import { useState } from 'react';

export function PhotoUpload({ albumId, uploaderName }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('album_id', albumId);
      formData.append('uploader_name', uploaderName);

      try {
        const response = await fetch('http://localhost:8000/api/v1/photos/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const photo = await response.json();
          console.log('Foto subida:', photo.url);
        }
      } catch (error) {
        console.error('Error al subir:', error);
      }
    }

    setUploading(false);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>Subiendo fotos...</p>}
    </div>
  );
}
```

### Galería de Fotos

```typescript
// components/PhotoGallery.tsx
import { useEffect, useState } from 'react';

export function PhotoGallery({ albumId }: Props) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/photos/album/${albumId}`)
      .then(res => res.json())
      .then(data => setPhotos(data.photos));
  }, [albumId]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map(photo => (
        <img
          key={photo.id}
          src={photo.thumbnail_url}
          alt={photo.original_filename}
          className="rounded-lg cursor-pointer"
          onClick={() => window.open(photo.url, '_blank')}
        />
      ))}
    </div>
  );
}
```

## Ventajas de Cloudinary

✅ **Almacenamiento ilimitado**: No ocupas espacio en tu servidor
✅ **CDN global**: Carga rápida desde cualquier parte del mundo
✅ **Optimización automática**: Compresión y formato automático
✅ **Thumbnails**: Genera miniaturas al vuelo
✅ **Transformaciones**: Redimensiona, recorta, aplica filtros
✅ **Seguridad**: URLs firmadas y control de acceso

## Límites y Consideraciones

- **Plan gratuito de Cloudinary**: 25 GB de almacenamiento, 25 GB de ancho de banda
- **Tamaño máximo de archivo**: Configurable (por defecto 10MB)
- **Formatos soportados**: JPG, PNG, GIF, WebP, HEIC, etc.
- **Almacenamiento en memoria**: Los datos de álbumes se pierden al reiniciar (usa BD para producción)

## Seguridad

### CORS
Configura los orígenes permitidos en `.env`:
```env
CORS_ORIGINS=["https://tu-dominio.com"]
```

### Rate Limiting (Recomendado para producción)
```bash
pip install slowapi
```

### Validación de Archivos
La API valida:
- Tipo de archivo (solo imágenes)
- Tamaño máximo
- Álbum activo

## Arquitectura

```
app/
├── domain/
│   ├── entities/
│   │   ├── photo.py        # Entidad Photo
│   │   └── album.py        # Entidad Album
│   └── repositories/
│       ├── photo_repository.py   # Interface
│       └── album_repository.py   # Interface
│
├── application/
│   ├── use_cases/
│   │   ├── photo_use_cases.py    # Lógica de negocio
│   │   └── album_use_cases.py
│   └── dtos/
│       ├── photo_dto.py          # Data Transfer Objects
│       └── album_dto.py
│
├── infrastructure/
│   ├── repositories/
│   │   ├── photo_repository_memory.py    # Implementación
│   │   └── album_repository_memory.py
│   └── external_services/
│       └── cloudinary_service.py         # Servicio de Cloudinary
│
└── api/
    └── v1/routes/
        ├── photos.py         # Endpoints de fotos
        └── albums.py         # Endpoints de álbumes
```

## Próximos Pasos

1. **Base de datos persistente**: Migrar de memoria a PostgreSQL
2. **Autenticación**: Proteger álbumes privados
3. **WebSockets**: Actualización en tiempo real de fotos
4. **Compresión en cliente**: Reducir tamaño antes de subir
5. **Descarga masiva**: Descargar todas las fotos de un álbum como ZIP

## Documentación API Interactiva

Una vez ejecutada la aplicación:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Soporte

Para problemas o preguntas, abre un issue en el repositorio.
