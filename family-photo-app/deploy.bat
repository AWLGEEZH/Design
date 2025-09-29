@echo off
echo =========================================
echo    PhotoShare App - Easy Deployment
echo =========================================
echo.
echo This will deploy your photo sharing app to Vercel...
echo.
pause

echo Installing Vercel CLI (if needed)...
call npm install -g vercel

echo.
echo Starting deployment...
call npx vercel --prod

echo.
echo =========================================
echo    Deployment Complete!
echo =========================================
echo.
echo Your app should now be live!
echo Check the output above for your live URL.
echo.
pause
