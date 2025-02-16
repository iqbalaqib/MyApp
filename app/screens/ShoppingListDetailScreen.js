import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ShoppingListDetailScreen = () => {
  const { selectedListItems, loading, error, selectedHouseholdId } = useSelector(
    (state) => state.shoppingLists
  );

  if (loading) {
    console.log('Loading state:', loading);
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    const errorMessage =
      typeof error === 'object' && error.message ? error.message : JSON.stringify(error);
    console.log('Error state:', errorMessage);
    return (
      <View style={styles.center}>
        <Text>Error: {errorMessage}</Text>
      </View>
    );
  }

  if (!selectedHouseholdId) {
    console.log('No selected household ID:', selectedHouseholdId);
    return (
      <View style={styles.center}>
        <Text>No shopping list selected.</Text>
      </View>
    );
  }

  // Determine how to extract grocery items:
  let allGroceries = [];

  // If selectedListItems is an array, flatten the groceries arrays from each category.
  if (Array.isArray(selectedListItems)) {
    allGroceries = selectedListItems.flatMap((categoryItem) => categoryItem.groceries || []);
  } 
  // If selectedListItems is an object and has a groceries property, use that.
  else if (selectedListItems && selectedListItems.groceries) {
    allGroceries = selectedListItems.groceries;
  }


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.name} (Amount: {item.amount})
      </Text>
      {item.note && <Text style={styles.noteText}>Note: {item.note}</Text>}
      {item.time && <Text style={styles.timeText}>Time: {item.time}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      
      {allGroceries.length > 0 ? (
        <FlatList
          data={allGroceries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text>No items found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  noteText: {
    fontSize: 14,
    color: '#555',
  },
  timeText: {
    fontSize: 14,
    color: '#555',
  },
});

export default ShoppingListDetailScreen;
