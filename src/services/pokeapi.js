const BASE_URL = 'https://pokeapi.co/api/v2';
const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

// Helper to get pokemon ID directly from the API url
const extractIdFromUrl = (url) => {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
};

// Concept: fetch with async/await and pagination
export const getPokemonList = async (offset = 0, limit = 20) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);

    // Concept: validate response before parsing
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    const results = data.results.map((pokemon) => {
      const id = extractIdFromUrl(pokemon.url);
      return {
        id: parseInt(id, 10),
        name: pokemon.name,
        imageUrl: `${IMAGE_BASE_URL}/${id}.png`,
      };
    });

    return {
      results,
      count: data.count,
      hasMore: Boolean(data.next),
    };
  } catch (error) {
    throw error;
  }
};

// Concept: input sanitization and 404 handling
export const getPokemonDetail = async (nameOrId) => {
  const cleanQuery = String(nameOrId).trim().toLowerCase();

  if (!cleanQuery) {
    throw new Error('Query is required');
  }

  try {
    const response = await fetch(`${BASE_URL}/pokemon/${cleanQuery}`);

    // PokeAPI sends plain text on 404, not JSON
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('POKEMON_NOT_FOUND');
      }
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types.map((t) => t.type.name),
      stats: data.stats.map((s) => ({
        name: s.stat.name,
        baseStat: s.base_stat,
      })),
      imageUrl:
        data.sprites?.other?.['official-artwork']?.front_default ||
        `${IMAGE_BASE_URL}/${data.id}.png`,
    };
  } catch (error) {
    throw error;
  }
};
