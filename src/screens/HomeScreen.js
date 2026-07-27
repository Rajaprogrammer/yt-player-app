import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useStothras } from '../context/StothrasContext';
import { openYouTube } from '../utils/youtube';
import colors from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const { items, loading } = useStothras();

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.headerLogo} />
        <Text style={styles.headerTitle}>Stothras</Text>
        <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate('Manage')}>
          <Ionicons name="settings-sharp" size={24} color={colors.headerText} />
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>Tap a shloka to listen</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.empty}>No stothras added yet. Tap the gear icon to add one!</Text>
          )
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => openYouTube(item.videoId)}
          >
            <Ionicons name="play-circle" size={30} color={colors.accent} style={{ marginRight: 14 }} />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  headerLogo: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  headerTitle: { flex: 1, fontSize: 28, fontWeight: 'bold', color: colors.headerText },
  settingsBtn: { padding: 6 },
  subHeader: {
    textAlign: 'center',
    color: colors.cardText,
    marginVertical: 12,
    fontSize: 15,
    fontStyle: 'italic',
  },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderLeftWidth: 6,
    borderLeftColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardText: { fontSize: 18, fontWeight: '600', color: colors.cardText, flexShrink: 1 },
  empty: { textAlign: 'center', marginTop: 40, color: colors.cardText },
});
