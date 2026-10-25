import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Keyboard } from 'react-native';
import { getPokemonList, getPokemonDetail } from '../services/pokeapi';
import { PokemonCard } from '../components/PokemonCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';

const PAGE_SIZE = 20;

export const PokemonListScreen = ({ onSelectPokemon }) => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // Concept: useState for handling search query
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Concept: useEffect for API call
  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPokemonList(0, PAGE_SIZE);
      setPokemons(data.results);
      setOffset(PAGE_SIZE);
      setHasMore(data.hasMore);
    } catch (err) {
      setError('Ocurrió un error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore || searchResults) return;

    setLoadingMore(true);
    try {
      const data = await getPokemonList(offset, PAGE_SIZE);
      setPokemons((prev) => [...prev, ...data.results]);
      setOffset((prev) => prev + PAGE_SIZE);
      setHasMore(data.hasMore);
    } catch (err) {
      // keep existing items if next page fails
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = async () => {
    Keyboard.dismiss();
    const query = search.trim();
    if (!query) {
      handleClearSearch();
      return;
    }

    setNotFound(false);
    setError(null);
    setLoading(true);

    try {
      const detail = await getPokemonDetail(query);
      setSearchResults([
        {
          id: detail.id,
          name: detail.name,
          imageUrl: detail.imageUrl,
        },
      ]);
    } catch (err) {
      if (err.message === 'POKEMON_NOT_FOUND') {
        setNotFound(true);
        setSearchResults([]);
      } else {
        setError('Ocurrió un error al buscar el Pokémon');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    Keyboard.dismiss();
    setSearch('');
    setSearchResults(null);
    setNotFound(false);
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#EF5350" />
      </View>
    );
  };

  const displayList = searchResults || pokemons;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PokéDex Explorer</Text>
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        onSearch={handleSearch}
        onClear={handleClearSearch}
      />

      {loading ? (
        <LoadingState message="Cargando Pokémon..." />
      ) : error ? (
        <ErrorState message={error} onRetry={searchResults ? handleSearch : loadPokemons} />
      ) : notFound ? (
        <EmptyState onReset={handleClearSearch} />
      ) : (
        // Concept: FlatList with numColumns=2
        <FlatList
          data={displayList}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <PokemonCard pokemon={item} onPress={onSelectPokemon} />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  list: {
    padding: 8,
    paddingBottom: 20,
  },
  loaderContainer: {
    paddingVertical: 14,
    alignItems: 'center',
  },
});
