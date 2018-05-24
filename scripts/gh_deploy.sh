set -e

echo Switching to branch gh-pages...
git fetch
git checkout gh-pages
git pull

echo Adding files...
mkdir -p $TRAVIS_BANCH/$TRAVIS_COMMIT
mv -v ./preview/* ./$TRAVIS_BANCH/$TRAVIS_COMMIT/

echo <script>window.location+="/${TRAVIS_BRANCH}/${TRAVIS_COMMIT}"</script> > index.html

echo Uploading...
git add .
git commit -a -m "Built and uploaded preview for commit $TRAVIS_BRANCH/$TRAVIS_COMMIT"
git push
git checkout master

echo Done!