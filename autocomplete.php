<?php
// autocompleteticket.php
// https://zarco.myserver.pt/forms2026/process1010form01/autocomplete.php?action=getticket001&query=consor
// https://zarco.myserver.pt/forms2026/process1010form01/autocomplete.php?action=getticket002&query=33663

include 'config.php';

$query = $_GET['query'] ?? '';
$action = $_GET['action'] ?? '';

if (function_exists($action)) {
    $result = $action($query);
    echo json_encode($result);
} else {
    echo json_encode(["value" => "",
                      "text" => "function '" . $action . "' not found"]);
}
exit;

function getticket002($query){

    header('Content-Type: application/json');
    global $url1,$login1;

    $body = $login1;
    $body['TicketID'] = $query;
    $body['AllArticles'] = 0;

    $searchResponse = getJSON1($url1 . "/TicketGet", $body);
    print_r($searchResponse );

    $output = [];
    return $output;
} //getticket002

function getticket001($query){

    header('Content-Type: application/json');
    global $url1,$login1;

    if (strlen($query) < 4) { // Check query length
        return [];
    }

    $body = $login1;
    $body["Queues"] = ["Helpdesk Field L1"];
    $body["CustomerID"] = "*" . $query . "*";

    $tenDaysAgo = date('Y-m-d H:i:s', strtotime('-10 days'));   // Correct date calculation for last 10 days
    $body["TicketCreateTimeNewerDate"] = $tenDaysAgo;

    // States to exclude 'merged'
    $body["States"] = ['new', 'open', 'closed successful'];

    $searchResponse = getJSON1($url1 . "/TicketSearch", $body);
    $output = [];

    if (isset($searchResponse['TicketID']) && is_array($searchResponse['TicketID'])) {
        foreach ($searchResponse['TicketID'] as $tid) {
            $body1 = $login1; 
            $body1['TicketID'] = $tid;
            $body1['AllArticles'] = 0;
            
            $t_data = getJSON1($url1 . "/TicketGet", $body1);
            if (isset($t_data['Ticket'][0])) {
                $t = $t_data['Ticket'][0];
                $output[] = [
                    "value" => $tid,
                    "text"  => ($t['TicketNumber'] ?? 'N/A') . " - " . ($t['CustomerID'] ?? 'N/A') . " - " . ($t['Title'] ?? 'No Title')
                ];
            }
        }
    } else {
        //$output = ["value" => "", "text"  => "nothing found"];
    }
    return $output;
} //getticket001


// --- Helper Function ---
function getJSON1($url, $data) {
    $ch = curl_init($url);
    $payload = json_encode($data);

    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);

    $result = curl_exec($ch);
    
    if (curl_errno($ch)) {
        error_log('Curl error: ' . curl_error($ch));
        curl_close($ch);
        return null;
    }
    
    curl_close($ch);
    return json_decode($result, true);
} //getJSON1

/*
function ticket_process($tid) {
    global $url1, $login1; // Access global configuration

    echo "function:info:ticket_process " . $tid . "\n";

    // Create the request body
    // In PHP, assigning an array creates a copy by default (unlike JS objects which are references)
    $body1 = $login1; 
    $body1['TicketID'] = $tid;
    $body1['AllArticles'] = 1;

    // console.log(json_encode($body1)); // Uncomment to debug payload

    // Perform the HTTP Request
    // JS used: url1 + "/TicketGet"
    $response1 = getJSON1($url1 . "/TicketGet", $body1);

    // Check if we got a valid response with Ticket data
    if ($response1 && isset($response1['Ticket'][0])) {
        
        $ticketData = $response1['Ticket'][0];

        // --- Call External Logic Functions ---
        // Note: These functions are referenced in your JS but not defined in the snippets.
        // You must ensure these functions exist in your PHP project.
        if (function_exists('ticket_close_if_subject_contains')) {
            $rv110 = ticket_close_if_subject_contains($ticketData);
        }
        if (function_exists('ticket_close_if_body_contains')) {
            $rv120 = ticket_close_if_body_contains($ticketData);
        }
        if (function_exists('ticket_delete_if_sender_contains')) {
            $rv130 = ticket_delete_if_sender_contains($ticketData);
        }

        // --- Random Number Generation ---
        // JS: Math.floor(Math.random() * 90000) + 10000
        // Result is between 10000 and 99999
        $rand = rand(10000, 99999);

        // --- File Operations ---
        // Ensure the "in_queue" directory exists, or this will fail
        $fileName = "in_queue/" . $tid . "-" . $rand . ".json";

        // JSON stringify (with pretty print equivalent to null, 2 in JS)
        $jsonString = json_encode($ticketData, JSON_PRETTY_PRINT);

        // fs.writeFile equivalent
        file_put_contents($fileName, $jsonString);
        
    } else {
        echo "Error: Failed to retrieve ticket data for TID: $tid\n";
    }
}
*/

// --- Usage Example ---
// ticket_process(123);


/*
// Example Output
$results = [
    ['value' => 't100', 'text' => 'Ticket 100 - Support'],
    ['value' => 't101', 'text' => 'Ticket 101 - Sales']
];

echo json_encode($results);
*/
?>