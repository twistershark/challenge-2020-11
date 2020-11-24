import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';

const Dashboard: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const navigation = useNavigation();

  const movies = [
    {
      id: 'tt2975590',
      title: 'Batman v Superman: Dawn of Justice',
      plot:
        'Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.',
      year: '2019',
      poster:
        'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      isFavorite: false,
    },
    {
      id: 'tt2975595',
      title: 'Batman v Superman: Dawn of Justice',
      plot:
        'Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.',
      year: '2019',
      poster:
        'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      isFavorite: false,
    },
    {
      id: 'tt2975690',
      title: 'Batman v Superman: Dawn of Justice',
      plot:
        'Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.',
      year: '2019',
      poster:
        'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      isFavorite: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image style={styles.headerLogo} source={logoImg} />

          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTextTitle}>Movie Finder</Text>
            <Text style={styles.welcomeText}>
              Information about your favorite movies
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#B7B7CC" />

        <TextInput
          placeholder="What movie are you searching for?"
          placeholderTextColor="#B7B7CC"
          style={styles.textInput}
          value={searchValue}
          onChangeText={text => setSearchValue(text)}
        />
      </View>

      <Text style={styles.foundMovies}>We found 405 movies:</Text>

      <FlatList
        style={styles.moviesList}
        data={movies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('MovieDetail', { id: item.id })}
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
                  name="star-outline"
                  size={25}
                  color="#B7B7CC"
                />
              </View>

              <Text style={styles.movieDescription}>{item.plot}</Text>
              <Text style={styles.movieYear}>{item.year}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#224358',

    paddingTop: '1.25rem',
    paddingRight: '1.5rem',
    paddingLeft: '1.5rem',
    paddingBottom: '2.5rem',

    display: 'flex',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerLogo: {
    width: '4.25rem',
    height: '4.25rem',
  },

  welcomeTextContainer: {
    flexDirection: 'column',
    paddingLeft: '1.25rem',
  },

  welcomeTextTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  welcomeText: {
    flexWrap: 'wrap',
    width: '95%',
    fontSize: '1rem',
    color: '#FDFDFD',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    height: '4rem',
    backgroundColor: '#F0F0F5',
    borderRadius: '1rem',

    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: '1.5rem',
    paddingLeft: '1.5rem',

    marginRight: '1.5rem',
    marginLeft: '1.5rem',
    marginTop: '-1.25rem',
  },

  textInput: {
    fontSize: '1rem',
    color: '#224358',
  },

  foundMovies: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#224358',

    marginTop: '2rem',
    paddingLeft: '1.25rem',
  },

  prayersContainer: {
    marginTop: '2.5rem',
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

    paddingRight: '1rem',
  },

  movieTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'Roboto-Bold',
    lineHeight: '1.375rem',
    color: '#224358',
  },

  movieDescription: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    marginTop: '0.375rem',
    color: '#859BA9',
  },

  movieYear: {
    textAlign: 'right',
    color: '#224358',
    fontWeight: 'bold',
  },

  noPrayersText: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: '1.5rem',
    paddingLeft: '1.5rem',
    marginTop: '2rem',
    fontSize: '1rem',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    color: 'red',
  },
});

export default Dashboard;
