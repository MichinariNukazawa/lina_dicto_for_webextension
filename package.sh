#!/bin/bash
#
# Author: michinari.nukazawa@gmail.com
#

set -eu
set -o pipefail

trap 'echo "error:$0($LINENO) \"$BASH_COMMAND\" \"$@\""' ERR


SCRIPT_DIR=$(cd $(dirname $0); pwd)
ROOT_DIR=${SCRIPT_DIR}
SOURCE_DIR=${ROOT_DIR}
PACKAGE_DIR=${ROOT_DIR}/tmp
RELEASE_DIR=${ROOT_DIR}

PACKAGE_NAME="lina_dicto_for_webextension"

## packaging
rm -rf ${PACKAGE_DIR}
mkdir -p ${PACKAGE_DIR}

cp ${ROOT_DIR}/manifest.json ${PACKAGE_DIR}/
mkdir -p ${PACKAGE_DIR}/js
cp ${ROOT_DIR}/js/browser-polyfill.js ${PACKAGE_DIR}/js
cp ${ROOT_DIR}/content_script.js ${PACKAGE_DIR}/
cp ${ROOT_DIR}/background.js ${PACKAGE_DIR}/
cp -r ${ROOT_DIR}/js ${PACKAGE_DIR}/
cp -r ${ROOT_DIR}/css ${PACKAGE_DIR}/
cp -r ${ROOT_DIR}/icon ${PACKAGE_DIR}/
cp -r ${ROOT_DIR}/popup ${PACKAGE_DIR}/
cp -r ${ROOT_DIR}/lina_dicto ${PACKAGE_DIR}/
rm -rf ${PACKAGE_DIR}/script.js

pushd ${PACKAGE_DIR}

rm -f ${RELEASE_DIR}/${PACKAGE_NAME}.zip
zip -r ${RELEASE_DIR}/${PACKAGE_NAME}.zip *

popd

