
PACKAGE_NAME=lina_dicto_for_webextensions
FIREFOX_PACKAGE_DIR=output.firefox.${PACKAGE_NAME}
CHROME_PACKAGE_DIR=output.chrome.${PACKAGE_NAME}

.PHONY: release firefox chrome

release: firefox chrome

firefox:
	rm -rf ${FIREFOX_PACKAGE_DIR}
	rm -rf ./${PACKAGE_NAME}.zip
	mkdir ${FIREFOX_PACKAGE_DIR}
	cp -r *.js js/ icon/ popup/ lina_dicto/ ${FIREFOX_PACKAGE_DIR}/
	cp manifest.json ${FIREFOX_PACKAGE_DIR}/manifest.json
	cd ${FIREFOX_PACKAGE_DIR} && zip -r ../${PACKAGE_NAME}_firefox.zip *
	rm -rf ${FIREFOX_PACKAGE_DIR}

chrome:
	rm -rf ${CHROME_PACKAGE_DIR}
	rm -rf ./${PACKAGE_NAME}.zip
	mkdir ${CHROME_PACKAGE_DIR}
	cp -r *.js js/ icon/ popup/ lina_dicto/ ${CHROME_PACKAGE_DIR}/
	cp chrome.manifest.json ${CHROME_PACKAGE_DIR}/manifest.json
	cd ${CHROME_PACKAGE_DIR} && zip -r ../${PACKAGE_NAME}_chrome.zip *
	#rm -rf ${CHROME_PACKAGE_DIR}

