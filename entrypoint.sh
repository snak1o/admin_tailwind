#!/bin/sh

ROOT_DIR=/app/dist

echo "Replacing env constants"
for file in $ROOT_DIR/js/app.*.js* $ROOT_DIR/index.html;
do
	echo "Proccessing $file ...";
	sed -i 's|VUE_API_URL|'${VUE_API_URL}'|g' $file
done

echo "Replacing done"

echo "Starting server"
serve -S /app/dist
