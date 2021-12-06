parse_data = function (player_data) {
  // Creating an array of letters A-Z
  letter_array = [];
  for (i = 0; i < 26; i++) {
    letter_array.push(String.fromCharCode(65 + i));
  }

  // Initialising data array which will store all data for plotting
  transformed_data = {};
  for (const layer_1 of [1, 2, 3, 4]) {
    // One entry for each game-mode
    transformed_data[layer_1] = {};
    for (const layer_2 of ["radial", "line"]) {
      // One entry for either graph visualisation
      transformed_data[layer_1][layer_2] = {};
      for (const layer_3 of ["label", "data"]) {
        // label and data arrays for each graph option
        transformed_data[layer_1][layer_2][layer_3] = [];
      }
    }
  }
  // Temporary array to store line graph calculations
  temp_timeseries = { 1: [], 2: [], 3: [], 4: [] };

  // Temporary array to store radial calculations
  temp_letters = { 1: {}, 2: {}, 3: {}, 4: {} };
  for (const letter of letter_array) {
    for (i = 1; i < 5; i++) {
      temp_letters[i][letter] = [0, 0];
    }
  }
  /// Filtering through sql data and splitting by gamemode
  // ====================================================
  for (i = 0; i < player_data.length; i++) {
    letter = player_data[i][1].toUpperCase();
    is_correct = player_data[i][2];
    game_mode = player_data[i][3];

    temp_timeseries[game_mode].push(is_correct ? 1 : 0); // Saving correct or not for aggregation later
    temp_letters[game_mode][letter][1] += 1;
    if (is_correct) {
      temp_letters[game_mode][letter][0] += 1;
    }
  }
  // ====================================================
  // Converting letter dictionary to percentages for letter accuracy
  find_percentage = function (input_tuple) {
    let correct_count = input_tuple[0];
    let total_count = input_tuple[1];
    if (total_count == 0) {
      return 0;
    } else {
      return (100 * correct_count) / total_count;
    }
  };

  for (const letter of letter_array) {
    // Converting to percent for radial
    for (game_mode = 1; game_mode < 5; game_mode++) {
      temp_letters[game_mode][letter] = find_percentage(
        temp_letters[game_mode][letter]
      );
    }
  }

  // Slotting letter percentages into transformed_data array
  for (const letter of letter_array) {
    for (game_mode = 1; game_mode < 5; game_mode++) {
      transformed_data[game_mode]["radial"]["labels"] = letter_array;
      transformed_data[game_mode]["radial"]["data"].push(
        temp_letters[game_mode][letter]
      );
    }
  }

  // Transforming data for line graph
  // ==================================================
  arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length; // Finding the average of an array
  timeseries_percentages = function (time_array) {
    // Calculates a rolling average of 20 and returns an label-data object with arrays of N-20
    output_percentages = [];
    output_labels = [];
    for (i = 20; i < time_array.length; i++) {
      output_labels.push(i);
      percentage = arrAvg(time_array.slice(0 + i, 20 + i)) * 100;
      output_percentages.push(percentage);
    }
    return { labels: output_labels, data: output_percentages };
  };

  for (game_mode = 1; game_mode < 5; game_mode++) {
    transformed_data[game_mode]["line"] = timeseries_percentages(
      temp_timeseries[game_mode]
    );
  }
  return transformed_data;
};
