import React from 'react';
import { SafeAreaView, View, Image, Text, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Params {
  id: string;
}

const MovieDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Icon
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
        name="arrow-back-outline"
        size={36}
        color="#1B384A"
      />
      <ScrollView style={styles.container}>
        <Image
          style={styles.poster}
          source={{
            uri:
              'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
          }}
        />

        <Text style={styles.movieTitle}>Ford v Ferrari</Text>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.movieData}>2019</Text>
          <Text style={styles.movieData}>PG-13</Text>
          <Text style={styles.movieData}>2h32min</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.movieCategory}>
            <Text style={styles.categoryText}>Action</Text>
          </View>
          <View style={styles.movieCategory}>
            <Text style={styles.categoryText}>Biography</Text>
          </View>

          <View style={styles.movieCategory}>
            <Text style={styles.categoryText}>Drama</Text>
          </View>
        </View>

        <Text style={styles.title}>Plot Summary</Text>
        <Text style={styles.plotText}>
          American car designer Carroll Shelby and driver Kn Miles battle
          corporate interference and the laws of physics to build a
          revolutionary race car for Ford in order.
        </Text>

        <View style={styles.ratingContainer}>
          <View>
            <Text style={styles.ratingTitle}>IMDb</Text>
            <Text style={styles.ratingValue}>6.4/10</Text>
          </View>
          <View>
            <Text style={styles.ratingTitle}>Rotten Tomatoes</Text>
            <Text style={styles.ratingValue}>28%</Text>
          </View>
          <View>
            <Text style={styles.ratingTitle}>Metacritic</Text>
            <Text style={styles.ratingValue}>44/100</Text>
          </View>
        </View>

        <Text style={styles.title}>Cast and Crew</Text>
        <View style={styles.crew}>
          <Text style={styles.subtitle}>Director</Text>

          <Text style={styles.text}>Zack Snyder</Text>

          <Text style={styles.subtitle}>Actors</Text>

          <Text style={styles.text}>Ben Affleck</Text>
          <Text style={styles.text}>Henry Cavill</Text>
          <Text style={styles.text}>Amy Adams</Text>
          <Text style={styles.text}>Jesse Eisenberg</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetail;

const styles = EStyleSheet.create({
  backIcon: {
    marginTop: '1rem',
    paddingLeft: '1rem',
  },

  container: {},

  poster: {
    alignSelf: 'center',
    height: '16rem',
    width: '10rem',
    borderRadius: '1rem',
  },

  movieTitle: {
    marginTop: '1rem',
    fontSize: '2rem',
    fontWeight: 'bold',
    paddingLeft: '1rem',
    color: '#12153D',
  },

  movieData: {
    paddingLeft: '1rem',
    color: '#9A9BB2',
    fontSize: '1rem',
    marginBottom: '1rem',
  },

  movieCategory: {
    marginLeft: '1rem',

    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    paddingTop: '0.2rem',
    paddingBottom: '0.2rem',

    borderColor: '#B7B7CC',
    borderWidth: 1,
    borderRadius: '1rem',
  },

  categoryText: {
    fontSize: '0.75rem',
    color: '#12153D',
  },

  title: {
    paddingLeft: '1rem',
    marginTop: '2rem',

    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#12153D',
  },

  plotText: {
    paddingLeft: '1rem',
    color: '#859BA9',
    fontSize: '1rem',
  },

  ratingContainer: {
    marginTop: '1rem',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  ratings: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  ratingTitle: {
    textAlign: 'center',
    color: '#12153D',
    fontWeight: 'bold',
  },

  ratingValue: {
    textAlign: 'center',
    color: '#9A9BB2',
  },

  crew: {
    marginBottom: '3rem',
  },

  subtitle: {
    paddingLeft: '1rem',
    marginTop: '1rem',
    fontSize: '1.rem',
    fontWeight: '600',
    color: '#12153D',
  },
  text: {
    paddingLeft: '2rem',
    marginTop: '0.25rem',
    fontSize: '1rem',
    color: '#859BA9',
  },
});
