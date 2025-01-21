import fetchProducts from "@/api/productApi";
import ListItem from "@/components/ListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => fetchProducts({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const renderItem = ({ item }: any) => <ListItem product={item} />;

  const ListFooter = () => {
    return isFetching ? (
      <View
        style={{
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <ActivityIndicator size="large" color="#0C0C0C" />
      </View>
    ) : null;
  };

  const handleEndReached = () => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  };

  const handlePullToRefresh = () => {
    setIsRefreshing(true);
    !isFetching && refetch();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>All products</Text>

      {status === "error" ? (
        <Text style={{ fontSize: 18 }}>{error.message}</Text>
      ) : (
        <FlatList
          refreshing={false}
          onRefresh={refetch}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              colors={["#0C0C0C"]}
              onRefresh={handlePullToRefresh}
            />
          }
          style={{ paddingBottom: 30, width: "100%" }}
          data={data?.pages.flatMap((page) => page.data.data)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleEndReached}
          ListFooterComponent={ListFooter}
        />
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 30,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
});
