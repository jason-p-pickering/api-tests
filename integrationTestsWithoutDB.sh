#!/usr/bin/env bash
env version="Version_1" mocha modules/metadatasync/integration/ImportMetadataTest.js --timeout 20000
env version="Version_2" mocha modules/metadatasync/integration/ImportMetadataTest.js --timeout 20000
