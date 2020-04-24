import { graphql } from 'gatsby';

export const SiteInfo = graphql`
  fragment SiteInfo on Site {
    siteMetadata {
      defaultTitle: title
      titleTemplate
      defaultDescription: description
      siteUrl: url
      defaultImage: image
      twitter
    }
  }
`;

export const NavInfo = graphql`
  fragment NavInfo on Site {
    siteMetadata {
      navigation {
        links {
          name
          link
        }
      }
    }
  }
`;

export const GitInfo = graphql`
  fragment GitInfo on GitBranch {
    name
    commit
  }
`;

export const LogoContent = graphql`
  fragment LogoContent on MarkdownRemark {
    id
    frontmatter {
      asset
    }
  }
`;

export const HeroContent = graphql`
  fragment HeroContent on MarkdownRemark {
    id
    html
    frontmatter {
      name
      background
      ctaLabel
      ctaUrl
    }
  }
`;

export const CalloutContent = graphql`
  fragment CalloutContent on MarkdownRemark {
    id
    html
    frontmatter {
      name
      background
      format
      hide
    }
  }
`;

export const SuccessContent = graphql`
  fragment SuccessContent on MarkdownRemark {
    id
    html
    frontmatter {
      name
      redirect
    }
  }
`;

export const FooterContent = graphql`
  fragment FooterContent on MarkdownRemark {
    id
    html
    frontmatter {
      name
    }
  }
`;

export const ConversionContent = graphql`
  fragment ConversionContent on MarkdownRemark {
    id
    html
    frontmatter {
      action
      honeypot
      id
      name
      submitLabel
      u
      useCustom
    }
  }
`;
