import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { getPokemonDetail } from '../services/pokeapi';
import { formatPokemonId, capitalize, formatHeight, formatWeight } from '../utils/helpers';
import { TypeBadge } from '../components/TypeBadge';
import { StatBar } from '../components/StatBar';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

export const PokemonDetailScreen = ({ pokemon, onBack }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDetail();
  }, [pokemon?.id]);

  const loadDetail = async () => {
    if (!pokemon?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getPokemonDetail(pokemon.id);
      setDetail(data);
    } catch (err) {
      setError('Ocurrió un error al cargar el detalle del Pokémon');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState message="Cargando detalles..." />;
  }

  if (error || !detail) {
    return <ErrorState message={error || 'No se pudo cargar'} onRetry={loadDetail} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backText}>← Volver a la lista</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.id}>{formatPokemonId(detail.id)}</Text>
          <Text style={styles.name}>{capitalize(detail.name)}</Text>
        </View>

        <View style={styles.imageCard}>
          <Image
            source={{ uri: detail.imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.typesRow}>
          {detail.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>

        <View style={styles.metricsContainer}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>ALTURA</Text>
            <Text style={styles.metricValue}>{formatHeight(detail.height)}</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>PESO</Text>
            <Text style={styles.metricValue}>{formatWeight(detail.weight)}</Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Estadísticas Base</Text>
          {detail.stats.map((stat) => (
            <StatBar key={stat.name} name={stat.name} baseStat={stat.baseStat} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  backText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3B82F6',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  id: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
  },
  imageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ECEFF1',
  },
  image: {
    width: 180,
    height: 180,
  },
  typesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECEFF1',
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#E2E8F0',
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECEFF1',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },
});
