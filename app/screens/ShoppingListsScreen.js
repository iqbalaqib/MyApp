import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loadShoppingLists, setSelectedHouseholdId, loadShoppingListItems } from '../redux/shoppingListsSlice';
import { useNavigation } from '@react-navigation/native';

const ShoppingListsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { lists, loading, error } = useSelector(state => state.shoppingLists);

  useEffect(() => {
    dispatch(loadShoppingLists());
  }, [dispatch]);

  const handlePress = (householdId) => {
    // Set the selected shopping list and load its items
    dispatch(setSelectedHouseholdId(householdId));
    dispatch(loadShoppingListItems(householdId));
    navigation.navigate('ShoppingListDetail');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item.id)}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  if (error) {
       const errorMessage = typeof error === 'object' && error.message ? error.message : JSON.stringify(error);
    return (
      <View style={styles.center}>
        <Text>Error: {errorMessage}</Text>
      </View>
    );
  }  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>John Doe's Shopping Lists</Text>
      <FlatList 
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  itemText: {
    fontSize: 18,
  },
});

export default ShoppingListsScreen;
