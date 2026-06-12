param(
  [int]$Port = 4173,
  [string]$Root = (Get-Location).Path
)

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".js" = "application/javascript; charset=utf-8"
  ".svg" = "image/svg+xml"
  ".pdf" = "application/pdf"
  ".png" = "image/png"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $requestPath = [System.Web.HttpUtility]::UrlDecode($context.Request.Url.AbsolutePath.TrimStart("/"))
  if ([string]::IsNullOrWhiteSpace($requestPath)) {
    $requestPath = "index.html"
  }

  $filePath = Join-Path $Root $requestPath
  $resolvedRoot = [System.IO.Path]::GetFullPath($Root)
  $resolvedPath = [System.IO.Path]::GetFullPath($filePath)

  if (-not $resolvedPath.StartsWith($resolvedRoot) -or -not (Test-Path -LiteralPath $resolvedPath -PathType Leaf)) {
    $context.Response.StatusCode = 404
    $bytes = [System.Text.Encoding]::UTF8.GetBytes("Not found")
  } else {
    $context.Response.StatusCode = 200
    $ext = [System.IO.Path]::GetExtension($resolvedPath).ToLowerInvariant()
    $context.Response.ContentType = $mime[$ext]
    if (-not $context.Response.ContentType) {
      $context.Response.ContentType = "application/octet-stream"
    }
    $bytes = [System.IO.File]::ReadAllBytes($resolvedPath)
  }

  $context.Response.ContentLength64 = $bytes.Length
  $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $context.Response.OutputStream.Close()
}
