# Diff HEAD with the previous commit
$diff = git diff --name-only HEAD^ HEAD
# Check if a file under docs/ or with the .md extension has changed (added, modified, deleted)
$SourceDiff1 = $diff | Where-Object { $_ -match '^src/change1.yml' }
$SourceDiff2 = $diff | Where-Object { $_ -match '^src/change2.yml' }
# Set the output named "files_changed"
Write-Host "::set-output name=files_changed1::$SourceDiff1"
Write-Host "::set-output name=files_changed2::$SourceDiff2"
