git checkout gh-pages
git fetch
git pull

mkdir -p $TRAVIS_BANCH/$TRAVIS_COMMIT
mv -v ./preview/* ./$TRAVIS_BANCH/$TRAVIS_COMMIT/

git add .
git commit -a -m "Built and uploaded preview for commit $TRAVIS_COMMIT on branch $TRAVIS_BRANCH"
git push
git checkout master