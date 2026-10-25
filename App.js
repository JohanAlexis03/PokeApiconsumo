import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PokemonListScreen } from './src/screens/PokemonListScreen';
import { PokemonDetailScreen } from './src/screens/PokemonDetailScreen';

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    // Concept: safe area handling
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        {selectedPokemon ? (
          <PokemonDetailScreen
            pokemon={selectedPokemon}
            onBack={() => setSelectedPokemon(null)}
          />
        ) : (
          <PokemonListScreen
            onSelectPokemon={(pokemon) => setSelectedPokemon(pokemon)}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
