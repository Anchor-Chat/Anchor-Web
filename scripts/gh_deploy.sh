set -e

git fetch
git checkout gh-pages
git pull

mkdir -p $TRAVIS_BANCH/$TRAVIS_COMMIT
mv -v ./preview/* ./$TRAVIS_BANCH/$TRAVIS_COMMIT/

echo "<script>window.location+='/${TRAVIS_BRANCH}/${TRAVIS_COMMIT}'</script>" > index.html

git add .
git commit -a -m "Built and uploaded preview for commit $TRAVIS_COMMIT on branch $TRAVIS_BRANCH"
git push
git checkout master