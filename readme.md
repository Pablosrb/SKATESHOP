# 🛹 SKATESHOP

**SKATESHOP** es una plataforma web integral diseñada para la comunidad skater. No solo funciona como un comercio electrónico moderno, sino que también actúa como un punto de encuentro para organizar competiciones y dar una segunda vida al material de skate mediante un mercado de segunda mano.

## 🚀 Funcionalidades Principales

Esta aplicación combina tres pilares fundamentales:

*  **🛒 Tienda Online**: Catálogo completo para la venta de productos de skate nuevos.
*  **🏆 Gestión de Torneos Presenciales**:
    * Sistema visual para organizar competiciones.
    * Soporte dinámico para brackets de **4 a 16 participantes**.
    * Visualización gráfica de cruces y eliminatorias.
*  **♻️ Mercado de Segunda Mano**:
    * Sección dedicada donde los usuarios pueden vender su material usado.
    * Fomento de la economía circular entre skaters.
*  **🗺️ Geolocalización**:
    * Integración de mapas interactivos para ubicar eventos o puntos de interés.

## 🛠️ Stack Tecnológico

El proyecto utiliza una arquitectura moderna separada en Backend (API) y Frontend (SPA):

### 🔙 Backend (API)
* **Framework**: [Laravel](https://laravel.com/) (PHP)
* **Base de Datos**: [MySQL](https://www.mysql.com/)

### 🎨 Frontend (Cliente)
Desarrollado con **React** + **TypeScript** utilizando **Vite** para un alto rendimiento.

#### Librerías y Dependencias Clave:
El proyecto hace uso de librerías específicas para sus funcionalidades avanzadas:

* **Torneos**:
    * `@g-loot/react-tournament-brackets`: Para la renderización visual de los cuadros del torneo y las eliminatorias.
* **Mapas y Visualización**:
    * `pigeon-maps`: Mapas interactivos ligeros (OpenStreetMap).
    * `react-svg-pan-zoom`: Para interactuar con gráficos complejos.
* **Gestión de Estado y Datos**:
    * `zustand`: Gestión del estado global de la aplicación.
    * `@tanstack/react-query`: Manejo eficiente de peticiones al servidor, caché y sincronización.
    * `axios`: Cliente HTTP para consumir la API de Laravel.

## 🔧 Instalación y Despliegue Local

Sigue estos pasos para levantar el entorno de desarrollo:

### Requisitos
* PHP y Composer.
* Node.js y npm.
* MySQL.

### 1. Configuración del Backend (Laravel)

```bash
cd backend
cp .env.example .env            # Configura tus credenciales de BD aquí
composer install                # Instala dependencias PHP
php artisan key:generate        # Genera la key de la app
php artisan migrate             # Crea las tablas en la BD
php artisan serve               # Inicia el servidor ([http://127.0.0.1:8000](http://127.0.0.1:8000))

```
### 2. Configuración del Frontend (React + Vite)

```bash
cd frontend
npm install                     # Instala dependencias (react, vite, librerías...)
npm run dev                     # Inicia el servidor de desarrollo
```

La aplicación estará disponible generalmente en http://localhost:5173.


Desarrollado por Pablosrb

