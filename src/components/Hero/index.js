import React from 'react';
import cx from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';

import withReleaseInfo from 'common/lib/withReleaseInfo';

import CTA from 'components/CTA';

import styles from './styles.module.scss';

const Hero = ({ release, backgroundImage = '/images/site.png' }) => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { name: { eq: "Hero" } }) {
        ...HeroContent
      }
    }
  `);
  const { html, frontmatter } = data.markdownRemark;
  const inlineStyle = {};

  inlineStyle.backgroundImage = backgroundImage;
  if (frontmatter.background) {
    inlineStyle.backgroundImage = `url("${`/images/${frontmatter.background}`}")`;
  }

  return (
    <div className={cx('hero', styles.Hero)} style={inlineStyle}>
      <div
        className={cx(styles.Content)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CTA label={frontmatter.ctaLabel} url={frontmatter.ctaUrl} />
    </div>
  );
};

export default withReleaseInfo(Hero);
