<?php
require_once('plugins/login-servers.php');

return new AdminerLoginServers
([ 'PostgreSQL' => 
    [ 'server' => $_ENV['ADMINER_DEFAULT_SERVER'],
	  'driver' => 'pgsql'
    ]
]);