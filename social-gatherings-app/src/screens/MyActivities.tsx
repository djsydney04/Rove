import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
  SafeAreaView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ActivityDetails: { activity: any };
  Preferences: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Activity = {
  id: string;
  title: string;
  host: string;
  date: string;
  image: { uri: string };
  verified: boolean;
};

type Section = {
  title: string;
  data: Activity[];
};

export default function MyActivities() {
  const navigation = useNavigation<NavigationProp>();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const scaleAnim = new Animated.Value(1);

  const sections: Section[] = [
    {
      title: 'This Week',
      data: [
        {
          id: '1',
          title: 'Biking @ Golden Gate Bridge',
          host: 'Bret',
          date: 'Friday @ 9AM',
          image: { uri: 'https://images.unsplash.com/photo-1450149632596-3ef25a62011a?q=80&w=1200' },
          verified: true,
        },
        {
          id: '2',
          title: 'Surfing @ Ocean Beach',
          host: 'Mike',
          date: 'Thursday @ 7AM',
          image: { uri: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200' },
          verified: true,
        },
      ],
    },
    {
      title: 'This Weekend',
      data: [
        {
          id: '3',
          title: 'Bouldering @ Stinson Beach',
          host: 'Sarah',
          date: 'Saturday @ 10AM',
          image: { uri: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1200' },
          verified: true,
        },
      ],
    },
    {
      title: 'Next Week',
      data: [
        {
          id: '4',
          title: 'Tennis @ Golden Gate Park',
          host: 'Emma',
          date: 'Tuesday @ 6PM',
          image: { uri: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1200' },
          verified: false,
        },
      ],
    },
  ];

  const handlePressIn = (id: string) => {
    setHoveredCard(id);
    Animated.spring(scaleAnim, {
      toValue: 1.02,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setHoveredCard(null);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const renderActivityCard = ({ item: activity }: { item: Activity }) => (
    <Animated.View
      key={activity.id}
      style={[
        styles.activityCard,
        {
          transform: [
            { scale: hoveredCard === activity.id ? scaleAnim : 1 }
          ]
        }
      ]}
    >
      <TouchableOpacity 
        onPress={() => navigation.navigate('ActivityDetails', { activity })}
        onPressIn={() => handlePressIn(activity.id)}
        onPressOut={handlePressOut}
        style={styles.cardTouchable}
      >
        <ImageBackground
          source={activity.image}
          style={styles.cardBackground}
          imageStyle={styles.cardImage}
        >
          <View style={styles.cardOverlay}>
            <View style={styles.cardContent}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <View style={styles.cardFooter}>
                <View style={styles.hostInfo}>
                  <View style={styles.hostImageContainer}>
                    <ImageBackground
                      source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100' }}
                      style={styles.hostImage}
                      imageStyle={{ borderRadius: 15 }}
                    />
                  </View>
                  <Text style={styles.hostedByText}>Hosted By {activity.host}</Text>
                  {activity.verified && (
                    <Ionicons name="checkmark-circle" size={18} color="#1E88E5" />
                  )}
                </View>
                <View style={styles.timeInfo}>
                  <Ionicons name="calendar" size={18} color="#FFFFFF" />
                  <Text style={styles.timeText}>{activity.date}</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton}>
        <View style={styles.shareButtonInner}>
          <Text style={styles.shareIcon}>􀈂</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderSection = ({ item: section }: { item: Section }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <FlatList
        data={section.data}
        renderItem={renderActivityCard}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Activities</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Preferences')}
          >
            <Ionicons name="settings-outline" size={24} color="#4A6572" />
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        ListFooterComponent={<View style={styles.bottomPadding} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'SF Pro Display',
    fontWeight: '700',
    color: '#000000',
  },
  settingsButton: {
    padding: 8,
  },
  listContent: {
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'SF Pro Display',
    fontWeight: '600',
    color: '#4A6572',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  activityCard: {
    height: 240,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  cardTouchable: {
    flex: 1,
  },
  cardBackground: {
    width: '100%',
    height: '100%',
  },
  cardImage: {
    borderRadius: 16,
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  cardContent: {
    gap: 8,
  },
  activityTitle: {
    fontSize: 28,
    fontFamily: 'SF Pro Display',
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hostImageContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  hostImage: {
    width: '100%',
    height: '100%',
  },
  hostedByText: {
    fontSize: 16,
    fontFamily: 'SF Pro Display',
    fontWeight: '500',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'SF Pro Display',
    fontWeight: '500',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  shareButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  shareButtonInner: {
    backgroundColor: '#FFFFFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shareIcon: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'SF Pro Display',
  },
  bottomPadding: {
    height: 100,
  },
});
