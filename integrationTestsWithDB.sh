#!/usr/bin/env bash
env version="Version_1" run="withDB" mocha modules/metadatasync/integration/ImportMetadataTest.js --timeout 20000
env version="Version_2" run="withDB" mocha modules/metadatasync/integration/ImportMetadataTest.js --timeout 20000