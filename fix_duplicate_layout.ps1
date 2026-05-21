$base = "d:\Projects\APFX\frontend"

$files = @(
    "$base\app\tools\risk-management\layout.tsx",
    "$base\app\tools\copy-trading\layout.tsx",
    "$base\app\tools\calculators\layout.tsx",
    "$base\app\products\stocks\StocksClient.tsx",
    "$base\app\products\range\RangePage.tsx",
    "$base\app\products\futures\FuturesPage.tsx",
    "$base\app\products\indices\IndicesPage.tsx",
    "$base\app\products\cryptocurrencies\CryptocurrenciesPage.tsx",
    "$base\app\products\forex\ForexPage.tsx",
    "$base\app\products\bonds\BondsPage.tsx",
    "$base\app\products\commodities\CommoditiesPage.tsx",
    "$base\app\platforms\PlatformsClient.tsx",
    "$base\app\partners\page.tsx",
    "$base\app\pamm\PammClient.tsx",
    "$base\app\page.tsx",
    "$base\app\learn\academy\AcademyPageTemplate.tsx",
    "$base\app\contact\ContactClient.tsx",
    "$base\app\company\marketing-materials\page.tsx",
    "$base\app\company\success-stories\page.tsx",
    "$base\app\accounts\AccountsClient.tsx",
    "$base\app\about\AboutClient.tsx",
    "$base\app\about\press\page.tsx",
    "$base\app\about\about-us\page.tsx",
    "$base\app\academy\glossary\layout.tsx",
    "$base\app\academy\blog\layout.tsx"
)

foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        Write-Host "SKIP (not found): $file"
        continue
    }

    $lines = Get-Content $file -Encoding UTF8
    $filtered = $lines | Where-Object {
        $_ -notmatch "^import Footer from" -and
        $_ -notmatch "^import BottomBar from" -and
        $_ -notmatch "^\s*<Footer\s*/>" -and
        $_ -notmatch "^\s*<BottomBar\s*/>"
    }

    Set-Content $file $filtered -Encoding UTF8
    Write-Host "Fixed: $file"
}

Write-Host "`nDone."
