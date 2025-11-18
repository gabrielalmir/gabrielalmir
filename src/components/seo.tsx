import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  type?: 'website' | 'article';
  image?: string;
  url?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export function SEO({
  title,
  description,
  keywords = [],
  author = 'Gabriel Almir',
  type = 'website',
  image = '/me.jpg',
  url,
  publishedTime,
  modifiedTime,
  section,
  tags = []
}: SEOProps) {
  const siteTitle = 'Gabriel Almir - Backend Developer';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const siteUrl = 'https://gabrielalmir.com.br';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  const allKeywords = [
    'Gabriel Almir',
    'Backend Developer',
    'Node.js',
    'TypeScript',
    'AWS',
    'NestJS',
    'Software Engineer',
    ...keywords,
    ...tags
  ].join(', ');

  return (
    <Head>

      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />


      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="pt_BR" />


      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@gabrielalmir" />


      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {section && (
            <meta property="article:section" content={section} />
          )}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type === 'article' ? 'Article' : 'WebSite',
            headline: title,
            description: description,
            image: fullImage,
            url: fullUrl,
            author: {
              '@type': 'Person',
              name: author,
              url: siteUrl,
              jobTitle: 'Backend Software Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'CTC'
              }
            },
            publisher: {
              '@type': 'Person',
              name: author,
              url: siteUrl
            },
            ...(publishedTime && { datePublished: publishedTime }),
            ...(modifiedTime && { dateModified: modifiedTime }),
            ...(type === 'article' && {
              articleSection: section,
              keywords: tags.join(', ')
            })
          })
        }}
      />


      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />


      <meta name="theme-color" content="#99ffe4" />
      <meta name="msapplication-TileColor" content="#99ffe4" />
    </Head>
  );
}

export function useBlogPostSEO(post: {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  category: string;
  id: string;
}) {
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    type: 'article' as const,
    url: `/blog/${post.id}`,
    publishedTime: new Date(post.date).toISOString(),
    section: post.category,
    tags: post.tags
  };
}

export function useCaseStudySEO(study: {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  category: string;
  id: string;
}) {
  return {
    title: study.title,
    description: `${study.subtitle} - ${study.description}`,
    keywords: study.technologies,
    type: 'article' as const,
    url: `/case-studies/${study.id}`,
    section: study.category,
    tags: study.technologies
  };
}
