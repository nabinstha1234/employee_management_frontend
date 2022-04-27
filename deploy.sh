#!/bin/sh
echo “Building React Project …”
yarn build
echo “Building React Project …”
cd build
zip -r ../newFile.zip *
cd ..
echo “Copying html file …”
rsync -av -e ssh newFile.zip dvtms-stage:/home/ubuntu/emp/
echo “Copying js file …”
echo “Removing html file from local directory …”
rm -r build newFile.zip
ssh dvtms-stage 'cd emp/ && unzip newFile.zip -d frontend/'