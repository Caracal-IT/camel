Function Test-CommandExists
{
    Param ($command)
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = 'Stop'
    try
    {
        if(Get-Command $command){RETURN $true}
    }
    Catch
    {
        Write-Host “$command does not exist”; RETURN $false
    }
    Finally
    {
        $ErrorActionPreference=$oldPreference
    }
}

Function Test-FileExists
{
    Param ($file)
    if(Test-Path -Path $file -PathType Leaf) 
    {
        Write-Host “$file exists”
        RETURN $true
    }
    else
    {
        Write-Host “$file does not exist”
        RETURN $false
    }
}

Function Test-ToolsExists
{
    If (Test-CommandExists keytool)
    {
        Write-Host "java keytool is installed"
    }
    else
    {
        Write-Host "java keytool is NOT installed, not proceeding"
        Exit 1
    }

    If (Test-CommandExists openssl)
    {
        Write-Host "openssl is installed"
    }
    else
    {
        Write-Host "openssl is NOT installed, not proceeding"
        Exit 1
    }
}

Function Delete-Files
{
    Param ($files_to_delete)

    $proceed = $true

    foreach ($file_to_delete in $files_to_delete)
    {
        if (Test-FileExists $file_to_delete)
        {
            Write-Host "File $file_to_delete already exists."
            $proceed = $false
        }
    }

    if (-Not $proceed)
    {
        $proceed_choice = Read-Host -Prompt "Delete existing files? Type [Y] to proceed, anything else to abort>"

        if ($proceed_choice -eq "Y")
        {
            $proceed = $true
            Write-Host "Deleting files before proceeding..."
        
            foreach ($file_to_delete in $files_to_delete)
            {

			    $oldPreference = $ErrorActionPreference
			    $ErrorActionPreference = 'Stop'
			    try
			    {
				    Remove-Item -Path $file_to_delete
			    }
			    Catch
			    {
				    Write-Host “$file_to_delete does not exist, no action taken”
			    }
			    Finally
			    {
				    $ErrorActionPreference=$oldPreference
			    }
            }
        }
    }
}

Function GenerateAllCerts
{
    #default = changeme

    $cloudKeyPwd = "HufHHd4N64XZSB5D" #HufHHd4N64XZSB5D
    $cloudTrustPwd = "rwuPQqX8ZGqWqmG4" #rwuPQqX8ZGqWqmG4

    $serverKeyPwd = "E9uH8R48vrqZdCaf" #E9uH8R48vrqZdCaf
    $serverTrustPwd = "hgcmgThgYhVGz5bW" #hgcmgThgYhVGz5bW
        
    
    Test-ToolsExists
    
    GenerateCert "" localhost hivemq.jks $serverKeyPwd hivemq-trust-store.jks $serverTrustPwd
    GenerateCert "cloud" dev.divigraph.com cloud.hivemq.jks $cloudKeyPwd cloud.hivemq-trust-store.jks $cloudTrustPwd
}

Function GenerateCert
{
    Param ($name, $cn, $key_store, $store_password, $trust_store, $trust_password)
    
    $prefix = ""    

    if($name -ne "")
    {
        $prefix = $name + "_"
    }   

    $alias       = $prefix + "hivemq"    
    $client_cert = $prefix + "mqtt-client-cert.pfx"
    $server_cert = $prefix + "server.crt"
    $client_key  =  $prefix + "mqtt-client-key.pem"
    $client_pem  =  $prefix + "mqtt-client-cert.pem"
    
    $distinguished_name = "CN="+ $cn + ",OU=,O=DVG,L=CT,S=WC,C=ZA"
    $subject = "/CN="+ $cn + "/OU=Unknown/O=DVG/L=CT/ST=WC/C=ZA"
    
    
    $files_to_delete = $key_store, $trust_store, $client_cert, $server_cert
    Delete-Files $files_to_delete
        
        
    # From HiveMQ blog at https://www.hivemq.com/blog/end-to-end-encryption-in-the-cloud/
    Write-Host "Generating key store for HiveMQ broker, containing its certificate and private key."
    keytool -genkey -keyalg RSA -alias $alias -keystore $key_store -storepass $store_password -validity 360 -keysize 2048 -dname $distinguished_name 

    # diverge from process outlined in blog, export to .crt for easier import into Windows cert store
    Write-Host "Exporting certificate from key store for HiveMQ, for import into SVC trust store."
    keytool -exportcert -storepass $store_password -alias $alias -keystore $key_store -file $server_cert

    Write-Host "Generating certificate and private key for HiveMQ client into PEM files."
    openssl req -subj $subject -x509 -newkey rsa:2048 -keyout $client_key -out $client_pem -passout pass:$store_password -days 360

    # add to process outlined in blog, contain both cert and private key in `*.pfx`, which makes
    # it less error-prone and buggy for .NET `X509Certificate2`
    Write-Host "Converting certificate and private key for HiveMQ client into combined PFX file for use in .NET code."
    openssl pkcs12 -inkey $client_key -in $client_pem -passin pass:$store_password `-export -out $client_cert -passout pass:$store_password -name $alias

    # keytool -importkeystore -srckeystore mqtt-client-cert.pfx -srcstoretype pkcs12 -srcstorepass changeme `
    #   -destkeystore hivemq-trust-store.jks -deststoretype JKS -deststorepass changeme
    Write-Host "Importing certificate HiveMQ client into trust store for HiveMQ broker."
    keytool -importkeystore `
        -srckeystore $client_cert -srcstoretype pkcs12 -srcstorepass $store_password `
        -destkeystore $trust_store -deststoretype pkcs12 -deststorepass $trust_password         
      
}

GenerateAllCerts