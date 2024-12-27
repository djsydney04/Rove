import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ExpertiseBadgeProps {
  icon: string;
  label: string;
}

const ExpertiseBadge = ({ icon, label }: ExpertiseBadgeProps) => (
  <View style={styles.expertiseBadge}>
    <Ionicons name={icon as any} size={24} color="#333" />
    <Text style={styles.badgeText}>{label}</Text>
  </View>
);

interface InterestTagProps {
  label: string;
}

const InterestTag = ({ label }: InterestTagProps) => (
  <View style={styles.interestTag}>
    <Text style={styles.interestText}>{label}</Text>
  </View>
);

interface ActivityHistoryItemProps {
  title: string;
  time: string;
}

const ActivityHistoryItem = ({ title, time }: ActivityHistoryItemProps) => (
  <View style={styles.historyItem}>
    <Text style={styles.historyTitle}>{title}</Text>
    <Text style={styles.historyTime}>{time}</Text>
  </View>
);

export default function Profile() {
  const mockUser = {
    name: 'Evan Anderson',
    location: 'San Francisco, CA',
    stats: {
      friends: 22,
      activities: 95,
    },
    bio: 'Bay Area native turning vertical dreams into reality. Weekday software engineer turned weekend VanLifer. Yosemite granite | Mental health advocate & climbing coach | Living in a van 90% of the time | Always down for afternoon sends | Dog dad to Luna 🐕',
    interests: ['Rock Climbing', 'Van Life', 'Coffee', 'Trail Running', 'Swimming', 'Surfing'],
    expertise: [
      { icon: 'mountain', label: 'Expert Climber' },
      { icon: 'car', label: 'Van Dweller' },
      { icon: 'pencil', label: 'Route Setter' },
    ],
    recentActivities: [
      { title: 'Big Wall Climbing @ Yosemite', time: 'Last Tuesday' },
      { title: 'Morning Run @ Golden Gate Park', time: 'Yesterday' },
    ],
    verified: true,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {mockUser.name}
              {mockUser.verified && (
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              )}
            </Text>
            <Text style={styles.location}>{mockUser.location}</Text>
            <Text style={styles.stats}>
              {mockUser.stats.friends} Friends · {mockUser.stats.activities} Activities
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bio</Text>
        <Text style={styles.bio}>{mockUser.bio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interestsContainer}>
          {mockUser.interests.map((interest, index) => (
            <InterestTag key={index} label={interest} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Badges of Expertise</Text>
        <View style={styles.expertiseContainer}>
          {mockUser.expertise.map((badge, index) => (
            <ExpertiseBadge key={index} icon={badge.icon} label={badge.label} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Activities</Text>
        <View style={styles.historyContainer}>
          {mockUser.recentActivities.map((activity, index) => (
            <ActivityHistoryItem
              key={index}
              title={activity.title}
              time={activity.time}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  stats: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  bio: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  interestText: {
    fontSize: 14,
    color: '#333',
  },
  expertiseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  expertiseBadge: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  badgeText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  historyContainer: {
    gap: 16,
  },
  historyItem: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  historyTime: {
    fontSize: 14,
    color: '#666',
  },
});
