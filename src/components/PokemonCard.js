import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { formatPokemonId, capitalize } from '../utils/helpers';

// Concept: presentational component for individual grid cards
export const PokemonCard = ({ pokemon, onPress }) => {
  return (
    // Concept: touchable component for user interaction
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(pokemon)}
      activeOpacity={0.7}
    >
      <View style={styles.imageWrapper}>
        {/* Concept: remote images require explicit width and height */}
        <Image
          source={{ uri: pokemon.imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {capitalize(pokemon.name)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: '48%',
    backgroundColor: '#FFFFFF',
    margin: 8,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    // Shadow for iOS and Android elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ECEFF1',
  },
  imageWrapper: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginBottom: 8,
  },
  image: {
    width: 85,
    height: 85,
  },
  info: {
    alignItems: 'center',
    width: '100%',
  },
  id: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
});
