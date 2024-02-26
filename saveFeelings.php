<?php
// Check if data was posted
if(isset($_POST['date']) && isset($_POST['feelings'])) {
    $date = $_POST['date'];
    $feelings = json_decode($_POST['feelings'], true); // Convert JSON string back to array

    // Path to the CSV file on the server
    $filePath = 'feelings.csv';

    // Check if the file exists, and create it if it doesn't
    if (!file_exists($filePath)) {
        $file = fopen($filePath, 'w'); // Open the file in write mode to create it
        // Optionally, you can add a header row
        fputcsv($file, ['Date', 'Feelings']);
    } else {
        $file = fopen($filePath, 'a'); // Open the file in append mode
    }

    // Write each feeling to the CSV file
/*     foreach($feelings as $feeling) {
        fputcsv($file, [$date, $feeling]);
    } */
    $feelingsString = implode(';', $feelings);
    fputcsv($file,  [$date, $feelingsString]);

    fclose($file); // Close the file
    echo "Success";
} else {
    echo "Error: Data not provided";
}
?>