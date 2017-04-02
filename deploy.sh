echo "directory cleaning"
rm lambda-function.zip *.pdf *~ .DS*
echo "zipping file"
zip -r lambda-function.zip . -x "./.git" -x "./deploy.sh" -x "./package.json"
echo "uploading to s3"
aws s3 cp ./lambda-function.zip s3://science-lab-pdf/lambda-function.zip --profile side
echo "update lambda function"
aws lambda update-function-code --function-name  science-lab-pdf --s3-bucket science-lab-pdf --s3-key lambda-function.zip --profile side
