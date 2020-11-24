import React, { useCallback, useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
  isFavorite: boolean;
}

const Dashboard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const findMovies = useCallback(
    async (movieName: string) => {
      setLoading(true);

      const response = await api.get(
        `?apikey=925eba28&s=${movieName}&page=${page}`,
      );

      setTotalResults(response.data.totalResults);

      const newMovies = response.data.Search.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        isFavorite: false,
      }));

      setMovies([...movies, ...newMovies]);

      setLoading(false);
      setPage(page + 1);
    },
    [movies, page],
  );

  const handleSearchValue = useCallback(
    (value: string) => {
      if (page !== 1) {
        setPage(1);
      }

      if (movies) {
        setMovies([]);
        setTotalResults(0);
      }
      setSearchValue(value);
    },
    [movies, page],
  );

  const renderFooter = useCallback(() => {
    if (!loading) {
      return null;
    }
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#224358" size={50} />
      </View>
    );
  }, [loading]);

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
          onChangeText={text => handleSearchValue(text)}
          onSubmitEditing={() => findMovies(searchValue)}
        />
      </View>

      <Text style={styles.foundMovies}>
        {`We found ${totalResults} movies:`}
      </Text>

      <FlatList
        style={styles.moviesList}
        data={movies}
        onEndReached={() => findMovies(searchValue)}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        keyExtractor={(movie, index) => {
          return movie.id + index;
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
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

  loading: {
    marginBottom: '3rem',
  },
});

export default Dashboard;
