#!/usr/bin/env bash
 mocha modules/metadataversion/ErrorMessageTest.js --timeout 20000
 mocha modules/metadataversion/GetVersionHistoryTest.js --timeout 20000
 mocha modules/metadataversion/GetVersionTest.js --timeout 20000
 mocha modules/metadataversion/CreateVersionTest.js --timeout 20000
 mocha modules/metadataversion/GetVersionDetailsTest.js --timeout 20000
 mocha modules/metadataversion/GetVersionDataTest.js --timeout 20000
 mocha modules/metadataversion/GetVersionDatagzTest.js --timeout 20000
 mocha modules/metadataversion/MetadataVersionsUserAuthTest.js --timeout 20000
 mocha modules/metadataversion/UnsupportedCallsTest.js --timeout 20000