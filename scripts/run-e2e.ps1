# run-e2d.ps1
# db startup not necessary, db running on windows


dotenv -e ../.env -- npx prisma migrate dev --name init

if ($args.Length -eq 0) {
  npx playwright test
}
else {
  npx playwright test --headed
}

npx playwright show-report
