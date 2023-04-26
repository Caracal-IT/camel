#  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
$PlainTextPass = "password1"
$pfxpass = $PlainTextPass |ConvertTo-SecureString -AsPlainText -Force
Import-PfxCertificate -Password $pfxpass -FilePath "${PWD}\divigraph-dev.pfx" -CertStoreLocation cert:\LocalMachine\Root