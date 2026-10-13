<?php
/**
 * XML Sitemap — for search engines (Google, Bing, etc.)
 * Accessible at: /sitemap.xml
 */
header('Content-Type: application/xml; charset=UTF-8');
header('Cache-Control: public, max-age=86400');

$domain = 'https://www.jaymatajitours.com';
$today  = date('Y-m-d');

$urls = [
  ['loc' => $domain . '/',             'priority' => '1.0', 'changefreq' => 'weekly'],
  ['loc' => $domain . '/book',         'priority' => '0.9', 'changefreq' => 'monthly'],
  ['loc' => $domain . '/destinations/1', 'priority' => '0.8', 'changefreq' => 'monthly'],
  ['loc' => $domain . '/destinations/2', 'priority' => '0.8', 'changefreq' => 'monthly'],
  ['loc' => $domain . '/destinations/3', 'priority' => '0.8', 'changefreq' => 'monthly'],
  ['loc' => $domain . '/destinations/4', 'priority' => '0.8', 'changefreq' => 'monthly'],
];

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($urls as $url): ?>
  <url>
    <loc><?= htmlspecialchars($url['loc'], ENT_XML1, 'UTF-8') ?></loc>
    <lastmod><?= $today ?></lastmod>
    <changefreq><?= $url['changefreq'] ?></changefreq>
    <priority><?= $url['priority'] ?></priority>
  </url>
<?php endforeach; ?>
</urlset>
