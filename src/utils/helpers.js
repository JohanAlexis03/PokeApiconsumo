// Concept: pure utility functions for data formatting and UI consistency

// Colors mapped by Pokemon type for badges and UI accents
export const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  default: '#68A090',
};

// Concept: string formatting for display ID (#025)
export const formatPokemonId = (id) => {
  if (!id) return '#000';
  return `#${String(id).padStart(3, '0')}`;
};

// Concept: text capitalization
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Concept: unit conversion (decimeters to meters)
export const formatHeight = (decimeters) => {
  if (decimeters === undefined || decimeters === null) return '0 m';
  const meters = decimeters / 10;
  return `${meters.toFixed(1)} m`;
};

// Concept: unit conversion (hectograms to kilograms)
export const formatWeight = (hectograms) => {
  if (hectograms === undefined || hectograms === null) return '0 kg';
  const kg = hectograms / 10;
  return `${kg.toFixed(1)} kg`;
};

// Concept: percentage calculation for stat bars (max base stat 255)
export const calculateStatPercent = (baseStat) => {
  if (!baseStat || baseStat < 0) return 0;
  const percentage = (baseStat / 255) * 100;
  return Math.min(100, Math.round(percentage));
};
