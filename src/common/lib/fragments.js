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
        header {
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

export const CTAContent = graphql`
  fragment CTAContent on MarkdownRemark {
    id
    html
    frontmatter {
      label
      url
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

export const FormContent = graphql`
  fragment FormContent on MarkdownRemark {
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
