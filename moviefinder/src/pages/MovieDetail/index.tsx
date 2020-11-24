import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, Text, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../services/api';

interface Rating {
  source: string;
  value: string;
}

interface Movie {
  title: string;
  year: string;
  rated: string;
  poster: string;
  duration: string;
  genre: string[];
  plot: string;
  ratings: Rating[];
  director: string;
  actors: string[];
}

interface Params {
  id: string;
}

const MovieDetail: React.FC = () => {
  const [movie, setMovie] = useState<Movie>();

  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`?apikey=925eba28&i=${routeParams.id}`).then(response =>
      setMovie({
        title: response.data.Title,
        year: response.data.Year,
        rated: response.data.Rated,
        poster: response.data.Poster,
        duration: response.data.Runtime,
        genre: response.data.Genre.split(', '),
        plot: response.data.Plot,
        ratings: response.data.Ratings.map((rating: any) => ({
          source: rating.Source,
          value: rating.Value,
        })),
        director: response.data.Director,
        actors: response.data.Actors.split(', '),
      }),
    );
  }, [routeParams.id]);

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Icon
        onPress={() => navigation.navigate('Dashboard')}
        style={styles.backIcon}
        name="arrow-back-outline"
        size={36}
        color="#1B384A"
      />
      <ScrollView style={styles.container}>
        {movie ? (
          <>
            <Image
              style={styles.poster}
              source={{
                uri: movie.poster,
              }}
            />

            <Text style={styles.movieTitle}>{movie.title}</Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.movieData}>{movie.year}</Text>
              <Text style={styles.movieData}>{movie.rated}</Text>
              <Text style={styles.movieData}>{movie.duration}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {movie.genre.map(genre => (
                <View key={genre} style={styles.movieCategory}>
                  <Text style={styles.categoryText}>{genre}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.title}>Plot Summary</Text>
            <Text style={styles.plotText}>{movie.plot}</Text>

            <View style={styles.ratingContainer}>
              {movie.ratings.map(rating => (
                <View key={rating.value}>
                  <Text style={styles.ratingTitle}>{rating.source}</Text>
                  <Text style={styles.ratingValue}>{rating.value}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.title}>Cast and Crew</Text>
            <View style={styles.crew}>
              <Text style={styles.subtitle}>Director</Text>

              <Text style={styles.text}>{movie.director}</Text>

              <Text style={styles.subtitle}>Actors</Text>
              {movie.actors.map(actor => (
                <Text key={actor} style={styles.text}>
                  {actor}
                </Text>
              ))}
            </View>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
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
