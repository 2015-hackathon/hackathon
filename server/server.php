<?php
header("Content-type: text/html; charset=utf-8");
set_time_limit(0);

require 'websocket.php';

function wsOnMessage($clientID, $message, $messageLength, $binary) {
	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );

	if ($messageLength == 0) {
		$Server->wsClose($clientID);
		return;
	}

	if ( sizeof($Server->wsClients) == 1 )
		//一个用户
		$Server->wsSend($clientID, time() );
	else
		$res = array('time'=>microtime(true), 'data'=>(int)$message );
		foreach ( $Server->wsClients as $id => $client )
			if ( $id != $clientID )
				$Server->wsSend($id, json_encode( $res ) );
	$Server->log( "msg => ".$ip." => ".$message );
}

function wsOnOpen($clientID)
{
	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );
	$Server->log( "ip => ".$ip );
	$res = array('time'=>time(), 'data'=>'');
	//foreach ( $Server->wsClients as $id => $client )
		//if ( $id != $clientID )
			//$Server->wsSend($id, json_encode($res));
}

function wsOnClose($clientID, $status) {
	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );
	$Server->log( "" );
	foreach ( $Server->wsClients as $id => $client )
		$Server->wsSend($id, '');
}

$Server = new PHPWebSocket();
$Server->bind('message', 'wsOnMessage');
$Server->bind('open', 'wsOnOpen');
$Server->bind('close', 'wsOnClose');
$Server->wsStartServer('192.168.1.101', 9300);

?>
