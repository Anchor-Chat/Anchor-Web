set -e

echo Init...
mkdir tmp_gh_deploy
cd tmp_gh_deploy
git init

echo Logging into git
git remote add origin https://lukas2005:$GH_TOKEN@github.com/Anchor-Chat/Anchor-Web.git

echo Switching to branch gh-pages...
git fetch
git checkout gh-pages
git pull

echo Adding files...

if ($TRAVIS_PULL_REQUEST == "false") {
	mkdir -p $TRAVIS_BRANCH/$TRAVIS_COMMIT
	mv -v ../preview/* ./$TRAVIS_BRANCH/$TRAVIS_COMMIT/
	echo "<script>window.location+='/${TRAVIS_BRANCH}/${TRAVIS_COMMIT}'</script>" > index.html
} else {
	mkdir -p ./PRs/$TRAVIS_PULL_REQUEST/$TRAVIS_COMMIT
	mv -v ../preview/* ./PRs/$TRAVIS_PULL_REQUEST/$TRAVIS_COMMIT/
}

echo Uploading...
git add .
if ($TRAVIS_PULL_REQUEST == "false") {
	git commit -a -m "Built and uploaded preview for commit $TRAVIS_BRANCH/$TRAVIS_COMMIT"
} else {
	git commit -a -m "Built and uploaded preview for pull request from $TRAVIS_PULL_REQUEST_SLUG:$TRAVIS_PULL_REQUEST_BRANCH - commit: $TRAVIS_COMMIT"
}
git push
git checkout master

echo Done!
cd ..