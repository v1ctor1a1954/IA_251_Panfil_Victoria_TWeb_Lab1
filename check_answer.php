<?php
header("Content-Type: application/json; charset=utf-8");

$raspunsuri = array(
    "1" => array(
        "corect"     => ["leonardo dicaprio", "leonardo", "dicaprio"],
        "explicatie" => "Rolul lui Jack Dawson a fost jucat de Leonardo DiCaprio."
    ),
    "2" => array(
        "corect"     => ["gotham", "gotham city"],
        "explicatie" => "Batman locuiește în orașul fictiv Gotham City."
    ),
    "3" => array(
        "corect"     => ["harry potter", "harry"],
        "explicatie" => "Harry Potter este vrăjitorul principal, jucat de Daniel Radcliffe."
    ),
    "4" => array(
        "corect"     => ["7", "sapte", "șapte"],
        "explicatie" => "Albă ca Zăpada are 7 pitici: Grumpy, Happy, Sleepy, Bashful, Sneezy, Dopey și Doc."
    ),
    "5" => array(
        "corect"     => ["woody"],
        "explicatie" => "Woody este jucăria de cowboy, personajul principal din Toy Story."
    )
);

$numar   = $_GET["intrebare"] ?? "";
$raspuns = strtolower(trim($_GET["raspuns"] ?? ""));

$rezultat = array("corect" => false, "explicatie" => "");

if(isset($raspunsuri[$numar])){
    $variante   = $raspunsuri[$numar]["corect"];
    $explicatie = $raspunsuri[$numar]["explicatie"];

    if(in_array($raspuns, $variante)){
        $rezultat["corect"]     = true;
        $rezultat["explicatie"] = $explicatie;
    } else {
        $rezultat["corect"]     = false;
        $rezultat["explicatie"] = $explicatie;
    }
}

echo json_encode($rezultat, JSON_UNESCAPED_UNICODE);
?>
