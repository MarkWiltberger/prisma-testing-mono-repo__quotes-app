#
# do I need to do the setenv.sh script.
# isn't there a dotenv package that will do this?
# try the following.

# Get the directory of the script
# $scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path

# Load environment variables from the file
# . "$scriptDirectory\setenv.ps1"


# docker compose up -d
Write-Host "🟡 - Waiting 5 seconds for database to fire up"
Write-Host "🟡 - Actually for time being going to fire up db manually"
Start-Sleep -Seconds 5
Write-Host "🟢 - 5 seconds have passed, starting prisma migrate and vitest integration test"
# okay do the job wait script


npx prisma migrate dev --name init




# Use this for now until you convert the if block below
# vitest -c ./vitest.config.integration.ts

# okay here is the converted script:
if ($args.Length -eq 0) {
  vitest -c .\vitest.config.integration.ts
}
else {
  vitest -c .\vitest.config.integration.ts --ui
}


# convert the following into PowerShell script from bash script
#if [ "$#" -eq  "0" ]
#  then
#    vitest -c ./vitest.config.integration.ts
#else
#    vitest -c ./vitest.config.integration.ts --ui
#fi



# Start-Job -Name Job1 -ScriptBlock { Remove-Appxpackage MyAppName }
# Wait-Job -Name Job1
# Add-Appxpackage .\PathToNewVersion