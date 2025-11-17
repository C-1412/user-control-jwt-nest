@echo off
REM Script para listar todos los archivos y carpetas en forma de árbol,
REM excluyendo node_modules y .git

echo Generando listado de archivos y carpetas...
echo.

echo ======= Listado completo de archivos con rutas (sin node_modules ni .git) =======
dir /S /B | findstr /V "\\node_modules\\" | findstr /V "\\.git\\"

echo.
pause
