import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const { title, description, hostName, photos, verifiedStatus } = activity;
  
  return (
    <View style={styles.container}>
      {photos && photos.length > 0 ? (
        <Image 
          source={{ uri: photos[0] }}
          style={styles.image}
        />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          {hostName && (
            <View style={styles.hostContainer}>
              <Ionicons name="person-circle-outline" size={16} color="white" />
              <Text style={styles.host}>Hosted by {hostName}</Text>
              {verifiedStatus && (
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              )}
            </View>
          )}
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2196F3',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  host: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  description: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
});
