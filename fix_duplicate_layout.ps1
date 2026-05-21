$base = "d:\Projects\APFX\frontend"

$files = @(
    "$base\app\terms-of-service\TermsOfServiceClient.tsx",
    "$base\app\support\SupportClient.tsx",
    "$base\app\risk-disclosure\RiskDisclosureClient.tsx",
    "$base\app\restricted-countries-policy\RestrictedCountriesClient.tsx",
    "$base\app\privacy-policy\PrivacyPolicyClient.tsx",
    "$base\app\payment-disclaimer\PaymentDisclaimerClient.tsx",
    "$base\app\legal\LegalHubClient.tsx",
    "$base\app\high-risk-disclaimer\HighRiskDisclaimerClient.tsx",
    "$base\app\deposit-withdrawal-policy\DepositWithdrawalClient.tsx",
    "$base\app\cookie-policy\CookiePolicyClient.tsx",
    "$base\app\complaint-handling-policy\ComplaintHandlingClient.tsx",
    "$base\app\compliance-tips\ComplianceTipsClient.tsx",
    "$base\app\bonus-terms\BonusTermsClient.tsx",
    "$base\app\aml-kyc-policy\AMLKYCClient.tsx"
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
