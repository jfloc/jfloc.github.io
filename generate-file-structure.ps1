# Read the content of dependencies.txt
$dependenciesContent = Get-Content -Path "dependencies.txt"

# Extract unique source and target file paths from the content
$dependencyPaths = $dependenciesContent | ForEach-Object {
    $split = $_ -split 'ΓåÆ'
    $source = $split[0].Trim()
    $target = $split[1].Trim()
    "$source|$target"
} | Sort-Object -Unique

# Output the file structure to a new text file
$dependencyPaths | Out-File -FilePath "file-structure.txt"
