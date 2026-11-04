$OutputFile = "project_dump.txt"

$IncludeExtensions = @(
    ".ts",
    ".js",
    ".json",
    ".yml",
    ".yaml",
    ".md"
)

$ExcludeDirs = @(
    "node_modules",
    "dist",
    "build",
    ".git",
    ".next",
    ".nuxt",
    "coverage",
    ".cache",
    ".idea",
    ".vscode",
    "bin",
    "obj"
)

$ExcludeFiles = @(
    $OutputFile,
    "pnpm-lock.yaml",
    "package-lock.json",
    "yarn.lock",
    ".env",
    ".env.local",
    ".env.development",
    ".env.development.local",
    ".env.production",
    ".env.production.local"
)

"PROJECT SOURCE DUMP" | Set-Content $OutputFile -Encoding UTF8
"Generated: $(Get-Date)" | Add-Content $OutputFile
"" | Add-Content $OutputFile

Get-ChildItem -Recurse -File |
Where-Object {

    $relativePath = $_.FullName.Substring((Get-Location).Path.Length + 1)
    $pathParts = $relativePath -split '[\\/]'

    $inExcludedDir = $false

    foreach ($dir in $ExcludeDirs) {
        if ($pathParts -contains $dir) {
            $inExcludedDir = $true
            break
        }
    }

    $allowedExtension = $_.Extension.ToLower() -in $IncludeExtensions
    $excludedFile = $_.Name -in $ExcludeFiles

    -not $inExcludedDir -and
    $allowedExtension -and
    -not $excludedFile

} |
Sort-Object FullName |
ForEach-Object {

    $relativePath = $_.FullName.Substring((Get-Location).Path.Length + 1)

    Add-Content $OutputFile ""
    Add-Content $OutputFile "================================================================================"
    Add-Content $OutputFile "FILE: $relativePath"
    Add-Content $OutputFile "================================================================================"

    try {
        Get-Content $_.FullName -Raw -Encoding UTF8 -ErrorAction Stop |
            Add-Content $OutputFile -Encoding UTF8
    }
    catch {
        Add-Content $OutputFile "[Could not read file]"
    }
}

Write-Host ""
Write-Host "Done -> $OutputFile"
Write-Host "Size: $([math]::Round((Get-Item $OutputFile).Length / 1MB, 2)) MB"
Write-Host ""
Write-Host "Files included in dump:"

Select-String -Path $OutputFile -Pattern "^FILE:" |
ForEach-Object {
    Write-Host $_.Line
}