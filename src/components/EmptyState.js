import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// Concept: empty state feedback when query returns no results
export const EmptyState = ({
  message = 'No se encontraron resultados para tu búsqueda',
  onReset,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <Text style={styles.message}>{message}</Text>
      {onReset && (
        <TouchableOpacity style={styles.button} onPress={onReset} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Ver todos los Pokémon</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  icon: {
    fontSize: 44,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
