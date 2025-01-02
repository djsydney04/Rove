import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ActivityDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29' }}
          style={styles.header}
        >
          <View style={styles.headerOverlay}>
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-down" size={28} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Ionicons name="share-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.headerContent}>
              <Text style={styles.title}>Hike Through the Marin Headlands</Text>
              <View style={styles.hostInfo}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' }}
                  style={styles.hostImage}
                />
                <View>
                  <View style={styles.hostNameRow}>
                    <Text style={styles.hostName}>Hosted By Adam</Text>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                  </View>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>4.8</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={20} color="#4A6572" />
              <Text style={styles.detailText}>Marin Headlands, CA</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="people-outline" size={20} color="#4A6572" />
              <Text style={styles.detailText}>3 / 5 participants</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={20} color="#4A6572" />
              <Text style={styles.detailText}>This Weekend</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="fitness-outline" size={20} color="#4A6572" />
              <Text style={styles.detailText}>Intermediate</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>
              Anybody want to come for a hike in the Marin Headlands on Friday? We'll take in stunning views of the Golden Gate Bridge and the Pacific Ocean. Perfect for photography enthusiasts!
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {['Hiking', 'Nature', 'Photography'].map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Activity</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: 400,
    width: SCREEN_WIDTH,
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 60,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hostImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  hostNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  detailsSection: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#4A6572',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A6572',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4A6572',
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#4A6572',
  },
  footer: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
  },
  joinButton: {
    backgroundColor: '#344955',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
