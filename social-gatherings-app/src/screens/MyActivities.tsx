import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Activity } from '../types';

interface ActivityItemProps {
  activity: Activity;
  onPress: () => void;
}

const ActivityItem = ({ activity, onPress }: ActivityItemProps) => (
  <TouchableOpacity style={styles.activityCard} onPress={onPress}>
    <Image source={{ uri: activity.photos[0] }} style={styles.activityImage} />
    <View style={styles.cardOverlay}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{activity.title}</Text>
        <View style={styles.cardInfo}>
          <View style={styles.hostInfo}>
            <Ionicons name="person" size={16} color="white" />
            <Text style={styles.infoText}>Hosted by {activity.hostName}</Text>
          </View>
          <View style={styles.timeInfo}>
            <Ionicons name="time" size={16} color="white" />
            <Text style={styles.infoText}>{activity.time}</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default function MyActivities() {
  const mockActivities = {
    thisWeekend: [
      {
        id: '1',
        title: 'Biking @ Golden Gate Bridge',
        hostName: 'Alex',
        time: 'Today @ 3PM',
        photos: ['https://example.com/gg-bridge.jpg'],
      },
    ],
    nextWeek: [
      {
        id: '2',
        title: 'Tennis @ Lisa & Douglas Goldman Tennis Center',
        hostName: 'Sarah',
        time: 'Monday @ 6PM',
        photos: ['https://example.com/tennis.jpg'],
      },
      {
        id: '3',
        title: 'Rock Climbing @ Movement Gym (SF)',
        hostName: 'David',
        time: 'Wednesday @ 7PM',
        photos: ['https://example.com/climbing.jpg'],
      },
    ],
    nextWeekend: [
      {
        id: '4',
        title: 'Yoga Session @ Mill Valley',
        hostName: 'Emma',
        time: 'Saturday @ 10AM',
        photos: ['https://example.com/yoga.jpg'],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Activities</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>This weekend</Text>
        {mockActivities.thisWeekend.map((activity) => (
          <ActivityItem 
            key={activity.id} 
            activity={activity} 
            onPress={() => {}}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Week</Text>
        {mockActivities.nextWeek.map((activity) => (
          <ActivityItem 
            key={activity.id} 
            activity={activity} 
            onPress={() => {}}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Weekend</Text>
        {mockActivities.nextWeekend.map((activity) => (
          <ActivityItem 
            key={activity.id} 
            activity={activity} 
            onPress={() => {}}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#666',
  },
  activityCard: {
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  activityImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
  },
  cardContent: {
    gap: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
});
