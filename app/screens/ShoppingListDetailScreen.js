import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ShoppingListDetailScreen = () => {
  const { selectedListItems, loading, error, selectedHouseholdId } = useSelector(state => state.shoppingLists);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    console.log('error = ' + JSON.stringify(error));
         const errorMessage = typeof error === 'object' && error.message ? error.message : JSON.stringify(error);
      return (
        <View style={styles.center}>
          <Text>Error: {errorMessage}</Text>
        </View>
      );
    } 

  if (!selectedHouseholdId) {
    return (
      <View style={styles.center}>
        <Text>No shopping list selected.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List Details</Text>
      <FlatList 
        data={selectedListItems}
        keyExtractor={(item, index) => index.toString()}
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

export default ShoppingListDetailScreen;
