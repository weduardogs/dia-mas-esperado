"""
Script para crear las tablas en la base de datos
Ejecutar: python scripts/create_tables.py
"""

import asyncio
from app.infrastructure.database.connection import engine, Base
from app.infrastructure.database.models import AlbumModel, PhotoModel


async def create_tables():
    """Crear todas las tablas en la base de datos"""
    print("Creando tablas en la base de datos...")

    async with engine.begin() as conn:
        # Eliminar todas las tablas existentes (opcional)
        # await conn.run_sync(Base.metadata.drop_all)

        # Crear todas las tablas
        await conn.run_sync(Base.metadata.create_all)

    print("✅ Tablas creadas exitosamente!")
    print("\nTablas creadas:")
    print("  - albums")
    print("  - photos")


if __name__ == "__main__":
    asyncio.run(create_tables())
