import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function ExerciseNav({ current }) {
  const routes = [
    { name: 'Ex 1', path: '/exercise1' },
    { name: 'Ex 2', path: '/exercise2' },
    { name: 'Ex 3', path: '/exercise3' },
    { name: 'Ex 4', path: '/exercise4' },
    { name: 'Ex 5', path: '/exercise5' },
    { name: 'Ex 6', path: '/exercise6' },
    { name: 'Ex 7', path: '/exercise7' },
    { name: 'Ex 8', path: '/exercise8' },
  ];

  return (
    <View style={styles.navBar}>
      <Text style={styles.navLabel}>Pages:</Text>
      <View style={styles.linksRow}>
        {routes.map((r, i) => (
          <Link
            key={r.path}
            href={r.path}
            style={[
              styles.navLink,
              current === i + 1 && styles.activeLink,
            ]}
          >
            <Text
              style={[
                styles.navLinkText,
                current === i + 1 && styles.activeLinkText,
              ]}
            >
              {r.name}
            </Text>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 10,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748B',
    marginBottom: 6,
  },
  linksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  navLink: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  activeLink: {
    backgroundColor: '#2563EB',
  },
  navLinkText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
  },
  activeLinkText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
