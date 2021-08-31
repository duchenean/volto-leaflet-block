#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
DIR="$(dirname "$SCRIPT_DIR")"
TARGET="$DIR/project/src/addons/volto-leaflet-block"

mkdir -p $TARGET

cd $DIR
for file in $(find . -maxdepth 1 -not -path './node_modules*' -not -path '.'); do
  git check-ignore -q "$file" || ln -sf $DIR/$(basename $file) $TARGET/$(basename $file)
done