import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ActivityItemProps {
  title: string;
  location: string;
  date: string;
  notifications: number;
  verifications: number;
  image?: string;
  onPress: () => void;
}

const ActivityItem = ({ title, location, date, notifications, verifications, image, onPress }: ActivityItemProps) => (
  <TouchableOpacity style={styles.activityItem} onPress={onPress}>
    {image ? (
      <Image 
        source={{ uri: image }}
        style={styles.activityImage}
      />
    ) : (
      <View style={styles.placeholderImage} />
    )}
    <View style={styles.cardOverlay}>
      <View style={styles.cardContent}>
        <Text style={styles.activityTitle}>{title}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color="white" />
            <Text style={styles.detailText}>{location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="white" />
            <Text style={styles.detailText}>{date}</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="people-outline" size={16} color="white" />
            <Text style={styles.detailText}>{verifications} verifications</Text>
          </View>
          {notifications > 0 && (
            <View style={styles.detailRow}>
              <Ionicons name="notifications-outline" size={16} color="white" />
              <Text style={styles.detailText}>{notifications} new</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default function CreateActivity() {
  const hostedActivities = [
    {
      id: '1',
      title: 'Linda Mar Surf',
      location: 'Pacifica, CA',
      date: 'Monday Morning (August 27th)',
      notifications: 4,
      verifications: 3,
      image: 'https://example.com/surf.jpg',
    },
    {
      id: '2',
      title: 'Bouldering @ Stinson Beach',
      location: 'Stinson Beach',
      date: 'Saturday Morning (August 31st)',
      notifications: 6,
      verifications: 4,
      image: 'https://example.com/boulder.jpg',
    },
    {
      id: '3',
      title: 'Frisbee @ Crissy Field',
      location: 'Crissy Field, CA',
      date: 'Sunday Morning (August 31st)',
      notifications: 15,
      verifications: 3,
      image: 'https://example.com/frisbee.jpg',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.createButton}>
        <Ionicons name="add-circle-outline" size={24} color="#333" />
        <Text style={styles.createButtonText}>Create Activity</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Hosted Activities</Text>
      
      <View style={styles.activitiesList}>
        {hostedActivities.map((activity) => (
          <ActivityItem
            key={activity.id}
            title={activity.title}
            location={activity.location}
            date={activity.date}
            notifications={activity.notifications}
            verifications={activity.verifications}
            image={activity.image}
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
  createButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  activitiesList: {
    gap: 16,
  },
  activityItem: {
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  activityImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2196F3',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardContent: {
    gap: 8,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  detailsContainer: {
    gap: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
});
