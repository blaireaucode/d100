#!/bin/sh

git filter-branch --env-filter '
OLD_EMAIL="blaireaucode@gmail.com"
CORRECT_NAME="blaireaucode"
CORRECT_EMAIL="blaireaucode@gmail.com"
echo Input "$GIT_COMMITTER_EMAIL"
echo Output "$OLD_EMAIL"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags