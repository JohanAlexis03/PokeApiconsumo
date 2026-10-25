# PokéDex Explorer

Aplicación móvil desarrollada con **React Native** y **Expo** para el taller universitario de consumo de APIs REST. La aplicación permite explorar el catálogo de Pokémon mediante una lista paginada con scroll infinito, buscar por nombre o número y consultar la ficha técnica de cada criatura con sus estadísticas y distintivos de tipo.

---

## 🛠️ Stack Tecnológico

- **Framework**: React Native con Expo (SDK 58).
- **Lenguaje**: JavaScript (ES6+).
- **Cliente HTTP**: API nativa `fetch` con `async/await` (sin librerías externas como Axios).
- **Manejo de Insets**: `react-native-safe-area-context`.
- **Fuente de Datos**: [PokéAPI](https://pokeapi.co/api/v2/) (REST API pública).

---

## 🏛️ Arquitectura del Proyecto

El código está estructurado bajo el principio de **Separación de Responsabilidades** (*Separation of Concerns*). Las llamadas a la red, las funciones de transformación y los componentes de interfaz residen en módulos independientes:

```text
pokedex-explorer/
├── App.js                         # Componente raíz y navegación por estado (Lista / Detalle)
├── app.json                       # Configuración del proyecto Expo
├── package.json                   # Dependencias y scripts de ejecución
└── src/
    ├── services/
    │   └── pokeapi.js             # Capa de infraestructura de red (fetch, paginación y 404)
    ├── components/
    │   ├── PokemonCard.js         # Tarjeta individual para la cuadrícula de 2 columnas
    │   ├── SearchBar.js           # Barra de búsqueda con flags de texto y botón Buscar
    │   ├── TypeBadge.js           # Distintivo con color temático según el tipo de Pokémon
    │   ├── StatBar.js             # Barra de progreso proporcional para estadísticas base
    │   ├── LoadingState.js        # Indicador de carga con ActivityIndicator
    │   ├── ErrorState.js          # Mensaje de error amigable con botón de reintento
    │   └── EmptyState.js          # Estado vacío cuando no hay resultados de búsqueda
    ├── screens/
    │   ├── PokemonListScreen.js   # Pantalla principal con FlatList y scroll infinito
    │   └── PokemonDetailScreen.js # Ficha de detalle con métricas, tipos y estadísticas
    └── utils/
        └── helpers.js             # Funciones puras: formato de ID (#025), conversiones y colores
```

### Responsabilidad de cada archivo:

| Archivo | Responsabilidad Principal |
| :--- | :--- |
| `src/services/pokeapi.js` | Funciones asíncronas para consultar la PokéAPI (`getPokemonList`, `getPokemonDetail`). Extrae el ID de la URL y maneja respuestas 404 de texto plano. |
| `src/utils/helpers.js` | Funciones puras de utilidad: `formatPokemonId` (`#001`), `capitalize`, conversiones métricas (decímetros a metros, hectogramos a kilos) y diccionario de colores `TYPE_COLORS`. |
| `src/components/PokemonCard.js` | Componente de presentación para cada celda de la cuadrícula con imagen remota de dimensiones fijas y feedback táctil (`TouchableOpacity`). |
| `src/components/SearchBar.js` | Entrada controlada con `autoCapitalize="none"`, `autoCorrect={false}` y botón de acción. |
| `src/components/TypeBadge.js` | Badge visual con color dinámico asignado por tipo elemental. |
| `src/components/StatBar.js` | Barra visual calculada sobre el valor máximo de 255 puntos base. |
| `src/components/LoadingState.js` | Pantalla/bloque de retroalimentación de carga. |
| `src/components/ErrorState.js` | Interfaz de fallo de conexión o petición con callback `onRetry`. |
| `src/components/EmptyState.js` | Aviso de búsqueda no encontrada con botón para restaurar el catálogo. |
| `src/screens/PokemonListScreen.js` | Contenedor principal: gestiona `FlatList` con 2 columnas, scroll infinito (`onEndReached`) y filtrado. |
| `src/screens/PokemonDetailScreen.js` | Vista detallada: consulta los datos extendidos del Pokémon seleccionado y permite regresar con el botón *"Volver a la lista"*. |
| `App.js` | Orquestador principal envuelto en `SafeAreaProvider` con renderizado condicional según el Pokémon activo. |

---

## ✨ Funcionalidades Principales

1. **Cuadrícula Optimizada con FlatList**:
   - Renderizado en 2 columnas (`numColumns={2}`) usando virtualización nativa para optimizar el consumo de memoria en el dispositivo móvil.
2. **Scroll Infinito y Paginación**:
   - Carga inicial de 20 Pokémon. Al llegar al 50% inferior de la pantalla (`onEndReachedThreshold={0.5}`), se consulta la siguiente página y se añade de forma inmutable a la lista.
3. **Búsqueda Robusta**:
   - Permite buscar por nombre (ej. `pikachu`) o por número (ej. `25`, `025` o `#25`).
   - Sanitización de entrada para eliminar mayúsculas, espacios y ceros a la izquierda que provoquen fallos en la API.
   - Manejo de respuestas 404 con visualización del estado "Sin resultados".
4. **Ficha Técnica Completa**:
   - Imagen grande *official-artwork*.
   - Conversión de unidades: altura de decímetros a metros (`m`) y peso de hectogramos a kilogramos (`kg`).
   - Visualización de las 6 estadísticas base con barras proporcionales.
5. **Navegación Limpia**:
   - Transición fluida entre la lista y el detalle gestionada mediante estado en `App.js`, sin sobrecarga de dependencias de enrutamiento.

---

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior).
- Aplicación **Expo Go** instalada en tu dispositivo móvil (iOS o Android).

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/JohanAlexis03/PokeApiconsumo.git
   cd PokeApiconsumo/pokedex-explorer
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo de Expo:
   ```bash
   npx expo start -c
   ```

4. Escanear el código QR con la app **Expo Go** (Android) o la **Cámara** (iOS).
