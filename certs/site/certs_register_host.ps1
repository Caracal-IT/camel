Install-Module -Name 'Carbon' -AllowClobber
Import-Module 'Carbon'
Set-CHostsEntry -IPAddress 127.0.0.1 -HostName 'dev.caracal.com' -Description "Caracal Dev Environment"
Set-CHostsEntry -IPAddress 127.0.0.1 -HostName 'camel_db' -Description "Caracal Dev Environment - Database"
