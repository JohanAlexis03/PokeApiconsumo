import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

// Concept: controlled input component for search operations
export const SearchBar = ({ value, onChangeText, onSearch, onClear }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        {/* Concept: TextInput configuration for search (no auto-capitalization or auto-correct) */}
        <TextInput
          style={styles.input}
          placeholder="Busca por nombre o número..."
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={onSearch}
        activeOpacity={0.8}
      >
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 10,
    height: 46,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 6,
  },
  clearText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
  },
  searchButton: {
    backgroundColor: '#EF5350',
    paddingHorizontal: 18,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
