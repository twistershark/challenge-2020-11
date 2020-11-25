import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useMovie } from '../../hooks/movie';

const Favorites: React.FC = () => {
  const { favorites, setFavorite } = useMovie();

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <Icon
          onPress={() => navigation.navigate('Dashboard')}
          style={styles.backIcon}
          name="arrow-back-outline"
          size={36}
          color="#FFF"
        />

        <Text style={styles.title}>Favorites</Text>
      </View>

      {favorites.length ? (
        <FlatList
          style={styles.moviesList}
          data={favorites}
          keyExtractor={(movie, index) => {
            return movie.id + index;
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate('MovieDetail', { id: item.id })
              }
              style={styles.movieCard}
            >
              <Image
                style={styles.moviePoster}
                source={{
                  uri: `${item.poster}`,
                }}
              />
              <View style={styles.movieInfo}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.movieTitle}>{item.title}</Text>
                  <Icon
                    style={styles.star}
                    name="star"
                    size={25}
                    color="#ffd88f"
                    onPress={() => setFavorite(item, true)}
                  />
                </View>

                <Text style={styles.movieYear}>{item.year}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noMoviesText}>
          You haven't favorited any movie yet!
        </Text>
      )}
    </SafeAreaView>
  );
};

export default Favorites;

const styles = EStyleSheet.create({
  header: {
    backgroundColor: '#1B384A',
    height: '4rem',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    position: 'absolute',
    left: 4,
    paddingLeft: '1rem',
  },

  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
  },

  moviesList: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: '1.25rem',
    paddingLeft: '1.25rem',

    marginTop: '1rem',
  },

  movieCard: {
    backgroundColor: '#f0f0f5',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    paddingRight: '0.5rem',
  },

  moviePoster: {
    height: '100%',
    width: '5.5rem',
    borderTopLeftRadius: '0.5rem',
    borderBottomLeftRadius: '0.5rem',
  },

  movieInfo: {
    flex: 1,
    padding: '1rem',
  },

  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingRight: '0.25rem',
  },

  movieTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'Roboto-Bold',
    lineHeight: '1.375rem',
    color: '#224358',
  },

  movieYear: {
    textAlign: 'left',
    color: '#224358',
    fontWeight: 'bold',
  },

  noMoviesText: {
    marginTop: '4rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#B7B7CC',
  },
});
