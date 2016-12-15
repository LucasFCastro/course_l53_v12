<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '\vendor\autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application();

// funções internas************************
function getBills($billType)
{
    $json = file_get_contents(__DIR__ . '/' . $billType . '.json');
    $data = json_decode($json, true);
    return $data['bills'];
}

function findIndexById($id, $bills)
{
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBills($bills, $billType)
{
    $data = ['bills' => $bills];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/' . $billType . '.json', $json);
}

// API BillsPay
$app->get('api/bills/pay', function () use ($app) {
    $bills = getBills('billspay');
    return $app->json($bills);
});

$app->get('api/bills/pay/total', function () use ($app) {
    $bills = getBills('billspay');
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills/pay/{id}', function ($id) use ($app) {
    $bills = getBills('billspay');
    $bill = $bills[findIndexById($id, $bills)];
    return $app->json($bill);
});

$app->post('api/bills/pay', function (Request $request) use ($app) {
    $bills = getBills('billspay');
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills, 'billspay');
    return $app->json($data);
});

$app->put('api/bills/pay/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills('billspay');
    $data = $request->request->all();
    $index = findIndexById($id, $bills);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills, 'billspay');
    return $app->json($bills[$index]);
});

$app->delete('api/bills/pay/{id}', function ($id) {
    $bills = getBills('billspay');
    $index = findIndexById($id, $bills);
    array_splice($bills,$index,1);
    writeBills($bills, 'billspay');
    return new Response("", 204);
});

//*** API BillsReceive
$app->get('api/bills/receive', function () use ($app) {
    $bills = getBills('billsreceive');
    return $app->json($bills);
});

$app->get('api/bills/receive/total', function () use ($app) {
    $bills = getBills('billsreceive');
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills/receive/{id}', function ($id) use ($app) {
    $bills = getBills('billsreceive');
    $bill = $bills[findIndexById($id, $bills)];
    return $app->json($bill);
});

$app->post('api/bills/receive', function (Request $request) use ($app) {
    $bills = getBills('billsreceive');
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills, 'billsreceive');
    return $app->json($data);
});

$app->put('api/bills/receive/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills('billsreceive');
    $data = $request->request->all();
    $index = findIndexById($id, $bills);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills, 'billsreceive');
    return $app->json($bills[$index]);
});

$app->delete('api/bills/receive/{id}', function ($id) {
    $bills = getBills('billsreceive');
    $index = findIndexById($id, $bills);
    array_splice($bills,$index,1);
    writeBills($bills, 'billsreceive');
    return new Response("", 204);
});


$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();
