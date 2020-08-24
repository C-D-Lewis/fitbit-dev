#!/bin/bash

# Script to build a FitBit project using both SDK 4 and 5 for appropriate devices.

# SDK 5:
function build_sdk_5 {
  # Rename resources/widgets.gui >> resources/widget.defs
  mv resources/widgets.gui resources/widget.defs
  # Substitute in resources/widget.defs 'widgets_common.gui' for 'system_widget.defs'
  sed -i '' 's/widgets_common\.gui/system_widget\.defs/g' resources/widget.defs
  # Rename resources/*.gui >> resources/*.view
  cd resources
  for f in *.gui; do mv -- "$f" "${f%.gui}.view"; done
  cd -
  # Copy package-sdk5.json to package.json
  cp package-sdk5.json package.json
  # 'npm i' and 'npx fitbit-build'
  npm i
  npx fitbit-build
  # Move 'build/app.fba' to 'app-sdk5.fba'
  mv build/app.fba app-sdk5.fba
  # Remove package.json
  rm package.json
}

# SDK 4:
function build_sdk_4 {
  # Rename resources/widget.defs >> resources/widgets.gui
  mv resources/widget.defs resources/widgets.gui
  # Substitute in resources/widgets.gui 'system_widget.defs' for 'widgets_common.gui'
  sed -i '' 's/system_widget\.defs/widgets_common\.gui/g' resources/widgets.gui
  # Rename resources/*.view >> resources/*.gui
  cd resources
  for f in *.view; do mv -- "$f" "${f%.view}.gui"; done
  cd -
  # Copy package-sdk4.json to package.json
  cp package-sdk4.json package.json
  # 'npm i' and 'npx fitbit-build'
  npm i
  npx fitbit-build
  # Move 'build/app.fba' to 'app-sdk4.fba'
  mv build/app.fba app-sdk4.fba
  # Remove package.json
  rm package.json
}

# The codebase is primarily the latest SDK, so build that last
build_sdk_4
build_sdk_5
