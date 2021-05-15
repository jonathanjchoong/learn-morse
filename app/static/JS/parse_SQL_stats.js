parse_data = function (player_data) {
  letter_array = [];
  for (i = 0; i < 26; i++) {
    letter_array.push(String.fromCharCode(65 + i));
  }

  write_data_letters = {}; // Dictionary to store correct and total for each letter (then it stores percentages)
  read_data_letters = {}; // Dictionary to store correct and total for each letter (then it stores percentages)

  write_data_time = []; // Array to store plays for write gamemode
  read_data_time = []; // Array to store plays for read gamemode

  for (i = 0; i < letter_array.length; i++) {
    write_data_letters[letter_array[i]] = [0, 0];
    read_data_letters[letter_array[i]] = [0, 0];
  }

  // Reading through data splitting it up
  // ====================================================
  for (i = 0; i < player_data.length; i++) {
    letter = player_data[i][1].toUpperCase();
    is_correct = player_data[i][2];
    game_mode = player_data[i][3];

    if (game_mode == 1) {
      write_data_time.push(is_correct ? 1 : 0); // Saving correct or not for aggregation later
      write_data_letters[letter][1] += 1;
      if (is_correct) {
        write_data_letters[letter][0] += 1;
      }
    } else if (game_mode == 2) {
      write_data_time.push(is_correct ? 1 : 0); // Saving correct or not for aggregation later
      read_data_letters[letter][1] += 1;
      if (is_correct) {
        read_data_letters[letter][0] += 1;
      }
    }
  }
  // ====================================================
  // Converting dictionary to percentages for letter accuracy
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
    // Converting to percent for write_data_letters
    write_data_letters[letter] = find_percentage(write_data_letters[letter]);
    // Converting to percent for read_data_letters
    read_data_letters[letter] = find_percentage(read_data_letters[letter]);
  }

  letter_percentages = {
    read: { labels: letter_array, data: [] },
    write: { labels: letter_array, data: [] },
  };

  for (const letter of letter_array) {
    letter_percentages.read.data.push(read_data_letters[letter]);
    letter_percentages.write.data.push(write_data_letters[letter]);
  }

  // Working on data transformation for timeseries data
  // ==================================================
  arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length; // Finding the average of an array
  timeseries_percentages = function (time_array) {
    output_percentages = [];
    output_labels = [];
    for (i = 20; i < time_array.length; i++) {
      output_labels.push(i);
      percentage = arrAvg(time_array.slice(0 + i, 20 + i)) * 100;
      output_percentages.push(percentage);
    }
    return { labels: output_labels, data: output_percentages };
  };

  time_percentages = {
    read: {},
    write: {},
  };

  if (!(write_data_time.length < 20)) {
    time_percentages.write = timeseries_percentages(write_data_time);
  }

  if (!(read_data_time.length < 20)) {
    time_percentages.read = timeseries_percentages(read_data_time);
  }

  return { letter_data: letter_percentages, timeseries_data: time_percentages };
};
