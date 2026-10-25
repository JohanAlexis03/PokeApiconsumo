import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { calculateStatPercent } from '../utils/helpers';

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Atq. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidad',
};

export const StatBar = ({ name, baseStat }) => {
  const percent = calculateStatPercent(baseStat);
  const label = STAT_LABELS[name] || name.toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.name}>{label}</Text>
        <Text style={styles.value}>{baseStat}</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  track: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#EF5350',
    borderRadius: 4,
  },
});
