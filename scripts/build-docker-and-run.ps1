$TIMESTAMP = Get-Date -Format 'yyyy-MMdd-HHMMSS'
$IMAGE_TAG = "ubuntu:$($TIMESTAMP)"

docker build . -t $IMAGE_TAG -f dockerfiles\Dockerfile --no-cache --progress=plain

docker run -it --rm $IMAGE_TAG /bin/bash