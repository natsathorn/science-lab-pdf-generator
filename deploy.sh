echo "directory cleaning"
rm ./pdfCreator.zip *.pdf *~ .DS*
echo "zipping file"
zip -r ./pdfCreator.zip . -x "./.git/*" -x "./deploy.sh" -x "./package.json"
echo "uploading to s3"
aws s3 cp ./pdfCreator.zip s3://science-lab-pdf/pdfCreator.zip --profile side
echo "update lambda function"
aws lambda update-function-code --function-name  science-lab-pdf --s3-bucket science-lab-pdf --s3-key pdfCreator.zip --profile side
