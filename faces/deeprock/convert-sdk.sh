#!/bin/bash

# Script to convert a FitBit project between SDK 4 and SDK 5.
# Usage: ./convert-sdk.sh 5

function convert_sdk_5 {
  # Rename resources/widgets.gui >> resources/widget.defs
  mv resources/widgets.gui resources/widget.defs
  # Substitute in resources/widget.defs 'widgets_common.gui' for 'system_widget.defs'
  sed -i '' 's/widgets_common\.gui/system_widget\.defs/g' resources/widget.defs
  # Substitute other gui for defs
  sed -i '' 's/\.gui/\.defs/g' resources/widget.defs
  # Rename resources/*.gui >> resources/*.view
  cd resources
  for f in *.gui; do mv -- "$f" "${f%.gui}.view"; done
  # Patch name of fitfont file
  mv fitfont.view fitfont.defs
  cd -
  # Copy package-sdk5.json to package.json
  cp package-sdk5.json package.json
  # Install dependencies
  npm i
}

function convert_sdk_4 {
  # Rename resources/widget.defs >> resources/widgets.gui
  mv resources/widget.defs resources/widgets.gui
  # Substitute in resources/widgets.gui 'system_widget.defs' for 'widgets_common.gui'
  sed -i '' 's/system_widget\.defs/widgets_common\.gui/g' resources/widgets.gui
  # Substitute other gui for defs
  sed -i '' 's/\.defs/\.gui/g' resources/widgets.gui
  # Rename resources/*.view >> resources/*.gui
  cd resources
  for f in *.view; do mv -- "$f" "${f%.view}.gui"; done
  # Patch name of fitfont file
  mv fitfont.defs fitfont.gui
  cd -
  # Copy package-sdk4.json to package.json
  cp package-sdk4.json package.json
  # Install dependencies
  npm i
}

VERSION=$1
if [[ "$VERSION" == "4" ]]; then
  convert_sdk_4
elif [[ "$VERSION" == "5" ]]; then
  convert_sdk_5
else
  echo "Invalid version parameter"
fi
