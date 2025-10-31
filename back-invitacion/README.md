# FastAPI Hexagonal Architecture

API REST moderna construida con FastAPI utilizando arquitectura hexagonal (puertos y adaptadores) para máxima flexibilidad y mantenibilidad.

## Características

- **Arquitectura Hexagonal**: Separación clara entre dominio, aplicación e infraestructura
- **FastAPI**: Framework moderno, rápido y con documentación automática
- **Async/Await**: Operaciones asíncronas para máximo rendimiento
- **SQLAlchemy 2.0**: ORM moderno con soporte async
- **PostgreSQL**: Base de datos robusta y escalable
- **Pydantic V2**: Validación de datos y settings
- **Docker**: Containerización para desarrollo y producción
- **Type Hints**: Código completamente tipado
- **Buenas Prácticas**: Clean Code, SOLID, DRY

## Estructura del Proyecto

```
back-invitacion/
├── app/
│   ├── domain/              # Capa de Dominio (Entidades y Reglas de Negocio)
│   │   ├── entities/        # Entidades del dominio
│   │   ├── repositories/    # Interfaces de repositorios
│   │   └── exceptions/      # Excepciones del dominio
│   │
│   ├── application/         # Capa de Aplicación (Casos de Uso)
│   │   ├── use_cases/       # Casos de uso
│   │   ├── services/        # Servicios de aplicación
│   │   └── dtos/            # Data Transfer Objects
│   │
│   ├── infrastructure/      # Capa de Infraestructura (Implementaciones)
│   │   ├── database/        # Configuración de BD y modelos
│   │   ├── repositories/    # Implementación de repositorios
│   │   └── config/          # Configuración de la aplicación
│   │
│   └── api/                 # Capa de API (Presentación)
│       ├── v1/              # Versión 1 de la API
│       │   ├── routes/      # Endpoints
│       │   └── dependencies/# Inyección de dependencias
│       └── middlewares/     # Middlewares
│
├── tests/                   # Tests
│   ├── unit/               # Tests unitarios
│   └── integration/        # Tests de integración
│
├── deployment/             # Archivos de despliegue
│   ├── nginx.conf         # Configuración de Nginx
│   ├── fastapi.service    # Servicio systemd
│   └── deploy.sh          # Script de despliegue
│
├── main.py                # Punto de entrada
├── requirements.txt       # Dependencias
├── Dockerfile            # Imagen Docker
├── docker-compose.yml    # Orquestación Docker
└── .env.example          # Variables de entorno de ejemplo
```

## Arquitectura Hexagonal

### Capas

1. **Domain (Dominio)**: Lógica de negocio pura, independiente de frameworks
   - Entidades
   - Interfaces de repositorios
   - Excepciones de dominio

2. **Application (Aplicación)**: Casos de uso y orquestación
   - Use Cases
   - DTOs
   - Servicios de aplicación

3. **Infrastructure (Infraestructura)**: Implementaciones técnicas
   - Base de datos
   - Repositorios concretos
   - Servicios externos

4. **API (Presentación)**: Interfaz HTTP
   - Endpoints
   - Middlewares
   - Manejo de errores

### Principios

- Las dependencias apuntan hacia el dominio
- El dominio no conoce la infraestructura
- Inversión de dependencias (Dependency Inversion)
- Interfaces para abstraer implementaciones

## Requisitos Previos

- Python 3.11+
- PostgreSQL 15+
- Docker y Docker Compose (opcional)

## Instalación

### Desarrollo Local

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd back-invitacion
```

2. Crear y activar entorno virtual:
```bash
python3.11 -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

3. Instalar dependencias:
```bash
pip install -r requirements.txt
```

4. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

5. Configurar PostgreSQL:
```bash
# Crear base de datos
createdb fastapi_db
```

6. Ejecutar la aplicación:
```bash
python main.py
# o
uvicorn main:app --reload --port 8000
```

### Usando Docker

1. Construir y ejecutar con Docker Compose:
```bash
docker-compose up -d
```

2. Ver logs:
```bash
docker-compose logs -f app
```

3. Detener servicios:
```bash
docker-compose down
```

## Uso

### Documentación API

Una vez ejecutada la aplicación, accede a:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- Health Check: http://localhost:8000/api/v1/health

### Endpoints Disponibles

#### Health Check
```bash
GET /api/v1/health
```

#### Users (Ejemplo)
```bash
# Crear usuario
POST /api/v1/users
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "secure123",
  "full_name": "John Doe"
}

# Obtener usuario
GET /api/v1/users/{user_id}

# Listar usuarios
GET /api/v1/users?skip=0&limit=100

# Actualizar usuario
PUT /api/v1/users/{user_id}

# Eliminar usuario
DELETE /api/v1/users/{user_id}
```

## Despliegue en VPS Hostinger

### Preparación

1. Acceder al VPS:
```bash
ssh root@your-server-ip
```

2. Subir archivos al servidor:
```bash
# Desde tu máquina local
scp -r . root@your-server-ip:/tmp/fastapi-app
```

3. En el servidor, ejecutar el script de despliegue:
```bash
cd /tmp/fastapi-app
chmod +x deployment/deploy.sh
sudo ./deployment/deploy.sh
```

### Configuración Manual

Si prefieres configurar manualmente:

1. **Instalar dependencias del sistema**:
```bash
sudo apt update
sudo apt install python3.11 python3.11-venv nginx postgresql
```

2. **Configurar PostgreSQL**:
```bash
sudo -u postgres createdb fastapi_db
sudo -u postgres createuser fastapi_user
sudo -u postgres psql
ALTER USER fastapi_user WITH ENCRYPTED PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE fastapi_db TO fastapi_user;
```

3. **Configurar aplicación**:
```bash
sudo mkdir -p /var/www/fastapi
sudo chown $USER:$USER /var/www/fastapi
cd /var/www/fastapi
git clone <your-repo> .
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

4. **Configurar Nginx**:
```bash
sudo cp deployment/nginx.conf /etc/nginx/sites-available/fastapi
sudo ln -s /etc/nginx/sites-available/fastapi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

5. **Configurar systemd**:
```bash
sudo cp deployment/fastapi.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable fastapi
sudo systemctl start fastapi
```

6. **SSL con Let's Encrypt**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Comandos Útiles

```bash
# Ver logs de la aplicación
sudo journalctl -u fastapi -f

# Reiniciar servicio
sudo systemctl restart fastapi

# Ver estado
sudo systemctl status fastapi

# Ver logs de Nginx
sudo tail -f /var/log/nginx/fastapi_error.log

# Reiniciar Nginx
sudo systemctl restart nginx
```

## Testing

```bash
# Ejecutar tests
pytest

# Con cobertura
pytest --cov=app tests/

# Tests específicos
pytest tests/unit/
pytest tests/integration/
```

## Variables de Entorno

```env
# Application
APP_NAME=FastAPI Hexagonal Architecture
APP_VERSION=1.0.0
DEBUG=False
API_V1_PREFIX=/api/v1

# Server
HOST=0.0.0.0
PORT=8000

# Database
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/dbname

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
CORS_ORIGINS=["http://localhost:3000"]

# Environment
ENVIRONMENT=production
```

## Desarrollo

### Agregar Nueva Entidad

1. Crear entidad en `app/domain/entities/`
2. Crear repositorio en `app/domain/repositories/`
3. Crear modelo SQLAlchemy en `app/infrastructure/database/models.py`
4. Implementar repositorio en `app/infrastructure/repositories/`
5. Crear DTOs en `app/application/dtos/`
6. Crear casos de uso en `app/application/use_cases/`
7. Crear rutas en `app/api/v1/routes/`

### Buenas Prácticas

- Mantener la lógica de negocio en el dominio
- Usar casos de uso para orquestar operaciones
- Validar datos con Pydantic
- Usar type hints en todas las funciones
- Escribir tests para casos de uso críticos
- Documentar endpoints con docstrings
- Manejar excepciones apropiadamente

## Seguridad

- Cambiar `SECRET_KEY` en producción
- Usar HTTPS en producción
- Configurar CORS apropiadamente
- Validar todas las entradas
- Usar variables de entorno para secretos
- Mantener dependencias actualizadas

## Contribuir

1. Fork el proyecto
2. Crear rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.

## Soporte

Para preguntas o problemas, abrir un issue en el repositorio.
