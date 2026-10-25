import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PokemonListScreen } from './src/screens/PokemonListScreen';

// Concept: root component managing simple state-based screen navigation
export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    // Concept: SafeAreaProvider ensures safe insets for notches and home indicators
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <PokemonListScreen
          onSelectPokemon={(pokemon) => {
            setSelectedPokemon(pokemon);
            // Detail screen will be connected here
          }}
        />
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
