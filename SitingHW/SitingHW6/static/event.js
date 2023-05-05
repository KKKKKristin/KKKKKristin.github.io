#include "trojanmap.h"

//-----------------------------------------------------
// TODO: Students should implement the following:
//-----------------------------------------------------
/**
 * GetLat: Get the latitude of a Node given its id. If id does not exist, return
 * -1.
 *
 * @param  {std::string} id : location id
 * @return {double}         : latitude
 */
double TrojanMap::GetLat(const std::string &id) { 
  
  return 0;
}

/**
 * GetLon: Get the longitude of a Node given its id. If id does not exist,
 * return -1.
 *
 * @param  {std::string} id : location id
 * @return {double}         : longitude
 */
double TrojanMap::GetLon(const std::string &id) {
  return 0;
}

/**
 * GetName: Get the name of a Node given its id. If id does not exist, return
 * "NULL".
 *
 * @param  {std::string} id : location id
 * @return {std::string}    : name
 */
std::string TrojanMap::GetName(const std::string &id) {
  return "";
}

/**
 * GetNeighborIDs: Get the neighbor ids of a Node. If id does not exist, return
 * an empty vector.
 *
 * @param  {std::string} id            : location id
 * @return {std::vector<std::string>}  : neighbor ids
 */
std::vector<std::string> TrojanMap::GetNeighborIDs(const std::string &id) {
  return {};
}

/**
 * GetID: Given a location name, return the id.
 * If the node does not exist, return an empty string.
 * The location name must be unique, which means there is only one node with the name.
 *
 * @param  {std::string} name          : location name
 * @return {std::string}               : id
 */
std::string TrojanMap::GetID(const std::string &name) {
  std::string res = "";
  return res;
}

/**
 * GetPosition: Given a location name, return the position. If id does not
 * exist, return (-1, -1).
 *
 * @param  {std::string} name          : location name
 * @return {std::pair<double,double>}  : (lat, lon)
 */
std::pair<double, double> TrojanMap::GetPosition(std::string name) {
  std::pair<double, double> results(-1, -1);
  return results;
}

/**
 * CalculateEditDistance: Calculate edit distance between two location names
 * @param  {std::string} a          : first string
 * @param  {std::string} b          : second string
 * @return {int}                    : edit distance between two strings
 */
int TrojanMap::CalculateEditDistance(std::string a, std::string b) {     
  return 0;
}

/**
 * FindClosestName: Given a location name, return the name with the smallest edit
 * distance.
 *
 * @param  {std::string} name          : location name
 * @return {std::string} tmp           : the closest name
 */
std::string TrojanMap::FindClosestName(std::string name) {
  std::string tmp = ""; // Start with a dummy word
  return tmp;
}

/**
 * Autocomplete: Given a parital name return all the possible locations with
 * partial name as the prefix. The function should be case-insensitive.
 *
 * @param  {std::string} name          : partial name
 * @return {std::vector<std::string>}  : a vector of full names
 */
std::vector<std::string> TrojanMap::Autocomplete(std::string name) {
  std::vector<std::string> results;
  return results;
}

/**
 * GetAllCategories: Return all the possible unique location categories, i.e.
 * there should be no duplicates in the output.
 *
 * @return {std::vector<std::string>}  : all unique location categories
 */
std::vector<std::string> TrojanMap::GetAllCategories() {
  return {};
}

/**
 * GetAllLocationsFromCategory: Return all the locations of the input category (i.e.
 * 'attributes' in data.csv). If there is no location of that category, return
 * (-1, -1). The function should be case-insensitive.
 *
 * @param  {std::string} category         : category name (attribute)
 * @return {std::vector<std::string>}     : ids
 */
std::vector<std::string> TrojanMap::GetAllLocationsFromCategory(
    std::string category) {
  std::vector<std::string> res;
  return res;
}

/**
 * GetLocationRegex: Given the regular expression of a location's name, your
 * program should first check whether the regular expression is valid, and if so
 * it returns all locations that match that regular expression.
 *
 * @param  {std::regex} location name      : the regular expression of location
 * names
 * @return {std::vector<std::string>}     : ids
 */
std::vector<std::string> TrojanMap::GetLocationRegex(std::regex location) {
  return {};
}

/**
 * CalculateDistance: Get the distance between 2 nodes.
 * We have provided the code for you. Please do not need to change this function.
 * You can use this function to calculate the distance between 2 nodes.
 * The distance is in mile.
 * The distance is calculated using the Haversine formula.
 * https://en.wikipedia.org/wiki/Haversine_formula
 * 
 * @param  {std::string} a  : a_id
 * @param  {std::string} b  : b_id
 * @return {double}  : distance in mile
 */
double TrojanMap::CalculateDistance(const std::string &a_id,
                                    const std::string &b_id) {
  // Do not change this function
  Node a = data[a_id];
  Node b = data[b_id];
  double dlon = (b.lon - a.lon) * M_PI / 180.0;
  double dlat = (b.lat - a.lat) * M_PI / 180.0;
  double p = pow(sin(dlat / 2), 2.0) + cos(a.lat * M_PI / 180.0) *
                                           cos(b.lat * M_PI / 180.0) *
                                           pow(sin(dlon / 2), 2.0);
  double c = 2 * asin(std::min(1.0, sqrt(p)));
  return c * 3961;
}

/**
 * CalculatePathLength: Calculates the total path length for the locations
 * inside the vector.
 * We have provided the code for you. Please do not need to change this function.
 * 
 * @param  {std::vector<std::string>} path : path
 * @return {double}                        : path length
 */
double TrojanMap::CalculatePathLength(const std::vector<std::string> &path) {
  // Do not change this function
  double sum = 0;
  for (int i = 0; i < int(path.size()) - 1; i++) {
    sum += CalculateDistance(path[i], path[i + 1]);
  }
  return sum;
}

/**
 * CalculateShortestPath_Dijkstra: Given 2 locations, return the shortest path
 * which is a list of id. Hint: Use priority queue.
 *
 * @param  {std::string} location1_name     : start
 * @param  {std::string} location2_name     : goal
 * @return {std::vector<std::string>}       : path
 */
std::vector<std::string> TrojanMap::CalculateShortestPath_Dijkstra(
    std::string location1_name, std::string location2_name) {
  std::vector<std::string> path;
  return path;
}

/**
 * CalculateShortestPath_Bellman_Ford: Given 2 locations, return the shortest
 * path which is a list of id. Hint: Do the early termination when there is no
 * change on distance.
 *
 * @param  {std::string} location1_name     : start
 * @param  {std::string} location2_name     : goal
 * @return {std::vector<std::string>}       : path
 */
std::vector<std::string> TrojanMap::CalculateShortestPath_Bellman_Ford(
    std::string location1_name, std::string location2_name) {
  std::vector<std::string> path;
  return path;
}

/**
 * Traveling salesman problem: Given a list of locations, return the shortest
 * path which visit all the places and back to the start point.
 *
 * @param  {std::vector<std::string>} input : a list of locations needs to visit
 * @return {std::pair<double, std::vector<std::vector<std::string>>} : a pair of total distance and the all the progress to get final path, 
 *                                                                      for example: {10.3, {{0, 1, 2, 3, 4, 0}, {0, 1, 2, 3, 4, 0}, {0, 4, 3, 2, 1, 0}}},
 *                                                                      where 10.3 is the total distance, 
 *                                                                      and the first vector is the path from 0 and travse all the nodes and back to 0,
 *                                                                      and the second vector is the path shorter than the first one,
 *                                                                      and the last vector is the shortest path.
 */
// Please use brute force to implement this function, ie. find all the permutations.
std::pair<double, std::vector<std::vector<std::string>>> TrojanMap::TravelingTrojan_Brute_force(
                                    std::vector<std::string> location_ids) {
  std::pair<double, std::vector<std::vector<std::string>>> records;
  return records;
}

// Please use backtracking to implement this function
std::pair<double, std::vector<std::vector<std::string>>> TrojanMap::TravelingTrojan_Backtracking(
                                    std::vector<std::string> location_ids) {
  std::pair<double, std::vector<std::vector<std::string>>> records;
  return records;
}

// Hint: https://en.wikipedia.org/wiki/2-opt
std::pair<double, std::vector<std::vector<std::string>>> TrojanMap::TravelingTrojan_2opt(
      std::vector<std::string> location_ids){
  std::pair<double, std::vector<std::vector<std::string>>> records;
  return records;
}

// This is optional
std::pair<double, std::vector<std::vector<std::string>>> TrojanMap::TravelingTrojan_3opt(
      std::vector<std::string> location_ids){
  std::pair<double, std::vector<std::vector<std::string>>> records;
  return records;
}

/**
 * Given CSV filename, it read and parse locations data from CSV file,
 * and return locations vector for topological sort problem.
 * We have provided the code for you. Please do not need to change this function.
 * Example: 
 *   Input: "topologicalsort_locations.csv"
 *   File content:
 *    Name
 *    Ralphs
 *    KFC
 *    Chick-fil-A
 *   Output: ['Ralphs', 'KFC', 'Chick-fil-A']
 * @param  {std::string} locations_filename     : locations_filename
 * @return {std::vector<std::string>}           : locations
 */
std::vector<std::string> TrojanMap::ReadLocationsFromCSVFile(
    std::string locations_filename) {
  std::vector<std::string> location_names_from_csv;
  std::fstream fin;
  fin.open(locations_filename, std::ios::in);
  std::string line, word;
  getline(fin, line);
  while (getline(fin, word)) {
    location_names_from_csv.push_back(word);
  }
  fin.close();
  return location_names_from_csv;
}

/**
 * Given CSV filenames, it read and parse dependencise data from CSV file,
 * and return dependencies vector for topological sort problem.
 * We have provided the code for you. Please do not need to change this function.
 * Example: 
 *   Input: "topologicalsort_dependencies.csv"
 *   File content:
 *     Source,Destination
 *     Ralphs,Chick-fil-A
 *     Ralphs,KFC
 *     Chick-fil-A,KFC
 *   Output: [['Ralphs', 'Chick-fil-A'], ['Ralphs', 'KFC'], ['Chick-fil-A', 'KFC']]
 * @param  {std::string} dependencies_filename     : dependencies_filename
 * @return {std::vector<std::vector<std::string>>} : dependencies
 */
std::vector<std::vector<std::string>> TrojanMap::ReadDependenciesFromCSVFile(
    std::string dependencies_filename) {
  std::vector<std::vector<std::string>> dependencies_from_csv;
  std::fstream fin;
  fin.open(dependencies_filename, std::ios::in);
  std::string line, word;
  getline(fin, line);
  while (getline(fin, line)) {
    std::stringstream s(line);
    std::vector<std::string> dependency;
    while (getline(s, word, ',')) {
      dependency.push_back(word);
    }
    dependencies_from_csv.push_back(dependency);
  }
  fin.close();
  return dependencies_from_csv;
}

/**
 * DeliveringTrojan: Given a vector of location names, it should return a
 * sorting of nodes that satisfies the given dependencies. If there is no way to
 * do it, return a empty vector.
 *
 * @param  {std::vector<std::string>} locations                     : locations
 * @param  {std::vector<std::vector<std::string>>} dependencies     : prerequisites
 * @return {std::vector<std::string>} results                       : results
 */
std::vector<std::string> TrojanMap::DeliveringTrojan(
    std::vector<std::string> &locations,
    std::vector<std::vector<std::string>> &dependencies) {
  std::vector<std::string> result;
  return result;     
}

/**
 * inSquare: Give a id retunr whether it is in square or not.
 *
 * @param  {std::string} id            : location id
 * @param  {std::vector<double>} square: four vertexes of the square area
 * @return {bool}                      : in square or not
 */
bool TrojanMap::inSquare(std::string id, std::vector<double> &square) {
  return true;
}


/**
 * GetSubgraph: Give four vertexes of the square area, return a list of location
 * ids in the squares
 *
 * @param  {std::vector<double>} square         : four vertexes of the square
 * area
 * @return {std::vector<std::string>} subgraph  : list of location ids in the
 * square
 */
std::vector<std::string> TrojanMap::GetSubgraph(std::vector<double> &square) {
  // include all the nodes in subgraph
  std::vector<std::string> subgraph;
  return subgraph;
}

/**
 * Cycle Detection: Given four points of the square-shape subgraph, return true
 * if there is a cycle path inside the square, false otherwise.
 *
 * @param {std::vector<std::string>} subgraph: list of location ids in the
 * square
 * @param {std::vector<double>} square: four vertexes of the square area
 * @return {bool}: whether there is a cycle or not
 */
bool TrojanMap::CycleDetection(std::vector<std::string> &subgraph, std::vector<double> &square) {
  return false;
}

/**
 * FindNearby: Given a class name C, a location name L and a number r,
 * find all locations in class C on the map near L with the range of r and
 * return a vector of string ids
 *
 * @param {std::string} className: the name of the class
 * @param {std::string} locationName: the name of the location
 * @param {double} r: search radius
 * @param {int} k: search numbers
 * @return {std::vector<std::string>}: location name that meets the requirements
 */
std::vector<std::string> TrojanMap::FindNearby(std::string attributesName, std::string name, double r, int k) {
  std::vector<std::string> res;
  return res;
}

/**
 * Shortest Path to Visit All Nodes: Given a list of locations, return the shortest
 * path which visit all the places and no need to go back to the start point.
 *
 * @param  {std::vector<std::string>} input : a list of locations needs to visit
 * @return {std::vector<std::string> }      : the shortest path
 */
std::vector<std::string> TrojanMap::TrojanPath(
      std::vector<std::string> &location_names) {
    std::vector<std::string> res;
    return res;
}

/**
 * Given a vector of queries, find whether there is a path between the two locations with the constraint of the gas tank.
 *
 * @param  {std::vector<std::pair<double, std::vector<std::string>>>} Q : a list of queries
 * @return {std::vector<bool> }      : existence of the path
 */
std::vector<bool> TrojanMap::Queries(const std::vector<std::pair<double, std::vector<std::string>>>& q) {
    std::vector<bool> ans(q.size());
    return ans;
}

/**
 * CreateGraphFromCSVFile: Read the map data from the csv file
 * We have provided the code for you. Please do not need to change this function.
 */
void TrojanMap::CreateGraphFromCSVFile() {
  // Do not change this function
  std::fstream fin;
  fin.open("src/lib/data.csv", std::ios::in);
  std::string line, word;

  getline(fin, line);
  while (getline(fin, line)) {
    std::stringstream s(line);

    Node n;
    int count = 0;
    while (getline(s, word, ',')) {
      word.erase(std::remove(word.begin(), word.end(), '\''), word.end());
      word.erase(std::remove(word.begin(), word.end(), '"'), word.end());
      word.erase(std::remove(word.begin(), word.end(), '{'), word.end());
      word.erase(std::remove(word.begin(), word.end(), '}'), word.end());
      if (count == 0)
        n.id = word;
      else if (count == 1)
        n.lat = stod(word);
      else if (count == 2)
        n.lon = stod(word);
      else if (count == 3)
        n.name = word;
      else {
        word.erase(std::remove(word.begin(), word.end(), ' '), word.end());
        if (isalpha(word[0])) n.attributes.insert(word);
        if (isdigit(word[0])) n.neighbors.push_back(word);
      }
      count++;
    }
    data[n.id] = n;
  }
  fin.close();
}



====================================================


#ifndef TROJAN_MAP_H
#define TROJAN_MAP_H

#include <math.h>

#include <algorithm>
#include <cfloat>
#include <climits>
#include <fstream>
#include <iostream>
#include <map>
#include <queue>
#include <regex>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <set>
#include <vector>

// A Node is the location of one point in the map.
class Node {
 public:
  Node(){};
  Node(const Node &n) {
    id = n.id;
    lat = n.lat;
    lon = n.lon;
    name = n.name;
    neighbors = n.neighbors;
    attributes = n.attributes;
  };
  std::string id;    // A unique id assigned to each point.
  double lat;        // Latitude
  double lon;        // Longitude
  std::string name;  // Name of the location. E.g. "Bank of America".
  std::vector<std::string>
      neighbors;  // List of the ids of all neighbor points.
  std::unordered_set<std::string>
      attributes;  // List of the attributes of the location.
};

class TrojanMap {
 public:
  // Constructor
  TrojanMap() { CreateGraphFromCSVFile(); };

  // A map of ids to Nodes.
  std::unordered_map<std::string, Node> data; //node contains all the ids

  //-----------------------------------------------------
  // Read in the data
  void CreateGraphFromCSVFile();

  //-----------------------------------------------------
  // TODO: Implement these functions and create unit tests for them:
  // Get the Latitude of a Node given its id.
  double GetLat(const std::string &id);

  // Get the Longitude of a Node given its id.
  double GetLon(const std::string &id);

  // Get the name of a Node given its id.
  std::string GetName(const std::string &id);

  // Get the id given its name.
  std::string GetID(const std::string &name);

  // Get the neighbor ids of a Node.
  std::vector<std::string> GetNeighborIDs(const std::string &id);

  // Returns a vector of names given a partial name.
  std::vector<std::string> Autocomplete(std::string name);

  // GetAllCategories: Return all the possible unique location categories, i.e.
  //  there should be no duplicates in the output.
  std::vector<std::string> GetAllCategories();

  std::vector<std::string> GetAllLocationsFromCategory(std::string category);

  std::vector<std::string> GetLocationRegex(std::regex location);

  // Returns lat and lon of the given the name.
  std::pair<double, double> GetPosition(std::string name);

  // Calculate location names' edit distance
  int CalculateEditDistance(std::string, std::string);

  // Find the closest name
  std::string FindClosestName(std::string name);

  // Get the distance between 2 nodes.
  double CalculateDistance(const std::string &a, const std::string &b);

  // Calculates the total path length for the locations inside the vector.
  double CalculatePathLength(const std::vector<std::string> &path);

  // Given the name of two locations, it should return the **ids** of the nodes
  // on the shortest path.
  std::vector<std::string> CalculateShortestPath_Dijkstra(
      std::string location1_name, std::string location2_name);
  std::vector<std::string> CalculateShortestPath_Bellman_Ford(
      std::string location1_name, std::string location2_name);

  // Given CSV filename, it read and parse locations data from CSV file,
  // and return locations vector for topological sort problem.
  std::vector<std::string> ReadLocationsFromCSVFile(
      std::string locations_filename);

  // Given CSV filenames, it read and parse dependencise data from CSV file,
  // and return dependencies vector for topological sort problem.
  std::vector<std::vector<std::string>> ReadDependenciesFromCSVFile(
      std::string dependencies_filename);

  // Given a vector of location names, it should return a sorting of nodes
  // that satisfies the given dependencies.
  std::vector<std::string> DeliveringTrojan(
      std::vector<std::string> &location_names,
      std::vector<std::vector<std::string>> &dependencies);

  // Given a vector of location ids, it should reorder them such that the path
  // that covers all these points has the minimum length.
  // The return value is a pair where the first member is the total_path,
  // and the second member is the reordered vector of points.
  // (Notice that we don't find the optimal answer. You can return an estimated
  // path.)
  std::pair<double, std::vector<std::vector<std::string>>>
  TravelingTrojan_Brute_force(std::vector<std::string> location_ids);

  std::pair<double, std::vector<std::vector<std::string>>>
  TravelingTrojan_Backtracking(std::vector<std::string> location_ids);

  std::pair<double, std::vector<std::vector<std::string>>> TravelingTrojan_2opt(
      std::vector<std::string> location_ids);

  std::pair<double, std::vector<std::vector<std::string>>> TravelingTrojan_3opt(
      std::vector<std::string> location_ids);

  std::vector<std::string> TrojanPath(std::vector<std::string> &location_names);
    
  // Check whether the id is in square or not
  bool inSquare(std::string id, std::vector<double> &square);

  // Get the subgraph based on the input
  std::vector<std::string> GetSubgraph(std::vector<double> &square);

  // Given a subgraph specified by a square-shape area, determine whether there
  // is a cycle or not in this subgraph.
  bool CycleDetection(std::vector<std::string> &subgraph,
                      std::vector<double> &square);

  // Given a location id and k, find the k closest points on the map
  std::vector<std::string> FindNearby(std::string, std::string, double, int);
  
  // Takes in a vector of queries. Each query consists of a pair: <tank_capacity, [source, destination]>.
  // Returns the result of each query in a vector.
  std::vector<bool> Queries(const std::vector<std::pair<double, std::vector<std::string>>> &q);

  //----------------------------------------------------- User-defined functions
};

#endif




=====================================

mapui.cc


#ifndef MapUI_H
#define MapUI_H
#define DOT_SIZE 5
#define LINE_WIDTH 3

// #define NCURSES
#ifdef NCURSES
#include <sstream>
#include <fstream>
#include <unistd.h>
#include <ncurses.h>
#include "src/lib/ui.h"
#endif

#include <iostream>
#include "trojanmap.h"
#include <time.h>
#include "opencv2/core.hpp"
#include "opencv2/highgui.hpp"
#include "opencv2/imgcodecs.hpp"
#include "opencv2/imgproc.hpp"
#include "opencv2/videoio.hpp"

class MapUI {
 private:
  TrojanMap map;

 public:
  // Create the menu.
  void PrintMenu();

  // Create the Dynamic menu.
  #ifdef NCURSES
  void DynamicPrintMenu();
  #endif
  // Visualization
  // Plot the map
  void PlotMap();

  // Given a location id, plot the point on the map.
  void PlotPoint(std::string id);

  // Given a lat and lon, plot the point on the map.
  void PlotPoint(double lat, double lon);

  // Given a vector of location ids draws the path (connects the points)
  void PlotPath(std::vector<std::string> &location_ids);

  // Given a vector of location ids draws the points on the map (no path).
  void PlotPoints(std::vector<std::string> &location_ids);

  // Given a vector of location ids draws the points on the map with path.
  void PlotPointsandEdges(std::vector<std::string> &location_ids, std::vector<double> &square);

  // Given a vector of location ids draws the points with their order on the map (no path).
  void PlotPointsOrder(std::vector<std::string> &location_ids);

  // Given a vector of location ids and origin, draws the points with their label.
  void PlotPointsLabel(std::vector<std::string> &location_ids, std::string origin);

  // Create the videos of the progress to get the path
  void CreateAnimation(std::vector<std::vector<std::string>>, std::string);

  // Given a vector of location ids draws the path (connects the points) and name
  void PlotPathwithName(std::vector<std::string> &location_ids);

  // Transform the location to the position on the map
  std::pair<double, double> GetPlotLocation(double lat, double lon);
};

#endif



 ==============


 mapui.h:

#ifndef MapUI_H
#define MapUI_H
#define DOT_SIZE 5
#define LINE_WIDTH 3

// #define NCURSES
#ifdef NCURSES
#include <sstream>
#include <fstream>
#include <unistd.h>
#include <ncurses.h>
#include "src/lib/ui.h"
#endif

#include <iostream>
#include "trojanmap.h"
#include <time.h>
#include "opencv2/core.hpp"
#include "opencv2/highgui.hpp"
#include "opencv2/imgcodecs.hpp"
#include "opencv2/imgproc.hpp"
#include "opencv2/videoio.hpp"

class MapUI {
//  private:
//   TrojanMap map;

 public:


  // std::unordered_map<std::string, Node> data;
  // Create the menu.
  void PrintMenu();

  // Create the Dynamic menu.
  #ifdef NCURSES
  void DynamicPrintMenu();
  #endif
  // Visualization
  // Plot the map
  void PlotMap();

  // Given a location id, plot the point on the map.
  void PlotPoint(std::string id);

  // Given a lat and lon, plot the point on the map.
  void PlotPoint(double lat, double lon);

  // Given a vector of location ids draws the path (connects the points)
  void PlotPath(std::vector<std::string> &location_ids);

  // Given a vector of location ids draws the points on the map (no path).
  void PlotPoints(std::vector<std::string> &location_ids);

  // Given a vector of location ids draws the points on the map with path.
  void PlotPointsandEdges(std::vector<std::string> &location_ids, std::vector<double> &square);

  // Given a vector of location ids draws the points with their order on the map (no path).
  void PlotPointsOrder(std::vector<std::string> &location_ids);

  // Given a vector of location ids and origin, draws the points with their label.
  void PlotPointsLabel(std::vector<std::string> &location_ids, std::string origin);

  // Create the videos of the progress to get the path
  void CreateAnimation(std::vector<std::vector<std::string>>, std::string);

  // Given a vector of location ids draws the path (connects the points) and name
  void PlotPathwithName(std::vector<std::string> &location_ids);

  // Transform the location to the position on the map
  std::pair<double, double> GetPlotLocation(double lat, double lon);



// =============================================


 public:
  // Constructor
  TrojanMap() { CreateGraphFromCSVFile(); };

  // A map of ids to Nodes.
  std::unordered_map<std::string, Node> data; //node contains all the ids

  //-----------------------------------------------------
  // Read in the data
  void CreateGraphFromCSVFile();

  //-----------------------------------------------------
  // TODO: Implement these functions and create unit tests for them:
  // Get the Latitude of a Node given its id.
  double GetLat(const std::string &id);

  // Get the Longitude of a Node given its id.
  double GetLon(const std::string &id);

  // Get the name of a Node given its id.
  std::string GetName(const std::string &id);

  // Get the id given its name.
  std::string GetID(const std::string &name);

  // Get the neighbor ids of a Node.
  std::vector<std::string> GetNeighborIDs(const std::string &id);

  // Returns a vector of names given a partial name.
  std::vector<std::string> Autocomplete(std::string name);

  // GetAllCategories: Return all the possible unique location categories, i.e.
  //  there should be no duplicates in the output.
  std::vector<std::string> GetAllCategories();

  std::vector<std::string> GetAllLocationsFromCategory(std::string category);

  std::vector<std::string> GetLocationRegex(std::regex location);

  // Returns lat and lon of the given the name.
  std::pair<double, double> GetPosition(std::string name);

  // Calculate location names' edit distance
  int CalculateEditDistance(std::string, std::string);

  // Find the closest name
  std::string FindClosestName(std::string name);

  // Get the distance between 2 nodes.
  double CalculateDistance(const std::string &a, const std::string &b);

  // Calculates the total path length for the locations inside the vector.
  double CalculatePathLength(const std::vector<std::string> &path);

  // Given the name of two locations, it should return the **ids** of the nodes
  // on the shortest path.
  std::vector<std::string> CalculateShortestPath_Dijkstra(
      std::string location1_name, std::string location2_name);
  std::vector<std::string> CalculateShortestPath_Bellman_Ford(
      std::string location1_name, std::string location2_name);

  // Given CSV filename, it read and parse locations data from CSV file,
  // and return locations vector for topological sort problem.
  std::vector<std::string> ReadLocationsFromCSVFile(
      std::string locations_filename);

  // Given CSV filenames, it read and parse dependencise data from CSV file,
  // and return dependencies vector for topological sort problem.
  std::vector<std::vector<std::string>> ReadDependenciesFromCSVFile(
      std::string dependencies_filename);

  // Given a vector of location names, it should return a sorting of nodes
  // that satisfies the given dependencies.
  std::vector<std::string> DeliveringTrojan(
      std::vector<std::string> &location_names,
      std::vector<std::vector<std::string>> &dependencies);

  // Given a vector of location ids, it should reorder them such that the path
  // that covers all these points has the minimum length.
  // The return value is a pair where the first member is the total_path,
  // and the second member is the reordered vector of points.
  // (Notice that we don't find the optimal answer. You can return an estimated
  // path.)
  std::pair<double, std::vector<std::vector<std::string>>>
  TravelingTrojan_Brute_force(std::vector<std::string> location_ids);

  std::pair<double, std::vector<std::vector<std::string>>>
  TravelingTrojan_Backtracking(std::vector<std::string> location_ids);

  std::pair<double, std::vector<std::vector<std::string>>> TravelingTrojan_2opt(
      std::vector<std::string> location_ids);

  std::pair<double, std::vector<std::vector<std::string>>> TravelingTrojan_3opt(
      std::vector<std::string> location_ids);

  std::vector<std::string> TrojanPath(std::vector<std::string> &location_names);
    
  // Check whether the id is in square or not
  bool inSquare(std::string id, std::vector<double> &square);

  // Get the subgraph based on the input
  std::vector<std::string> GetSubgraph(std::vector<double> &square);

  // Given a subgraph specified by a square-shape area, determine whether there
  // is a cycle or not in this subgraph.
  bool CycleDetection(std::vector<std::string> &subgraph,
                      std::vector<double> &square);

  // Given a location id and k, find the k closest points on the map
  std::vector<std::string> FindNearby(std::string, std::string, double, int);
  
  // Takes in a vector of queries. Each query consists of a pair: <tank_capacity, [source, destination]>.
  // Returns the result of each query in a vector.
  std::vector<bool> Queries(const std::vector<std::pair<double, std::vector<std::string>>> &q);




};

#endif

