<?php
	
$data = date("Y-m-d H:i:s") . ":[" . substr($_POST['uName'], 0, 30) . "]  " . "\n" . substr($_POST['uMessage'], 0, 254) . "\n";  
$file = "messages.txt";
		
if ( $file_handle = fopen( $file, "a" ) ) 
{
	fwrite( $file_handle, $data . "\n" );
}
fclose( $file_handle );

mail( "earle@relate.com.au", "Message from b-o-help.", $data );
	
header("Location: http://mrspeaker.webeisteddfod.com/beer-oclock-help")
?> 