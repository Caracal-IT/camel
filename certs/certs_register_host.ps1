﻿Install-Module -Name 'Carbon' -AllowClobber
Import-Module 'Carbon'
Set-CHostsEntry -IPAddress 127.0.0.1 -HostName 'dev.divigraph.com' -Description "Divigraph Dev Environment"