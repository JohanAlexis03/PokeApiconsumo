import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TYPE_COLORS, capitalize } from '../utils/helpers';

export const TypeBadge = ({ type }) => {
  const backgroundColor = TYPE_COLORS[type?.toLowerCase()] || TYPE_COLORS.default;

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.text}>{capitalize(type)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 6,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
